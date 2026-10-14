require "rails_helper"

RSpec.describe TrainingSessionForm do
  describe "#save" do
    let(:user) { create(:user) }

    def exercise_attributes(overrides = {})
      {
        name: "squats",
        sets: 3,
        reps: 5,
        weight: 185,
        weight_unit: "lbs",
        bodyweight: false,
        position: 1
      }.merge(overrides)
    end

    context "when creating" do
      it "persists a running session and drops attributes for other sports" do
        training_session = described_class.new(
          user.training_sessions.build,
          {
            session_date: Date.current,
            duration_seconds: 3600,
            location_type: "outdoor",
            sport_details: {
              kind: "running",
              distance: 6,
              distance_unit: "km",
              activity: "tempo",
              exercises: [ exercise_attributes ]
            }
          }
        ).save

        expect(training_session).to be_persisted
        expect(training_session.sport_details).to be_a(RunningTrainingSession)
        expect(training_session.sport_details.distance).to eq(6)
      end

      it "persists client ids" do
        session_id = SecureRandom.uuid
        details_id = SecureRandom.uuid

        training_session = described_class.new(
          user.training_sessions.build,
          {
            id: session_id,
            session_date: Date.current,
            location_type: "indoor",
            sport_details: {
              id: details_id,
              kind: "strength_training",
              average_heart_rate: 120,
              exercises: [ exercise_attributes ]
            }
          }
        ).save

        expect(training_session.id).to eq(session_id)
        expect(training_session.sport_details.id).to eq(details_id)
      end

      it "raises when sport details are missing" do
        expect {
          described_class.new(
            user.training_sessions.build,
            { session_date: Date.current }
          ).save
        }.to raise_error(ActionController::ParameterMissing, /sport_details/)
      end

      it "raises when the sport kind is unknown" do
        expect {
          described_class.new(
            user.training_sessions.build,
            {
              session_date: Date.current,
              sport_details: { kind: "unknown" }
            }
          ).save
        }.to raise_error(ActiveRecord::RecordInvalid) { |error|
          expect(error.record.errors[:"sport_details/kind"]).to include("Unknown sport kind: unknown")
        }
      end
    end

    context "when updating" do
      it "keeps the persisted sport when kind and id are submitted" do
        training_session = create(:training_session, :cross_training, user: user)
        original_session_id = training_session.id
        original_details_id = training_session.sport_details.id

        described_class.new(
          training_session,
          {
            id: SecureRandom.uuid,
            notes: "Updated",
            sport_details: {
              id: SecureRandom.uuid,
              kind: "running",
              activity: "Rowing",
              distance: 4,
              distance_unit: "km"
            }
          }
        ).save

        training_session.reload
        expect(training_session.id).to eq(original_session_id)
        expect(training_session.sport_details_type).to eq("CrossTrainingSession")
        expect(training_session.sport_details.id).to eq(original_details_id)
        expect(training_session.notes).to eq("Updated")
        expect(training_session.sport_details.activity).to eq("Rowing")
        expect(training_session.sport_details.distance).to eq(4)
        expect(training_session.sport_details.distance_unit).to eq("km")
      end

      it "drops attributes that belong to a different sport" do
        training_session = create(:training_session, user: user)
        original_session_id = training_session.id
        original_details_id = training_session.sport_details.id

        described_class.new(
          training_session,
          {
            sport_details: {
              kind: "cross_training",
              activity: "Yoga",
              distance: 4,
              distance_unit: "mi",
              average_cadence: 180,
              exercises: [ exercise_attributes ]
            }
          }
        ).save

        training_session.reload
        expect(training_session.sport_details_type).to eq("RunningTrainingSession")
        expect(training_session.sport_details.distance).to eq(4)
        expect(training_session.sport_details.average_cadence).to eq(180)
        expect(training_session.sport_details[:activity]).to be_nil
        expect(training_session.sport_details[:exercises]).to be_nil
      end

      it "updates an exercise and the strength session heart rate" do
        training_session = create(:training_session, :strength_training, user: user)
        exercise = training_session.sport_details.exercises.first

        described_class.new(
          training_session,
          {
            sport_details: {
              average_heart_rate: 128,
              exercises: [ exercise_attributes(id: exercise.id, name: "back squat", weight: 205, position: 1) ]
            }
          }
        ).save

        training_session.reload
        expect(training_session.sport_details.average_heart_rate).to eq(128)
        expect(training_session.sport_details.exercises.map(&:name)).to eq([ "back squat" ])
        expect(training_session.sport_details.exercises.map(&:weight)).to eq([ 205 ])
      end

      it "adds an exercise" do
        training_session = create(:training_session, :strength_training, user: user)
        existing = training_session.sport_details.exercises.first

        described_class.new(
          training_session,
          {
            sport_details: { exercises: [
              exercise_attributes(id: existing.id, name: existing.name, position: 1),
              exercise_attributes(name: "deadlift", position: 2)
            ] }
          }
        ).save

        expect(training_session.reload.sport_details.exercises.map(&:name)).to eq([ "squats", "deadlift" ])
      end

      it "removes an exercise omitted from the payload" do
        training_session = create(:training_session, :strength_training, user: user)
        details = training_session.sport_details
        keep = details.exercises.first
        remove = create(:strength_training_exercise, session: details, name: "bench press", position: 2)

        described_class.new(
          training_session,
          {
            sport_details: { exercises: [ exercise_attributes(id: keep.id, name: keep.name, position: 1) ] }
          }
        ).save

        expect(training_session.reload.sport_details.exercises.map(&:id)).to eq([ keep.id ])
        expect(StrengthTrainingExercise.exists?(remove.id)).to be(false)
      end
    end
  end
end
