import React from "react";

type Props = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number | string;
  color?: string;
};

export default function Stat({
  icon: Icon,
  label,
  value,
  color = "from-slate-400 to-slate-500",
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg min-w-[52px] flex items-center justify-center`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-sm opacity-70 truncate">{label}</p>
        <p className="text-3xl font-black truncate">{value}</p>
      </div>
    </div>
  );
}
