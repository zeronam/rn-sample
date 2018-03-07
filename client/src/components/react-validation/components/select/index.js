import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control/index';
const Select = ({ error, isChanged, isUsed, ...props }) => {
    return <div>
        <select {...props} {...(error ? {
            className: `is-invalid-input ${props.className}`
        } : { className: `is-valid-input ${props.className}` }) } />
        {isChanged && isUsed && <span className="cls-danger help-block">{error} </span>}
    </div>;
}


Select.propTypes = {
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Select);
