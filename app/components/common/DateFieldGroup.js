import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-datepicker";

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

const DateFieldGroup = ({ onChange, value, label, disabled, required }) => (
  <TextFieldContainer>
    <label htmlFor={name}>
      {label}
      {required ? <TextRequired>*required</TextRequired> : ""}
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
        disabled={parseInt(disabled) ? false : true}
      />
    </label>
  </TextFieldContainer>
);

DateFieldGroup.defaultProps = {
  disabled: 1
};

DateFieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool
};

export default DateFieldGroup;
