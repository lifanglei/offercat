import React, {Component} from "react";
import CompanyBanner from '../components/banner';
import JobList from  '../components/joblist';
import '../css/welcomeContainer.css';

class welcomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <div className="welcome-container">
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
                  <li className="dropdown"><a aria-current="true">首页<div className="ripple-container"></div></a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><a onClick={()=>{this.props.history.push('/login')}}className="login">注册</a>|<a onClick={()=>{this.props.history.push('/login?from=signup')}} className="signup">登录</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="main">
            <div>
              <CompanyBanner/>
            </div>
            <div className="container container-full">
              <JobList/>
            </div>
          </div>
        </div>
    )
  }
}

export default welcomeContainer;