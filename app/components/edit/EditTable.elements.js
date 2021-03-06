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
  padding: 0 16px;
  background: #0068ee;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, sans-serif;
  box-sizing: border-box;
  min-width: 64px;
  height: 36px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 4px;
  transition: all 200ms ease;
  margin-right: 1em;

  &:hover {
    background: #0054c0;
  }
`;

export const FormDelete = styled.button`
  padding: 0 16px;
  background: #ee2600;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, sans-serif;
  box-sizing: border-box;
  min-width: 64px;
  height: 36px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 4px;
  transition: all 200ms ease;

  &:hover {
    background: #c01f00;
  }
`;

export const FormWarning = styled.span`
  color: red;
  font-size: 0.95em;
  display: block;
  text-align: center;
`;
