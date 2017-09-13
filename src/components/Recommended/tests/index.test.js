import React from "react";
import { shallow } from "enzyme";
import Recommended from "../";
import { recommendedProducts } from "./mockData";

it("renders null without items", () => {
  let wrapper = shallow(<Recommended />);
  expect(wrapper.getNode()).toBeNull();
});

it("can render items", () => {
  const testValue = "testValue";
  let wrapper = shallow(<Recommended items={recommendedProducts} />);
  expect(wrapper.find(".recommendation-list").children()).toHaveLength(
    recommendedProducts.length
  );
});
