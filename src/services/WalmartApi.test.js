import WalmartApi from "./WalmartApi";
import { apiKey } from "../common";

// let restoreFetch;
// beforeEach(() => {
//   restoreFetch = window.fetch;
//   window.

// }

// afterEach(() => {
//   window.fetch.restore();
// }

let walmartApi;
beforeEach(() => {
  walmartApi = new WalmartApi();
});

describe("fetch", () => {
  let fetchSpy;
  let searchUrl = "searchUrl";
  let options = { method: "GET" };
  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("Can fetch from a url and calls response.json()", () => {
    let jsonMock = jest.fn();
    fetchSpy = jest
      .spyOn(window, "fetch")
      .mockImplementation((searchQuery, queryOptions) => {
        return Promise.resolve({
          ok: true,
          json: jsonMock
        });
      });

    let result = walmartApi.request(searchUrl, options);
    return result.then(() => {
      expect(window.fetch.mock.calls[0][0]).toBe(searchUrl);
      expect(window.fetch.mock.calls[0][1]).toBe(options);
      expect(jsonMock.mock.calls.length).toBe(1);
    });
  });

  it("Can fetch from a url that has an error response", () => {
    let jsonMock = jest.fn();
    fetchSpy = jest
      .spyOn(window, "fetch")
      .mockImplementation((searchQuery, queryOptions) => {
        return Promise.resolve({
          ok: false,
          json: jsonMock
        });
      });
    jest.spyOn(console, "error").mockImplementation();
    let result = walmartApi.request(searchUrl, options);
    return result.then(() => {
      expect(window.fetch.mock.calls[0][0]).toBe(searchUrl);
      expect(window.fetch.mock.calls[0][1]).toBe(options);
      expect(jsonMock.mock.calls.length).toBe(0);
      expect(console.error.mock.calls.length).toBe(2);
      console.error.mockRestore();
    });
  });

  it("Can fetch from a url that rejects", () => {
    fetchSpy = jest
      .spyOn(window, "fetch")
      .mockImplementation((searchQuery, queryOptions) => {
        return Promise.reject("error");
      });
    jest.spyOn(console, "error").mockImplementation();
    let result = walmartApi.request(searchUrl, options);
    return result.catch(() => {
      expect(window.fetch.mock.calls[0][0]).toBe(searchUrl);
      expect(window.fetch.mock.calls[0][1]).toBe(options);
      expect(console.error.mock.calls.length).toBe(2);
      console.error.mockRestore();
    });
  });
});

describe("formats urls", () => {
  it("formats url for querySearch", () => {
    const query = "iPhone X";
    const expectedUrl = `v1/search?apiKey=${apiKey}&query=${query}`;
    const spy = jest
      .spyOn(walmartApi, "request")
      .mockImplementation((mockQuery, options) => {
        expect(mockQuery).toEqual(expectedUrl);
      });
    walmartApi.querySearch(query);
    spy.mockRestore();
  });

  it("formats url for queryProductLookup", () => {
    const itemId = "12417832";
    const expectedUrl = `v1/items/${itemId}?apiKey=${apiKey}`;
    const spy = jest
      .spyOn(walmartApi, "request")
      .mockImplementation((mockQuery, options) => {
        expect(mockQuery).toEqual(expectedUrl);
      });
    walmartApi.queryProductLookup(itemId);
    spy.mockRestore();
  });

  it("formats url for queryProductLookup", () => {
    const itemId = "12417832";
    const expectedUrl = `v1/nbp?apiKey=${apiKey}&itemId=${itemId}`;
    const spy = jest
      .spyOn(walmartApi, "request")
      .mockImplementation((mockQuery, options) => {
        expect(mockQuery).toEqual(expectedUrl);
      });
    walmartApi.queryRecommendation(itemId);
    spy.mockRestore();
  });
});
