import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <footer
          class="floating"
        >
          <div
            class="_footer_b16bb0 floating-child"
          >
            <a
              class="_link_b16bb0"
              href="https://github.com/T0nci/"
            >
              <img
                alt="Tonci's GitHub"
                src="/src/assets/github.svg"
              />
              T0nci
            </a>
          </div>
        </footer>
      </div>
    `);
  });
});
