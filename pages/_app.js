import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import Page from "../components/page/Page";

import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../src/getPageContext";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Page>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Page>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
