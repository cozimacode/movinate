import { Result } from "types/App";

export interface MovieCardProps {
  data: Result;
  isNominated?: boolean;
  isResultCard?: boolean;
  toggleNomination: (movie: Result, isNominated: boolean) => void;
}
