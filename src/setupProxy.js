const proxy = require("http-proxy-middleware");

const config = {
  context: ["/api", "/uploads"],
  options: {
    changeOrigin: true,
    secure: false,
    ws: true,
    target: process.env.REACT_APP_API_URL
  }
};

module.exports = Object.assign(
  app => {
    app.use(proxy(config.context, config.options));
  },
  { config }
);
