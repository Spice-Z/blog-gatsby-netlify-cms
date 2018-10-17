import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import twitter from "../img/twitter-square-icon.svg";

const TwitterBtn = styled.img`
  width: 40px;
  height: 40px;
`;

const ShareTwitter = ({ url, text }) => (
  <a
    href={
      "https://twitter.com/intent/tweet?text=" + text + "%0a&url=" + encodeURI(url)
    }
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: "inline-block", marginRight: "14px" }}
  >
    <TwitterBtn src={twitter} alt="" />
  </a>
);

ShareTwitter.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string
};

export default ShareTwitter;
