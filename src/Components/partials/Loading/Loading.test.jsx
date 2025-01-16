import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders", () => {
    const { container } = render(<Loading />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_loading_f7ca70"
        >
          <div
            class="_box_f7ca70"
          >
            <div
              class="_dot_f7ca70"
            />
            <div
              class="_dot_f7ca70"
            />
            <div
              class="_dot_f7ca70"
            />
            <div
              class="_dot_f7ca70"
            />
          </div>
          Loading
        </div>
      </div>
    `);
  });
});
