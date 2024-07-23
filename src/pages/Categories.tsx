import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import getGategories from "@store/categories/thunk/getGategories";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (records.length === 0) {
      dispatch(getGategories());
    }
  }, [dispatch, records]);

  const ListCategories =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category {...record} />
          </Col>
        ))
      : "no data found";

  return (
    <Container>
      <Row>{loading === "pending" ? "loading..." : ListCategories}</Row>
    </Container>
  );
};

export default Categories;
