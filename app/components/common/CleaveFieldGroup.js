import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Cleave from "cleave.js/react";

const TextFieldContainer = styled.div`
  margin: 1em 0;
  display: block;
`;

const TextRequired = styled.span`
  font-size 10px;
  color: red;
  text-transform: lowercase;
  margin-left: 5px;
`;

const CleaveFieldGroup = ({
  onChange,
  label,
  required,
  placeholder,
  options
}) => (
  <TextFieldContainer>
    <label htmlFor={name}>
      {label}
      {required ? <TextRequired>*required</TextRequired> : ""}
      <Cleave
        style={{
          display: "block",
          padding: "0.5em",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
        placeholder={placeholder}
        onChange={onChange}
        options={{ ...options }}
      />
    </label>
  </TextFieldContainer>
);

CleaveFieldGroup.defaultProps = {
  disabled: 1
};

CleaveFieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool
};

export default CleaveFieldGroup;
