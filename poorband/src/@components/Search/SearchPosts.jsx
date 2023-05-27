import ArticleCard from "../common/ArticleCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function SearchPosts(props) {
  const { setCenterContent, setArticleSeq, setUserId, reloadFeed, setReloadFeed, searchWord } = props;
  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState();
  const [lastArticleId, setLastArticleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const [scrollFlag, setScrollFlag] = useState(true); // 무한스크롤 O or X

  const getItems = useCallback(
    async (lastId, keepExisting = false) => {
      await axios
        .get(`http://localhost:9000/search/articles`, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
          params: {
            inputText: searchWord,
            lastArticleId: lastId,
          },
        })
        .then((res) => {
          console.log("getItems() 호출성공!!!");
          const newArticles = res.data;

          newArticles.length > 2 ? setScrollFlag(true) : setScrollFlag(false);
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
      console.log("최초 렌더링 후 한 번만 실행");
      setLoading(true);
      getItems(null, false);
    }, []);
  
    // 스크롤 이벤트에 따라 실행
    useEffect(() => {
      if (inView && !loading && scrollFlag) {
        setLoading(true);
        getItems(lastArticleId, true);
        console.log("무한스크롤 요청중!");
      }
      return;
    }, [inView, loading]);
  
  return (
    <>
      <SearchPostsWrapper>

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
                  clickactive={"true"}
                  setReloadFeed={setReloadFeed}
                  onPage={"home"}
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
                  clickactive={"true"}
                  setReloadFeed={setReloadFeed}
                  onPage={"home"}
                />
                <div></div>
              </ArticleWrapper>
            )}
          </React.Fragment>
        ))}

      </SearchPostsWrapper>
    </>
  );
}

const SearchPostsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
`;

const ArticleWrapper = styled.div`
  margin: 2.5rem 0;
`;