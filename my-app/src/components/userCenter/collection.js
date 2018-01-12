import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {collectionRequest} from '../../actions/collectionAction';
import defaultpng from '../../img/default-profile.png';


class Collection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCollections();
  }



  render(){
    return (
        <div className="row">

        </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
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