import { ApolloLink } from "apollo-link";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { endpoint, blogurl } from "../config";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, options = {}) {
  // Create First Link
  const { cookie } = options;
  const firstLinkheaders = cookie
    ? {
        cookie
      }
    : undefined;
  const firstLink = new HttpLink({
    uri: endpoint,
    fetchOptions: {
      credentials: "include"
    },
    headers: firstLinkheaders

    // other link options...
  });

  // Create Second Link
  const secondLink = new HttpLink({
    uri: blogurl,
    headers: {
      "Content-Type": "application/json"
    }

    // other link options...
  });

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

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
