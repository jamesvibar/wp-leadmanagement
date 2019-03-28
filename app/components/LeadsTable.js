import React from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Message from "./form_partials/Message";
import EditTable from "./edit";
import AddTable from "./add";

const HasBeenContacted = styled.div`
  padding: 0.25em 1em;
  text-align: center;
  margin: 0 auto;
  color: #000;
  background: ${props => (props.truthy ? "#6af153" : "#ccc")};
  border-radius: 5px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 500;
`;

const LeadsTable = ({ leads, loading }) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 50
    },
    {
      Header: "Name",
      accessor: "name",
      style: { textTransform: "capitalize" }
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Submit Date",
      accessor: "date_send",
      Cell: row => <Moment format="MMMM DD, YYYY LT">{row.value}</Moment>
    },
    {
      Header: "Source of Lead",
      accessor: "lead_source"
      // Cell: row => <Moment format="MMMM DD, YYYY">{row.value}</Moment>
    },
    {
      Header: "Has been contacted?",
      accessor: "has_been_contacted",
      style: { textAlign: "center" },
      Cell: row => {
        if (parseInt(row.value) === 0) {
          return <HasBeenContacted>False</HasBeenContacted>;
        } else {
          return <HasBeenContacted truthy>True</HasBeenContacted>;
        }
      }
    },
    {
      Header: "Profit",
      accessor: "profit",
      Cell: row => (
        <NumberFormat
          value={row.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      )
    },
    {
      Header: "Actions",
      Cell: row => <EditTable data={row.original} />
    }
  ];

  const AddTableContainerStyles = {
    display: "flex",
    justifyContent: "flex-end"
  };

  const ReactTableContainerStyles = {
    marginTop: "8px"
  };

  return (
    <React.Fragment>
      <div style={AddTableContainerStyles}>
        <AddTable />
      </div>
      <div style={ReactTableContainerStyles}>
        <ReactTable
          loading={loading}
          data={leads}
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

LeadsTable.propTypes = {
  leads: PropTypes.array,
  loading: PropTypes.bool
};

export default LeadsTable;
