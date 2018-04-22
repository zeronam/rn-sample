import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control/index';
//https://github.com/Lesha-spr/react-validation
const Input = ({ error, isChanged, isUsed, ...props }) => {
    var id = "vali-" + props.name;
    return <div className="inputText">
        <input {...props} {...(error ? {
            className: `is-invalid-input ${props.className}`
        } : { className: `is-valid-input ${props.className}` }) } />
        {isUsed && <span id={id} className="help-block text-danger">{error} </span>}
    </div>;
}

Input.propTypes = {
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Input);
