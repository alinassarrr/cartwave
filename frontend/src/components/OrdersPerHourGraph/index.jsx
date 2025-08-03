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

const OrdersPerHourGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    /*
    fetch("api")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("api error:", err));
    */

    //mock data
    setData([
      { hour: "00:00", orders: 1 },
      { hour: "03:00", orders: 2 },
      { hour: "06:00", orders: 5 },
      { hour: "09:00", orders: 14 },
      { hour: "12:00", orders: 28 },
      { hour: "15:00", orders: 20 },
      { hour: "18:00", orders: 13 },
      { hour: "21:00", orders: 6 },
    ]);
  }, []);

  return (
    <div className="graph-card">
      <h4>Orders Per Hour</h4>
      <p className="graph-subtitle">Today’s order distribution</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#10B981"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersPerHourGraph;
