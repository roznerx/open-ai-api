import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="title"
            content="AIntelligent Code Generator"
          />
          <meta
            name="description"
            content="Generate your next code idea in seconds."
          />
          <meta property="og:site_name" content="aintelligentcode.dev" />
          <meta
            property="og:description"
            content="Generate your next Code idea in seconds."
          />
          <meta property="og:title" content="AI Intelligent Code Generator" />
          <meta
            property="og:image"
            content="/gitIcon.png"
          />
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
