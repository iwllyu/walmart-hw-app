import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import SearchApi from "./services/SearchApi";

let searchApi;
const mockEvent = { preventDefault: () => {} };
beforeEach(() => {
  searchApi = new SearchApi();
});

it("renders without crashing", () => {
  shallow(<App searchApi={searchApi} />);
});

it("calls querySearch when submitted", () => {
  const inputQuery = "iPhone X";
  const mockResult = {
    items: ["a, b, c"]
  };
  const promise = Promise.resolve(mockResult);
  const spy = jest.spyOn(searchApi, "querySearch").mockImplementation(() => {
    return promise;
  });

  const wrapper = shallow(<App searchApi={searchApi} />);
  wrapper.instance().handleSubmit(mockEvent, inputQuery);

  return promise.then(() => {
    expect(wrapper.state().results).toBe(mockResult.items);
    spy.mockRestore();
  });
});

it("catches querySearch errors", () => {
  const inputQuery = "iPhone X";
  const rejectError = "error";
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();
  const spy = jest.spyOn(searchApi, "querySearch").mockImplementation(() => {
    return Promise.reject(rejectError);
  });

  const wrapper = shallow(<App searchApi={searchApi} />);
  const promise = wrapper.instance().handleSubmit(mockEvent, inputQuery);

  expect.assertions(1);
  return promise.then(() => {
    expect(consoleSpy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

it("should handle and clear selected item", () => {
  const testItemId = "12345";
  const wrapper = shallow(<App searchApi={searchApi} />);
  wrapper.instance().handleSelectItem(testItemId);
  expect(wrapper.state().selectedItem).toEqual(testItemId);

  wrapper.instance().clearSelectedItem();
  expect(wrapper.state().selectedItem).toBeNull();
});
