import React from "react";
import Popup from "reactjs-popup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { updateLead } from "../../actions/leadsActions";
import {
  EditButton,
  ContentContainer,
  FormSubmit,
  FormDelete
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
      profit: props.data.profit
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
      profit
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
      profit
    };

    this.props.updateLead(updatedLead, toast);
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onSelectInputChange = (selectedOption, action) => {
    this.setState({ [action.name]: selectedOption.value });
  };

  onDateChange = date => this.setState({ date_send: date });
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
      profit
    } = this.state;
    const { data, loading, lead } = this.props;

    return (
      <Popup
        trigger={<EditButton>Edit</EditButton>}
        modal
        closeOnDocumentClick
        contentStyle={{ maxWidth: "500px" }}
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
                  label="Where did it came from"
                  name="lead_source"
                  value={lead_source}
                  options={[
                    { label: "Facebook", value: "Facebook" },
                    { label: "Google Search", value: "Google Search" }
                  ]}
                  onChange={this.onSelectInputChange}
                />
              </TabPanel>
              <TabPanel>
                <TextFieldGroup
                  name="name"
                  label="Name"
                  value={name}
                  onChange={this.onInputChange}
                  placeholder="Input name"
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  label="Email Address"
                  value={email}
                  onChange={this.onInputChange}
                  placeholder="Input email address"
                />
                <TextFieldGroup
                  name="phone"
                  label="Contact Number"
                  value={phone}
                  onChange={this.onInputChange}
                  placeholder="Input contact number"
                />
                <DateFieldGroup
                  value={date_send}
                  label="Date Sent"
                  onChange={this.onDateChange}
                />
                <TextFieldGroup
                  name="source"
                  label="Origin"
                  value={source}
                  onChange={this.onInputChange}
                  placeholder="On what contact form from the site?"
                />
              </TabPanel>
              <TabPanel>
                <TextareaFieldGroup
                  name="message"
                  label="Message"
                  value={message}
                  onChange={this.onInputChange}
                  placeholder="Input message"
                />
              </TabPanel>
            </Tabs>
            {/* <span>{message}</span> <br /> */}
            {/* <span>{date_send}</span> <br />
            <span>{source}</span> <br />
            <span>{form_type}</span> <br />
            <span>{form_type_id}</span> <br />
            <span>{lead_source}</span> <br />
            <span>{has_been_contacted}</span> <br />
            <span>{profit}</span> <br /> */}
            <FormSubmit type="submit">Save</FormSubmit>
            <FormDelete type="button">Delete</FormDelete>
          </form>
        </ContentContainer>
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.leads.lead,
  loading: state.leads.loading
});

export default connect(
  mapStateToProps,
  { updateLead }
)(EditTable);
