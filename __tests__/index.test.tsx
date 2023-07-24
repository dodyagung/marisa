import { render, screen } from "@testing-library/react";
import Home from "../src/app/(beranda)/layout";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Should render welcome text", () => {
    render(<Home />);

    const heading = screen.getByText("Asset Management");

    expect(heading).toBeInTheDocument();
  });
});
