import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "src/types/ProductsTypes";
const { product, productImg } = styles;

const Product = ({ img, title, price }: TProducts) => {
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
