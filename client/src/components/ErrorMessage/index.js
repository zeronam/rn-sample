import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

const ErrorMessage = props =>
  <p className="text-danger">{props.error}</p>

ErrorMessage.propTypes = {
  // error: PropTypes.object,
};

export default ErrorMessage;
