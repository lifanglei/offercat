import React, {Component} from "react";
import {JobCard} from '../components/joblist'
import {fetchCustomjobListRequest,customJobsHotOrder,customJobsTimeOrder} from '../actions/customjobListActions';
import {connect} from 'react-redux';
import '../css/banner.css';
import Slider from "react-slick";
import {CompanyCard} from '../components/banner';
import {likeRequest,collectRequest} from '../actions/userActions';
import {withRouter} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class OrderingCard extends  React.Component{

  onTimeClick = ()=>{
    this.time.classList.add('active');
    this.hot.classList.remove('active');
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1){
      this.props.customOrganizationsTimeOrder(this.props.location.search.substring(8));
    }else{
      this.props.customOrganizationsTimeOrder();
    }
  };

  onHotClick = ()=>{
    this.hot.classList.add('active');
    this.time.classList.remove('active');
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1){
      this.props.customOrganizationsHotOrder(this.props.location.search.substring(8));

    }else{
      this.props.customOrganizationsHotOrder();
    }
  };


  render(){
    return (
        <div className="OrderingCard">
          <div className="card" style={{padding:'10px'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{marginLeft:'10px'}}>排序方式:</div>
              <div onClick={this.onTimeClick} ref={(time)=>{this.time=time}} className="active" style={{marginLeft:'10px',cursor:'pointer'}}>更新时间</div>
              <div onClick={this.onHotClick}  ref={(hot)=>{this.hot=hot}} style={{marginLeft:'10px',cursor:'pointer'}}>近期热度</div>
            </div>
          </div>
        </div>

    )
  }
}

class jobsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    console.log("jobsContainer willMount");
    if(this.props.location.search && this.props.location.search.indexOf('?search=')!=-1){
      this.props.fetchCustomJobs(this.props.location.search.substring(8));
    }else{
      this.props.fetchCustomJobs();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCode === 403) {
      this.authModal.classList.add('in');
      this.authModal.style.display = 'block';
    }
  }
  modelClick = ()=>{
    this.authModal.classList.remove('in');
    this.authModal.style.display = 'none';
    this.props.history.push({
      pathname: '/login',
      state: { from: this.props.location }
    });
  };


  render(){
    const {location} = this.props;

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };

    const {history,jobs} = this.props;
    const jobCards =  jobs.map((position)=>{
      return <JobCard likeRequest={this.props.likeRequest} collectRequest={this.props.collectRequest} key={position.uuid} history={history} position={position}/>
    });

    // const companyCards = orgs.map((company)=>{
    //   return <div key={company.id}><CompanyCard history={history} company={company}/></div>
    // });


    console.log('jobsContainer will render');
    return (
        <div>
          <div className="banner-wrapper">
            <Slider {...settings}>
              {/*{companyCards}*/}
            </Slider>
          </div>
          <div className="jobsContainer container container-full " style={{marginTop:'20px'}}>
            <OrderingCard
                customOrganizationsTimeOrder={this.props.customJobsTimeOrder}
                customOrganizationsHotOrder={this.props.customJobsHotOrder}
                location={location}
            />
            <div className="joblist-wrapper">
              {jobCards}
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
  const {jobs,errorCode} = state.customjobList;
  return {
    jobs,
    errorCode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCustomJobs(keyword) {
      dispatch(fetchCustomjobListRequest(keyword));
    },
    customJobsTimeOrder(keyword){
      dispatch(customJobsTimeOrder(keyword))
    },
    customJobsHotOrder(keyword){
      dispatch(customJobsHotOrder(keyword))
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
)(jobsContainer));

