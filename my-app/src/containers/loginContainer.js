import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {localstore} from '../store/localstore';
import {userSigninRequest,userSigninFinish} from '../actions/signInActions';

class loginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: false,
      danger: false,
      success: false,
      errorText: ''
    }
  }


  onSignClick = ()=>{
    const username = this.username.value;
    const password = this.password.value;
    if (!username || !password){
      if (!username) {
        this.setState({errorText: "请输入用户名！"})
      }
      if (!password) {
        this.setState({errorText: "请输入密码！"})
      }
    } else {
      this.setState({danger: false, errorText:""});
      this.props.onSigninButtonClick(username,password);
    }
  };

  componentDidMount() {
    console.log('loginContainer-componentDidMount:', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('loginContainer-componentWillReceiveProps:', 'nextProps', nextProps);
    const { login_success,error_message} = nextProps;
    if(login_success && localstore.getToken()){
      nextProps.userSigninFinish();
      if(this.props.location.state && this.props.location.state.from.pathname){
        nextProps.history.push(this.props.location.state.from.pathname);
      }else{
        nextProps.history.push('/home/welcome');
      }
    }else if(!login_success && error_message){
      this.setState({danger: true, errorText:error_message});
    }
  };

  onInputFocus = () => {
    this.setState({danger: false, errorText: ""});
  };

  render() {
    console.log('loginContainer-render:', 'render');
    return (
        <div role="tabpanel" className="tab-pane fade active in" id="ms-login-tab">
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
                <input onFocus={this.onInputFocus} ref={(input)=>{this.username = input}} type="text" id="ms-form-user1" className="form-control"/>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                        <span className="input-group-addon">
                          <i className="zmdi zmdi-lock"></i>
                        </span>
                <label className="control-label">密码</label>
                <input onFocus={this.onInputFocus} ref={(input)=>{this.password = input}} type="password" id="ms-form-pass1" className="form-control"/>
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
                <button onClick={this.onSignClick} className="btn btn-raised btn-primary pull-right">登录</button>
              </div>
            </div>
          </fieldset>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {login_success, error_message} = state.signIn;
  return {
    login_success,
    error_message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userSigninFinish(){
      dispatch(userSigninFinish());
    },
    onSigninButtonClick(username_email, password) {
      dispatch(userSigninRequest(
          username_email,
          password,
      ))
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(loginContainer));