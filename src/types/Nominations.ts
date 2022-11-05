import { Result } from "types/App";

export interface NominationsProps {
  data: Array<Result>;
  toggleNomination: (movie: Result, remove?: boolean) => void;
  submitNomination: () => void;
}
