import { render, cleanup } from "@testing-library/react";

import Hotel from "./Hotel";

afterAll(cleanup);

test("renders hotel", () => {
  const { getByTestId } = render(
    (<Hotel
      hotel={{
        name: "test hotel",
        ratePlan: { price: { current: "$100" } },
      }}
    />)
  );
  const element = getByTestId("hotel-popup");
  expect(element).toBeTruthy();
  expect(element.children.length).toBe(3);
  expect(element.children[0]).toHaveTextContent('test hotel');
  expect(element.children[1]).toHaveTextContent('$100');
  expect(element.children[2]).toHaveProperty('alt','test hotel');
});
