import React, {Component} from "react";
import {fetchProfileBasicRequest,profileWorkRequest,profileWorkPost} from '../../actions/profileAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import defaultpng from '../../img/default-profile.png';
import {NotificationManager} from 'react-notifications';


class WorkForm extends Component{
   post = ()=>{
     let payload = {
       company:this.company_name.value,
       position:this.position.value,
       start_date:this.begin_time.value,
       end_date:this.end_time.value
     };
     this.props.post(payload, this.props.work.uuid);
   };
  render(){
    const {work} = this.props;
    return (
        <div className="work-exp-card">
        <div className="form-group">
          <label  className="col-md-2 control-label">公司名称</label>
          <div className="col-md-8">
            <input type="text" className="form-control" ref={(company_name)=>{this.company_name = company_name}} placeholder="公司名称" defaultValue={work&&work.company?work.company:''}/>
          </div>
        </div>
          <div className="form-group">
            <label  className="col-md-2 control-label">岗位</label>
            <div className="col-md-8">
              <input type="text" className="form-control" ref={(position)=>{this.position = position}} placeholder="岗位" defaultValue={work&&work.position?work.position:''}/>
            </div>
          </div>
          <div className="form-group">
            <label  className="col-md-2 control-label">开始时间</label>
            <div className="col-md-4">
              <input type="text" className="form-control" ref={(begin_time)=>{this.begin_time = begin_time}} defaultValue={work&&work.start_date?work.start_date:''} placeholder="开始时间"/>
            </div>
            <label  className="col-md-2 control-label">结束时间</label>
            <div className="col-md-4">
              <input type="text" className="form-control" ref={(end_time)=>{this.end_time = end_time}} defaultValue={work&&work.end_date?work.end_date:''} placeholder="结束时间"/>
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
            }} className="btn btn-raised btn-info">保存并添加一个职位
            </button>
          </div>
          }
        </div>
    )
  }
}

class Profilework extends Component {
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

  };

  render(){
    const {profileinit,profilework} = this.props;
    let profileForms = profilework.map((work,index)=>{
      return <WorkForm post={this.props.postProfilework} work={work} key={index}/>
    });
    profileForms.push(<WorkForm post={this.props.postProfilework} key='-1' work={{}}/>);
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
                    <button style={{backgroundColor:'#009688'}} className="btn btn-raised btn-info" onClick = {this.onClickToNext}>保存并下一步</button>
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
  const {profilework} = state.profilework;
  return {
    profileinit,
    profilework
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileBasic() {
      dispatch(fetchProfileBasicRequest());
    },
    fetchProfilework() {
      dispatch(profileWorkRequest());
    },
    postProfilework(payload,uuid){
      dispatch(profileWorkPost(payload,uuid));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profilework));



