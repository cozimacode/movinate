import { FunctionComponent, memo } from "react";

import cx from "classnames";

import { TabProps } from "types/Tabs";
import { Results } from "./Results";
import { Nominations } from "./Nominations";

import styles from "styles/Tabs.module.css";

export const Tabs: FunctionComponent<TabProps> = memo(
  ({
    activeTab,
    setActiveTab,
    results,
    nominations,
    toggleNomination,
    submitNomination,
    page,
    navigatePage,
  }: TabProps) => {
    const nominatedIds: Array<string> = nominations.map(
      (result) => result.imdbID
    );

    return (
      <div className={styles.tabsPane}>
        <div className={styles.tabHeader}>
          <div
            data-testid="results"
            onClick={() => setActiveTab("results")}
            className={cx(styles.resultsTab, {
              [styles.activeTab]: activeTab === "results",
            })}
          >
            Results
          </div>
          <div
            data-testid="nominations"
            onClick={() => setActiveTab("nominations")}
            className={cx(styles.nominationsTab, {
              [styles.activeTab]: activeTab === "nominations",
            })}
          >
            Nominations
          </div>
        </div>
        {activeTab === "results" ? (
          <Results
            data={results}
            nominatedIds={nominatedIds}
            toggleNomination={toggleNomination}
            page={page}
            navigatePage={navigatePage}
          />
        ) : (
          <Nominations
            data={nominations}
            toggleNomination={toggleNomination}
            submitNomination={submitNomination}
          />
        )}
      </div>
    );
  }
);
