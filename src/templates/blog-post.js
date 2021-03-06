import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";
import ShareTwitter from "../components/ShareTwitter";
import ShareHatena from "../components/ShareHatena";
import tagIcon from "../img/tag-icon.svg";
import "github-markdown-css";

const BlogSection = styled.section`
  margin-top: 14px;
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  location
}) => {
  const PostContent = contentComponent || Content;

  return (
    <BlogSection>
      {helmet || ""}
      <div className="content">
        <h1>{title}</h1>
        {tags && tags.length ? (
          <ul className="tagBox">
            <img src={tagIcon} alt="" />
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        <PostContent content={content} className="mdContent" />
        <div style={{ marginTop: "28px" }}>
          <h2 style={{ color: "#008080", marginBottom: "7px" }}>
            Share Happy?
          </h2>
          <ShareTwitter location={location} text={title} />
          <ShareHatena location={location} />
        </div>
      </div>
      <Link to={"/"} style={{ display: "block", marginTop: "35px" }}>
        TOPへもどる
      </Link>
    </BlogSection>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
  location: PropTypes.object
};

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet 
            title={`${post.frontmatter.title} | Blog`} 
            meta={[
              { name: 'description', content: `${post.frontmatter.title}` },
              { property: 'og:title', content: `${post.frontmatter.title}` },
              { property: 'og:image', content: `${post.frontmatter.image}` },
              { property: 'og:type', content: 'blog' }
            ]}
          />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        location={location}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  }),
  location: PropTypes.object
};

BlogPost.defaultProps = {
  location: {href: "https://spice-z.com"}
}

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY/MMMM/DD")
        title
        description
        image
        tags
      }
    }
  }
`;
