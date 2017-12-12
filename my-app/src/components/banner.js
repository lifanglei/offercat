import React, {Component} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/companyBanner.less';

import {
  withRouter
} from 'react-router-dom'


class CompanyCard extends React.Component {
  render(){
    return (
      <div className="ms-thumbnail-container">
        <figure className="ms-thumbnail ms-thumbnail-horizontal">
          <div className="img-wrapper">
          <img className="logo" style={{  height:'120px',width:'120px'}} src="//www.lgstatic.com/i/image/M00/25/23/CgqKkVcdz7uAGGO3AAANQYQXTVQ154.jpg" alt="滴度科技logo"/>
          </div>
            <div className="caption">company name</div>
          <figcaption className="ms-thumbnail-caption text-center">
            <div  className="ms-thumbnail-caption-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <a href="javascript:void(0)"  className="btn btn-white btn-raised color-primary">
                进入公司主页<div  className="ripple-container"></div></a>
            </div>
            </figcaption>
        </figure>
      </div>
    )
  }

}
class CompanyBanner extends Component {
  render() {
    const {match} = this.props;
    var settings = {
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

    return (
        <div className="banner-wrapper">
          <Slider {...settings}>
            <div><CompanyCard/></div>
            <div><CompanyCard/></div>
            <div><CompanyCard/></div>
            <div><CompanyCard/></div>
            <div><CompanyCard/></div>
            <div><CompanyCard/></div>
          </Slider>
        </div>
    )
  }
}

export default withRouter(CompanyBanner);