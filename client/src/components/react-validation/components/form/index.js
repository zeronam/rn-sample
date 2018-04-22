import React, { Component } from 'react';
import PropTypes from 'prop-types';
import form from '../../hocs/form/index';

class Form extends Component {
  static propTypes = {
        getValues: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired,
        validate: PropTypes.func.isRequired,
        validateAll: PropTypes.func.isRequired,
        showError: PropTypes.func.isRequired,
        hideError: PropTypes.func.isRequired,
    };


  componentWillReceiveProps(nextProps) {
      this.forceUpdate();
  };

  render() {
      
      const { getValues, resetForm, validate, validateAll, showError, hideError, ...props } = this.props;

    return (
      <form {...props} />
    )
  }
}

export default form(Form);
