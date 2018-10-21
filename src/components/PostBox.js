import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostBox = ({ link, title, date, description }) => (
  <div className="postBox">
    <p>
      <Link to={link}>{title}</Link>
      <span> / </span>
      <small>{date}</small>
    </p>
    <p className="description">
      {description}
      <br />
      <br />
      <Link className="button" to={link}>
        続きを読む →
      </Link>
    </p>
  </div>
);

PostBox.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string
};

export default PostBox;
