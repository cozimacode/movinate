import { FunctionComponent, memo } from "react";

import { MovieCardProps } from "types/MovieCard";
import { ReactComponent as IMDBLogo } from "assets/imdb.svg";
import defaultImage from "assets/default.jpg";

import styles from "styles/MovieCard.module.css";

export const MovieCard: FunctionComponent<MovieCardProps> = memo(
  ({
    data,
    isNominated = false,
    isResultCard = false,
    toggleNomination,
  }: MovieCardProps) => {
    const { Title, Year, Poster, imdbID } = data;
    const posterImage = Poster !== "N/A" ? Poster : defaultImage;

    return (
      <div className={styles.card}>
        <img src={posterImage} alt={Title} />
        <div className={styles.details}>
          <p title={Title} className={styles.title}>{`${Title} (${Year})`}</p>
          <div className={styles.actions}>
            <IMDBLogo
              onClick={() =>
                window.open(`https://www.imdb.com/title/${imdbID}/`)
              }
            />
            <button
              onClick={() => toggleNomination(data, !isResultCard)}
              disabled={isNominated}
              className={styles.nominateButton}
            >
              {isResultCard
                ? isNominated
                  ? "Nominated"
                  : "Nominate"
                : "Remove"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
