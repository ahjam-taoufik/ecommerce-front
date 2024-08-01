import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import getGategories from "@store/categories/thunk/getGategories";
import { Loading } from "@components/feedback";
import { cleanUpCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getGategories());

    return () => {
      dispatch(cleanUpCategories());
    };
  }, [dispatch]);

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
      <Loading loading={loading} error={error}>
        <Row>{ListCategories}</Row>
      </Loading>
    </Container>
  );
};

export default Categories;
