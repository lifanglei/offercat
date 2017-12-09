import React, {Component} from "react";
import '../css/authContainer.css';
import {localstore} from '../store/localstore';
import LoginContainer from './loginContainer';
import SignupContainer from './signupContainer';
import RecoveryContainer from './recoveryContainer';


class authContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log(' authContainer-componentDidMount:');
    localstore.deleteToken();
  }

  componentWillReceiveProps(nextProps) {
    console.log(' authContainer-componentWillReceiveProps:', 'nextProps', nextProps);
  };


  render() {

    console.log(' authContainer-render');

    return (
        <div className="authContainer bg-full-page  back-fixed">
          <div className="mw-500 absolute-center">
            <div className="card color-dark shadow-6dp animated fadeIn animation-delay-7">
              <div className="ms-hero-bg-primary back-mountain">
                <h2 ref={(title) => {
                  this.title = title
                }} className="text-center no-m pt-4 pb-4 color-white index-1">登录</h2>
              </div>
              <ul className="nav nav-tabs nav-tabs-full nav-tabs-3 nav-tabs-transparent indicator-primary"
                  role="tablist">
                <li role="presentation" className="active" onClick={() => {
                  this.indicator.style.left = '0px';
                  this.title.innerText = "登录";
                }}>
                  <a href="#ms-login-tab" aria-controls="ms-login-tab" role="tab" data-toggle="tab"
                     className="withoutripple">
                    <i className="zmdi zmdi-account"></i>登录</a>
                </li>
                <li role="presentation" onClick={() => {
                  this.indicator.style.left = '166.656px';
                  this.title.innerText = "注册";
                }}>
                  <a href="#ms-register-tab" aria-controls="ms-register-tab" role="tab" data-toggle="tab"
                     className="withoutripple">
                    <i className="zmdi zmdi-account-add"></i>注册</a>
                </li>
                <li role="presentation" onClick={() => {
                  this.indicator.style.left = '333.312px';
                  this.title.innerText = "忘记密码";
                }}>
                  <a href="#ms-recovery-tab" aria-controls="ms-recovery-tab" role="tab" data-toggle="tab"
                     className="withoutripple">
                    <i className="zmdi zmdi-key"></i>忘记密码</a>
                </li>
                <span ref={(indicator) => {
                  this.indicator = indicator
                }} className="ms-tabs-indicator" style={{left: '0px', width: '166.656px'}}></span>
              </ul>
              <div className="card-block">
                <div className="tab-content">
                  <LoginContainer/>
                  <SignupContainer/>
                  <RecoveryContainer/>
                </div>
              </div>
            </div>
            <div className="text-center animated fadeInUp animation-delay-7">
              <a href="index.html" className="btn btn-white">
                <i className="zmdi zmdi-open-in-new"></i><strong>去发布职位</strong></a>
            </div>
          </div>
        </div>
    );
  }
}
export default authContainer;

