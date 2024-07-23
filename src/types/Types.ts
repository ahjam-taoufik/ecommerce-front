export type TCategories = {
  id?: number;
  title: string;
  prefix: string;
  img: string;
};

export type TLoading = "idle" | "pending" | "succeded" | "failed";

export type TError = string | null;
