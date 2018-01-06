import React, {Component} from "react";
import {fetchProfileBasicRequest} from '../../actions/profileAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import defaultpng from '../../img/default-profile.png';

class Profilebasic extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile int did mount');
    this.props.fetchProfileBasic();
  }

  onClickToNext = ()=>{
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
    return (
        <div className="card">
          <div className="ms-hero-bg-primary ms-hero-img-coffee" style={{cursor:'pointer'}} onClick={()=>{this.imginput.click();}}>
            <img ref={(avatar)=>{this.avatar = avatar}} src={defaultpng} className="img-avatar-circle"/>
            <input type='file' accept="image/*" onChange={this.onimageChange} ref={(imginput)=>{this.imginput=imginput}} style={{display:'none'}}/>
          </div>
          <div className="card-block pt-4 text-center">
            <div className="basic-edit editing row">
              <form className="form-horizontal">
                <fieldset>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">姓名</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(full_name)=>{this.full_name=full_name}} placeholder="姓名" value={profileinit.full_name?profileinit.full_name:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">电话</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" ref={(tel)=>{this.tel=tel}} placeholder="电话" value={profileinit.tel?profileinit.tel:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">邮箱</label>
                    <div className="col-md-8">
                      <input type="email" className="form-control" ref={(email)=>{this.email=email}} placeholder="邮箱" value={profileinit.email?profileinit.email:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">现在居住地</label>
                    <div className="col-md-8">
                      <input type="email" className="form-control"  ref={(address)=>{this.address=address}} placeholder="居住地" value={profileinit.address?profileinit.address:''}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">学历</label>
                    <div className="col-md-8">
                      <select className="form-control selectpicker">
                        <option>本科</option>
                        <option>硕士</option>
                        <option>博士</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">工作年限</label>
                    <div className="col-md-8">
                      <select className="form-control selectpicker">
                        <option>1-3年</option>
                        <option>3-5年</option>
                        <option>5年以上</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-2 control-label">个人简介</label>
                    <div className="col-md-8">
                      <input type="email" className="form-control" ref={(description)=>{this.description = description}} value={profileinit.description?profileinit.description:''} placeholder="一句话描述自己"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <button style={{backgroundColor:'#009688'}} className="btn btn-raised btn-info" onClick={this.onClickToNext}>保存</button>
                    <button style={{marginLeft:'10px'}} className="btn btn-raised btn-default">取消</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const {profileinit} = state.profileinit;
  return {
    profileinit
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileBasic() {
      dispatch(fetchProfileBasicRequest());
    }
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profilebasic));



