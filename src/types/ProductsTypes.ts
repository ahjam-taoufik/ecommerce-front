export type TProducts = {
  id?: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
};

export type TLoading = "idle" | "pending" | "succeded" | "failed";

export type TError = string | null;
