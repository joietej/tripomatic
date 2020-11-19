import { render, cleanup, waitFor } from "@testing-library/react";

import { RecoilRoot } from "recoil";
import Map from "./Map";

afterAll(cleanup);

test("renders map", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <Map />
    </RecoilRoot>
  );
  const element = getByTestId("map-gl-map");
  expect(element).toBeTruthy();
  expect(element.children.length).toBe(2);
});

test("renders more button on map",() => {
    const { getByTestId } = render(
      <RecoilRoot>
        <Map />
      </RecoilRoot>
    );
    const element = getByTestId("map-more-button");
    expect(element).toHaveTextContent('More');
  });
