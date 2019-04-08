import React from "react";
import Cleave from "cleave.js/react";
import matchSorter from "match-sorter";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import EditTable from "../components/edit";
import styled from "styled-components";

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

const Editable = styled.div`
  width: 10px;
  height: 10px;
  background: ${({ isEditable }) =>
    parseInt(isEditable) ? "green" : "#d9d9d9"}
  margin-right: 6px;
  border-radius: 50%;
`;

const EditContainer = styled.div`
  \display: flex;
  align-items: center;
`;

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
    accessor: "lead_source",
    Filter: ({ filter, onChange }) => (
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Show All</option>
        <option value="facebook">Facebook</option>
        <option value="googlesearch">Google Search</option>
        <option value="payperclick">Pay per Click</option>
        <option value="others">Others</option>
        <option value="nothing">Nothing</option>
      </select>
    ),
    filterMethod: (filter, row) => {
      if (filter.value === "all") {
        return true;
      }
      if (filter.value === "facebook") {
        return row[filter.id] == "Facebook";
      }
      if (filter.value === "googlesearch") {
        return row[filter.id] == "Google Search";
      }
      if (filter.value === "payperclick") {
        return row[filter.id] == "Pay per click";
      }
      if (filter.value === "others") {
        return row[filter.id] == "Others";
      }
      return row[filter.id] == "";
    }
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
    Cell: row => (
      <EditContainer>
        <Editable isEditable={row.original.manual_add} />
        <EditTable data={row.original} />
      </EditContainer>
    )
  }
];

export default columns;
