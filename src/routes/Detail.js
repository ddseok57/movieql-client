import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      rating
      language
      description_intro
      medium_cover_image
      isLiked @client
    }
    suggestion(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Suggestion = styled.div`
  display: inline-flex;
  width: 150px;
`;

export default () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <img src={data?.movie?.medium_cover_image} />
          <h1>
            {data?.movie?.title}
            {data?.movie?.isLiked ? "😍" : "🙁"}
          </h1>
          <p>
            {data?.movie?.language} * {data?.movie?.rating}
          </p>
          <p>{data?.movie?.description_intro}</p>
          <Suggestion>
            {data?.suggestion?.map(sug => (
              <div>
                <Link to={`/${sug.id}`}>
                  <img width="100px" src={sug.medium_cover_image} />
                  <p>{sug.title}</p>
                </Link>
              </div>
            ))}
          </Suggestion>
        </div>
      )}
    </div>
  );
};
