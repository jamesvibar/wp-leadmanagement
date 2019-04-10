import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import columns from "../config/columns";
import Message from "./form_partials/Message";
import AddTable from "./add";
import DateRange from "./form_partials/DateRange";
import ProfitDisplay from "./ProfitDisplay";

const LeadsTable = ({ leads, filteredLeads, loading, filtered }) => {
  // Initialize our leads variable
  let leadsData;
  // Wait until leads has been loaded.
  if (filteredLeads.length !== 0 || filtered) {
    // Set out leads to the loaded leads
    leadsData = filteredLeads;
  } else {
    leadsData = leads;
  }

  return (
    <React.Fragment>
      <ProfitDisplay />
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
