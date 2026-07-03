import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { userGrowth } from "./dashboar";




export default function UserGrowthChart() {

  const [filter, setFilter] = useState<"monthly" | "weekly">("monthly");

  const { data:chartData } = useQuery({
    queryKey: ['user-growth',filter],
    queryFn: () => userGrowth(filter)
  })


  return (
    <div className="bg-gray-950 rounded-2xl border  p-4 sm:p-6 shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            User Growth
          </h2>
          <p className="text-sm text-white">
            Track monthly and weekly growth
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center bg-gray-200 rounded-xl p-1 w-fit">
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "monthly"
              ? "bg-blue-950 text-white shadow "
              : "text-gray-500"
              }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setFilter("weekly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "weekly"
              ? "bg-blue-950 text-white"
              : "text-gray-500"
              }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-75 sm:h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="growthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#growthGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}