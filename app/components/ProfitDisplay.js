import React from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";

const ProfitDisplay = ({ filtered }) => {
  return (
    filtered && (
      <TextContainer>
        <Text>
          Total:{" "}
          <NumberFormat
            value="100"
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Text>
      </TextContainer>
    )
  );
};

const Text = styled.h1`
  margin-top: 0;
  padding: 0;
  font-size: 2em;
`;

const TextContainer = styled.div`
  text-align: right;
  margin-right: 2em;
`;

const mapStateToProps = state => ({
  filtered: state.leads.filtered
});

export default connect(
  mapStateToProps,
  {}
)(ProfitDisplay);
