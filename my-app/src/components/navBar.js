import React, {Component} from "react";
import '../css/navbar.css'
import {
  NavLink,
  withRouter
} from 'react-router-dom'

class NavBarComponent extends Component {
  render() {
    const {match} = this.props;
    return (
        <nav className="navbar yamm ms-navbar ms-navbar-primary shrink navbar-fixed-top">
          <div className="container container-full">
            <div className="navbar-header">
              <a className="navbar-brand">
                <span className="ms-logo ms-logo-sm">M</span>
                <span className="ms-title">Offer
                <strong>猫</strong>
              </span>
              </a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="dropdown"><NavLink to={`${match.url}/app`} activeClassName="active">Home</NavLink></li>
                <li className="dropdown"><NavLink to={`${match.url}/test`} activeClassName="active">welcome</NavLink></li>
                <li className="dropdown"><NavLink to={`${match.url}/clock`} activeClassName="active">clock</NavLink></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a className="login">注册</a>|<a className="signup">登录</a></li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}

export default withRouter(NavBarComponent);