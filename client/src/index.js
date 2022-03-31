import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import ProfilePage from "./components/ProfilePage";
//import 'bootstrap/dist/css/cerulean.css'; //only when it is installed via "npm i bootstrap@latest"

ReactDOM.render(
  <React.StrictMode>
    <ProfilePage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
