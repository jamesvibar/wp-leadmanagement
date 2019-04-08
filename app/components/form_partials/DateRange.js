import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { filterLeads, resetFilter } from "../../actions/filterActions";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import isAfter from "date-fns/isAfter";

const DateRange = ({ filterLeads, resetFilter, filteredLeads }) => {
  const [fromToDate, setfromToDate] = useState({
    startDate: undefined,
    endDate: undefined
  });

  useEffect(() => {
    if (fromToDate.startDate === undefined && fromToDate.endDate === undefined)
      return;

    const startDateFilter = fromToDate.startDate || new Date(1970); // Set startDate to old date (1970) if its empty
    const endDateFilter = fromToDate.endDate || new Date();

    // Add +1day to our endDate to capture the leads that has the same date
    filterLeads(startDateFilter, addDays(endDateFilter, 1));
  }, [fromToDate.startDate, fromToDate.endDate]);

  const handleChange = ({ startDate, endDate }) => {
    startDate = startDate || fromToDate.startDate;
    endDate = endDate || fromToDate.endDate;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    setfromToDate({ startDate, endDate });
  };

  const handleChangeStart = startDate => handleChange({ startDate });
  const handleChangeEnd = endDate => handleChange({ endDate });

  const onResetFilter = () => {
    // Reset state
    setfromToDate({});
    // Reset redux state
    resetFilter();
  };

  return (
    <div style={DatePickerContainerStyles}>
      <p style={{ marginRight: "10px" }}>From Date</p>
      <DatePicker
        selected={fromToDate.startDate}
        selectsStart
        startDate={fromToDate.startDate}
        endDate={fromToDate.endDate}
        onChange={handleChangeStart}
      />
      <p style={{ margin: "0 10px" }}>To Date</p>
      <DatePicker
        selected={fromToDate.endDate}
        selectsEnd
        startDate={fromToDate.startDate}
        endDate={fromToDate.endDate}
        onChange={handleChangeEnd}
      />
      <ClearButton type="button" onClick={() => onResetFilter()}>
        Clear
      </ClearButton>
    </div>
  );
};

const ClearButton = styled.button`
  background: none;
  text-transform: uppercase;
  border: none;
  padding: 0.5em 1em;
  outline: none;
  cursor: pointer;
  background: #ccc;
  border-radius: 5px;
  margin-left: 1em;

  &:hover {
    background: #bbb;
  }

  transition: all 150ms ease-in-out;
`;

const DatePickerContainerStyles = {
  display: "flex",
  alignItems: "center"
};

DateRange.propTypes = {
  filterLeads: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  filteredLeads: PropTypes.array
};

DateRange.defaultProps = {
  filteredLeads: []
};

const mapStateToProps = state => ({
  filteredLeads: state.leads.filteredLeads
});

export default connect(
  mapStateToProps,
  { filterLeads, resetFilter }
)(DateRange);
