import React, {Component} from 'react';
import NavBarComponent from './components/navBar';
import NomarchComponent from './components/noMatch';
import loginContainer from './containers/loginContainer'
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
const Home = () => (
    <div className="container">
      <h2>Home</h2>
      {/*<img src={back}></img>*/}
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

class App extends Component {
  render() {
    return (
          <Router>
            <div>
              <NavBarComponent/>
              <Route path="/login" component={loginContainer}/>
              <Route path="/home" component={Home}/>
              <Route path="/welcome" component={Welcome}/>
              <Route path="/clock" component={Clock}/>
              <Route component={NomarchComponent}/>
            </div>
          </Router>
    );
  }
}

export default App;
