import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyData {
  monthlyData: { month: string; income: number; expense: number }[];
}

export const MonthlyComparisonChart = ({ monthlyData }: MonthlyData) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Spending Trend (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 10, left: 12, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                width={72}
                tickFormatter={(value) =>
                  typeof value === "number"
                    ? value.toLocaleString()
                    : String(value)
                }
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) =>
                  typeof value === "number"
                    ? `BDT ${value.toLocaleString()}`
                    : value
                }
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
