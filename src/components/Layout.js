import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import SideBar from '../components/SideBar'
import 'normalize.css';
import './all.sass'
import styled from 'styled-components';

const Contents = styled.div`
max-width: 1280px;
margin: 14px auto;
padding: 0 35px;
display: flex;
.main{
  width:70%;
}
SideBar{
  width: 30%;
}
@media (max-width:768px){
  flex-direction: column;
  padding: 14px;
  .main{
    width: 100%;
    padding: 0 7px;
  }
}
`
const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="日々是関数" />
    <Header />
    <Contents>
      <div className="main">{children}</div>
      <SideBar className="sideBar"></SideBar>
    </Contents>
  </div>
)

export default TemplateWrapper
