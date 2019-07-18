import { ApolloLink } from "apollo-link";
import withApollo from "next-with-apollo";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { endpoint, blogurl } from "../config";

const firstLink = new HttpLink({
  uri: endpoint,
  fetchOptions: {
    credentials: "include"
  }

  // other link options...
});

// Create Second Link
const secondLink = new HttpLink({
  uri: blogurl,
  headers: {
    "Content-Type": "application/json"
  },
  fetchOptions: {
    mode: "no-cors"
  }

  // other link options...
});

function createClient({ headers }, initialState) {
  console.log(headers);
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.split(
      operation => operation.getContext().clientName === "second", // Routes the query to the proper client
      secondLink,
      firstLink
    ),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default withApollo(createClient);
