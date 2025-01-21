import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TableList from "./TableList";

describe("MapInfo Component", () => {
  it("renders", () => {
    const { container } = render(
      <TableList
        users={[
          {
            id: 2,
            num: 1,
            username: "Test User 2",
            totalTimeInSeconds: "5.678",
          },
          {
            id: 3,
            num: 2,
            username: "Test User 3",
            totalTimeInSeconds: "7.083",
          },
          {
            id: 1,
            num: 3,
            username: "Test User 1",
            totalTimeInSeconds: "10.009",
          },
        ]}
        map={"Test Map 1"}
      />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <table
          class="_table_d61b1a"
        >
          <caption
            class="_caption_d61b1a"
          >
            Leaderboard for 
            Test Map 1
          </caption>
          <thead>
            <tr>
              <th
                class="_th_d61b1a"
              >
                Ranking
              </th>
              <th
                class="_th_d61b1a"
              >
                Name
              </th>
              <th
                class="_th_d61b1a"
              >
                Total time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="_row_d61b1a"
            >
              <td
                class="_td_d61b1a"
              >
                1
              </td>
              <td
                class="_td_d61b1a"
              >
                Test User 2
              </td>
              <td
                class="_td_d61b1a"
              >
                5.678
                s
              </td>
            </tr>
            <tr
              class="_row_d61b1a"
            >
              <td
                class="_td_d61b1a"
              >
                2
              </td>
              <td
                class="_td_d61b1a"
              >
                Test User 3
              </td>
              <td
                class="_td_d61b1a"
              >
                7.083
                s
              </td>
            </tr>
            <tr
              class="_row_d61b1a"
            >
              <td
                class="_td_d61b1a"
              >
                3
              </td>
              <td
                class="_td_d61b1a"
              >
                Test User 1
              </td>
              <td
                class="_td_d61b1a"
              >
                10.009
                s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
  });
});
