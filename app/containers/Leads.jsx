import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLeads } from "../actions/leadsActions";

// import ProfitField from "../components/ProfitField";
// import "react-table/react-table.css";

import LeadsTable from "../components/LeadsTable";

class Leads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leads: []
    };
  }

  componentDidMount() {
    // Get all leads from redux
    this.props.getLeads();
  }

  render() {
    const { leads } = this.props;

    return (
      <div className="wrap">
        <h1>Lead Management</h1>

        <LeadsTable leads={leads} />
      </div>
    );
  }
}

Leads.propTypes = {
  getLeads: PropTypes.func.isRequired,
  leads: PropTypes.array
};

const mapStateToProps = state => ({
  leads: state.leads.leads
});

export default connect(
  mapStateToProps,
  { getLeads }
)(Leads);
