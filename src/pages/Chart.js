import { useContext } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { UserContext } from "../component/Context";

export const Chart = () => {
  const { data } = useContext(UserContext);

  const arr = Object?.entries(data?.amount ?? {})?.map(([key, value]) => ({
    category: key,
    amount: value,
  }));

  return (
    <div className="chart">
      <ResponsiveContainer width="50%" aspect={2.5}>
        <BarChart data={arr} width={100} height={100}>
          <XAxis dataKey="category" />
          <YAxis />
          <Bar dataKey="amount" barSize={40} fill="#D8BFD8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
