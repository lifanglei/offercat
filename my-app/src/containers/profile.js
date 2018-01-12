import React, {Component} from "react";
import '../css/profile.css';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom'
import Profileinit from '../components/profiles/profileinit';
import Profilebasic from '../components/profiles/profilebasic';
import Profilework from '../components/profiles/profilework';
import Profileedu from '../components/profiles/profileedu';
import Collection from '../components/userCenter/collection';
import {getResumeBasicRequest,postResumeBasicRequest,resumeRefresh} from '../actions/profileAction';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Welcome extends React.Component {
  render() {
    return <h1>Hello, 正在努力开发中.........</h1>;
  }
}

class profileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile-container did mount');
    this.props.fetchResume();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errorcode === 403){
      this.authModal.classList.add('in');
      this.authModal.style.display = 'block';
    }
    if(nextProps.resume_code === 200){
      NotificationManager.success('简历上传成功', '消息通知',1500);
      this.props.refreshResume();
    }
  }
  attachChange =()=>{
    if(this.attachinput.files && this.attachinput.files[0]){
      let formbody = new FormData();
      formbody.append('resume', this.attachinput.files[0]);
      if(this.props.resume){
        this.props.postResume(formbody,this.props.resume_uuid);
      }else{
        this.props.postResume(formbody);
      }
    }
  };

  modelClick = ()=>{
    this.authModal.classList.remove('in');
    this.authModal.style.display = 'none';
    this.props.history.push({
      pathname: '/login',
      state: { from: this.props.location }
    });
  };

  render() {
    console.log('profile-container will ');
    const {match} = this.props;
    return (
        <div className="profile-container container container-full">
          <div className="col-sm-8">
            <Route path={`${match.url}/profileinit`} component={Profileinit}/>
            <Route path={`${match.url}/profilebasic`} component={Profilebasic}/>
            <Route path={`${match.url}/profilework`} component={Profilework}/>
            <Route path={`${match.url}/profileedu`} component={Profileedu}/>
            <Route path={`${match.url}/profileskill`} component={Welcome}/>
            <Route path={`${match.url}/collectlist`} component={Collection}/>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="button-panel">
                <div className="col-sm-3">
                  <NavLink to={`${this.props.match.url}/collectlist`}>
                  <div className="boxbutton">
                    <div><i className="fa fa-inbox fa-3x"/></div>
                    <div>投递箱</div>
                  </div>
                  </NavLink>
                </div>
                <div className="col-sm-3">
                  <NavLink to={`${this.props.match.url}/collectlist`}>
                  <div className="boxbutton">
                    <div><i className="fa fa-file-o fa-3x"/></div>
                    <div>邀请函</div>
                  </div>
                  </NavLink>
                </div>
                <div className="col-sm-3">
                  <NavLink to={`${this.props.match.url}/collectlist`}>
                  <div className="boxbutton">
                    <div><i className="fa fa-bookmark-o fa-3x"/></div>
                    <div>订阅拦</div>
                  </div>
                  </NavLink>
                </div>
                <div className="col-sm-3">
                  <NavLink to={`${this.props.match.url}/collectlist`}>
                  <div className="boxbutton">
                    <div><i className="fa fa-star-o fa-3x"/></div>
                    <div>收藏夹</div>
                  </div>
                </NavLink>
                </div>
              </div>
              <div className="attach" style={{cursor: 'pointer'}} onClick={()=>{this.attachinput.click();}}>
                <i className="fa fa-file-pdf-o"/> 我要附件上传简历
              </div>
              <input type='file' onChange={this.attachChange} ref={(attachinput)=>{this.attachinput=attachinput}} style={{display:'none'}}/>
            </div>
          </div>

          <NotificationContainer/>

          <div className="modal modal-warning" ref={(modal)=>{this.authModal = modal}} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog animated zoomIn animated-3x" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modelClick}><span aria-hidden="true">
                    <i className="zmdi zmdi-close"></i></span></button>
                  <h3 className="modal-title" id="myModalLabel">Offer猫</h3>
                </div>
                <div className="modal-body">
                  用户没有登录或者登录超时，请重新登录
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-raised btn-default" data-dismiss="modal" onClick={this.modelClick}>确认</button>
                </div>
              </div>
            </div>
          </div>

        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {errorcode, resume, resume_uuid,resume_code} = state.profileinit;
  return {
    errorcode,
    resume,
    resume_uuid,
    resume_code
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResume() {
      dispatch(getResumeBasicRequest());
    },
    postResume(formbody,resume_uuid) {
      dispatch(postResumeBasicRequest(formbody,resume_uuid));
    },
    refreshResume(){
      dispatch(resumeRefresh())
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(profileContainer));