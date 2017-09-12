import React from "react";
import { shallow } from "enzyme";
import Header from "./";

it("renders without crashing", () => {
  shallow(<Header onSubmit={jest.fn()} />);
});

it("takes query input", () => {
  const testValue = "testValue";
  let wrapper = shallow(<Header onSubmit={jest.fn()} />);
  wrapper.find("#SearchInput").simulate("change", {
    target: {
      value: testValue
    }
  });

  expect(wrapper.state().query).toBe(testValue);
});

it("calls the prop onSubmit when submitted", () => {
  const testValue = "testValue";
  let submitSpy = jest.fn();
  let wrapper = shallow(<Header onSubmit={submitSpy} />);
  wrapper.setState({ query: testValue });
  wrapper.find(".query-form").simulate("submit");

  expect(submitSpy.mock.calls[0][1]).toEqual(testValue);
});
