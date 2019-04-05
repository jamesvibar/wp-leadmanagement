import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import columns from "../config/columns";
import Message from "./form_partials/Message";
import AddTable from "./add";
import DateRange from "./form_partials/DateRange";

const LeadsTable = ({ leads, filteredLeads, loading }) => {
  const [total, setTotal] = useState(0);

  // Initialize our leads variable
  let leadsData;
  // Wait until leads has been loaded.
  if (filteredLeads.length !== 0) {
    // Set out leads to the loaded leads
    leadsData = filteredLeads;
  } else {
    leadsData = leads;
  }

  return (
    <React.Fragment>
      <div style={TotalDisplayContainerStyles}>
        <h1 style={{ marginTop: "0", padding: "0" }}>Total: {total}</h1>
      </div>
      <div style={AddTableContainerStyles}>
        <DateRange />
        <AddTable />
      </div>
      <div style={ReactTableContainerStyles}>
        <ReactTable
          loading={loading}
          data={leadsData}
          columns={columns}
          showPaginationTop={true}
          SubComponent={row => <Message data={row.original} />}
          className="-striped -highlight"
          filterable={true}
          resizable={false}
        />
      </div>
    </React.Fragment>
  );
};

const TotalDisplayContainerStyles = {
  textAlign: "right",
  fontSize: "2.5em"
};

const AddTableContainerStyles = {
  display: "flex",
  justifyContent: "space-between"
};

const ReactTableContainerStyles = {
  marginTop: "8px"
};

LeadsTable.propTypes = {
  leads: PropTypes.array,
  loading: PropTypes.bool
};

export default LeadsTable;
