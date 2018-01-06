import React, {Component} from "react";
import NomarchComponent from '../components/noMatch';
import companyDetailContainer from './companyDetail';
import profileContainer from './profile';
import jobDetail from './jobDetail'
import NavBarComponent from '../components/navBar';
import '../css/appContainer.css'
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
              <Route path={`${match.url}/profile`} component={profileContainer}/>
              <Route path={`${match.url}/company/:companyId`} component={companyDetailContainer}/>
              <Route path={`${match.url}/position/:positionId`} component={jobDetail}/>
              <Route component={NomarchComponent}/>
            </Switch>
          </div>
        </div>
    )
  }
}

export default appContainer;