import React from "react";

type StatsCardProps = {
  title: string;
  total: number;
  color?: "green" | "red" | "blue" | "yellow" | "purple";
};

const colorMap = {
  green: "text-green-400 border-green-500/30 bg-green-500/5",
  red: "text-red-400 border-red-500/30 bg-red-500/5",
  blue: "text-sky-400 border-sky-500/30 bg-sky-500/5",
  yellow: "text-yellow-400 border-yellow-500/30 bg-yellow-500/5",
  purple: "text-purple-400 border-purple-500/30 bg-purple-500/5",
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  total,
  color = "blue",
}) => {
  return (
    <div
      className={`rounded-2xl p-5 border backdrop-blur-md transition hover:scale-[1.02] duration-200
      bg-[#0B1120] border-white/10`}
    >
      <p className="text-sm text-gray-400">{title}</p>

      <h1 className={`text-3xl font-bold mt-2 ${colorMap[color].split(" ")[0]}`}>
        {total}
      </h1>

      <div className={`mt-3 h-1 w-full rounded-full ${colorMap[color]}`} />
    </div>
  );
};

export default StatsCard;