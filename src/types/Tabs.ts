import { Dispatch, SetStateAction } from "react";

import { ResultsData, Result, TabsType } from "types/App";

export interface TabProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<TabsType>>;
  results: ResultsData;
  nominations: Array<Result>;
  toggleNomination: (movie: Result, remove?: boolean) => void;
  submitNomination: () => void;
  page: number;
  navigatePage: (direction: string, resultString: string) => void;
}
