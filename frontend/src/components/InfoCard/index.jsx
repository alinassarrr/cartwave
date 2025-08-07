import OrderStatusStamp from "../OrderStatusStamp";
import "./styles.css";

const InfoCard = ({ icon, title, subtitle, amount, status }) => {
  return (
    <div className="info-card">
      <div className="info-left">
        {icon && (
          <div className="info-icon">
            <img src={icon} alt="icon" />
          </div>
        )}
        <div className="info-text">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
      </div>

      <div className="info-right">
        <span>{amount}</span>

        {status && <OrderStatusStamp status={status} />}
      </div>
    </div>
  );
};

export default InfoCard;
