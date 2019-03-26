import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const ContentHeader = styled.header`
  font-size: 1.25em;
  margin: 0.5em auto;
`;

const ActionHeader = ({ data: { id, name, date_send } }) => (
  <ContentHeader>
    <h4 style={{ marginBottom: "0.25em" }}>
      Editing #{id}: {name}
    </h4>
    <p style={{ marginTop: "0px" }}>
      Date Submitted: <Moment format="MMMM DD, YYYY">{date_send}</Moment>
    </p>
  </ContentHeader>
);

export default ActionHeader;
