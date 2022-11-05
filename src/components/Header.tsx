import { FunctionComponent, memo } from "react";

import Logo from "assets/movinate.png";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import { HeaderProps } from "types/Header";

import styles from "styles/Header.module.css";

export const Header: FunctionComponent<HeaderProps> = memo(
  ({ searchString, setSearchString }: HeaderProps) => {
    return (
      <div className={styles.header}>
        <img src={Logo} alt="movinate" />
        <div className={styles.searchBar}>
          <SearchIcon />
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search for movies"
          />
        </div>
      </div>
    );
  }
);
