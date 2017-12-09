import React, {Component} from "react";
import '../css/navbar.css'

class welcomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <div>
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
                  <li className="dropdown"><a aria-current="true">首页<div class="ripple-container"></div></a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><a className="login">注册</a>|<a className="signup">登录</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    )
  }
}

export default welcomeContainer;