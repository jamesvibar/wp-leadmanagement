import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  width: 100px;
`;

export default class ProfitField extends React.Component {
  state = {
    isToggled: true,
    profit: this.props.row.original.profit
  };

  toggleProfit = () => this.setState({ isToggled: !this.state.isToggled });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSave = cellInfo => {
    this.setState({ isToggled: true });
    this.props.handleSave(cellInfo, this.state.profit);
  };

  render() {
    const { isToggled, profit } = this.state;
    const { row } = this.props;

    let profitButton;

    if (isToggled) {
      profitButton = <button onClick={() => this.toggleProfit()}>Edit</button>;
    } else {
      profitButton = <button onClick={() => this.handleSave(row)}>Save</button>;
    }

    return (
      <div>
        <Input
          type="number"
          name="profit"
          id="profit"
          disabled={isToggled}
          value={profit}
          onChange={this.onChange}
        />
        {profitButton}
      </div>
    );
  }
}

ProfitField.propTypes = {
  handleSave: PropTypes.func,
  row: PropTypes.object
};
