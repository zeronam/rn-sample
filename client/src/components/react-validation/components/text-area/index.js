import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control/index';
//https://github.com/Lesha-spr/react-validation
const Textarea = ({ error, isChanged, isUsed, ...props }) => {
    var id = "vali-" + props.name;
    return <div className="textareaInput">
        <textarea {...props} {...(error ? {
            className: `is-invalid-input ${props.className}`
        } : { className: `is-valid-input ${props.className}` }) } ></textarea>
        {isUsed && <span id={id} className="cls-danger help-block">{error} </span>}
    </div>;
}

Textarea.propTypes = {
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Textarea);
