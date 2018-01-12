import React, {Component} from "react";
import '../css/jobDetail.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {jobDetailRequest} from '../actions/jobDetailActions';


class jobDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(' jobDetail will mount');
  }

  componentDidMount() {
    console.log('jobDetail DidMount:', this.props);
    this.props.fetchJobDetail(this.props.match.params.positionId);
  }

  componentWillReceiveProps(nextProps) {
    console.log('jobDetail will ReceiveProps', 'nextProps', nextProps);
  };

  render() {
    const {positionDetail} = this.props;
    const shareHolders = positionDetail.company_info && positionDetail.company_info.shareholders? positionDetail.company_info.shareholders.map((sh, index)=>{
      return <span key={index} style={{marginRight:'5px'}}>{sh}</span>
    }):'';
    return (
        <div className="jobDetailContainer container container-full ms-paper bg-white">
          <div className="job-basic-info">
            <div className="row">
              <div className="col-sm-9">
                <div className="job-basic-info-company">
                  {positionDetail.company_info
                  && <span>{positionDetail.company_info.name}</span> }
                  <span style={{marginLeft:'10px'}}>{positionDetail.department}</span>
                </div>
                <div className="job-basic-info-content">
                  <div className="header">
                    <div className="title">
                      {positionDetail.name}
                    </div>
                  </div>
                  <div className="footer">
                    <div className="left">
                      <div className="salary">
                        {positionDetail.salary}
                      </div>
                      <div>
                        {positionDetail.city}
                      </div>
                      <div className="experience">
                        {positionDetail.work_exp_req}/{positionDetail.edu_req}/{positionDetail.type}
                      </div>
                    </div>
                  </div>
                  <div className="time">
                    {positionDetail.created_at} 发布
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="button-panel">
                    <button className="btn btn-raised btn-default"><i className="fa fa-bookmark-o fa-lg" aria-hidden="true"></i>订阅 </button>
                    <button className="btn btn-raised btn-success" style={{backgroundColor:'#009688',color:'white'}}> 投简历 </button>
                </div>
                <div className="share-panel">
                  <span style={{marginRight: '20px'}}>
                    <i className="fa fa-star-o fa-lg" aria-hidden="true"></i>
                    <span style={{marginLeft:'2px'}}>收藏</span>
                  </span>
                  <span style={{marginRight: '10px'}}>分享</span>
                  <span style={{marginRight: '10px',cursor:'pointer'}}><i className="fa fa-wechat fa-lg" aria-hidden="true"></i></span>
                  <span style={{marginRight: '10px',cursor:'pointer'}}><i className="fa fa-weibo fa-lg" aria-hidden="true"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div className="job-detail-info">
            <div className="row ">
              <div className="col-sm-9">
                <div className="job-detail-info-items">
                  <div className="job-description">
                    <div className="col-sm-10">
                      <div>【岗位职责】</div>
                      <div dangerouslySetInnerHTML={{ __html: positionDetail.duty}}>{}</div>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn" style={{backgroundColor:'#009688',color:'white'}}>完善在线简历</button>
                    </div>
                  </div>
                  <div className="job-requirement">
                    <div>【任职要求】</div>
                    <div dangerouslySetInnerHTML={{ __html: positionDetail.detail_req}}>{}</div>
                  </div>
                  <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    工作地址
                    <div className="job-address">
                      <div>
                        {positionDetail.address}
                      </div>
                      <div>
                         <a href={"https://ditu.amap.com/search?query="+positionDetail.address} style={{cursor:'pointer'}} target="_blank">查看地图</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{padding:'15px'}}>
                  职位发布者
                  <div>

                  </div>
                </div>
              </div>
              <div className="col-sm-3" style={{borderLeft:'solid 1px #eee'}}>
                <div className="basic-info">
                  <div className="basic-info-frame">
                    <div style={{marginLeft:'0px',cursor:'pointer'}} onClick={()=>{this.props.history.push('/home/company/'+(positionDetail.company_info?positionDetail.company_info.uuid:'')+'/')}} className="basic-info-frame-item">
                      <div>{positionDetail.company_info
                      && <img width="60px" src={positionDetail.company_info.photo_url}/>}</div>
                      <div className="basic-info-frame-name"> {positionDetail.company_info
                      && <span>{positionDetail.company_info.name}</span> }</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-th-large fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name"> {positionDetail.company_info
                      && <span>{positionDetail.company_info.industry}</span> }</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-line-chart fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name">{positionDetail.company_info
                      && <span>{positionDetail.company_info.stock}</span> }</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-pie-chart fa-2x" aria-hidden="true"></i></div>
                      <div style={{wordBreak: 'break-word'}} className="basic-info-frame-name">{positionDetail.company_info
                      && <span>{shareHolders}</span> }</div>
                    </div>
                    <div className="basic-info-frame-item">
                      <div><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></div>
                      <div className="basic-info-frame-name">{positionDetail.company_info
                      && <span>{positionDetail.company_info.size}</span> }</div>
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
  const {positionDetail} = state.positionDetail;
  return {
    positionDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobDetail(jobid) {
      dispatch(jobDetailRequest(jobid));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(jobDetail));
