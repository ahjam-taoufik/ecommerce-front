import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import getProducts from "@store/products/thunk/getProducts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsClenUp } from "@store/products/productsSlice";
import { Loading } from "@components/feedback";
const Products = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector((state) => state.products);

  const cartItems = useAppSelector((state) => state.cart.items);
  const [productsFullInfos, setProductsFullInfos] = useState([]);

  console.log("fires");

  useEffect(() => {
    const productsFullInfos2 = records.map((el) => ({
      ...el,
      quantity: cartItems[el.id] || 0,
    }));
    setProductsFullInfos(productsFullInfos2);
  }, [cartItems, records]);

  // console.log(productsFullInfos);

  useEffect(() => {
    dispatch(getProducts(prefix as string));
    return () => {
      dispatch(productsClenUp());
    };
  }, [dispatch]);

  const ListProducts =
    productsFullInfos.length > 0
      ? productsFullInfos.map((productsFullInfo) => (
          <Col
            key={productsFullInfo.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {/* <Product {...record} /> */}
            <Product {...productsFullInfo} />
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
};

export default Products;
