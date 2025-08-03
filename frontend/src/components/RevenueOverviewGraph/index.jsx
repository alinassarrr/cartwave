import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";

const RevenueOverviewGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("api")
    // .then((res) => res.json())
    // .then((data) => setData(data))
    // .catch((err) => console.error("api error", err));

    setData([
      { day: "Mon", revenue: 2400 },
      { day: "Tue", revenue: 1800 },
      { day: "Wed", revenue: 1200 },
      { day: "Thu", revenue: 2200 },
      { day: "Fri", revenue: 1000 },
      { day: "Sat", revenue: 1400 },
      { day: "Sun", revenue: 3400 },
    ]);
  }, []);

  return (
    <div className="graph-card">
      <h4>Revenue Overview</h4>
      <p className="graph-subtitle">Daily revenue for the last 7 days</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="black"
            strokeWidth={3}
            activeDota={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueOverviewGraph;
