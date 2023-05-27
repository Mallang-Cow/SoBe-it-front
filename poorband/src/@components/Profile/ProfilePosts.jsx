import React, { useCallback, useEffect, useState } from "react";
import ArticleCard from "../common/ArticleCard";
import axios from "axios";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";

export default function ProfilePosts(props) {
  const { setCenterContent, setArticleSeq, setUserId, userId, reloadFeed, setReloadFeed } = props;
  const [articleType, setArticleType] = useState();

  const [articles, setArticles] = useState([]);
  const [lastArticleId, setLastArticleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    await axios
      .get(`http://localhost:9000/article/list`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        params: {
          lastArticleId: lastArticleId, // Long
          userId: userId, // String
        },
      })
      .then((res) => {
        const newArticles = res.data;
        setArticles((prevState) => [...prevState, ...newArticles]);

        // set the lastArticleId as the last fetched article's id
        const lastFetchedArticle = newArticles[newArticles.length - 1];
        if (lastFetchedArticle) {
          setLastArticleId(lastFetchedArticle.articleSeq);
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lastArticleId]);

  // 최초 렌더링 후 한 번만 실행
  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);

  // 스크롤 이벤트에 따라 실행
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      getItems();
      console.log("무한스크롤 요청중!");
    }
    return;
  }, [inView, loading]);

  return (
    <ProfilePostsWrapper>
      {(Array.isArray(articles) ? articles : []).map((article, idx) => (
        <React.Fragment key={idx}>
          {articles.length - 1 === idx ? (
            <ArticleWrapper>
              <ArticleCard
                articleSeq={article.articleSeq}
                setCenterContent={setCenterContent}
                setArticleSeq={setArticleSeq}
                setUserId={setUserId}
                setArticleType={setArticleType}
                clickActive={true}
                setReloadFeed={setReloadFeed}
                onPage={"profile"}
              />
              <div ref={ref}></div>
            </ArticleWrapper>
          ) : (
            <ArticleWrapper>
              <ArticleCard
                articleSeq={article.articleSeq}
                setCenterContent={setCenterContent}
                setArticleSeq={setArticleSeq}
                setUserId={setUserId}
                setArticleType={setArticleType}
                clickActive={true}
                setReloadFeed={setReloadFeed}
                onPage={"profile"}
              />
              <div></div>
            </ArticleWrapper>
          )}
        </React.Fragment>
      ))}
    </ProfilePostsWrapper>
  );
}

const ProfilePostsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
`;

const ArticleWrapper = styled.div`
  margin: 2.5rem 0;
`;
