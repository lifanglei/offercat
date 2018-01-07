import React, {Component} from "react";
import {fetchProfileBasicRequest,postProfileBasicRequest} from '../../actions/profileAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import defaultpng from '../../img/default-profile.png';
import {NotificationManager} from 'react-notifications';

class Profilebasic extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile int did mount');
    this.props.fetchProfileBasic();
  }

  componentWillReceiveProps(nextProps) {

  }

  onCancelClick = ()=>{
    // this.props.history.push({});
  };


  onClickToNext = ()=>{
    let formbody = new FormData();
    formbody.append('first_name',this.first_name.value);
    formbody.append('last_name',this.last_name.value);
    formbody.append('tel',this.tel.value);
    formbody.append('email',this.email.value);
    formbody.append('address',this.address.value);
    formbody.append('edu_degree',this.edu_degree.value);
    formbody.append('service_years',this.service_years.value);
    formbody.append('description',this.description.value);
    if(this.imginput.files && this.imginput.files[0]){
      formbody.append('avatar', this.imginput.files[0]);
    }
    this.props.postProfileBasic(formbody,this.props.profileinit.uuid);
    NotificationManager.success('保存成功', '消息通知',1500);
    this.props.history.push('/home/profile/profilework');
  };

  onimageChange = ()=>{
    if(this.imginput.files && this.imginput.files[0]){
      const reader = new FileReader();
      reader.onload = (e)=>{
        this.avatar.src = e.target.result;
      };
      reader.readAsDataURL(this.imginput.files[0]);
    }
  };

  render(){
    const {profileinit} = this.props;
    console.log(profileinit);
    return (
        <div className="card">
          <div className="ms-hero-bg-primary ms-hero-img-coffee" style={{cursor:'pointer'}} onClick={()=>{this.imginput.click();}}>
            <h3 className="color-white index-1 text-center no-m pt-4">基本信息</h3>
            <img ref={(avatar)=>{this.avatar = avatar}} src={profileinit.avatar_url?profileinit.avatar_url:defaultpng} className="img-avatar-circle"/>
            <input type='file' accept="image/*" onChange={this.onimageChange} ref={(imginput)=>{this.imginput=imginput}} style={{display:'none'}}/>
          </div>
          <div className="card-block pt-4 text-center">
            <div className="basic-edit editing row">
              <div className="form-horizontal">
                {profileinit.uuid && (<fieldset>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">姓</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(last_name)=>{this.last_name=last_name}} placeholder="姓" defaultValue={profileinit.last_name?profileinit.last_name:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">名</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(first_name)=>{this.first_name=first_name}} placeholder="名" defaultValue={profileinit.first_name?profileinit.first_name:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">电话</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(tel)=>{this.tel=tel}} placeholder="电话" defaultValue={profileinit.tel?profileinit.tel:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">邮箱</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(email)=>{this.email=email}} placeholder="邮箱" defaultValue={profileinit.email?profileinit.email:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">现在居住地</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control"  ref={(address)=>{this.address=address}} placeholder="居住地" defaultValue={profileinit.address?profileinit.address:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">学历</label>
                    <div className="col-md-8">
                      <select ref={(edu_degree)=>{this.edu_degree=edu_degree}}  defaultValue={profileinit.edu_degree?profileinit.edu_degree:1} className="form-control selectpicker">
                        <option value='1'>本科</option>
                        <option value='2'>硕士</option>
                        <option value='3'>博士</option>
                        <option value='4'>MBA</option>
                        <option value='5'>其他</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">工作年限</label>
                    <div className="col-md-8">
                      <select ref={(service_years)=>{this.service_years=service_years}} defaultValue={profileinit.service_years?profileinit.service_years:1} className="form-control selectpicker">
                        <option value='1'>在读</option>
                        <option value='2'>应届生</option>
                        <option value='3'>1-3年</option>
                        <option value='4'>3-5年</option>
                        <option value='5'>5年以上</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">个人简介</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(description)=>{this.description = description}} defaultValue={profileinit.description?profileinit.description:''} placeholder="一句话描述自己"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <button style={{backgroundColor:'#009688'}} className="btn btn-raised btn-info" onClick = {this.onClickToNext}>保存</button>
                    <button style={{marginLeft:'10px'}} className="btn btn-raised btn-default" onClick = {this.onCancelClick}>取消</button>
                  </div>
                </fieldset>)}
              </div>
            </div>
          </div>
        </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const {profileinit,errorcode} = state.profileinit;
  return {
    profileinit,
    errorcode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileBasic() {
      dispatch(fetchProfileBasicRequest());
    },
    postProfileBasic(payload,uuid){
      dispatch(postProfileBasicRequest(payload,uuid));
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profilebasic));



