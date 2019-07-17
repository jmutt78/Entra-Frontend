import { ApolloLink } from "apollo-link";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { endpoint, blogurl } from "../config";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

// Create First Link
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

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
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

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
