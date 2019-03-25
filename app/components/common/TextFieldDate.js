import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const TextFieldContainer = styled.div`
  margin: 1em 0;
  display: block;
`;

const TextFieldDate = ({ onChange, value, label }) => (
  <TextFieldContainer>
    <label htmlFor={name}>
      {label}
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
      />
    </label>
  </TextFieldContainer>
);

TextFieldDate.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default TextFieldDate;
