import React, {Component} from "react";
import {connect} from 'react-redux';

class recoveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: false,
      danger: false,
      success: false,
      errorText: ''
    }
  }

  onInputFocus = ()=>{
    this.setState({danger: false, errorText:""});
  };

  render(){
    return (
        <div role="tabpanel" className="tab-pane fade" id="ms-recovery-tab">
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
                <input type="text" id="ms-form-user3" className="form-control"/>
              </div>
            </div>
            <div className="form-group label-floating is-empty">
              <div className="input-group">
                          <span className="input-group-addon">
                            <i className="zmdi zmdi-email"></i>
                          </span>
                <label className="control-label">邮箱</label>
                <input type="email" id="ms-form-email3" className="form-control"/>
              </div>
            </div>
            <button className="btn btn-raised btn-block btn-primary">重置密码</button>
          </fieldset>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(recoveryContainer);