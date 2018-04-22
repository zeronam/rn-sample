import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.scss';

function LoadingIndicator(props) {
  if (!props.isLoading) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10" />
      </svg>
    </div>
  );
}

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingIndicator;
