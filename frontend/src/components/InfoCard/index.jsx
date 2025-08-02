import OrderStatusStamp from "../OrderStatusStamp";
import "./styles.css";

const InfoCard = ({ title, subtitle, amount, status }) => {
  return (
    <div className="info-card">
      <div className="info-left">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>

      <div className="info-right">
        <span>{amount}</span>

        {status && <OrderStatusStamp status={status} />}
      </div>
    </div>
  );
};

export default InfoCard;
