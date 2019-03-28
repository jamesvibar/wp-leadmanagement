import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 1em;
  padding: 1em;
  background: #fff;
  border-radius: 5px;
`;

const Message = ({ data: { message, name, phone, source } }) => {
  return (
    <Container>
      <span>
        <strong>Full Name:</strong> {name}
      </span>
      <span style={{ display: "block" }}>
        <strong>Contact Number:</strong> {phone}
      </span>
      {source ? (
        <span style={{ display: "block" }}>
          <strong>Form Origin:</strong> {source}
        </span>
      ) : (
        ""
      )}

      <hr />
      <p style={{ fontSize: "1.25em" }}>{message}</p>
    </Container>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;
