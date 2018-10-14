import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';

const NavigationHeader = styled.div`
    background: #fff;
    padding: 21px 35px;
    color: white;
    height: auto;
    width: 100%;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    .blogTitle a{
      color: #008080;
      font-size: 2.0rem;
      font-weight: bold;
    }
    .pageLink {
      margin-left: 35px;
    }
    .pageLink a {
      color: #333;
      font-size: 1.5rem;
    }
`;

const Header = () => (
  <NavigationHeader>
      <div className="blogTitle">
        <Link to="/">
          日々是関数
        </Link>
      </div>
      <div className="pageLink">
        {/* <Link to="/products">
          About
        </Link> */}
    </div>
  </NavigationHeader>
)

export default Header
