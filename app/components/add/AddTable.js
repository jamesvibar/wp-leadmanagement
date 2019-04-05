import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { createLead } from "../../actions/leadsActions";
import {
  ContentContainer,
  FormSubmit,
  FormDelete,
  FormCancel
} from "./AddTable.elements";

import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import DateFieldGroup from "../common/DateFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import CleaveFieldGroup from "../common/CleaveFieldGroup";

class AddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      message: "",
      date_send: undefined,
      source: "",
      form_type: "",
      form_type_id: "",
      lead_source: "",
      has_been_contacted: "",
      profit: "",
      isFormOpen: false
    };
  }

  onFormSubmit = e => {
    e.preventDefault();

    const newLead = {
      ...this.state,
      profit: this.state.profit ? this.state.profit : 0,
      manual_add: 1
    };

    this.props.createLead(newLead, toast, this.closeModal);
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });
  onDateChange = date => this.setState({ date_send: date });
  onSelectInputChange = (selectedOption, action) =>
    this.setState({ [action.name]: selectedOption.value });
  onCleaveInputChange = e => {
    let cleanRawValue = e.target.rawValue;
    while (cleanRawValue.charAt(0) == "$")
      cleanRawValue = cleanRawValue.substr(1);
    this.setState({ profit: cleanRawValue });
  };
  openModal = () => this.setState({ isFormOpen: true, date_send: new Date() });
  closeModal = () =>
    this.setState({
      name: "",
      email: "",
      phone: "",
      message: "",
      date_send: undefined,
      source: "",
      form_type: "",
      form_type_id: "",
      lead_source: "",
      has_been_contacted: "",
      profit: "",
      isFormOpen: false
    });

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
      isFormOpen
    } = this.state;

    return (
      <>
        <FormSubmit onClick={this.openModal}>Create New Lead</FormSubmit>
        <Popup
          open={isFormOpen}
          onClose={this.closeModal}
          modal
          contentStyle={{
            maxWidth: "500px",
            borderRadius: "5px",
            border: "none"
          }}
        >
          <ContentContainer>
            <h1 style={{ margin: "0 0 0.25em" }}>Creating new lead</h1>
            <form onSubmit={this.onFormSubmit}>
              <Tabs>
                <TabList>
                  <Tab>Controls</Tab>
                  <Tab>Basic Information</Tab>
                  <Tab>Message</Tab>
                </TabList>

                <TabPanel>
                  <CleaveFieldGroup
                    label="Profit"
                    onChange={this.onCleaveInputChange}
                    placeholder="Input value of lead"
                    value={0}
                    options={{
                      prefix: "$",
                      numeral: true,
                      numeralThousandsGroupStyle: "thousand"
                    }}
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
                  <TextFieldGroup
                    name="name"
                    label="Name"
                    value={name}
                    onChange={this.onInputChange}
                    placeholder="Input name"
                    required
                  />
                  <TextFieldGroup
                    type="email"
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={this.onInputChange}
                    placeholder="Input email address"
                    required
                  />
                  <TextFieldGroup
                    name="phone"
                    label="Contact Number"
                    value={phone}
                    onChange={this.onInputChange}
                    placeholder="Input contact number"
                    required
                  />
                  <DateFieldGroup
                    value={date_send}
                    label="Date Sent"
                    onChange={this.onDateChange}
                    required
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
                    required
                  />
                </TabPanel>
              </Tabs>
              <FormSubmit type="submit">Create Lead</FormSubmit>
              <FormCancel type="button" onClick={this.closeModal}>
                Cancel
              </FormCancel>
            </form>
          </ContentContainer>
        </Popup>
      </>
    );
  }
}

AddTable.propTypes = {
  createLead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lead: state.leads.lead,
  loading: state.leads.loading
});

export default connect(
  () => ({}),
  { createLead }
)(AddTable);
