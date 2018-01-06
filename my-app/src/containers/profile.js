import React, {Component} from "react";
import '../css/profile.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom'
import Profileinit from '../components/profiles/profileinit';
import Profilebasic from '../components/profiles/profilebasic';

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
  }

  render() {
    console.log('profile-container will ');
    const {match} = this.props;
    return (
        <div className="profile-container container container-full">
          <div className="col-sm-8">
            <Route path={`${match.url}/profileinit`} component={Profileinit}/>
            <Route path={`${match.url}/profilebasic`} component={Profilebasic}/>
            <Route path={`${match.url}/profilework`} component={Welcome}/>
            <Route path={`${match.url}/profileedu`} component={Welcome}/>
            <Route path={`${match.url}/profileskill`} component={Welcome}/>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="button-panel">
                <div className="col-sm-3">
                  <div className="boxbutton">
                    <div><i className="fa fa-inbox fa-3x"/></div>
                    <div>投递箱</div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="boxbutton">
                    <div><i className="fa fa-file-o fa-3x"/></div>
                    <div>邀请函</div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="boxbutton">
                    <div><i className="fa fa-bookmark-o fa-3x"/></div>
                    <div>订阅览</div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="boxbutton">
                    <div><i className="fa fa-star-o fa-3x"/></div>
                    <div>收藏夹</div>
                  </div>
                </div>
              </div>
              <div className="attach" style={{cursor: 'pointer'}}>
                <i className="fa fa-file-pdf-o"/> 我要附件上传简历
              </div>
            </div>
          </div>
        </div>
    )
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
)(profileContainer));