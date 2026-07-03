import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useQuery } from "@tanstack/react-query";
import { revenueOverviewApi } from "./boostedListingApi";

// Types
type ApiItem = {
    month: string;
    totalRevenue: number;
};

type ChartRefType = {
    chart: am5xy.XYChart;
    xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;
    series: am5xy.SmoothedXLineSeries;
};

export const Statics = () => {
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const chartRef = useRef<ChartRefType | null>(null);

    // API CALL
    const { data } = useQuery<ApiItem[]>({
        queryKey: ["revenue", year],
        queryFn: () => revenueOverviewApi(year),
    });

    // normalize
    const chartData = useMemo(() => {
        if (!data) return [];

        return data.map((item) => ({
            month: item.month,
            value: item.totalRevenue,
        }));
    }, [data]);

    // CREATE CHART ONLY ONCE
    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        if (root._logo) root._logo.dispose();

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingRight: 20,
            })
        );

        // X AXIS
        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "month",
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 30,
                }),
            })
        );

        // LABEL STYLE (IMPORTANT)
        xAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0x94a3b8),
            fontSize: 12,
        });

        xAxis.get("renderer").grid.template.setAll({
            strokeOpacity: 0.1,
            strokeDasharray: [3],
        });

        // Y AXIS
        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        yAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0x94a3b8),
            fontSize: 12,
        });

        yAxis.get("renderer").grid.template.setAll({
            strokeOpacity: 0.1,
            strokeDasharray: [3],
        });

        // SERIES
        const series = chart.series.push(
            am5xy.SmoothedXLineSeries.new(root, {
                name: "Revenue",
                xAxis,
                yAxis,
                valueYField: "value",
                categoryXField: "month",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{categoryX}: {valueY}",
                }),
            })
        );

        // LINE STYLE
        series.strokes.template.setAll({
            strokeWidth: 3,
            shadowBlur: 15,
            shadowOpacity: 0.3,
        });

        // DOTS
        series.bullets.push(() =>
            am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: am5.color(0x22d3ee),
                    stroke: am5.color(0xffffff),
                    strokeWidth: 2,
                }),
            })
        );

        chartRef.current = { chart, xAxis, series };

        return () => {
            root.dispose();
        };
    }, []);

    // UPDATE DATA
    useEffect(() => {
        if (!chartRef.current) return;

        const { xAxis, series } = chartRef.current;

        // 🔥 IMPORTANT: sync data properly
        xAxis.data.setAll(chartData);
        series.data.setAll(chartData);
    }, [chartData]);

    return (
        <div className="p-6 bg-[#0f172a] rounded-2xl border border-white/10">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">
                    Revenue Overview
                </h2>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="bg-[#020617] text-white px-3 py-2 rounded-lg border border-white/10"
                >
                    {[2023, 2024, 2025, 2026].map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {/* CHART */}
            <div id="chartdiv" className="h-95 w-full" />
        </div>
    );
};