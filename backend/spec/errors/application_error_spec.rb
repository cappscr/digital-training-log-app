require 'rails_helper'

RSpec.describe ApplicationError do
  describe "class-level problem metadata" do
    let(:error_a) do
      Class.new(ApplicationError) do
        problem_type "a"
        problem_title "Error A"
        problem_status 422
      end
    end

    let(:error_b) do
      Class.new(ApplicationError) do
        problem_type "b"
        problem_title "Error B"
        problem_status 404
      end
    end

    it "stores type_uri on the declaring class" do
      expect(error_a.type_uri).to eq("https://api.digitaltraininglog.com/errors/a")
    end

    it "does not bleed between sibling subclasses" do
      expect(error_a.type_uri).not_to eq(error_b.type_uri)
    end

    it "does not affect the parent class" do
      error_a # instantiate
      expect(ApplicationError.type_uri).to be_nil
    end
  end

  describe "#initialize" do
    subject(:error) { described_class.new(detail: "something went wrong") }

    it "sets detail" do
      expect(error.detail).to eq("something went wrong")
    end

    it "exposes detail as the exception message" do
      expect(error.message).to eq("something went wrong")
    end

    it "defaults instance to nil" do
      expect(error.instance).to be_nil
    end

    it "defaults errors to nil" do
      expect(error.errors).to be_nil
    end

    context "when optional attributes are provided" do
      subject(:error) do
        described_class.new(
          detail: "invalid",
          instance: "/logs/123",
          errors: [ { field: "name", message: "is blank" } ]
        )
      end

      it "stores instance" do
        expect(error.instance).to eq("/logs/123")
      end

      it "stores errors" do
        expect(error.errors).to be_an(Array)
      end
    end
  end

  it "is a StandardError" do
    expect(described_class.new(detail: "x")).to be_a(StandardError)
  end
end
