const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { deep } = require("@theme-ui/presets");
// const {
//   ApolloProvider,
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
// } = require("@apollo/client");

const { Provider } = require("./identity-context");

// taking deep theme and adding sizing since preset does not come with sizing
const tokens = {
  ...deep,
  sizes: { container: 1024 },
};

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri:
//       "https://compassionate-hypatia-ee4969.netlify.app/.netlify/functions/graphql",
//   }),
// });

module.exports = ({ element }) => (
  <Provider>
    {/* <ApolloProvider client={client}> */}
      <ThemeProvider theme={tokens}>{element}</ThemeProvider>
    {/* </ApolloProvider> */}
  </Provider>
);
