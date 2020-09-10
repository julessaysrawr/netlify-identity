import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
// import netlifyIdentity from 'netlify-identity-widget'
import { IdentityContext } from "../../identity-context";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";

let Dash = (props) => {
  const { user } = useContext(IdentityContext);

  return <div>Dash hasUser: {user && user.user_metadata.full_name}</div>;
};

let DashLoggedOut = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  return (
    <Flex>
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
        <Heading as="h1">Get Shit Done</Heading>
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
    </Flex>
  );
};

export default (props) => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }

  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};
