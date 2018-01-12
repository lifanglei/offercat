import React, {Component} from "react";
import JobList from  '../components/joblist';
import SearchComponent from '../components/searchComponent';

class landingContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('landingContainer will mount');
  }
  render(){
    console.log('landingContainer will ');
    return (
        <div className="welcome-container">
          <div>
            <SearchComponent/>
          </div>
          <div className="main">
            <div className="container container-full">
              <h3>热门职位</h3>
              <JobList/>
            </div>
          </div>
        </div>
    )
  }
}

export default landingContainer;