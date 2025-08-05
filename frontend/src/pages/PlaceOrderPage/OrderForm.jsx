const OrderForm = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="order-form-section">
      <h2>Customer Information</h2>
      <form className="order-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-section">
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label>Street Address *</label>
            <input
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              className={errors.streetAddress ? "error" : ""}
            />
            {errors.streetAddress && (
              <span className="error-message">{errors.streetAddress}</span>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && (
                <span className="error-message">{errors.city}</span>
              )}
            </div>
            <div className="form-group">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="Lebanon">Lebanon</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
