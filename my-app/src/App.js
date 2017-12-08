import React, {Component} from 'react';
import {Provider} from 'react-redux'
import appContainer from './containers/appContainer';
import authContainer from './containers/authContainer';
import welcomeContainer from './containers/welcomeContainer';
import NomarchComponent from './components/noMatch';
import {AuthenticatedRoute} from './components/authenticatedRoute';
import configureStore from './store/store';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

let store = configureStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/login" component={authContainer}/>
              <Route path="/welcome" component={welcomeContainer}/>
              <AuthenticatedRoute path="/home" component={appContainer}/>
              <Route component={NomarchComponent}/>
            </Switch>
          </Router>
        </Provider>
    );
  }
}

export default App;
