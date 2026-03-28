import {
  PieChart,
  Pie,
  Sector,
  type PieSectorShapeProps,
  Label,
  LabelList,
  type LabelProps,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Professional color palette for financial categories
const COLORS = [
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
];

const MyCustomPie = (props: PieSectorShapeProps) => <Sector {...props} />;

const MyCustomLabel = (props: LabelProps) => {
  const labelProp = {
    ...props,
    value: `BDT ${props.value}`,
  };
  return (
    <Label
      {...labelProp}
      fill={COLORS[(labelProp.index ?? 0) % COLORS.length]}
      position="outside"
      offset={20}
    />
  );
};

export const CategoryChart = ({
  categoryData,
}: {
  categoryData: { name: string; value: number }[];
}) => {
  const chartData = useMemo(
    () =>
      categoryData.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      })),
    [categoryData],
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground text-center">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60} // This creates the "Donut" look
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                shape={MyCustomPie}
              >
                <LabelList content={MyCustomLabel} />
              </Pie>
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number") {
                    return `BDT ${value.toLocaleString()}`;
                  }
                  return value;
                }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
