import React from "react";
import { styled } from "styled-components";

export default function SearchBar() {
  return (
    <>
      <Container>
        <div className="header">
          <input type="text" className="iptSearch" />
          <button type="button" className="search">
            <span>검색</span>
          </button>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    background-color: white;
  }
  .iptSearch {
    width: 100%;
    border: 0.5rem solid #eee;
    line-height: 2rem;
    padding: 0px 1rem;
    margin-right: 1rem;
  }
  button.search {
    width: 100%;
    background-color: #eee;
    padding: 1rem 5rem;
  }
`;
