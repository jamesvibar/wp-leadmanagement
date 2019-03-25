import React from "react";
import Popup from "reactjs-popup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { updateLead } from "../actions/leadsActions";
import Moment from "react-moment";
import Select from "react-select";

import TextFieldGroup from "../components/common/TextFieldGroup";
import TextareaFieldGroup from "../components/common/TextareaFieldGroup";
import TextFieldDate from "../components/common/TextFieldDate";

const EditButton = styled.button`
  padding: 0.25em 1em;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 200ms ease-out;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 500;

  &:hover {
    background: #ccc;
  }
`;

const ContentContainer = styled.div`
  padding: 1em;
  border-radius: 5px;
`;

const ContentHeader = styled.header`
  font-size: 1.25em;
  margin: 0.5em auto;
`;

const FormSubmit = styled.button`
  padding: 0.5em 2em;
  text-transform: uppercase;
  border: none;
  background: #2c8eff;
  color: #fff;
  font-size: 0.9em;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 200ms ease;
  margin-left: ${props => (props.alignRight ? "auto" : "0")}

  &:hover {
    background: #2376d6;
  }
`;

const FormDelete = styled.button`
  padding: 0.5em 2em;
  text-transform: uppercase;
  border: none;
  background: #f04848;
  color: #fff;
  font-size: 0.9em;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 200ms ease;
  margin-left: ${props => (props.alignRight ? "auto" : "0")}

  &:hover {
    background: #ce3737;
  }
`;

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
          <ContentHeader>
            <h4 style={{ marginBottom: "0.25em" }}>
              Editing #{data.id}: {data.name}
            </h4>
            <p style={{ marginTop: "0px" }}>
              Date Submitted:{" "}
              <Moment format="MMMM DD, YYYY">{data.date_send}</Moment>
            </p>
          </ContentHeader>
          <form onSubmit={this.onFormSubmit}>
            <Tabs>
              <TabList>
                <Tab>Controls</Tab>
                <Tab>Basic Information</Tab>
                <Tab>Message</Tab>
              </TabList>

              <TabPanel>
                <Select
                  options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" }
                  ]}
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
                <TextFieldDate
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
