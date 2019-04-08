import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { getLeads } from "../actions/leadsActions";

import LeadsTable from "../components/LeadsTable";
import EditHistory from "../components/EditHistory";

class Leads extends React.Component {
  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    const { leads, loading, filteredLeads, filtered } = this.props;
    return (
      <div className="wrap">
        <h1>Lead Management</h1>
        <Tabs>
          <TabList>
            <Tab>Leads</Tab>
            <Tab>Edit History</Tab>
          </TabList>
          <TabPanel>
            <LeadsTable leads={leads} filteredLeads={filteredLeads} loading={loading} filtered={filtered} />
          </TabPanel>
          <TabPanel>
            <EditHistory leads={leads} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Leads.propTypes = {
  leads: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  leads: state.leads.leads,
  loading: state.leads.loading,
  filteredLeads: state.leads.filteredLeads,
  filtered: state.leads.filtered,
});

export default connect(
  mapStateToProps,
  { getLeads }
)(Leads);
