import React, {Component} from "react";
import NomarchComponent from '../components/noMatch';
import '../css/appContainer.css'
import NavBarComponent from '../components/navBar';
import {
  Route,
  Switch,
} from 'react-router-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, 正在努力开发中.........</h1>;
  }
}

class appContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {match} = this.props;
    return (
        <div>
          <NavBarComponent/>
          <div className="appContainer main">
            <Switch>
              <Route path={`${match.url}/app`} component={Welcome}/>
              <Route path={`${match.url}/test`} component={Welcome}/>
              <Route path={`${match.url}/clock`} component={Welcome}/>
              <Route path={`${match.url}/company/:companyId`} component={Welcome}/>
              <Route path={`${match.url}/positions/:positionId`} component={Welcome}/>
              <Route component={NomarchComponent}/>
            </Switch>
          </div>
        </div>
    )
  }
}

export default appContainer;