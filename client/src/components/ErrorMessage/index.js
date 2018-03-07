import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const ErrorMessage = props =>
  props.error && props.error.message ? <p className={styles.alertError}>{props.error.message}</p> : null;

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
