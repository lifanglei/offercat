import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import defaultpng from '../../img/default-profile.png';

class Profileinit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile int did mount');
  }

  onClickToNext = ()=>{
    this.props.history.push('/home/profile/profilebasic');
  };

  render(){
    return (
        <div className="card">
          <div className="ms-hero-bg-primary ms-hero-img-coffee">
            <img src={defaultpng} className="img-avatar-circle"/>
          </div>
          <div className="card-block pt-4 text-center">
            <h3 className="color-primary">姓名</h3>
            <div className="basic-edit row">
              <div className="left">
                <div>
                  <i className="fa fa-book"/> 学历 <i className="fa fa-calendar-o"/> 工作年限 <i className="fa fa-location-arrow"/> 居住地
                </div>
                <div>
                  <i className="fa fa-phone"/> 联系电话 <i className="fa fa-inbox"/> 邮箱
                </div>
              </div>
              <div className="right" style={{cursor: 'pointer'}}>
                <a onClick={this.onClickToNext}><i className="fa fa-pencil"/> 编辑</a>
              </div>
            </div>
          </div>
          <div className="card-block pt-4 text-center">
            <div className="block2">
              <div className="slogan">
                <div>
                  多写几行，别人就多看你几眼
                </div>
                <div style={{color: 'grey'}}>
                  在线简历可以提高获得面试的几率
                </div>
              </div>
              <div>
                <button className="btn btn-raised  btn-default" onClick={this.onClickToNext}>完善在线简历</button>
              </div>
            </div>
          </div>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profileinit));



