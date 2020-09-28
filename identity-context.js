const React = require("react");
const { useState, useEffect } = require("react");
const netlifyIdentity = require("netlify-identity-widget");

const IdentityContext = React.createContext({});

exports.IdentityContext = IdentityContext;

const IdentityProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    // using useEffect hook to get around document does not exist at build time in gatsby-ssr
    // whenevr the component mounts, we'll run netlify identity once, and won't run it again
    // useEffect won't run on the server, but will run in the browser

    // have to deploy this before it works locally?
    netlifyIdentity.init({});
  });
  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });
  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser();
  });
  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

exports.Provider = IdentityProvider;
