import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const EditHistory = ({ leads }) => {
  return (
    <table className="greyGridTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Edited</th>
        </tr>
      </thead>
      <tbody>
        {leads
          .filter(lead => lead.last_edit)
          .map(lead => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>
                <Moment format="MMMM DD YYYY LT">{lead.last_edit}</Moment>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

EditHistory.propTypes = {
  leads: PropTypes.array
};

export default EditHistory;
