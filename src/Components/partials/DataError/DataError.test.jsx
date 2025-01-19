import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import DataError from "./DataError";

describe("DataError component", () => {
  it("renders", () => {
    const { container } = render(<DataError error="Test Error" />);

    expect(container).toMatchInlineSnapshot(
      
    `
      <div>
        <p
          class="_error_c84a52"
        >
          Test Error
        </p>
      </div>
    `);
  });
});