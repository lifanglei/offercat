import React, {Component} from "react";
import '../css/jobList.css'

import {
  withRouter
} from 'react-router-dom'


class JobCard extends React.Component {
  render(){
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
                          <div className="title col-sm-4">
                            title
                          </div>
                          <div className="col-sm-8">
                            info
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <span>地点</span>
                        <span>发布时间</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="card-block">
                    <h4 className="color-danger">Lorem ipsum dolor sit</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sed labore autem nesciunt ea veniam recusandae necessitatibus reprehenderit.</p>
                  </div>
                </div>
                <div className ="col-sm-3">
                  <div className="logo-container">
                    <div style={{display: 'flex',alignItems: 'center',cursor:'pointer'}}>
                      company name
                    </div>
                    <div className="withripple zoom-img" style={{cursor:'pointer'}}>
                      <img style={{  height:'100px'}} src="http://localhost:8080/media/company/id_None/200911421451673499.jpg"/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="tool-footer">
                    <div className="col-sm-9">
                      <div className="buttons">
                        <div>
                          订阅
                        </div>
                        <div>
                          点赞
                        </div>
                        <div>
                          分享
                        </div>
                        <div>
                          点赞
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="hint">
                          来自订阅职位
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
class JobList extends Component {
  render() {
    const {match} = this.props;


    return (
        <div className="joblist-wrapper">
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
        </div>
    )
  }
}

export default withRouter(JobList);