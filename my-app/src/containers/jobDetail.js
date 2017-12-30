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
    return (
        <div className="jobDetailContainer container container-full ms-paper bg-white">
          <div className="job-basic-info">
            1
          </div>
          <div className="job-detail-info">
            <div className="row ">
              <div className="col-sm-9">
                2
              </div>
              <div className="col-sm-3">
                3
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
