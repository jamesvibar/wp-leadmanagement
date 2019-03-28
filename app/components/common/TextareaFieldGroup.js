import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextareaFieldContainer = styled.div`
  margin: 1em 0;
  display: block;
`;

const TextareaFieldGroup = ({
  name,
  placeholder,
  onChange,
  value,
  label,
  height,
  disabled
}) => (
  <TextareaFieldContainer>
    <label htmlFor={name}>
      {label}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={parseInt(disabled) ? false : true}
        style={{
          display: "block",
          padding: "0.5em",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          height
        }}
      />
    </label>
  </TextareaFieldContainer>
);

TextareaFieldGroup.defaultProps = {
  height: "100px",
  disabled: 1
};

TextareaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  height: PropTypes.string
};

export default TextareaFieldGroup;
