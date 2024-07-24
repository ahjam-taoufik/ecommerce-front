import { TError, TLoading } from "src/types/Types";

type LoadinProps = {
  loading: TLoading;
  error: TError;
  children: React.ReactNode;
};

function Loading({ loading, error, children }: LoadinProps) {
  return (
    <>
      {loading === "pending" && <div>Loading . . . . .</div>}
      {loading === "failed" && <div>{error}</div>}
      {loading === "succeded" && children}
    </>
  );
}

export default Loading;
