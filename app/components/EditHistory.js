import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import ReactTable from "react-table";

const EditHistory = ({ leads }) => {
  return (
    <ReactTable
      data={leads.filter(lead => lead.last_edit)}
      showPaginationTop={true}
      pageSize={10}
      resizable={false}
      columns={[
        {
          Header: "ID",
          accessor: "id"
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Last Edit",
          accessor: "last_edit",
          Cell: row => <Moment format="MMMM DD, YYYY LT">{row.value}</Moment>
        }
      ]}
    />
  );
};

EditHistory.propTypes = {
  leads: PropTypes.array
};

export default EditHistory;
