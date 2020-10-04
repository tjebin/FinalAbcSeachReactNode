import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// css file from bootstrap after yarn add bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
