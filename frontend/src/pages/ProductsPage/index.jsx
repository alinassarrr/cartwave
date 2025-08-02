import "./styles.css";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

const ProductsPage = () => {
  return (
    <div className="container products">
      <section className="filter">
        <Filter />
      </section>
      <section className="items-list">
        <ItemCard img={"public/img/itemcard/items.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
        <ItemCard img={"public/img/itemcard/items.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
        <ItemCard img={"public/img/itemcard/items2.png"} />
      </section>
      <div className="pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default ProductsPage;
