import React, { useState, useEffect, useCallback } from "react";
import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import axios from "axios";

export default function Feed(props) {
  const { setCenterContent, setArticleSeq, setUserId, reloadFeed, setReloadFeed } = props;
  const [articleType, setArticleType] = useState();

  const [articles, setArticles] = useState([]);
  const [lastArticleId, setLastArticleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView();

  const getItems = useCallback(
    async (lastId, keepExisting = false) => {
      await axios
        .get(`http://localhost:9000/article/selectAll`, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
          params: {
            lastArticleId: lastId,
            size: 4,
          },
        })
        .then((res) => {
          const newArticles = res.data;
          setArticles((prevState) => (keepExisting ? [...prevState, ...newArticles] : newArticles));

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
    },
    [lastArticleId],
  );

  // 최초 렌더링 후 한 번만 실행
  useEffect(() => {
    setLoading(true);
    getItems(null, false);
  }, []);

  // 스크롤 이벤트에 따라 실행
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      getItems(lastArticleId, true);
      console.log("무한스크롤 요청중!");
    }
    return;
  }, [inView, loading]);

  useEffect(() => {
    // console.log("피드가 감지했음.");
    if (reloadFeed) {
      const lastId = null;
      setLastArticleId(null);
      getItems(lastId, false).then(() => {
        // console.log("데이터 로드 완료");
        setReloadFeed(false);
      });
    }
  }, [reloadFeed]);

  return (
    <FeedWrapper>
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
              />
              <div></div>
            </ArticleWrapper>
          )}
        </React.Fragment>
      ))}
    </FeedWrapper>
  );
}

const FeedWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
`;

const ArticleWrapper = styled.div`
  margin: 2.5rem 0;
`;
