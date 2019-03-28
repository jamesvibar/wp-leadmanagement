import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextFieldContainer = styled.div`
  margin: 1em 0;
  display: block;
`;

const TextFieldGroup = ({
  type,
  name,
  placeholder,
  onChange,
  value,
  label,
  disabled
}) => (
  <TextFieldContainer>
    <label htmlFor={name}>
      {label}
      <input
        style={{
          display: "block",
          padding: "0.5em",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={parseInt(disabled) ? false : true}
      />
    </label>
  </TextFieldContainer>
);

TextFieldGroup.defaultProps = {
  type: "text",
  disabled: 1
};

TextFieldGroup.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string
};

export default TextFieldGroup;
