import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../../css/CollectionCard.css';
import {collectionRequest} from '../../actions/collectionAction';



class CollectionCard extends Component {
  render(){
    const {job} = this.props;
    return (
        <div className="CollectionCard card">
          <div className="first-line">
            <div className="name">
              {job.position_info.name}[{job.position_info.city}]
            </div>
            <div>
              {job.position_info.name}
            </div>
          </div>
          <div className="second-line">
            <div>
              <span  style={{color:'red'}}>{job.position_info.salary}</span>
              <span style={{marginLeft:'20px'}}>
                {job.position_info.work_exp_req}/
                {job.position_info.edu_req}/
                {job.position_info.type}
              </span>
            </div>
            <div>
              <span style={{color:'grey'}}>{job.position_info.created_at}</span>
            </div>
          </div>
        </div>
    )
  }
}



class Collection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCollections();
  }

  render(){
    const {collectionList} = this.props;
    const collectionCards = collectionList.map((c)=>{
      return <CollectionCard job={c} key={c.id}/>
    });
    return (
        <div className="row" style={{paddingRight:'50px'}}>
          <h2>
            我的收藏
          </h2>
          <div>
            {collectionCards}
          </div>
        </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const {collectionList} = state.collection;
  return {
    collectionList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCollections(){
     dispatch(collectionRequest());
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Collection));