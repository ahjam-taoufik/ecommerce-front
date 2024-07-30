export type TProducts = {
  id?: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max: number;
};

export type TLoading = "idle" | "pending" | "succeded" | "failed";

export type TError = string | null;
