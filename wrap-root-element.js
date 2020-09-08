const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { deep } = require("@theme-ui/presets");

// taking deep theme and adding sizing since preset does not come with sizing
const tokens = {
  ...deep,
  sizes: {container: 1024}
}
module.exports = ({element}) => (
  <ThemeProvider theme={tokens}>{element}</ThemeProvider>
);
