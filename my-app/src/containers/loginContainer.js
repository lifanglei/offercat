import React, {Component} from "react";
import {connect} from 'react-redux'
import '../css/loginContainer.css'

class loginContainer extends Component {
  constructor(props) {
    super(props);
    this.state= {
      warning:false,
      danger:false,
      success:false
    }
  }


  render() {
    return (
        <div className="loginContainer bg-full-page  back-fixed">
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
                  this.title.innerText = "登录"
                }}>
                  <a href="#ms-login-tab" aria-controls="ms-login-tab" role="tab" data-toggle="tab"
                     className="withoutripple">
                    <i className="zmdi zmdi-account"></i>登录</a>
                </li>
                <li role="presentation" onClick={() => {
                  this.indicator.style.left = '166.656px';
                  this.title.innerText = "注册"
                }}>
                  <a href="#ms-register-tab" aria-controls="ms-register-tab" role="tab" data-toggle="tab"
                     className="withoutripple">
                    <i className="zmdi zmdi-account-add"></i>注册</a>
                </li>
                <li role="presentation" onClick={() => {
                  this.indicator.style.left = '333.312px';
                  this.title.innerText = "忘记密码"
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
                {this.state.success && <div class="alert alert-success alert-dismissible" role="alert">
                </div>}
                {this.state.warning && <div class="alert alert-warning alert-dismissible" role="alert">
                </div>}
                {this.state.danger && <div class="alert alert-danger alert-dismissible" role="alert">
                </div>}
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane fade active in" id="ms-login-tab">
                    <form>
                      <fieldset>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                        <span className="input-group-addon">
                          <i className="zmdi zmdi-account"></i>
                        </span>
                            <label className="control-label" for="ms-form-user">用户名</label>
                            <input type="text" id="ms-form-user" className="form-control"/>
                          </div>
                        </div>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                        <span className="input-group-addon">
                          <i className="zmdi zmdi-lock"></i>
                        </span>
                            <label className="control-label" for="ms-form-pass">密码</label>
                            <input type="password" id="ms-form-pass" className="form-control"/>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-xs-5">
                            <div className="form-group no-mt">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox"/><span className="checkbox-material">
                                </span> 记住密码</label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xs-7">
                            <button className="btn btn-raised btn-primary pull-right">登录</button>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="ms-register-tab">
                    <form>
                      <fieldset>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                              <span className="input-group-addon">
                                <i className="zmdi zmdi-account"></i>
                              </span>
                            <label className="control-label" for="ms-form-user">用户名</label>
                            <input type="text" id="ms-form-user" className="form-control"></input>
                          </div>
                        </div>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-email"></i>
                            </span>
                            <label className="control-label" for="ms-form-email">邮箱</label>
                            <input type="email" id="ms-form-email" className="form-control"></input>
                          </div>
                        </div>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-lock"></i>
                            </span>
                            <label className="control-label" for="ms-form-pass">密码</label>
                            <input type="password" id="ms-form-pass" className="form-control"></input>
                          </div>
                        </div>
                        <div className="form-group label-floating is-empty">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-lock"></i>
                            </span>
                            <label className="control-label" for="ms-form-pass">再次输入密码</label>
                            <input type="password" id="ms-form-pass" className="form-control"></input>
                          </div>
                        </div>
                        <button className="btn btn-raised btn-block btn-primary">注册</button>
                      </fieldset>
                    </form>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="ms-recovery-tab">
                    <fieldset>
                      <div className="form-group label-floating is-empty">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="zmdi zmdi-account"></i>
                          </span>
                          <label className="control-label" for="ms-form-user">用户名</label>
                          <input type="text" id="ms-form-user" className="form-control"/>
                        </div>
                      </div>
                      <div className="form-group label-floating is-empty">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="zmdi zmdi-email"></i>
                          </span>
                          <label className="control-label" for="ms-form-email">邮箱</label>
                          <input type="email" id="ms-form-email" className="form-control"/>
                        </div>
                      </div>
                      <button className="btn btn-raised btn-block btn-primary">重置密码</button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center animated fadeInUp animation-delay-7">
              <a href="index.html" className="btn btn-white">
                <i className="zmdi zmdi-home"></i>返回首页</a>
            </div>
          </div>
        </div>
    );
  }
}
export default loginContainer;