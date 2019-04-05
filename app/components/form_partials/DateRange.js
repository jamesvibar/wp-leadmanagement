import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filterLeads } from "../../actions/filterActions";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";

const DateRange = ({ filterLeads }) => {
  const [fromToDate, setfromToDate] = useState({
    startDate: undefined,
    endDate: undefined
  });

  useEffect(() => {
    if (fromToDate.startDate === undefined && fromToDate.endDate === undefined)
      return;
    const startDateFilter = fromToDate.startDate || new Date(1970); // Set startDate to old date (1970) if its empty
    const endDateFilter = fromToDate.endDate || new Date();

    filterLeads(startDateFilter, endDateFilter);
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
    </div>
  );
};

const DatePickerContainerStyles = {
  display: "flex",
  alignItems: "center"
};

const mapStateToProps = state => ({
  lead: state.leads.lead
});

export default connect(
  mapStateToProps,
  { filterLeads }
)(DateRange);
