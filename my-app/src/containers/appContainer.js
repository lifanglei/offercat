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
    return <h1>Hello, {this.props.name}</h1>;
  }
}
const Home = ({history}) => (
    <div className="container">
      <div onClick={()=>{console.log('hi');}}>Home</div>
      <a>123</a>
      <button onClick={()=>{history.push('/login')}}>test</button>
    </div>
);

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }

  tick = () => {
    this.setState({
      date: this.state.date
    });
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
        <div className="container">
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    );
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
              <Route path={`${match.url}/app`} component={Home}/>
              <Route path={`${match.url}/test`} component={Welcome}/>
              <Route path={`${match.url}/clock`} component={Clock}/>
              <Route path={`${match.url}/company/:companyId`} component={Clock}/>
              <Route path={`${match.url}/positions/:positionId`} component={Welcome}/>
              <Route component={NomarchComponent}/>
            </Switch>
          </div>
        </div>
    )
  }
}

export default appContainer;