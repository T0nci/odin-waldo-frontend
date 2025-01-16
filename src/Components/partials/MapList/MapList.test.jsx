import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapList from "./MapList";

const maps = [
  {
    id: 1,
    name: "Test Map 1",
    url: "Test URL 1",
    characters: 2,
  },
  {
    id: 2,
    name: "Test Map 2",
    url: "Test URL 2",
    characters: 1,
  },
];

describe("MapList Component", () => {
  it("renders", () => {
    const { container } = render(
      <MapList maps={maps} handleClick={() => {}} selected={null} />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul
          class="_maps_858d5c"
        >
          <li
            class="_map_858d5c"
          >
            <p
              class="_name_858d5c"
            >
              Test Map 1
            </p>
            <img
              alt="Test Map 1 map"
              class="_image_858d5c"
              src="Test URL 1"
            />
            <p>
              Characters to guess: 
              2
            </p>
            <button
              class="_select_858d5c"
            >
              Select
            </button>
          </li>
          <li
            class="_map_858d5c"
          >
            <p
              class="_name_858d5c"
            >
              Test Map 2
            </p>
            <img
              alt="Test Map 2 map"
              class="_image_858d5c"
              src="Test URL 2"
            />
            <p>
              Characters to guess: 
              1
            </p>
            <button
              class="_select_858d5c"
            >
              Select
            </button>
          </li>
        </ul>
      </div>
    `);
  });

  it("renders a selected map from maps correctly"),
    () => {
      render(<MapList maps={maps} handleClick={() => {}} selected={1} />);

      expect(
        screen.getByRole("button", { name: "Selected" }),
      ).toBeInTheDocument();
    };

  it("selects a map correctly", async () => {
    const handleClick = vi.fn();

    render(<MapList maps={maps} handleClick={handleClick} selected={null} />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: "Select" })[0]);

    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
