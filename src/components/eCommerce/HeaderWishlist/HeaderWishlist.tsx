import Logo from "@assets/wishlist.svg?react";
import styles from "./styles.module.css";
// import { useAppSelector } from "@store/hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hook";

const { container, totalnum, pumpAnimate, iconWrapper } = styles;

function HeaderWishlist() {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId);

  const quantityStyle = `${totalnum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (totalQuantity === 0) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 400);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <Logo title="basket icon" />
        {totalQuantity.length > 0 && (
          <div className={quantityStyle}>{totalQuantity.length} </div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
}

export default HeaderWishlist;
