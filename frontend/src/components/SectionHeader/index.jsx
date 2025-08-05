import "./styles.css";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
