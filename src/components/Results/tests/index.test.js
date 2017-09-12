import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Results from "../";
import {
  singleResult,
  singleResultRef,
  multipleIpodResults,
  multipleIpodResultsRef
} from "./mockData";

it("renders without crashing", () => {
  shallow(<Results results={singleResult} />);
});

it("can generate a search result item", () => {
  const wrapper = shallow(<Results results={singleResult} />);
  const instance = wrapper.instance();
  const result = instance.generateResult(singleResult[0]);
  const resultComponent = shallow(result);
  expect(
    resultComponent
      .find(".name")
      .first()
      .text()
  ).toEqual(singleResultRef.appleIpod.name);
  expect(
    resultComponent
      .find(".thumbnail img")
      .first()
      .props().src
  ).toEqual(singleResultRef.appleIpod.thumbnailImage);
  expect(
    resultComponent
      .find(".price")
      .first()
      .text()
  ).toEqual("$" + singleResultRef.appleIpod.salePrice.toString());

  expect(
    resultComponent.find(".short-description").props().dangerouslySetInnerHTML
      .__html
  ).toEqual(singleResultRef.appleIpod.shortDescription);
});

it("can dynamically show or hide short description", () => {
  const wrapper = shallow(<Results results={singleResult} />);
  const instance = wrapper.instance();
  const singleResultWithoutDescriptions = { ...singleResult[0] };
  delete singleResultWithoutDescriptions.shortDescription;
  delete singleResultWithoutDescriptions.longDescription;

  const result = instance.generateResult(singleResultWithoutDescriptions);
  const resultComponent = shallow(result);
  expect(
    resultComponent
      .find(".name")
      .first()
      .text()
  ).toEqual(singleResultRef.appleIpod.name);
  expect(
    resultComponent
      .find(".thumbnail img")
      .first()
      .props().src
  ).toEqual(singleResultRef.appleIpod.thumbnailImage);
  expect(
    resultComponent
      .find(".price")
      .first()
      .text()
  ).toEqual("$" + singleResultRef.appleIpod.salePrice.toString());
  expect(resultComponent.find(".short-description").exists()).toBeFalsy();
});

it("can generate a search result list", () => {
  const wrapper = shallow(<Results results={multipleIpodResults} />);
  expect(wrapper.find(".name")).toHaveLength(multipleIpodResults.length);
});

it("decodes html entities in strings to display as html", () => {
  const wrapper = shallow(<Results results={multipleIpodResults} />);
  const srcShortDescription =
    multipleIpodResultsRef.iPodTouch16GB.shortDescription;
  expect(srcShortDescription).toMatch("&lt;p&gt;Whether");
  expect(
    wrapper
      .find(".short-description")
      .first()
      .html()
  ).toMatch("<p>Whether");
});

it("uses the long description if short description is undefined", () => {
  const wrapper = shallow(<Results results={singleResult} />);
  const instance = wrapper.instance();
  const singleResultWithLongDescription = { ...singleResult[0] };
  delete singleResultWithLongDescription.shortDescription;
  singleResultWithLongDescription.longDescription = "long description";

  const result = instance.generateResult(singleResultWithLongDescription);
  const resultComponent = shallow(result);
  expect(
    resultComponent.find(".short-description").props().dangerouslySetInnerHTML
      .__html
  ).toEqual(singleResultWithLongDescription.longDescription);
});
