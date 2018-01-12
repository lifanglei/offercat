import React, {Component} from "react";
import {fetchProfileBasicRequest,profileEduRequest,profileEDUPost} from '../../actions/profileAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import defaultpng from '../../img/default-profile.png';
import {NotificationManager} from 'react-notifications';


class WorkForm extends Component{
  post = ()=>{
    let payload = {
      college:this.college.value,
      major:this.major.value,
      degree:this.degree.value,
      graduate_date:this.graduate_date.value
    };
    this.props.post(payload, this.props.work.uuid);
  };
  render(){
    const {work} = this.props;
    return (
        <div className="work-exp-card">
          <div className="form-group">
            <label  className="col-md-2 control-label">学校名称</label>
            <div className="col-md-8">
              <input type="text" className="form-control" ref={(college)=>{this.college = college}} placeholder="学校名称" defaultValue={work&&work.college?work.college:''}/>
            </div>
          </div>
          <div className="form-group">
            <label  className="col-md-2 control-label">专业</label>
            <div className="col-md-8">
              <input type="text" className="form-control" ref={(major)=>{this.major = major}} placeholder="专业" defaultValue={work&&work.major?work.major:''}/>
            </div>
          </div>
          <div className="form-group">
            <label  className="col-md-2 control-label">学位</label>
            <div className="col-md-4">
              <select ref={(degree)=>{this.degree=degree}}  defaultValue={work&&work.degree?work.degree:1} className="form-control">
                <option value='1'>本科</option>
                <option value='2'>硕士</option>
                <option value='3'>博士</option>
                <option value='4'>MBA</option>
              </select>
            </div>
            <label  className="col-md-2 control-label">毕业时间</label>
            <div className="col-md-4">
              <input type="number" className="form-control" min="1900" max="2099" step="1" ref={(graduate_date)=>{this.graduate_date = graduate_date}} defaultValue={work&&work.graduate_date?work.graduate_date:''} placeholder="毕业时间" />
            </div>
          </div>
          {work.uuid&&
          <div className="row">
            <div className="col-md-7">
            </div>
            <div className="col-md-5">
              <button className="btn" onClick={()=>{
                this.post();
                NotificationManager.success('保存修改成功', '消息通知',1500);
              }}>保存修改</button>
              <button className="btn">删除</button>
            </div>
          </div>}
          {!work.uuid &&
          <div className="form-group">
            <button style={{backgroundColor: '#009688'}} onClick={() => {
              this.post();
              NotificationManager.success('添加成功', '消息通知',1500);
              {/*window.location.reload();*/}
            }} className="btn btn-raised btn-info">保存并添加一段教育经历
            </button>
          </div>
          }
        </div>
    )
  }
}

class Profileedu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile work did mount');
    this.props.fetchProfileBasic();
    this.props.fetchProfilework();
  }

  componentWillReceiveProps(nextProps) {

  }

  onCancelClick = ()=>{
    // this.props.history.push({});
  };


  onClickToNext = ()=>{
    this.props.history.push('/home/profile/profileskill');
  };

  render(){
    const {profileinit,profileedu} = this.props;
    let profileForms = profileedu.map((work,index)=>{
      return <WorkForm post={this.props.postProfileedu} work={work} key={index}/>
    });
    profileForms.push(<WorkForm post={this.props.postProfileedu} key='-1' work={{}}/>);
    return (
        <div className="card">
          <div className="ms-hero-bg-primary ms-hero-img-coffee" style={{cursor:'pointer'}}>
            <img src={profileinit.avatar_url?profileinit.avatar_url:defaultpng} className="img-avatar-circle"/>
          </div>
          <div className="card-block pt-4 text-center">
            <div className="basic-edit editing row">
              <div className="form-horizontal">
                {
                  <fieldset>
                    {profileForms}
                    <div className="form-group">
                      <button style={{backgroundColor:'#009688'}} className="btn btn-raised btn-info" onClick = {this.onClickToNext}>下一步</button>
                      <button style={{marginLeft:'10px'}} className="btn btn-raised btn-default" onClick = {this.onCancelClick}>取消</button>
                    </div>
                  </fieldset>}
              </div>
            </div>
          </div>
        </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const {profileinit} = state.profileinit;
  const {profileedu} = state.profileedu;
  return {
    profileinit,
    profileedu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileBasic() {
      dispatch(fetchProfileBasicRequest());
    },
    fetchProfilework() {
      dispatch(profileEduRequest());
    },
    postProfileedu(payload,uuid){
      dispatch(profileEDUPost(payload,uuid));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profileedu));



