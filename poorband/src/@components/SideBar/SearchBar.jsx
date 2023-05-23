import React from "react";
import { styled } from "styled-components";

export default function SearchBar() {
  return (
    <>
      <Container>
        <article>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const content = event.target;
            }}></form>
          <input id="text" type="text" name="search" placeholder="search" />
          <input type="submit" value="검색"></input>
        </article>
      </Container>
    </>
  );
}

const Container = styled.li`
  padding: 2rem;

  input {
    height: 3rem;
    border: 1px #cccccc solid;
  }

  input:focus {
    border-color: #0982f0;
    outline: none;
  }
`;
