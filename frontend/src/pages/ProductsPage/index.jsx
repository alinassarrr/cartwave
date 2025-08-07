import "./styles.css";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsThunk,
  selectProducts,
  selectPagination,
  selectFilters,
  selectProductsError,
  selectProductsLoading,
} from "../../store/products/slice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    const params = {
      page: pagination.currentPage,
      per_page: pagination.itemsPerPage,
      ...filters,
    };
    //   // dispatch(fetchProductsThunk(params));
    //   fetchProducts(params);
    // }, [
    //   // dispatch,
    //   fetchProducts,
    //   pagination.currentPage,
    //   filters.search,
    //   filters.category_id,
    //   filters.sort_by,
    //   filters.min_price,
    //   filters.max_price,
    // ]);
    console.log("ProductsPage: Fetching products with params:", params);
    dispatch(fetchProductsThunk(params));
    // }, [
    //   dispatch,
    //   pagination.currentPage,
    //   pagination.itemsPerPage,
    //   filters.search,
    //   filters.category_id,
    //   filters.sort_by,
    //   filters.min_price,
    //   filters.max_price,
    // ]);
  }, [
    dispatch,
    pagination.currentPage,
    pagination.itemsPerPage,
    filters.search,
    filters.category_id,
    filters.sort_by,
    filters.min_price,
    filters.max_price,
  ]);
  const productsList = useMemo(() => {
    return products.map((product) => (
      <ItemCard
        key={product.id}
        id={product.id}
        img={product.image_url || "/img/itemcard/items.png"}
        title={product.name}
        description={product.description}
        price={product.price}
        variants={product.variants}
      />
    ));
  }, [products]);

  // if (loading)
  if (loading) {
    return (
      <div className="container cart-page">
        <div className="empty">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container cart-page">
        <div className="empty">
          <h2>Error loading products</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container cart-page">
        <div className="empty">
          <h2>No products yet to show</h2>
          <p>Try visiting this page later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container products">
      <Filter />
      <section className="items-list">{productsList}</section>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
