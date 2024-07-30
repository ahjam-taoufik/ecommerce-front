import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "src/types/ProductsTypes";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemProps = TProducts & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
const CartItem = ({
  id,
  img,
  title,
  price,
  max,
  quantity,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemProps) => {
  const renderQuantity = Array(max)
    .fill(0)
    .map((_, index) => {
      const compte = ++index;
      return (
        <option key={compte} value={compte}>
          {compte}
        </option>
      );
    });

  const QuantityHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    quantity = +event.target.value;
    changeQuantityHandler(id, quantity);
  };

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title} </h2>
          <h3>{price.toFixed(2)} Dhs</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select
          value={quantity}
          onChange={(event) => {
            QuantityHandler(event);
          }}
        >
          {renderQuantity}
        </Form.Select>
      </div>
    </div>
  );
};

export default memo(CartItem);
