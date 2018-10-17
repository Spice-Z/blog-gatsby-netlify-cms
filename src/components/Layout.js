import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import SideBar from '../components/SideBar'
import 'normalize.css';
import './all.sass'
import styled from 'styled-components';

const MainContants = styled.div`
margin-top: 14px;
padding: 0 35px;
display: flex;
.posts{
  width:70%;
}
SideBar{
  width: 30%;
}
@media (max-width:768px){
  flex-direction: column;
  padding: 14px;
  .posts{
    width: 100%;
    padding: 0 7px;
  }
}
`
const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="日々是関数" />
    <Header />
    <MainContants>
      <div className="posts">{children}</div>
      <SideBar className="sideBar"></SideBar>
    </MainContants>
  </div>
)

export default TemplateWrapper
