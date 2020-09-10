import React, { useEffect, useState, useContext } from "react";
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
// import netlifyIdentity from "netlify-identity-widget";
import { IdentityContext } from "../../identity-context";

import { Link } from "gatsby";

export default (props) => {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   // using useEffect hook to get around document does not exist at build time in gatsby-ssr
  //   // whenevr the component mounts, we'll run netlify identity once, and won't run it again
  //   // useEffect won't run on the server, but will run in the browser

  //   // have to deploy this before it works locally?
  //   netlifyIdentity.init({});
  // });
  // netlifyIdentity.on("login", (user) => {
  //   netlifyIdentity.close();
  //   setUser(user);
  // });
  // netlifyIdentity.on("logout", () => setUser());

  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
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
