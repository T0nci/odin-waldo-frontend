/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import Name from "./Name";

global.fetch = vi.fn();

const PlaceHolder = () => {};
const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/name",
        element: <Name />,
      },
      {
        path: "/",
        element: <PlaceHolder />,
      },
    ],
    { initialEntries: ["/name"], initialIndex: 0 },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("Name Component", () => {
  it("renders", async () => {
    const json = () =>
      Promise.resolve({ totalTimeInSeconds: 1, map: "Test Map 1" });
    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <form
          class="_form_6516fb"
        >
          <h1
            class="_heading_6516fb"
          >
            Congratulations!
          </h1>
          <p
            class="_info_6516fb"
          >
            Your time on 
            <span
              class="_highlight_6516fb"
            >
              Test Map 1
            </span>
             
            is
             
            <span
              class="_highlight_6516fb"
            >
              1
               seconds.
            </span>
          </p>
          <div
            class="_field_6516fb"
          >
            <label
              class="_label_6516fb"
              for="name"
            >
              Name:
            </label>
            <input
              autocomplete="on"
              class="_input_6516fb"
              id="name"
              maxlength="30"
              minlength="1"
              name="name"
              required=""
              type="text"
              value=""
            />
          </div>
          <div>
            <button
              class="_submit_6516fb"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    `);
  });

  it("renders with error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Test Error"));

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_error_c84a52"
        >
          Error: Test Error
        </p>
      </div>
    `);
  });

  it("redirects to home when cookie is invalid", async () => {
    const json = () => Promise.resolve({ error: "Test Error" }); // any token error
    global.fetch.mockResolvedValueOnce({ json });

    let router = null;
    await act(() => {
      const { router: temp } = setupRouter();
      router = temp;
    });

    expect(router.state.location.pathname).toBe("/");
  });

  it("shows response error when sending a name request", async () => {
    const json = vi.fn();
    json.mockResolvedValueOnce({ totalTimeInSeconds: 1, map: "Test Map 1" });
    json.mockResolvedValueOnce({ error: "Test Error" });
    global.fetch.mockResolvedValueOnce({ json });
    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Name:"), "test");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_error_c84a52"
        >
          Test Error
        </p>
        <form
          class="_form_6516fb"
        >
          <h1
            class="_heading_6516fb"
          >
            Congratulations!
          </h1>
          <p
            class="_info_6516fb"
          >
            Your time on 
            <span
              class="_highlight_6516fb"
            >
              Test Map 1
            </span>
             
            is
             
            <span
              class="_highlight_6516fb"
            >
              1
               seconds.
            </span>
          </p>
          <div
            class="_field_6516fb"
          >
            <label
              class="_label_6516fb"
              for="name"
            >
              Name:
            </label>
            <input
              autocomplete="on"
              class="_input_6516fb"
              id="name"
              maxlength="30"
              minlength="1"
              name="name"
              required=""
              type="text"
              value="test"
            />
          </div>
          <div>
            <button
              class="_submit_6516fb"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    `);
  });

  it("redirects to home when name is updated", async () => {
    const json = vi.fn();
    json.mockResolvedValueOnce({ totalTimeInSeconds: 1, map: "Test Map 1" });
    json.mockResolvedValueOnce({ result: "Name updated" });
    global.fetch.mockResolvedValueOnce({ json });
    global.fetch.mockResolvedValueOnce({ json });

    let router = null;
    await act(() => {
      const { router: temp } = setupRouter();
      router = temp;
    });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Name:"), "test");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(router.state.location.pathname).toBe("/");
  });
});
