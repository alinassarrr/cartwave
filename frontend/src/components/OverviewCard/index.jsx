import "./styles.css";

const OverviewCard = ({ title, value, note, icon }) => {
  return (
    <div className="overview-card">
      <div className="overview-card-header">
        <h4>{title}</h4>
        {icon && <span className="overview-icon">{icon}</span>}
      </div>
      <div className="overview-card-value">{value}</div>
      <div className="overview-card-note">{note}</div>
    </div>
  );
};

export default OverviewCard;
