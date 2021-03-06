# FMS Desktop

http://localhost:8080

These variables can be edited in a `env.json` root file and they will be available on client (browser)

 * `NODE_ENV` - default to `development` for dev build and `production` for prod build
 * `REST_URL` - address for server
 * `APY_KEY` - apy for get the google map

## Run in dev mode (locally)

* On default port (8080)

``` bash
  $ npm start
```
> Access the web page at http://localhost:8080

## Dependencies

``` js
"devDependencies": {
  "babel-core": "^6.26.3",
  "babel-loader": "^7.1.5",
  "babel-preset-env": "^1.7.0",
  "babel-preset-react": "^6.24.1",
  "babel-preset-stage-3": "^6.24.1",
  "favicons-webpack-plugin": "0.0.9",
  "file-loader": "^3.0.1",
  "html-webpack-plugin": "^3.2.0",
  "offline-plugin": "^5.0.6",
  "webpack": "^4.29.6",
  "webpack-cli": "^3.3.0",
  "webpack-dev-server": "^3.2.1"
},
"dependencies": {
  "@fortawesome/fontawesome-svg-core": "^1.2.17",
  "@fortawesome/free-solid-svg-icons": "^5.8.1",
  "@fortawesome/react-fontawesome": "^0.1.4",
  "bluebird": "^3.5.3",
  "bootstrap": "^4.3.1",
  "css-loader": "^2.1.1",
  "file-loader": "^3.0.1",
  "google-maps-react": "^2.0.2",
  "i": "^0.3.6",
  "jquery": "^3.3.1",
  "moment": "^2.24.0",
  "node-sass": "^4.11.0",
  "npm": "^6.9.0",
  "react": "^16.8.5",
  "react-dom": "^16.8.5",
  "react-google-maps": "^9.4.5",
  "react-intl": "^2.8.0",
  "react-intl-redux": "^2.1.0",
  "react-places-autocomplete": "^7.2.1",
  "react-redux": "^6.0.1",
  "react-router-dom": "^5.0.0",
  "recompose": "^0.30.0",
  "redux": "^4.0.1",
  "sass-loader": "^7.1.0",
  "socket.io": "^2.2.0",
  "style-loader": "^0.23.1"
}
```

## !!! Important notice
* When you update `react`, also update the `react.min.15.4.2.js` and `react-dom.min.15.4.2.js` scripts
