import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { updateLead, deleteLead } from "../../actions/leadsActions";
import {
  EditButton,
  ContentContainer,
  FormSubmit,
  FormDelete,
  FormWarning
} from "./EditTable.elements";
import ActionHeader from "../form_partials/ActionHeader";

import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import DateFieldGroup from "../common/DateFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      email: props.data.email,
      phone: props.data.phone,
      message: props.data.message,
      date_send: new Date(props.data.date_send),
      source: props.data.source,
      form_type: props.data.form_type,
      form_type_id: props.data.form_type_id,
      lead_source: props.data.lead_source,
      has_been_contacted: props.data.has_been_contacted,
      profit: props.data.profit,
      last_edit: props.data.last_edit,
      manual_add: props.data.manual_add
    };
  }

  onFormSubmit = e => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      message,
      date_send,
      source,
      form_type,
      form_type_id,
      lead_source,
      has_been_contacted,
      profit,
      manual_add
    } = this.state;

    const updatedLead = {
      id: this.props.data.id,
      name,
      email,
      phone,
      message,
      date_send,
      source,
      form_type,
      form_type_id,
      lead_source,
      has_been_contacted,
      profit,
      last_edit: new Date().toISOString(),
      manual_add
    };

    this.props.updateLead(updatedLead, toast);
  };

  onDeleteClick = id => {
    this.props.deleteLead(id, toast);
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });
  onDateChange = date => this.setState({ date_send: date });

  onSelectInputChange = (selectedOption, action) => {
    this.setState({ [action.name]: selectedOption.value });
  };

  render() {
    const {
      name,
      email,
      phone,
      message,
      date_send,
      source,
      form_type,
      form_type_id,
      lead_source,
      has_been_contacted,
      profit,
      manual_add
    } = this.state;
    const { data } = this.props;

    return (
      <Popup
        trigger={<EditButton>Edit</EditButton>}
        modal
        closeOnDocumentClick
        contentStyle={{
          maxWidth: "500px",
          borderRadius: "5px",
          border: "none"
        }}
        // onOpen={() => this.loadLead(id)}
      >
        <ContentContainer>
          <ActionHeader data={data} />
          <form onSubmit={this.onFormSubmit}>
            <Tabs>
              <TabList>
                <Tab>Controls</Tab>
                <Tab>Basic Information</Tab>
                <Tab>Message</Tab>
              </TabList>

              <TabPanel>
                <TextFieldGroup
                  type="number"
                  name="profit"
                  label="Profit"
                  value={profit}
                  onChange={this.onInputChange}
                  placeholder="Input profit"
                />
                <SelectFieldGroup
                  label="Has been contacted?"
                  name="has_been_contacted"
                  value={has_been_contacted}
                  options={[
                    { label: "True", value: "1" },
                    { label: "False", value: "0" }
                  ]}
                  onChange={this.onSelectInputChange}
                />
                <SelectFieldGroup
                  label="Source of Lead"
                  name="lead_source"
                  value={lead_source}
                  options={[
                    { label: "Nothing", value: "" },
                    { label: "Facebook", value: "Facebook" },
                    { label: "Google Search", value: "Google Search" },
                    { label: "Pay per click", value: "Pay per click" },
                    { label: "Others", value: "Others" }
                  ]}
                  onChange={this.onSelectInputChange}
                />
              </TabPanel>
              <TabPanel>
                {parseInt(manual_add) ? (
                  ""
                ) : (
                  <FormWarning>
                    You cannot edit these fields because you didn't create this
                    lead.
                  </FormWarning>
                )}
                <TextFieldGroup
                  name="name"
                  label="Name"
                  value={name}
                  onChange={this.onInputChange}
                  placeholder="Input name"
                  disabled={manual_add}
                  required
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  label="Email Address"
                  value={email}
                  onChange={this.onInputChange}
                  placeholder="Input email address"
                  disabled={manual_add}
                  required
                />
                <TextFieldGroup
                  name="phone"
                  label="Contact Number"
                  value={phone}
                  onChange={this.onInputChange}
                  placeholder="Input contact number"
                  disabled={manual_add}
                  required
                />
                <DateFieldGroup
                  value={date_send}
                  label="Date Sent"
                  onChange={this.onDateChange}
                  disabled={manual_add}
                  required
                />
                <TextFieldGroup
                  name="source"
                  label="Origin"
                  value={source}
                  onChange={this.onInputChange}
                  placeholder="On what contact form from the site?"
                  disabled={manual_add}
                />
              </TabPanel>
              <TabPanel>
                {parseInt(manual_add) ? (
                  ""
                ) : (
                  <FormWarning>
                    You cannot edit these fields because you didn't create this
                    lead.
                  </FormWarning>
                )}
                <TextareaFieldGroup
                  name="message"
                  label="Message"
                  value={message}
                  onChange={this.onInputChange}
                  placeholder="Input message"
                  disabled={manual_add}
                  required
                />
              </TabPanel>
            </Tabs>
            <FormSubmit type="submit">Save Lead</FormSubmit>
            <FormDelete
              type="button"
              onClick={() => this.onDeleteClick(data.id)}
            >
              Delete
            </FormDelete>
          </form>
        </ContentContainer>
      </Popup>
    );
  }
}

EditTable.propTypes = {
  updateLead: PropTypes.func.isRequired,
  deleteLead: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  { updateLead, deleteLead }
)(EditTable);
