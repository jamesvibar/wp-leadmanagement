import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { getTables } from "../actions/settingsActions";
import LeadsTable from "../components/LeadsTable";

class Leads extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTables();
  }

  render() {
    const { tables } = this.props;

    return (
      <div className="wrap">
        <h1>Lead Management</h1>
        <Tabs>
          <TabList>
            {tables.map(table => (
              <Tab>{table.table_name}</Tab>
            ))}
          </TabList>

          {tables.map(table => (
            <TabPanel>
              <LeadsTable table={table.table_name} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

Leads.propTypes = {
  getTables: PropTypes.func.isRequired,
  leads: PropTypes.array
};

const mapStateToProps = state => ({
  tables: state.settings.tables
});

export default connect(
  mapStateToProps,
  { getTables }
)(Leads);
