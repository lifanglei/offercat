import React, {Component} from "react";
import {connect} from 'react-redux';
import '../css/jobList.css';
import {fetchPositionListRequest} from '../actions/positionListActions';
import {likeRequest,collectRequest} from '../actions/userActions';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {localstore} from '../store/localstore';

import {
  withRouter
} from 'react-router-dom'


class JobCard extends React.Component {

  onClickToPosition = (companyId)=>{
    this.props.history.push('/home/position/'+companyId)
  };

  onClickToCompany  = (positionId)=>{
    this.props.history.push('/home/company/'+positionId)
  };

  onClickLike = (position,e)=>{
    if(localstore.getToken()){
      this.props.likeRequest(position);
      let btn = this.likeBtn.firstChild;
      if(btn.classList.contains('fa-thumbs-up') ){
        btn.classList.add('fa-thumbs-o-up')
        btn.classList.remove('fa-thumbs-up');
      }else{
        btn.classList.remove('fa-thumbs-o-up')
        btn.classList.add('fa-thumbs-up');
      }
    }else{
      this.props.history.push({
        pathname: '/login',
        state: { from: this.props.location }
      });
    }
  };

  onClickCollect = (position)=>{
    if(localstore.getToken()){
      this.props.collectRequest(position);
      let btn = this.collectBtn.firstChild;
      if(btn.classList.contains('fa-star-o') ){
        btn.classList.add('fa-star');
        btn.classList.remove('fa-star-o');
      }else{
        btn.classList.remove('fa-star');
        btn.classList.add('fa-star-o');
      }
    }else{
      this.props.history.push({
        pathname: '/login',
        state: { from: this.props.location }
      });
    }
  };

  render(){
    const {position} = this.props;
    return (
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card-header">
                    <div className="info-header">
                      <div className="col-sm-9">
                        <div className="title-wrapper">
                          <div onClick={()=>{this.onClickToPosition(position.uuid)}} className="title col-sm-4">
                            {position.name}
                          </div>
                          <div className="col-sm-8">
                            <div className="subinfo" style={{color:'gray'}}>
                              <span>{position.department}</span>
                              <span style={{marginLeft:'20px'}}>{position.edu_req}</span>/
                              <span>{position.work_exp_req}</span>/
                              <span>{position.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <span>{position.city}</span>
                        <span style={{marginLeft:"20px"}}>[ {position.created_at}发布 ]</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="card-block" style={{paddingLeft: '50px'}}>
                    <h4 className="color-info">岗位职责</h4>
                    <p>{position.detail_req}</p>
                  </div>
                </div>
                <div className ="col-sm-3">
                  <div className="logo-container" onClick={()=>{this.onClickToCompany(position.company_info.uuid)}}>
                    <div className="col-sm-4" style={{justifyContent: 'flex-end',display: 'flex',alignItems: 'center',cursor:'pointer', paddingRight:'0px', paddingLeft:'0px'}}>
                      {position.company_info.name}
                    </div>
                    <div className="col-sm-6 withripple zoom-img" style={{cursor:'pointer'}}>
                      <img style={{  width:'100px'}} src={position.company_info.photo_url}/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="tool-footer">
                    <div className="col-sm-9">
                      <div className="buttons">
                        <div>
                          {position.is_certified?(<i className="fa fa-bookmark fa-lg" aria-hidden="true"/>):(<i className="fa fa-bookmark-o fa-lg" aria-hidden="true"/>)}
                          <span style={{marginLeft:'2px'}}>订阅</span>
                        </div>
                        <div ref={(btn)=>{this.collectBtn = btn}} onClick={()=>{this.onClickCollect(position.uuid)}}>
                          {position.is_collected?(<i className="fa fa-star fa-lg" aria-hidden="true"/>):(<i className="fa fa-star-o fa-lg" aria-hidden="true"/>)}
                          <span style={{marginLeft:'2px'}}>收藏</span>
                        </div>
                        <div>
                          <i className="fa fa-share-square-o fa-lg" aria-hidden="true"></i>
                          <span style={{marginLeft:'2px'}}>分享</span>
                        </div>
                        <div ref={(btn)=>{this.likeBtn=btn}} onClick={()=>{this.onClickLike(position.uuid)}}>
                          {position.is_lauded ?(<i className="fa fa-thumbs-up fa-lg" aria-hidden="true"/>):(<i className="fa fa-thumbs-o-up fa-lg" aria-hidden="true"/>)}
                          <span style={{marginLeft:'2px'}}>点赞</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="hint">
                          {/*来自订阅职位*/}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export {JobCard};

class JobList extends Component {

  componentWillMount(){
    console.log("position card willMount");
    this.props.fetchPositions();
  }

  componentWillReceiveProps(nextProps) {
    console.log('position card receive next props', nextProps);
  };


  render() {
    const {history,positions} = this.props;
    console.log(this.props);
    const positioncards = positions.map((position)=>{
      return <JobCard likeRequest={this.props.likeRequest} collectRequest={this.props.collectRequest} key={position.uuid} history={history} position={position}/>
    });
    return (
        <div className="joblist-wrapper">
          {positioncards}
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {positions, currentPage, totalCount, errorMessage} = state.positionList;
  return {
    positions,
    currentPage,
    totalCount,
    errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPositions() {
      dispatch(fetchPositionListRequest());
    },
    likeRequest(position){
      dispatch(likeRequest(position));
    },
    collectRequest(position){
      dispatch(collectRequest(position));
    }
  }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(JobList));


