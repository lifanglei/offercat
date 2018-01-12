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
                <li className="dropdown"><NavLink to={`${match.url}/welcome`} activeClassName="active">首页</NavLink></li>
                <li className="dropdown"><NavLink to={`${match.url}/organizations`} activeClassName="active">公司</NavLink></li>
                <li className="dropdown"><NavLink to={`${match.url}/jobs`} activeClassName="active">职位</NavLink></li>
                <li className="dropdown"><NavLink to={`${match.url}/profile/profileinit`} activeClassName="active">个人中心</NavLink></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a className="login">搜索</a></li>
                <li><a><i className="zmdi zmdi-email zmdi-hc-fw"/></a></li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}

export default withRouter(NavBarComponent);