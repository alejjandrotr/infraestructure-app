import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "@testing-library/jest-dom";

describe("Breadcrumb Component", () => {
  it("renders correctly with given page name", () => {
    render(
      <BrowserRouter>
        <Breadcrumb pageName="Test Page" />
      </BrowserRouter>
    );

    const pageNameElements = screen.getAllByText("Test Page");
    expect(pageNameElements.length).toBeGreaterThan(0);

    expect(screen.getByText("Dashboard /")).toBeInTheDocument();
  });
});
