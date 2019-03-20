import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import hatena from "../img/hatena-logo.svg";

const HatenaBtn = styled.img`
  width: 40px;
  height: 40px;
`;

const ShareHatena = ({ location }) => {
  return (
    <a
      href={"http://b.hatena.ne.jp/entry/" + encodeURI(`https://spice-z.com/${location.pathname}`)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", marginRight: "14px" }}
    >
      <HatenaBtn src={hatena} alt="" />
    </a>
  );
};

ShareHatena.propTypes = {
  location: PropTypes.object
};

export default ShareHatena;
