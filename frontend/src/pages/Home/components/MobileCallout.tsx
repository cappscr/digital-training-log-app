import { SectionLabel } from './SectionLabel';

const PhoneEntry = ({ label, entry }: { label: string; entry: string }) => {
  return (
    <div className="bg-white rounded-sm py-1.5 px-2 mb-1 flex items-center gap-1.5 border-l-2 border-l-solid border-l-accent">
      <div>
        <div className="text-[0.5rem] text-ink leading-[1.4]">{label}</div>
        <div className="text-[0.4375rem] mt-0.25 text-ink-faint">{entry}</div>
      </div>
    </div>
  );
};

const PhoneStat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex-1 bg-accent-light rounded-sm py-1.25 px-1 text-center">
      <span className="font-display text-[0.625rem] font-medium text-accent tracking-wider block">
        {value}
      </span>
      <span className="text-[0.375rem] text-ink-faint tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
};

export const MobileCallout = () => {
  return (
    <div className="bg-ink text-white py-20 px-8">
      <div className="max-w-215 my-0 mx-auto grid grid-cols-[1fr,1fr] gap-16 items-center">
        <div>
          <SectionLabel label="Mobile-first" />
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.2] text-white mb-5">
            Log a session
            <br />
            <em className="italic text-accent opacity-90">at the track.</em>
            <br />
            Plan your week
            <br />
            from the couch.
          </h2>
          <p className="text-[0.95rem] font-light text-ink-foreground leading-[1.8]">
            Digital Training Log is built to work as well on your phone as your
            desktop. Your training journal is wherever you are — not tethered to
            a laptop.
          </p>
        </div>
        <div className="phone-wrap">
          <div className="phone">
            <div className="phone-screen">
              <div className="phone-header"></div>
              <div className="phone-week">
                <div className="phone-day">M</div>
                <div className="phone-day">T</div>
                <div className="phone-day">W</div>
                <div className="phone-day">T</div>
                <div className="phone-day">F</div>
                <div className="phone-day">S</div>
                <div className="phone-day">S</div>
              </div>
              <PhoneEntry label="Easy run" entry="8 mi · 62 min · Z2" />
              <PhoneEntry label="Tempo intervals" entry="6 mi · 48 min" />
              <PhoneEntry label="Long run" entry="16 mi · 2 hr 14 min" />
              <div className="flex gap-1 mt-2">
                <PhoneStat label="mi / wk" value="38" />
                <PhoneStat label="mi / mo" value="142" />
                <PhoneStat label="mi / yr" value="1,840" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
