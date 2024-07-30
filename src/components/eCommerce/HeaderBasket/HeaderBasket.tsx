import Logo from "@assets/Cart.svg?react";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hook";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
  styles;

function HeaderBasket() {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  useEffect(() => {
    if (totalQuantity === 0) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 400);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <div className={basketCart}>
        <Logo title="basket icon" />
        <div className={quantityStyle}>{totalQuantity} </div>
      </div>
      <h3>Cart</h3>
    </div>
  );
}

export default HeaderBasket;
