import { useState } from "react";
import "./styles.css";

const Filter = () => {
  const initFilter = { category: "all", sort: "", priceMin: "", priceMax: "" };
  const [filters, setFilters] = useState(initFilter);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter">
      <label>Filter:</label>

      <div className="dropDown">
        <select name="category" value={filters.category} onChange={onChange}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div className="dropDown">
        <select name="sort" value={filters.sort} onChange={onChange}>
          <option value="" disabled>
            Sort
          </option>
          <option value="price-lh">Price Low-High</option>
          <option value="price-hl">Price High-Low</option>
          <option value="date-latest">Latest</option>
        </select>
      </div>

      <div className="dropDown price-range">
        <label>Price Range ($)</label>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={onChange}
          placeholder="Min"
          min="0"
        />
        <span>-</span>
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={onChange}
          placeholder="Max"
          min="0"
        />
      </div>
      <button
        className="clear-filter"
        onClick={(e) => {
          e.preventDefault();
          setFilters(initFilter);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Filter;
