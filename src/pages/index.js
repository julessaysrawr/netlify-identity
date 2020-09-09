import React, { useEffect } from "react";
import { Container, Heading, Button, Flex } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";

export default (props) => {
  useEffect(() => {
    // using useEffect hook to get around document does not exist at build time in gatsby-ssr
    // whenevr the component mounts, we'll run netlify identity once, and won't run it again
    // useEffect won't run on the server, but will run in the browser

    // have to deploy this before it works locally?
    netlifyIdentity.init({});
  });

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Our Site</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            console.log(netlifyIdentity.currentUser());
          }}
        >
          Log User
        </Button>
      </Flex>
    </Container>
  );
};
