import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
}
