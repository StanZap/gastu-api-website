export interface ValidationErrorBag {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface SelectableOption {
  id: string;
  label: string;
}

export interface ParamsFiltersMap {
  limit: string | null;
  page: string | null;
  search: string | null;
  orderBy: string | null;
  orderDirection: string | null;
  [key: string]: string | null;
}
