import { ResultsData, Result } from "types/App";

export interface ResultsProps {
  data: ResultsData;
  nominatedIds: Array<string>;
  toggleNomination: (movie: Result, remove?: boolean) => void;
  page: number;
  navigatePage: (direction: string, resultString: string) => void;
}
