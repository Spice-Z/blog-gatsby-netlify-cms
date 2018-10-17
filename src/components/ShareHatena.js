import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import hatena from "../img/hatena-logo.svg";

const HatenaBtn = styled.img`
  width: 40px;
  height: 40px;
`;

const ShareHatena = ({ url }) => (
  <a
    href={"http://b.hatena.ne.jp/entry/" + encodeURI(url)}
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: "inline-block", marginRight: "14px" }}
  >
    <HatenaBtn src={hatena} alt="" />
  </a>
);

ShareHatena.propTypes = {
  url: PropTypes.string
};

export default ShareHatena;
