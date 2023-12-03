import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({ classesCount, usersCount, totalEnroll }) => {
  const data = [
    {
      name: "Total User",
      total: usersCount?.totalUser,
    },
    {
      name: "Total Classes",
      total: classesCount?.totalClass,
    },
    {
      name: "Total Enrollment",
      total: totalEnroll,
    },
  ];
  return (
    <>
      <BarChart
        width={600}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
        />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="total"
          fill="#346B8D"
        />
      </BarChart>
    </>
  );
};

export default Chart;
