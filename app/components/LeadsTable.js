import React from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLeads } from "../actions/leadsActions";

import Message from "./form_partials/Message";
import EditTable from "./edit";

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
  componentDidMount() {
    this.props.getLeads(this.props.table);
  }

  render() {
    const { leads, loading } = this.props;

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
        loading={loading}
        data={leads}
        columns={columns}
        showPaginationTop={true}
        SubComponent={row => <Message data={row.original} />}
        className="-striped -highlight"
      />
    );
  }
}

LeadsTable.propTypes = {
  leads: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  leads: state.leads.leads,
  loading: state.leads.loading
});

export default connect(
  mapStateToProps,
  { getLeads }
)(LeadsTable);
