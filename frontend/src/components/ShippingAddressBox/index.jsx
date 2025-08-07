import "./styles.css";

const ShippingAddressBox = ({ address }) => {
  return (
    <div className="shipping-address-box">
      <h3>Shipping Address</h3>

      <div className="address-lines">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.postal}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
};

export default ShippingAddressBox;
