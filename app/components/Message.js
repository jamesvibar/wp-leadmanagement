import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "react-format-text";

const Container = styled.div`
  margin: 1em;
  padding: 1em;
  background: #fff;
  border-radius: 5px;
`;

export const Message = ({ data }) => {
  const { message, name, phone, source } = data;
  return (
    <Container>
      <strong>{name}</strong>
      <strong style={{ display: "block" }}>Contact Number: {phone}</strong>
      <strong style={{ display: "block" }}>Source: {source}</strong>
      <hr />
      <Text style={{ fontSize: "1.25em" }}>{message}</Text>
    </Container>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};
