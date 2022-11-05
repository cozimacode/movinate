export type TabsType = "results" | "nominations";

export interface Result {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface APIResponse {
  Search: Array<Result>;
  totalResults: number;
  Response: string;
  Error: string;
}

export interface ResultsData {
  results: Array<Result>;
  searchString: string;
  maxPage: number;
}
