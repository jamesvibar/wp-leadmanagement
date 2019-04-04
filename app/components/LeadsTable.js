import React, { useState } from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import matchSorter from "match-sorter";
import Message from "./form_partials/Message";
import EditTable from "./edit";
import AddTable from "./add";
import Cleave from "cleave.js/react";

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
  // const [date, setDate] = useState();
  let leadsData;

  // Wait until leads has been loaded.
  if (leads.length !== 0) {
    // Filter result
    // leadsData = leads.filter(lead => lead.id == 2554)
    leadsData = leads;
  }

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 50
    },
    {
      Header: "Name",
      accessor: "name",
      style: { textTransform: "capitalize" },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["name"] }),
      filterAll: true
    },
    {
      Header: "Email",
      accessor: "email",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["email"] }),
      filterAll: true
    },
    {
      Header: "Submit Date",
      accessor: "date_send",
      Cell: row => <Moment format="MMMM DD, YYYY LT">{row.value}</Moment>,
      Filter: ({ filter, onChange }) => {
        return (
          <Cleave
            placeholder="YYYY-MM-DD"
            options={{
              date: true,
              delimiter: "-",
              datePattern: ["Y", "m", "d"]
            }}
            onChange={event => {
              onChange(event.target.value);
            }}
          />
        );
      }
    },
    {
      Header: "Source of Lead",
      accessor: "lead_source"
    },
    {
      Header: "Has been contacted?",
      accessor: "has_been_contacted",
      style: { textAlign: "center" },
      Cell: ({ value }) =>
        parseInt(value) === 0 ? (
          <HasBeenContacted>False</HasBeenContacted>
        ) : (
          <HasBeenContacted truthy>True</HasBeenContacted>
        ),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "true") {
          return row[filter.id] == 1;
        }
        return row[filter.id] == 0;
      }
    },
    {
      Header: "Value",
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

LeadsTable.propTypes = {
  leads: PropTypes.array,
  loading: PropTypes.bool
};

export default LeadsTable;
