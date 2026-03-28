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

const PhoneDay = ({ day }: { day: string }) => {
  return (
    <div className="text-center text-[0.4375rem] text-ink-faint pb-0.75">
      {day}
    </div>
  );
};

export const MobileCallout = () => {
  return (
    <div className="bg-ink text-white py-20 px-8">
      <div className="max-w-215 my-0 mx-auto grid grid-cols-2 gap-16 items-center">
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
          <p className="text-base/[1.8] font-light text-ink-foreground">
            Digital Training Log is built to work as well on your phone as your
            desktop. Your training journal is wherever you are — not tethered to
            a laptop.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-[180px] bg-[#2A2820] rounded-3xl p-3 border-2 border-solid border-[rgba(255,255,255,0.1)]">
            <div className="w-[60px] h-[8px] bg-[#1A1814] rounded-xs mx-auto mt-0 mb-2.5"></div>
            <div className="bg-cream rounded-md py-3.5 px-3 min-h-[280px]">
              <div className="font-body text-[0.5625rem] font-medium text-ink-faint tracking-widest uppercase mb-2.5">
                Your Training Log
              </div>
              <div className="grid grid-cols-[repeat(7,1fr)] gap-0.5 mb-2.5">
                <PhoneDay day="M" />
                <PhoneDay day="T" />
                <PhoneDay day="W" />
                <PhoneDay day="T" />
                <PhoneDay day="F" />
                <PhoneDay day="S" />
                <PhoneDay day="S" />
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
