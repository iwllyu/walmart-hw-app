import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import WalmartApi from "./services/WalmartApi";

let walmartApi;
const mockEvent = { preventDefault: () => {} };
beforeEach(() => {
  walmartApi = new WalmartApi();
});

it("renders without crashing", () => {
  shallow(<App walmartApi={walmartApi} />);
});

it("calls querySearch when submitted", () => {
  const inputQuery = "iPhone X";
  const mockResult = {
    items: ["a, b, c"]
  };
  const promise = Promise.resolve(mockResult);
  const spy = jest.spyOn(walmartApi, "querySearch").mockImplementation(() => {
    return promise;
  });

  const wrapper = shallow(<App walmartApi={walmartApi} />);
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
  const spy = jest.spyOn(walmartApi, "querySearch").mockImplementation(() => {
    return Promise.reject(rejectError);
  });

  const wrapper = shallow(<App walmartApi={walmartApi} />);
  const promise = wrapper.instance().handleSubmit(mockEvent, inputQuery);

  expect.assertions(1);
  return promise.then(() => {
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
    spy.mockRestore();
  });
});

it("should handle and clear selected item", () => {
  const testItem = { name: "testItem" };
  const spy = jest
    .spyOn(walmartApi, "queryProductLookup")
    .mockImplementation(() => {
      return Promise.resolve(testItem);
    });
  const wrapper = shallow(<App walmartApi={walmartApi} />);
  const promise = wrapper.instance().handleSelectItem("12345");

  expect.assertions(2);
  return promise.then(() => {
    expect(wrapper.state().selectedItem).toEqual(testItem);
    wrapper.instance().handleClearSelectedItem();
    expect(wrapper.state().selectedItem).toBeNull();
    spy.mockRestore();
  });
});

it("catches queryProductLookup errors", () => {
  const rejectError = "error";
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();
  const spy = jest
    .spyOn(walmartApi, "queryProductLookup")
    .mockImplementation(() => {
      return Promise.reject(rejectError);
    });
  const wrapper = shallow(<App walmartApi={walmartApi} />);
  const promise = wrapper.instance().handleSelectItem("12345");

  expect.assertions(1);
  return promise.then(() => {
    expect(consoleSpy).toHaveBeenCalled();
    spy.mockRestore();
    consoleSpy.mockRestore();
  });
});
