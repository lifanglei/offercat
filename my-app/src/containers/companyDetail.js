import React, {Component} from "react";
import '../css/companyDetail.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {companyDetailRequest} from '../actions/companyDetailAction';


class JobCard extends React.Component {
  render(){
    const {jobinfo} = this.props;
    return (
        <div className="companyDetailCard" onClick={()=>{this.props.history.push('/home/position/'+jobinfo.uuid)}}>
          <div className="header">
            <div className="title">
              {jobinfo.name} [ {jobinfo.city} ]
            </div>
            <div className="time">
              {jobinfo.created_at}
            </div>
          </div>
          <div className="footer">
            <div className="left">
                <div className="salary">
                  {jobinfo.salary}
                </div>
                <div className="experience">
                  {jobinfo.work_exp_req}/{jobinfo.edu_req}/{jobinfo.type}
                </div>
            </div>
            <div className="right">
            </div>
          </div>
        </div>
    )
  }
}

class companyDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(' companyDetailContainer will mount');
  }

  componentDidMount() {
    console.log('companyDetailContainer componentDidMount:', this.props);
    this.props.fetchJobDetail(this.props.match.params.companyId);
  }

  componentWillReceiveProps(nextProps) {
    console.log('companyDetailContainer will ReceiveProps', 'nextProps', nextProps);
  };

  render() {
    console.log('companyDetailContainer will render ');
    let jobList1=[];
    let jobList2=[];
    let jobList3=[];
    const {companyDetail,history} = this.props;
    const shareHolders = companyDetail.shareholders?companyDetail.shareholders.map((sh)=>{
      return <span style={{marginRight:'5px'}}>{sh}</span>
    }):'';
    if(companyDetail.positions && companyDetail.positions.length){
      jobList1 = companyDetail.positions.filter((po)=>{
        return po.type === '社会招聘'
      }).map((po)=>{
        return <JobCard jobinfo={po} key={po.uuid} history={history}/>
      });
      jobList2 = companyDetail.positions.filter((po)=>{
        return po.type === '校园招聘'
      }).map((po)=>{
        return <JobCard jobinfo={po} key={po.uuid} history={history}/>
      });
      jobList3 = companyDetail.positions.filter((po)=>{
        return po.type === '实习'
      }).map((po)=>{
        return <JobCard jobinfo={po} key={po.uuid} history={history}/>
      });
    }
    return (
        <div className="company-detail-container container container-full">
          <div className="detail-banner">
            <div className="row   ms-paper bg-white">
              <div className="col-sm-3">
                <div className="logo-wrapper">
                  <img className="detail-logo-img"
                       src={companyDetail.photo_url}/>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="company-info">
                  <div>
                    <span style={{fontSize:'larger'}}>{companyDetail.name}</span>
                    <a style={{marginLeft:'20px',color:'grey',cursor:'pointer'}} href={companyDetail.web_site} target="_blank">{companyDetail.web_site}</a>
                  </div>
                  <div style={{marginTop: '60px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <div style={{fontSize:'larger'}}>
                        {companyDetail.positions?companyDetail.positions.length:0}个
                      </div>
                      <div style={{color: '#808080'}}>
                        招聘职位
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row  ms-paper bg-white" style={{padding: '20px'}}>
            <div className="col-sm-9">
              <div className="tab-panel">
                <ul style={{backgroundColor: 'white'}} className="nav nav-tabs nav-tabs-full nav-tabs-4" role="tablist">
                  <li role="presentation" className="active" onClick={() => {
                    this.indicator.style.left = '0px';
                  }}><a className="withoutripple" href="#home2" aria-controls="home2" role="tab" data-toggle="tab"><i
                      className="zmdi zmdi-home"></i> <span>公司主页</span></a></li>
                  <li role="presentation" onClick={() => {
                    this.indicator.style.left = '202px';
                  }}><a className="withoutripple" href="#profile2" aria-controls="profile2" role="tab"
                        data-toggle="tab"><i className="zmdi zmdi-account"></i> <span>社会招聘({jobList1.length})</span></a></li>
                  <li role="presentation" onClick={() => {
                    this.indicator.style.left = '404px';
                  }}><a className="withoutripple" href="#messages2" aria-controls="messages2" role="tab"
                        data-toggle="tab"><i className="zmdi zmdi-account"></i> <span>校园招聘({jobList2.length})</span></a></li>
                  <li role="presentation" onClick={() => {
                    this.indicator.style.left = '608px';
                  }}><a className="withoutripple" href="#settings2" aria-controls="settings2" role="tab"
                        data-toggle="tab"><i className="zmdi zmdi-account"></i> <span>实习({jobList3.length})</span></a></li>
                  <span ref={(indicator) => {
                    this.indicator = indicator
                  }} className="ms-tabs-indicator"
                        style={{backgroundColor: '#009688', left: '0px', width: '200px'}}></span>
                </ul>
                <div className="card-block">
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade active in" id="home2">
                      {companyDetail.description}
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="profile2">
                      {jobList1}
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="messages2">
                      {jobList2}
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="settings2">
                      {jobList3}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="right-pabel">
                <div className="share-panel">
                  <span style={{marginRight: '10px'}}>分享</span>
                  <span style={{marginRight: '10px',cursor:'pointer'}}><i className="fa fa-wechat fa-lg" aria-hidden="true"></i></span>
                  <span style={{marginRight: '10px',cursor:'pointer'}}><i className="fa fa-weibo fa-lg" aria-hidden="true"></i></span>
                </div>
                <div className="basic-info">
                  <span>公司基本信息</span>
                  <div className="basic-info-frame">
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-th-large fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name">{companyDetail.industry}</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-line-chart fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name">{companyDetail.stock}</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-pie-chart fa-2x" aria-hidden="true"></i></div>
                      <div style={{wordBreak: 'break-word'}} className="basic-info-frame-name">{shareHolders}</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name">{companyDetail.size}</div>
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

function mapStateToProps(state, ownProps) {
  const {companyDetail} = state.companyDetail;
  return {
    companyDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobDetail(companyid) {
      dispatch(companyDetailRequest(companyid));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(companyDetailContainer));
