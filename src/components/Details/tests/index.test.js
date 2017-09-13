import React from "react";
import { shallow } from "enzyme";
import Details from "../";
import { productLookup } from "./mockData";

let clearSpy = jest.fn();
let wrapper;

describe("action handlers", () => {
  beforeEach(() => {
    clearSpy.mockReset();
    wrapper = shallow(
      <Details item={productLookup} onClearSelect={clearSpy} />
    );
  });

  it("renders without crashing", () => {
    expect(wrapper).not.toBeNull();
  });

  it("can handle onHide", () => {
    expect(wrapper.state().startClosingModal).toBeFalsy();
    wrapper
      .find(".detail-modal")
      .first()
      .simulate("hide");
    expect(wrapper.state().startClosingModal).toBeTruthy();
    wrapper.setState({ startClosingModal: false });
    expect(wrapper.state().startClosingModal).toBeFalsy();
    wrapper
      .find(".detail-hide")
      .first()
      .simulate("click");
    expect(wrapper.state().startClosingModal).toBeTruthy();
  });

  it("can handle onExited", () => {
    wrapper.setState({ startClosingModal: true });
    expect(wrapper.state().startClosingModal).toBeTruthy();
    wrapper
      .find(".detail-modal")
      .first()
      .simulate("exited");
    expect(wrapper.state().startClosingModal).toBeFalsy();
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});

it("won't render body children if item is null", () => {
  const wrapper = shallow(<Details onClearSelect={clearSpy} />);
  expect(
    wrapper
      .find("ModalBody")
      .first()
      .children()
  ).toHaveLength(0);
});

it("won't render shortDecodedDesc or longDecodedDesc if undefined", () => {
  const productLookupWithoutDesc = { ...productLookup };
  delete productLookupWithoutDesc.shortDescription;
  delete productLookupWithoutDesc.longDescription;
  const wrapper = shallow(
    <Details item={productLookupWithoutDesc} onClearSelect={clearSpy} />
  );
  expect(wrapper.find(".detail-short-description")).toHaveLength(0);
  expect(wrapper.find(".detail-long-description")).toHaveLength(0);
});
