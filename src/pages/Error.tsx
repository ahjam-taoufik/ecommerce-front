import { Container } from "react-bootstrap";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Pagee Not Found";
  }

  return (
    <Container className="notFound">
      <h1>{errorStatus}</h1>
      <h1>{errorStatusText}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* replace : delete this component from history */}
      <Link to="/" replace={true}>
        back to Home Page
      </Link>
    </Container>
  );
}

export default Error;
