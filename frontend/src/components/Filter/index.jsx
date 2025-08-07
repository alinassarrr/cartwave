// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import {
  selectFilters,
  setFilters,
  clearFilters,
} from "../../store/products/slice";
import "./styles.css";

const Filter = () => {
  // const initFilter = { category: "all", sort: "", priceMin: "", priceMax: "" };
  // const [filters, setFilters] = useState(initFilter);
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilters);
  const [localSearch, setLocalSearch] = useState(currentFilters.search || "");
  const [localPriceMin, setLocalPriceMin] = useState(
    currentFilters.min_price || ""
  );
  const [localPriceMax, setLocalPriceMax] = useState(
    currentFilters.max_price || ""
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearch !== currentFilters.search) {
        dispatch(setFilters({ search: localSearch }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearch, dispatch, currentFilters.search]);

  const onChange = (e) => {
    const { name, value } = e.target;
    // setFilters((prev) => ({ ...prev, [name]: value }));

    if (name === "search") {
      setLocalSearch(value);
      return;
    }

    if (name === "priceMin") {
      setLocalPriceMin(value);
      return;
    }

    if (name === "priceMax") {
      setLocalPriceMax(value);
      return;
    }
    const filterMap = {
      category: "category_id",
      sort: "sort_by",
    };

    const backendFilterName = filterMap[name] || name;
    const filterValue = value === "all" ? "" : value;

    dispatch(setFilters({ [backendFilterName]: filterValue }));
  };

  return (
    <section className="filter">
      <label>Filter:</label>

      <div className="search-box">
        <input
          type="text"
          name="search"
          value={localSearch}
          onChange={onChange}
          placeholder="Search products..."
        />
      </div>

      <div className="dropDown">
        <select
          name="category"
          value={currentFilters.category_id || "all"}
          onChange={onChange}
        >
          <option value="all">All Categories</option>
          {/* <option value="electronics">Electronics</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option> */}
          <option value="1">Electronics</option>
          <option value="2">Beauty</option>
          <option value="3">Sports</option>
        </select>
      </div>

      <div className="dropDown">
        <select
          name="sort"
          value={currentFilters.sort_by || ""}
          onChange={onChange}
        >
          <option value="" disabled>
            Sort
          </option>
          {/* <option value="price-lh">Price Low-High</option>
          <option value="price-hl">Price High-Low</option>
          <option value="date-latest">Latest</option> */}
          <option value="price">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
          <option value="name">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      <div className="dropDown price-range">
        <label>Price Range ($)</label>
        <input
          type="number"
          name="priceMin"
          value={localPriceMin}
          onChange={onChange}
          placeholder="Min"
          min="0"
        />
        <span>-</span>
        <input
          type="number"
          name="priceMax"
          value={localPriceMax}
          onChange={onChange}
          placeholder="Max"
          min="0"
        />
        <button
          className="apply-filters"
          onClick={() => {
            dispatch(
              setFilters({
                min_price: localPriceMin,
                max_price: localPriceMax,
              })
            );
          }}
        >
          Apply
        </button>
      </div>
      <button
        className="clear-filter"
        onClick={(e) => {
          e.preventDefault();
          // setFilters(initFilter);
          dispatch(clearFilters());
          setLocalSearch("");
          setLocalPriceMin("");
          setLocalPriceMax("");
        }}
      >
        Clear
      </button>
    </section>
  );
};

export default Filter;
