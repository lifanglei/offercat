import React, {Component} from "react";
import Slider from "react-slick";
import {connect} from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/banner.css';
import {fetchCompanyListRequest} from '../actions/companyListActions';

import {
  withRouter
} from 'react-router-dom'


class CompanyCard extends React.Component {
  render(){
    const {company,history}= this.props;
    return (
      <div className="ms-thumbnail-container">
        <figure className="ms-thumbnail ms-thumbnail-horizontal">
          <div className="img-wrapper">
          <img className="logo" style={{  height:'120px',    width: 'initial'}} src={company.photo_url} alt="暂无公司logo"/>
          </div>
            <div className="caption">{company.name}</div>
          <figcaption className="ms-thumbnail-caption text-center">
            <div  className="ms-thumbnail-caption-content">
              <p>{company.introduction}</p>
              <a onClick={()=>{history.push('/home/company/'+company.uuid)}} className="btn btn-white btn-raised color-primary">
                进入公司主页<div  className="ripple-container"></div></a>
            </div>
            </figcaption>
        </figure>
      </div>
    )
  }

}
class CompanyBanner extends Component {
  componentWillMount(){
    console.log("banner willMount");
    this.props.fetchCompany();
  }

  componentWillReceiveProps(nextProps) {
      console.log('Companybanner receive next props', nextProps);
  };

  render() {
    const {match,companys,history} = this.props;
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
    const companyCards = companys.map((company)=>{
      return <div key={company.id}><CompanyCard history={history} company={company}/></div>
    });

    return (
        <div className="banner-wrapper">
          <Slider {...settings}>
            {companyCards}
          </Slider>
        </div>
    )
  }
}



function mapStateToProps(state, ownProps) {
  const {companys, currentPage, totalCount, errorMessage} = state.companyList;
  return {
    companys,
    currentPage,
    totalCount,
    errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCompany() {
      dispatch(fetchCompanyListRequest());
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyBanner));