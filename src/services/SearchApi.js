import { apiKey } from "../common";

// http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod
const searchApiUrl = `v1/search?apiKey=${apiKey}`;

const queryOptions = {
  method: "GET",
  mode: "cors"
};

export const query = inputQuery => {
  const searchQuery = searchApiUrl + `&query=${inputQuery}`;
  // const searchQuery = "http://www.reddit.com/r/reactjs.json";
  return fetch(searchQuery, queryOptions)
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response.json();
      }
      console.error("Error in searchQuery response");
    })
    .catch(error => {
      console.error("Error fetching in searchQuery");
      console.error(error);
      return Promise.reject(error);
    });
};

export default {
  query
};
