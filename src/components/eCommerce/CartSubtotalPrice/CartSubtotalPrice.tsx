import { TProducts } from "src/types/ProductsTypes";
import styles from "./styles.module.css";

type CartSubtotalPriceProps = { products: TProducts[] };

function CartSubtotalPrice({ products }: CartSubtotalPriceProps) {
  const total = products.reduce((acc, product) => {
    const price = product.price;
    const quantity = product.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal :</span>
      <span>{total} Dhs</span>
    </div>
  );
}

export default CartSubtotalPrice;
