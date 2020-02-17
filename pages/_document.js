import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';
import theme from '../src/theme';

const containerStyles = {
  width: theme.layout.width,
  height: theme.layout.height
};

class MyDocument extends Document {
  render() {
    return (
      <html lang="en" style={containerStyles}>
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="../static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="../static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="../static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="../static/favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body style={containerStyles}>
          <Main style={containerStyles} />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheetsMaterialUi = new ServerStyleSheets();
  const sheetStypedComponents = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => {
    const pageStyled = originalRenderPage(App => props =>
      sheetStypedComponents.collectStyles(<App {...props} />)
    );
    const pageMaterial = originalRenderPage({
      enhanceApp: App => props => sheetsMaterialUi.collect(<App {...props} />)
    });
    return { ...pageStyled, ...pageMaterial };
  };

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheetsMaterialUi.getStyleElement()}
        {sheetStypedComponents.getStyleElement()}
      </React.Fragment>
    ]
  };
};

export default MyDocument;
