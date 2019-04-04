import React, { useState } from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
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
  const [date, setDate] = useState(new Date());

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
      style: { overflow: 'visible' },
      Filter: ({filter, onChange}) => { 
        console.log(`Flter: ${filter}`);
        console.log(`Onchange: ${onChange}`)
        return <DatePicker 
            onChange={date => console.log(date)}
            selected={date}
            withPortal />
       },
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
          data={leads}
          columns={columns}
          showPaginationTop={true}
          SubComponent={row => <Message data={row.original} />}
          className="-striped -highlight"
          filterable={true}
          resizable={false}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            if(typeof filter.value === "object") {
              return row[id] !== undefined
              ? filter.value.indexOf(row[id]) > -1
              : true;
            } else {
              return row[id] !== undefined ? String(row[id]).indexOf(filter.value) > -1 : true;
            }
          }}
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
