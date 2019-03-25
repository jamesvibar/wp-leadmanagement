import React from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import EditTable from "./EditTable";
import styled from "styled-components";
import { Message } from "../components/Message";
import NumberFormat from "react-number-format";

const Status = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: red;
`;

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

class LeadsTable extends React.Component {
  render() {
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
        // Cell: row => (
        //   <span>
        //     <Status />
        //     {row.value}
        //   </span>
        // ),
        maxWidth: 200
      },
      {
        Header: "Email",
        accessor: "email",
        maxWidth: 200
      },
      {
        Header: "Submit Date",
        accessor: "date_send",
        Cell: row => <Moment format="MMMM DD, YYYY">{row.value}</Moment>
      },
      {
        Header: "Source",
        accessor: "lead_source",
        maxWidth: 130
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
        maxWidth: 100,
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
        Cell: row => <EditTable data={row.original} />,
        maxWidth: 100
      }
    ];

    return (
      <ReactTable
        data={this.props.leads}
        columns={columns}
        showPaginationTop={true}
        SubComponent={row => <Message data={row.original} />}
        className="-striped -highlight"
      />
    );
  }
}

export default LeadsTable;
