import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetWichlist,
  productWishlistFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Wishlist() {
  const dispatch = useAppDispatch();

  const { loading, error, productFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWichlist());

    return () => {
      dispatch(productWishlistFullInfoCleanUp());
    };
  }, [dispatch]);

  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }));

  const ListProducts =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {/* <Product {...record} /> */}
            <Product {...record} />
          </Col>
        ))
      : "no data found";

  return (
    <Container>
      <Loading loading={loading} error={error}>
        <Row>{ListProducts}</Row>
      </Loading>
    </Container>
  );
}

export default Wishlist;
