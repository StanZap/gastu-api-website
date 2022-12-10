import { ParamsFiltersMap } from "../../utils/types";

export const getAllParams = (searchParams) => {
  const params = {} as ParamsFiltersMap;

  if (searchParams.get("limit")) {
    params.limit = searchParams.get("limit");
  }

  if (searchParams.get("page")) {
    params.page = searchParams.get("page");
  }

  if (searchParams.get("search")) {
    params.search = searchParams.get("search");
  }

  if (searchParams.get("orderBy")) {
    params.orderBy = searchParams.get("orderBy");
  }

  if (searchParams.get("orderDirection")) {
    params.orderDirection = searchParams.get("orderDirection");
  }

  if (searchParams.get("amount>")) {
    params["amount>"] = searchParams.get("amount>");
  }

  if (searchParams.get("amount<")) {
    params["search<"] = searchParams.get("amount<");
  }

  if (searchParams.get("amount")) {
    params.amount = searchParams.get("amount");
  }

  if (searchParams.get("type")) {
    params.amount = searchParams.get("type");
  }

  return params;
};
