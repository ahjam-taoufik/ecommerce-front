import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "src/types/ProductsTypes";
import { useAppDispatch } from "@store/hook";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState } from "react";
const { product, productImg } = styles;

const Product = ({ img, title, price, id }: TProducts) => {
  const dispatch = useAppDispatch();
  const [isBtnClicked, setIsBtnClicked] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (isBtnClicked > 0) {
      setIsBtnDisabled(true);

      const debounse = setTimeout(() => {
        setIsBtnDisabled(false);
        setIsBtnClicked(0);
      }, 600);

      return () => setTimeout(debounse);
    }
  }, [isBtnClicked]);

  const addActionHandler = () => {
    dispatch(addToCart(id));
    setIsBtnClicked((prev) => prev + 1);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addActionHandler}
        disabled={isBtnDisabled}
      >
        {isBtnClicked > 0 ? (
          <>
            <Spinner animation="border" size="sm" />
            Loading...
          </>
        ) : (
          " Add to cart"
        )}
      </Button>
    </div>
  );
};

export default Product;
