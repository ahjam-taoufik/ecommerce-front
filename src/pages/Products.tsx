import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import getProducts from "@store/products/thunk/getProducts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsClenUp } from "@store/products/productsSlice";
import { Loading } from "@components/feedback";
const Products = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts(prefix as string));

    return () => {
      dispatch(productsClenUp());
    };
  }, [dispatch]);

  const ListProducts =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
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
};

export default Products;
