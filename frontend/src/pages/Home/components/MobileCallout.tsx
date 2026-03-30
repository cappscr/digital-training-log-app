import { SectionLabel } from './SectionLabel';

const PhoneEntry = ({ label, entry }: { label: string; entry: string }) => {
  return (
    <div className="border-l-solid border-l-primary mb-1 flex items-center gap-1.5 rounded-sm border-l-2 bg-white px-2 py-1.5">
      <div>
        <div className="text-ink text-[0.5rem] leading-[1.4]">{label}</div>
        <div className="text-muted-foreground mt-0.25 text-[0.4375rem]">
          {entry}
        </div>
      </div>
    </div>
  );
};

const PhoneStat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-muted flex-1 rounded-sm px-1 py-1.25 text-center">
      <span className="font-display text-primary block text-[0.625rem] font-medium tracking-wider">
        {value}
      </span>
      <span className="text-muted-foreground text-[0.375rem] tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
};

const PhoneDay = ({ day }: { day: string }) => {
  return (
    <div className="text-muted-foreground pb-0.75 text-center text-[0.4375rem]">
      {day}
    </div>
  );
};

export const MobileCallout = () => {
  return (
    <div className="bg-ink px-8 py-20 text-white">
      <div className="mx-auto my-0 grid max-w-215 grid-cols-2 items-center gap-16">
        <div>
          <SectionLabel label="Mobile-first" />
          <h2 className="font-display text-emphasis-heading mb-5 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.2]">
            Log a session
            <br />
            <em className="text-primary italic opacity-90">at the track.</em>
            <br />
            Plan your week
            <br />
            from the couch.
          </h2>
          <p className="text-emphasis-foreground text-base/[1.8] font-light">
            Digital Training Log is built to work as well on your phone as your
            desktop. Your training journal is wherever you are — not tethered to
            a laptop.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-[180px] rounded-3xl border-2 border-solid border-[rgba(255,255,255,0.1)] bg-[#2A2820] p-3">
            <div className="mx-auto mt-0 mb-2.5 h-[8px] w-[60px] rounded-xs bg-[#1A1814]"></div>
            <div className="bg-cream min-h-[280px] rounded-md px-3 py-3.5">
              <div className="font-body text-muted-foreground mb-2.5 text-[0.5625rem] font-medium tracking-widest uppercase">
                Your Training Log
              </div>
              <div className="mb-2.5 grid grid-cols-[repeat(7,1fr)] gap-0.5">
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
              <div className="mt-2 flex gap-1">
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
