import styled from "styled-components";

export const EditButton = styled.button`
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

export const ContentContainer = styled.div`
  padding: 1em;
  border-radius: 5px;
`;

export const FormSubmit = styled.button`
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

export const FormDelete = styled.button`
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
