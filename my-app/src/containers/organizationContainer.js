import React, {Component} from "react";
import {fetchCustomOrganizationsListRequest,customOrganizationsTimeOrder,customOrganizationsLengthOrder,customOrganizationsHotOrder} from '../actions/customOrganizationActions';
import {connect} from 'react-redux';
import '../css/organizationsContainer.css';
import {CompanyCard} from '../components/banner';
import '../css/banner.css';
import Slider from "react-slick";
import {withRouter} from 'react-router-dom';

class OrderingCard extends  React.Component{

  onTimeClick = ()=>{
    this.time.classList.add('active');
    this.hot.classList.remove('active');
    this.count.classList.remove('active');
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1){
      this.props.customOrganizationsTimeOrder(this.props.location.search.substring(8));
    }else{
      this.props.customOrganizationsTimeOrder();
    }

  };

  onHotClick = ()=>{
    this.hot.classList.add('active');
    this.time.classList.remove('active');
    this.count.classList.remove('active');
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1){
      this.props.customOrganizationsHotOrder(this.props.location.search.substring(8));

    }else{
      this.props.customOrganizationsHotOrder();
    }
  };

  onCountClick =()=>{
    this.count.classList.add('active');
    this.time.classList.remove('active');
    this.hot.classList.remove('active');
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1){
      this.props.customOrganizationsLengthOrder(this.props.location.search.substring(8));
    }else{
      this.props.customOrganizationsLengthOrder();
    }
  };

  render(){
    return (
        <div className="OrderingCard" style={{paddingLeft:'15px',paddingRight:'15px'}}>
          <div className="card" style={{padding:'10px'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{marginLeft:'10px'}}>排序方式:</div>
              <div onClick={this.onTimeClick} ref={(time)=>{this.time=time}} className="active" style={{marginLeft:'10px',cursor:'pointer'}}>更新时间</div>
              <div onClick={this.onHotClick}  ref={(hot)=>{this.hot=hot}} style={{marginLeft:'10px',cursor:'pointer'}}>近期热度</div>
              <div onClick={this.onCountClick} ref={(count)=>{this.count=count}} style={{marginLeft:'10px',cursor:'pointer'}}>职位数量</div>
            </div>
          </div>
        </div>

    )
  }
}

class OrgCard extends React.Component {
  render(){
    const org = this.props.org;
    return (
        <div className="col-sm-3">
          <div className="card  org-card" onClick={()=>{this.props.history.push('/home/company/'+org.uuid)}}>
            <div className="img-wrapper">
              <img src={org.photo_url}/>
            </div>
            <div className="org-name">
              {org.name}
            </div>
            <div className="org-intro">
              {org.introduction}
            </div>
            <div className="org-footer">
              <div>在招职位：{org.positions.length}</div>
              <div>{org.industry}</div>
            </div>
          </div>
        </div>
    )
  }
}

class organizationContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("organizationsContainer willMount");
    if (this.props.location.search && this.props.location.search.indexOf('?search=') != -1) {
        this.props.fetchCustomOrganizations(this.props.location.search.substring(8));
      }else{
        this.props.fetchCustomOrganizations();
      }
  }

  render(){
    const {history,orgs, location} = this.props;

    const orgCards =  orgs.map(org=>{
      return <OrgCard key={org.uuid} history={history} org={org}/>
    });

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

    console.log('organizationsContainer will render');

    const companyCards = orgs.map((company)=>{
      return <div key={company.id}><CompanyCard history={history} company={company}/></div>
    });

    return (
        <div>
          <div className="banner-wrapper">
            <Slider {...settings}>
              {companyCards}
            </Slider>
          </div>
          <div className="organizationsContainer container container-full">
            <OrderingCard customOrganizationsTimeOrder={this.props.customOrganizationsTimeOrder}
                          customOrganizationsLengthOrder={this.props.customOrganizationsLengthOrder}
                          customOrganizationsHotOrder={this.props. customOrganizationsHotOrder}
                          location={location}
            />
            <div className="organizationsContainer-wrapper">
                {orgCards}
            </div>
          </div>
        </div>
    )

  }
}

function mapStateToProps(state, ownProps) {
  const {orgs} = state.customOrgList;
  return {
    orgs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCustomOrganizations(keyword) {
      dispatch(fetchCustomOrganizationsListRequest(keyword));
    },
    customOrganizationsTimeOrder(keyword){
      dispatch(customOrganizationsTimeOrder(keyword));
    },
    customOrganizationsLengthOrder(keyword){
      dispatch(customOrganizationsLengthOrder(keyword));
    },
    customOrganizationsHotOrder(keyword){
      dispatch(customOrganizationsHotOrder(keyword));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(organizationContainer));

