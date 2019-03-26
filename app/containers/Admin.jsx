import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { getTables } from "../actions/settingsActions";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table_name: ""
    };
  }

  componentDidMount() {
    this.props.getTables();
  }

  render() {
    const { tables } = this.props;
    return (
      <div className="wrap">
        <form>
          <h1>Lead Management Settings</h1>
          <div>
            {tables.map(table => (
              <p>{table.table_name}</p>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tables: state.settings.tables
});

export default connect(
  mapStateToProps,
  { getTables }
)(Admin);
