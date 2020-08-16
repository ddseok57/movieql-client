import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "./Movie";

const GET_MOVIES = gql`
  query {
    movies(limit: 30, rating: 8.0) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  width: 100%;
  height: 30vh;
  background-color: #f36f6f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Movies = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Loading = styled.div`
  font-size: 28px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Title>MovieQL</Title>
      <Main>
        <Movies>
          {loading && <Loading>loading...</Loading>}
          {!loading &&
            data?.movies?.map(m => (
              <Movie
                key={m.id}
                id={m.id}
                isLiked={m.isLiked}
                medium_cover_image={m.medium_cover_image}
              />
            ))}
        </Movies>
      </Main>
    </Container>
  );
};
