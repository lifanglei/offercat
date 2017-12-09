import React from 'react'
import '../css/noMatch.css'

const NoMatch = ({ location }) => (
    <div className="nomatch">
      <div className="container">
        <div className="boo-wrapper">
          <div className="boo">
            <div className="face"></div>
          </div>
          <div className="shadow"></div>

          <h1>Whoops!</h1>
          <p>
            找不到对应的路径<code>{location.pathname}</code>
          </p>
        </div>
      </div>
      <div className="text-center animated fadeInUp animation-delay-7" style={{textAlign: 'center'}}>
        <a href="/home/app">
          <i className="zmdi zmdi-home"></i>返回首页</a>
      </div>
    </div>
)
;
export default NoMatch;