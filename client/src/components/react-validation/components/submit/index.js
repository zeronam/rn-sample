import React from 'react';
import PropTypes from 'prop-types';
import button from '../../hocs/button/index';

const Submit = ({ hasErrors, ...props }) => {
    return <button {...props} disabled={hasErrors} />;
};

Submit.contextTypes = {
  hasErrors: PropTypes.bool
};

export default button(Submit);
