import { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";
import debounce from "lodash.debounce";
import toast, { Toaster } from "react-hot-toast";

import { Header } from "components/Header";
import { Tabs } from "components/Tabs";
import { TabsType, ResultsData, Result, APIResponse } from "types/App";
import loadingSpinner from "assets/loading.gif";

import styles from "styles/App.module.css";

export const App = () => {
  const [searchString, setSearchString] = useState("avengers");
  const [activeTab, setActiveTab] = useState<TabsType>("results");
  const [results, setResults] = useState<ResultsData>({
    results: [],
    searchString: "",
    maxPage: 1,
  });
  const [nominations, setNominations] = useState<Array<Result>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMovies = useCallback(
    async (searchValue: string, pageNumber: number) => {
      try {
        setLoading(true);
        const {
          data: { Search, totalResults, Response, Error },
        }: { data: APIResponse } = await axios.get(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchValue}&type=movie&page=${pageNumber}`
        );

        if (Response === "False") {
          toast.error(Error);
        } else {
          setResults({
            results: Search,
            searchString: searchValue,
            maxPage: totalResults > 10 ? Math.ceil(totalResults / 10) : 1,
          });
        }
      } catch {
        toast.error("An error occurred while fetching results from the API");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const toggleNomination = useCallback(
    (movie: Result, remove?: boolean) => {
      if (remove) {
        setNominations((prev) =>
          prev.filter((result) => result.imdbID !== movie.imdbID)
        );
      } else {
        if (nominations.length === 5) {
          toast.error("You cannot nominate more than 5 movies");
        } else {
          setNominations((prev) => [...prev, movie]);
        }
      }
    },
    [nominations.length]
  );

  const submitNomination = useCallback(() => {
    toast.success("Your nominations were submitted successfully");
    setNominations([]);
  }, []);

  const navigatePage = useCallback(
    (direction: string, resultString: string) => {
      let pageNumber;
      if (direction === "right") {
        pageNumber = page + 1;
      } else {
        pageNumber = page - 1;
      }

      fetchMovies(resultString, pageNumber);
      setPage(pageNumber);
    },
    [page, fetchMovies]
  );

  const debouncedFetch = useRef(debounce(fetchMovies, 1000));

  useEffect(() => {
    if (searchString) {
      debouncedFetch.current(searchString, 1);
      setPage(1);
      setActiveTab("results");
    }
  }, [searchString, debouncedFetch]);

  return (
    <div className={styles.wrapper}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Header searchString={searchString} setSearchString={setSearchString} />
      {loading ? (
        <div role="progressbar" className={styles.loadingSpinner}>
          <img src={loadingSpinner} alt="loading" />
        </div>
      ) : (
        <Tabs
          results={results}
          nominations={nominations}
          toggleNomination={toggleNomination}
          submitNomination={submitNomination}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          page={page}
          navigatePage={navigatePage}
        />
      )}
    </div>
  );
};
