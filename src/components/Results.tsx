import { FunctionComponent, memo } from "react";

import cx from "classnames";

import { ResultsProps } from "types/Results";
import { MovieCard } from "./MovieCard";
import { ReactComponent as ArrowLeft } from "assets/arrow-left.svg";

import styles from "styles/Results.module.css";

export const Results: FunctionComponent<ResultsProps> = memo(
  ({
    data: { results, searchString, maxPage },
    nominatedIds,
    toggleNomination,
    page,
    navigatePage,
  }: ResultsProps) => {
    const rightDisabled = page === maxPage;
    const leftDisabled = page === 1;

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>
          Results for <em>{searchString}</em>
        </h3>
        <div className={styles.data}>
          {results?.map((result) => {
            const isNominated = nominatedIds.includes(result.imdbID);
            return (
              <MovieCard
                key={result.imdbID}
                data={result}
                isResultCard
                isNominated={isNominated}
                toggleNomination={toggleNomination}
              />
            );
          })}
        </div>
        <div className={styles.pagination}>
          <ArrowLeft
            role="navigation"
            onClick={() =>
              leftDisabled ? null : navigatePage("left", searchString)
            }
            className={cx({ [styles.paginationDisabled]: leftDisabled })}
          />
          <span>{page}</span>
          <ArrowLeft
            role="navigation"
            onClick={() =>
              rightDisabled ? null : navigatePage("right", searchString)
            }
            className={cx({ [styles.paginationDisabled]: rightDisabled })}
          />
        </div>
      </div>
    );
  }
);
