import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import styled from "styled-components";
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
import CleaveFieldGroup from "../common/CleaveFieldGroup";

class EditTable extends React.Component {
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
      lead_source_other: "",
      has_been_contacted: "",
      profit: "",
      last_edit: "",
      manual_add: "",
      isFormOpen: false
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
      lead_source_other,
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
      lead_source: lead_source === "Others" ? lead_source_other : lead_source,
      has_been_contacted,
      profit,
      last_edit: new Date().toISOString(),
      manual_add
    };

    this.props.updateLead(updatedLead, toast, this.closeModal);
  };

  onDeleteClick = id => {
    this.props.deleteLead(id, toast);
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

  openModal = () => {
    const { data } = this.props;

    const options = ["Nothing", "Facebook", "Google Search", "Pay per click"];

    let leadSource;
    if (options.includes(data.lead_source)) {
      leadSource = data.lead_source;
    } else if (!options.includes(data.lead_source) && data.lead_source !== "") {
      leadSource = "Others";
    } else {
      leadSource = "";
    }

    this.setState({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      date_send: new Date(data.date_send),
      source: data.source,
      form_type: data.form_type,
      form_type_id: data.form_type_id,
      lead_source: leadSource,
      lead_source_other: !options.includes(data.lead_source)
        ? data.lead_source
        : "",
      has_been_contacted: data.has_been_contacted,
      profit: data.profit,
      last_edit: data.last_edit,
      manual_add: data.manual_add,
      isFormOpen: true
    });
  };

  closeModal = () => {
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
      last_edit: "",
      manual_add: "",
      isFormOpen: false
    });
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
      lead_source_other,
      has_been_contacted,
      profit,
      manual_add,
      isFormOpen
    } = this.state;
    const { data } = this.props;

    return (
      <>
        <EditButton onClick={this.openModal}>Edit</EditButton>
        <Popup
          open={isFormOpen}
          modal
          closeOnDocumentClick
          contentStyle={{
            maxWidth: "500px",
            borderRadius: "5px",
            border: "none"
          }}
          onClose={this.closeModal}
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
                  <CleaveFieldGroup
                    label="Profit"
                    onChange={this.onCleaveInputChange}
                    value={profit}
                    placeholder="Input value of lead"
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
                  {lead_source === "Others" && (
                    <TextFieldGroup
                      name="lead_source_other"
                      label="Please specify the source of lead."
                      value={lead_source_other}
                      onChange={this.onInputChange}
                      placeholder="Please specify here"
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  {parseInt(manual_add) ? (
                    ""
                  ) : (
                    <FormWarning>
                      You cannot edit these fields because you didn't create
                      this lead.
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
                      You cannot edit these fields because you didn't create
                      this lead.
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
      </>
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
