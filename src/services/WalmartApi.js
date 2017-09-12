import { apiKey } from "../common";

class WalmartApi {
  // v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod
  searchApiUrl = `v1/search?apiKey=${apiKey}&query={query}`;

  //  v1/items/12417832?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&format=json
  productLookupApiUrl = `v1/items/{itemId}?apiKey=${apiKey}`;

  // v1/nbp?apiKey={apiKey}&itemId={itemID}
  recommendationApiUrl = `v1/nbp?apiKey=${apiKey}&itemId={itemId}`

  querySearch = query => {
    const searchQuery = this.searchApiUrl.replace("{query}", query);
    return this.request(searchQuery);
  };

  queryProductLookup = itemId => {
    const lookupQuery = this.productLookupApiUrl.replace("{itemId}", itemId);
    return this.request(lookupQuery);
  };

  queryRecommendation = itemId => {
    const lookupQuery = this.recommendationApiUrl.replace("{itemId}", itemId);
    return this.request(lookupQuery);
  };

  request = (url, options) => {
    return fetch(url, options)
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        console.error(`Error executing request ${url}`);
        console.error(`statusText: ${response.statusText}`);
      })
      .catch(error => {
        console.error("Error fetching request");
        console.error(error);
        return Promise.reject(error);
      });
  };
}

export default WalmartApi;
