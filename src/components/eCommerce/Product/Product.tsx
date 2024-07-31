import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "src/types/ProductsTypes";
import { useAppDispatch } from "@store/hook";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/like.svg?react";
import LikeFill from "@assets/like-fill.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = ({
  img,
  title,
  price,
  id,
  quantity,
  max,
  isLiked,
}: TProducts) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // nullish coalescing(??) operator will only give the result as the right operand
  // only if the left operand is either null or undefined.
  const currentRemingQuantity = max - (quantity ?? 0);

  const reachMax = currentRemingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounse = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 600);

    return () => setTimeout(debounse);
  }, [isBtnDisabled]);

  const addActionHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const likeToggleHandler = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    dispatch(actLikeToggle(id))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <div className={product}>
      <div className={wishlistBtn} onClick={() => likeToggleHandler()}>
        {isLoading ? (
          <Spinner animation="border" size="sm" variant="info" />
        ) : isLiked ? (
          <LikeFill />
        ) : (
          <Like />
        )}
      </div>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)}</h3>
      <p className={maximumNotice}>
        {reachMax
          ? "You rach to the limit"
          : `You can add only ${currentRemingQuantity} items`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addActionHandler}
        disabled={isBtnDisabled || reachMax}
      >
        {isBtnDisabled ? (
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

export default memo(Product);
