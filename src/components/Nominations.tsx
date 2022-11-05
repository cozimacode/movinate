import { FunctionComponent, memo } from "react";

import { NominationsProps } from "types/Nominations";
import { MovieCard } from "./MovieCard";

import styles from "styles/Results.module.css";

export const Nominations: FunctionComponent<NominationsProps> = memo(
  ({ data, toggleNomination, submitNomination }: NominationsProps) => {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>
          View your {data.length}/5 nominations
        </h3>
        <div className={styles.data}>
          {data?.map((result) => {
            return (
              <MovieCard
                key={result.imdbID}
                data={result}
                toggleNomination={toggleNomination}
              />
            );
          })}
        </div>
        <button
          className={styles.submitNomination}
          disabled={data.length < 5}
          onClick={submitNomination}
        >
          Submit Nominations
        </button>
      </div>
    );
  }
);
