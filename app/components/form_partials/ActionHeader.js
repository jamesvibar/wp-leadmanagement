import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const ContentHeader = styled.header`
  font-size: 1.25em;
  margin: 0.5em auto;
`;

const ActionHeader = ({ data: { id, name, date_send, last_edit } }) => (
  <ContentHeader>
    <h1 style={{ margin: "0 0 0.25em" }}>
      Editing #{id}: {name}
    </h1>
    <p style={{ margin: "0px" }}>
      <strong>Date Submitted:</strong>{" "}
      <Moment format="MMMM DD, YYYY">{date_send}</Moment>
    </p>
    {last_edit ? (
      <p style={{ marginTop: "0px" }}>
        <strong>Last Edited:</strong>{" "}
        <Moment format="MMMM DD, YYYY">{last_edit}</Moment>
      </p>
    ) : (
      ""
    )}
  </ContentHeader>
);

export default ActionHeader;
