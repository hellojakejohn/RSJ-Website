import React from "react";

export interface HeaderStat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  note?: React.ReactNode;
  stats?: HeaderStat[];
}

const StatBadge = ({ stat }: { stat: HeaderStat }) => (
  <div className="cinematic-theater holographic-border rounded-xl px-2 py-2 lg:px-3 lg:py-3 flex items-center justify-center gap-2 lg:gap-3 min-w-0">
    <stat.icon className={`hidden sm:block w-5 h-5 flex-shrink-0 ${stat.color ?? "text-accent-400"}`} />
    <div className="text-center min-w-0">
      <div className="font-heading text-base lg:text-xl font-bold text-holographic leading-tight">{stat.value}</div>
      <div className="text-white/60 text-[11px] lg:text-xs leading-tight">{stat.label}</div>
    </div>
  </div>
);

// Quieter version for the wide-screen margins: no box, a thin accent rule on
// the side facing the title, and softened until hovered.
const SideStat = ({ stat, side }: { stat: HeaderStat; side: "left" | "right" }) => (
  <div
    className={`flex items-center gap-3 py-1 opacity-70 hover:opacity-100 transition-opacity duration-300 ${
      side === "left"
        ? "flex-row-reverse text-right pr-4 border-r border-accent-400/30"
        : "text-left pl-4 border-l border-accent-400/30"
    }`}
  >
    <stat.icon className={`w-5 h-5 flex-shrink-0 ${stat.color ?? "text-accent-400"}`} />
    <div className="min-w-0">
      <div className="font-heading text-xl font-bold text-holographic leading-tight">{stat.value}</div>
      <div className="text-white/60 text-xs leading-tight">{stat.label}</div>
    </div>
  </div>
);

// Page title with its stat badges: split left/right of the title on wide
// screens (xl), one compact row under it below that.
export const PageHeader = ({ title, subtitle, note, stats = [] }: PageHeaderProps) => {
  const half = Math.ceil(stats.length / 2);
  const left = stats.slice(0, half);
  const right = stats.slice(half);

  return (
    <section className="pt-4 pb-6 xl:pt-6 xl:pb-8">
      <div className="xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:gap-10">
        {left.length > 0 && (
          <div className="hidden xl:flex flex-col gap-4 justify-self-start">
            {left.map((s) => <SideStat key={s.label} stat={s} side="left" />)}
          </div>
        )}

        <div className="text-center min-w-0 xl:col-start-2">
          <h1 className="font-display text-4xl md:text-5xl xl:text-[3.5rem] xl:whitespace-nowrap font-black leading-none tracking-tight mb-3">
            <span className="text-holographic">{title}</span>
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-white/80 font-body max-w-2xl mx-auto">{subtitle}</p>
          )}
          {note && <p className="text-sm text-white/60 font-body mt-1">{note}</p>}
        </div>

        {right.length > 0 && (
          <div className="hidden xl:flex flex-col gap-4 justify-self-end">
            {right.map((s) => <SideStat key={s.label} stat={s} side="right" />)}
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div
          className="grid gap-2 mt-4 xl:hidden max-w-md lg:max-w-xl mx-auto"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((s) => <StatBadge key={s.label} stat={s} />)}
        </div>
      )}
    </section>
  );
};
