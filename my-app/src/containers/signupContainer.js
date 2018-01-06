import React, {Component} from "react";
import {connect} from 'react-redux';
import {localstore} from '../store/localstore';
import {fetchCaptchaRequest} from '../actions/captchaActions';
import {userSignupRequest,userSignupFinish} from '../actions/signUpActions';
import {withRouter} from 'react-router-dom';

class signupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: false,
      danger: false,
      success: false,
      errorText: ''
    }
  }

  validateEmail = (email) =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };


  componentDidMount() {
    console.log('signupContainer-componentDidMount:', 'did mount and request captcha');
    localstore.deleteToken();
    this.props.fetchCaptcha();
  }

  componentWillReceiveProps(nextProps) {
    console.log('signupContainer-componentWillReceiveProps:', 'nextProps', nextProps);
    const {signupSuccess,error_message} = nextProps;
    if(signupSuccess && localstore.getToken()){
      nextProps.userSignupFinish();
      nextProps.history.push('/home/app');
    }else if(!signupSuccess && error_message){
      this.setState({danger: true, errorText:error_message});
    }
  };

  onInputFocus = ()=>{
    this.setState({danger: false, errorText:""});
  };

  onRegisterClick = () => {
    const username = this.userNameInput.value;
    const password = this.passwordInput.value;
    const confirmpassword = this.confirmpasswordInput.value
    const email = this.emailInput.value;
    const verifyCode = this.verifyCode.value;
    if (!username || !password || !email || !confirmpassword||!verifyCode) {
      this.setState({danger: true});
      if (!username) {
        this.setState({errorText: "请输入用户名！"})
      }
      if (!password || !confirmpassword) {
        this.setState({errorText: "请输入密码！"})
      }
      if (!verifyCode) {
        this.setState({errorText: "请输入验证码！"})
      }
      if (!email) {
        this.setState({errorText: "请输入邮箱！"})
      }
    } else if (!this.validateEmail(email)) {
      this.setState({danger: true});
      this.setState({errorText: "邮箱不正确！"})
    } else if (password !== confirmpassword) {
      this.setState({danger: true});
      this.setState({errorText: "两次密码不一致！"})
    } else {
      this.setState({danger: false, errorText:""});
      const {captcha_key} = this.props;
      this.props.onSignupButtonClick(username, email, password, verifyCode, captcha_key);
    }
  };

  render(){
    console.log('signupContainer-render:', 'render');
    const {captcha_url, captcha_url2} = this.props;
    return (
        <div role="tabpanel" className="tab-pane fade" id="ms-register-tab">
          {this.state.success && <div className="alert alert-success alert-dismissible" role="alert">
          </div>}
          {this.state.warning && <div className="alert alert-warning alert-dismissible" role="alert">
          </div>}
          {this.state.danger &&
          <div className="alert alert-danger alert-dismissible" role="alert">{this.state.errorText}
          </div>}
          <fieldset>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                              <span className="input-group-addon">
                                <i className="zmdi zmdi-account"></i>
                              </span>
                <label className="control-label">用户名</label>
                <input ref={(input) => {
                  this.userNameInput = input;
                }} onFocus={this.onInputFocus} type="text" id="ms-form-user" className="form-control"></input>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-email"></i>
                            </span>
                <label className="control-label">邮箱</label>
                <input ref={(input) => {
                  this.emailInput = input;
                }} onFocus={this.onInputFocus} type="email" id="ms-form-email" className="form-control"></input>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-lock"></i>
                            </span>
                <label className="control-label">密码</label>
                <input ref={(input) => {
                  this.passwordInput = input;
                }} onFocus={this.onInputFocus} type="password" id="ms-form-pass" className="form-control"></input>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-lock"></i>
                            </span>
                <label className="control-label">再次输入密码</label>
                <input ref={(input) => {
                  this.confirmpasswordInput = input;
                }} onFocus={this.onInputFocus} type="password" id="ms-form-pass2" className="form-control"></input>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                            <span className="input-group-addon">
                              <i className="zmdi zmdi-shield-check"></i>
                            </span>
                <input ref={(input) => {
                  this.verifyCode = input;
                }} onFocus={this.onInputFocus} id="verifyCode" placeholder="输入右图验证码" type="text"></input>
                <span onClick={() => {
                  this.props.fetchCaptcha()
                }} className="captcha-wrapper" style={{marginLeft: "20px"}}>
                              <img alt="todo" src={captcha_url}/>
                              <img className="popup2" alt="todo2" src={captcha_url2}/>
                            </span>
              </div>
            </div>
            <button onClick={this.onRegisterClick} className="btn btn-raised btn-block btn-primary">注册</button>
          </fieldset>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {captcha_key, captcha_url, captcha_url2} = state.captcha;
  const {signupSuccess, error_message} = state.signUp;
  return {
    captcha_key,
    captcha_url,
    captcha_url2,
    signupSuccess,
    error_message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCaptcha() {
      dispatch(fetchCaptchaRequest());
    },
    userSignupFinish(){
      dispatch(userSignupFinish());
    },
    onSignupButtonClick(username, email, password,captcha_val,captcha_key) {
      dispatch(userSignupRequest(
          username,
          email,
          password,
          captcha_val,
          captcha_key
      ))
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(signupContainer));