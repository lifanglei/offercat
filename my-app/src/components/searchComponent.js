import React, {Component} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  withRouter
} from 'react-router-dom'

class searchComponent extends Component {

  onsearchClick = ()=>{
    if(this.keyword.value){
      if(this.type.value==='公司'){
        this.props.history.push('/home/organizations?search='+this.keyword.value);
      }else if(this.type.value==='职位'){
        this.props.history.push('/home/jobs?search='+this.keyword.value);
      }
    }
  };

  componentDidMount(){

  }

  render() {
    const {match} = this.props;
    return (
        <div className="searchComponent ms-hero-page ms-hero-img-city2 ms-hero-bg-info">
          <div className="container">
            <div className="text-center">
              <h1 className="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5">工作/职位搜索
              </h1>
              <form className=" mt-4 mw-800 center-block animated fadeInUp">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group color-white label-floating input-group display-block is-empty">
                      <div>
                        <select ref={(type)=>{this.type=type}} className="form-control color-white">
                          <option value='公司'>公司</option>
                          <option value='职位'>职位</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group label-floating input-group display-block is-empty">
                      <label className="control-label color-white" htmlFor="ms-class-search">
                        <i className="zmdi zmdi-local-offer mr-1"></i> 关键字</label>
                      <input type="text" ref={(keyword)=>{this.keyword = keyword}} className="form-control color-white"/> </div>
                  </div>
                </div>
                <button type="button" className="btn btn-raised btn-primary btn-block" onClick={this.onsearchClick}>
                  <i className="zmdi zmdi-search"></i> 搜索</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(searchComponent);

