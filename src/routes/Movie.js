import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TOGGLE_LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: ID!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Like = styled.button`
  width: 50px;
  height: 30px;
`;

export default ({ id, isLiked, medium_cover_image }) => {
  const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked }
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <img alt={id} src={medium_cover_image} />
      </Link>
      <Like onClick={toggleLikeMovie}>{isLiked ? "unLike" : "Like"}</Like>
    </Container>
  );
};
