import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import debounce from "lodash.debounce";

import { App } from "components/App";
import { response } from "../constants";

let user: any;

beforeAll(() => {
  user = userEvent.setup();
});

beforeEach(() => {
  (debounce as jest.Mock).mockImplementation((fn) => fn);
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: response });
});

describe("Movinate app", () => {
  test("app renders correctly and initial results are populated", async () => {
    render(<App />);

    const loadingSpinner = screen.getByRole("progressbar");
    expect(loadingSpinner).toBeInTheDocument();

    const resultHeading = await screen.findByRole("heading");
    expect(resultHeading).toHaveTextContent("Results for avengers");
  });

  test("user can nominate upto 5 movies", async () => {
    render(<App />);

    const nominateButtons = await screen.findAllByRole("button", {
      name: "Nominate",
    });

    for (let x = 0; x < 5; x++) {
      await user.click(nominateButtons[x]);
    }

    await user.click(nominateButtons[5]);

    const errorBanner = screen.getByRole("status");
    expect(errorBanner).toHaveTextContent(
      "You cannot nominate more than 5 movies"
    );

    const nominationsTab = await screen.findByTestId("nominations");

    await user.click(nominationsTab);

    const nominationsHeading = await screen.findByRole("heading");
    expect(nominationsHeading).toHaveTextContent("View your 5/5 nominations");
  });

  test("pagination works as expected", async () => {
    render(<App />);

    const navigationArrows = await screen.findAllByRole("navigation");
    await user.click(navigationArrows[1]);

    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      `https://www.omdbapi.com/?apikey=659de411&s=avengers&type=movie&page=2`
    );
  });

  test("entering new search string makes another API call", async () => {
    render(<App />);

    const searchBar = screen.getByPlaceholderText("Search for movies");

    await user.clear(searchBar);
    await user.type(searchBar, "marvel");

    expect(axios.get).toHaveBeenNthCalledWith(
      7,
      `https://www.omdbapi.com/?apikey=659de411&s=marvel&type=movie&page=1`
    );
  });
});
