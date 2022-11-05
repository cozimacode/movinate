import "@testing-library/jest-dom";

jest.mock("axios");
jest.mock("lodash.debounce");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
