import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Should render welcome text", () => {
    render(<Home />);

    const heading = screen.getByText("Get started by editing");

    expect(heading).toBeInTheDocument();
  });
});
