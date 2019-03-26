import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Select from "react-select";

const SelectFieldContainer = styled.div`
  margin: 1em 0;
  display: block;
`;

const SelectFieldGroup = ({ options, onChange, value, label, name }) => {
  return (
    <SelectFieldContainer>
      <label htmlFor={name}>
        {label}
        <Select
          name={name}
          defaultValue={options.find(op => {
            return op.value === value;
          })}
          options={options}
          onChange={onChange}
        />
      </label>
    </SelectFieldContainer>
  );
};

SelectFieldGroup.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default SelectFieldGroup;
