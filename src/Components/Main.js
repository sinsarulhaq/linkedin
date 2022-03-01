import React from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";

function Main(props) {
  useEffect(() => {
    props.getArticle();
  }, []);
  const [showModal, setShowModal] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };
  const myStyle = {
    width: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <MainCom>
      {
      props.articles.length === 0 ? (
        <img src={"./images/spin.svg"} className='spin' style={myStyle} />
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/gallery.png" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/vedio.png" alt="" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event.png" alt="" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article.png" alt="" />
                <span>Article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src={"./images/spin.svg"} />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/dots.png" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} alt="" />
                      )}
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="/images/like2.svg" alt="" />
                        <img src="/images/clapping2.svg" alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>2 comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="/images/like.png" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment.png" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share.png" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send.png" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </MainCom>
  );
}

const Container = styled.div`
  grid-area: main;
`;
const MainCom = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
  border: none;
  border-radius: 5px;
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #958b7b;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #fff;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 30px;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background: #fff;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-weight: 700;
          font-size: 14px;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-end;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      border: none;
      outline: none;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    background: transparent;
    border: none;
    outline: none;
    border-radius: 5px;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    img {
      width: 25px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
  & > .spin{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
