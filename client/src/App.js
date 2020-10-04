import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import Main from './components/layout/MainComponent';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  // axios.defaults.headers.common['x-auth-token'] = token;
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Main />
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
