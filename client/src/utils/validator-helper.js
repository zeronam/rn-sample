var StringFormat = require('string-format')

export const REQUIRED = "This field is required";
export const INVAIL_EMAIL = "Invalid email";
export const MAXIMUM1 = "{0} is maximum {1} characters";
export const MAXIMUM2 = "Maximum {0} character";
export const MINIMUM1 = "{0} is minimum {1} characters";
export const MINIMUM2 = "Minimum {0} character";

export const required = (value, props) => {
    if (!value.toString().trim().length) {
        if (props.placeholder) return REQUIRED;
        return REQUIRED;
    }
};

export const email = (value, props, components) => {
    //http://jsfiddle.net/ghvj4gy9/embedded/result,js/

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(value)) {
        if (!props) return;
        if (props.errorMsg) return props.errorMsg;
        if (props.placeholder) return INVAIL_EMAIL;
        return INVAIL_EMAIL;
    }

    setTimeout(email, 50);
};

export const maxlength = (value, props) => {
    if (value.trim().length > Number(props.max)) {
        if (props.errorMsg) return props.errorMsg;
        if (props.placeholder) return StringFormat(MAXIMUM1, props.placeholder, props.max);
        return StringFormat(MAXIMUM2, props.max);
    }
};

export const minlength = (value, props) => {
    if (value.trim().length < Number(props.min)) {
        if (props.errorMsg) return props.errorMsg;
        if (props.placeholder) return StringFormat(MINIMUM1, props.placeholder, props.max);
        return StringFormat(MINIMUM2, props.max);
    }
};

export const compare = (value, props, components) => {
    var refComponents = components[props.compare][0];
    if (value !== refComponents.value) {
        return props.errorMsg;
    }
};

