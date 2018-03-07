import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.showError = this.showError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = {
      error: false,
      errorMessage: '',
      value: props.defaultValue || '',
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.blur();
        this.focus();
      }, 260);
    }
  }

  // componentDidUpdate() {
  //   if (this.props.autoFocus) {
  //     setTimeout(() => this.focus(), 150);
  //   }
  // }

  getValue() {
    return this.state.value;
  }

  getNativeValue() {
    return this.input.value;
  }

  setText(value, focus = true, cb) {
    if (this.input) {
      this.input.value = value;
      if (focus) {
        this.input.focus();
      }
    }
    this.setState({ value }, () => {
      if (cb) {
        cb();
      }
    });
  }

  clear() {
    if (this.input) {
      this.input.value = '';
      this.input.focus();
    }

    this.setState({ value: '' });
  }

  showError(msg) {
    this.setState({ error: true, errorMessage: msg || this.props.errorMessage });
  }

  hideError() {
    this.setState({ error: false });
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 13 && this.props.onSubmit) {
      this.props.onSubmit(e);
    }
  }

  handleKeyDown = e => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  handleKeyPress = e => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
  };

  handleFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  validate(input) {
    /* Only validate if there's 'pattern' attribute. The 'pattern' format is RegEx.
    For example: <Input pattern={ /example/i } />
    If there is no 'input' parameter, this will validate the current value of the input field (this.state.value)
    */
    let result = true;
    if (this.props.pattern) {
      let val = '';
      if (input) {
        val = input.trim();
      } else {
        val = this.state.value.trim();
      }
      const regex = this.props.pattern;
      if (!regex.test(val)) {
        this.setState({ error: true, errorMessage: this.props.errorMessage });
        result = false;
      } else {
        this.setState({ error: false });
      }
    }
    return result;
  }

  handleChange(e) {
    /* Execute user's onChange function */
    this.setState(
      {
        value: e.target.value,
        error: false,
        isChanged: true,
      },
      () => {
        /* If the validateOnTyping attribute is set to 'true', it will validate on typing */
        if (this.props.pattern && this.props.validateOnTyping === true) {
          const result = this.validate(this.state.value);
          this.setState({ error: !result, errorMessage: this.props.errorMessage });
        }

        if (this.props.onChange) {
          this.props.onChange(e);
        }
      },
    );
  }

  render() {
    const style = [this.props.className || ''];
    if (this.state.error) {
      style.push(styles.inputError);
    }
    if (this.props.disabled) {
      style.push(styles.disabled);
    }

    return (
      <div className={style.join(' ')} data-test-id={this.props.dataTestId} style={this.props.style}>
        <label htmlFor={this.props.id} className={this.props.icon ? styles.iconInput : ''}>
          {this.props.label}
          {this.props.description ? <span className={styles.description}>{this.props.description}</span> : null}
          {this.props.subDescription ? <p className={styles.description}>{this.props.subDescription}</p> : null}
          <div className={styles.inputWrapper}>
            {this.props.multiline ? (
              <textarea
                className={styles.input}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                onKeyPress={this.handleKeyPress}
                autoFocus={this.props.autoFocus} // eslint-disable-line
                defaultValue={this.props.defaultValue}
                maxLength={this.props.maxLength}
                autoComplete="off"
                id={this.props.id}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                ref={ref => {
                  this.input = ref;
                }}
              />
            ) : (
              <input
                className={styles.input}
                type={this.props.type}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                autoFocus={this.props.autoFocus} // eslint-disable-line
                defaultValue={this.props.defaultValue}
                maxLength={this.props.maxLength}
                min={this.props.min}
                max={this.props.max}
                autoComplete="off"
                disabled={this.props.disabled}
                id={this.props.id}
                placeholder={this.props.placeholder}
                ref={ref => {
                  this.input = ref;
                }}
                readOnly={this.props.readOnly}
              />
            )}
            {this.props.subDomainOf && <span className={styles.domainName}>{this.props.subDomainOf}</span>}
            {this.props.icon ? (
              <button onClick={this.props.onSubmit ? this.props.onSubmit : null}>
                <i data-icon={this.props.icon} />
              </button>
            ) : null}
          </div>
        </label>
        <span className={styles.error}>{this.state.errorMessage}</span>
      </div>
    );
  }
}

Input.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  style: PropTypes.object,
  description: PropTypes.string,
  subDescription: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  maxLength: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  pattern: PropTypes.object,
  validateOnTyping: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.string,
  autoFocus: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
  dataTestId: PropTypes.string,
  subDomainOf: PropTypes.string,
};

export default Input;

export class MultilineInput extends Input {
  static defaultProps = {
    maxLength: '1000',
    multiline: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  validate(val) {
    const value = val || this.state.value;
    const result = value && value.trim() !== '';
    this.setState({ error: !result, errorMessage: this.props.errorMessage });
    return result;
  }
}

export { EMAIL_REGEXP };
export class EmailInput extends Input {
  static defaultProps = {
    maxLength: '254',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    const result = EMAIL_REGEXP.test(value.toLowerCase().trim());
    this.setState({ error: !result, errorMessage: this.props.errorMessage });
    return result;
  }
}

export class MultiEmailInput extends Input {
  static defaultProps = {
    maxLength: '254',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  getInvalidEmailMessage() {
    return 'Please enter a valid email address.';
  }

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'Please enter an email address.' });
      return false;
    }

    const re = /\s*[;,\n]\s*/g;
    const arr = val.split(re);
    let result = true;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] && arr[i].trim()) {
        result = EMAIL_REGEXP.test(arr[i].toLowerCase().trim());
        if (!result) break;
      }
    }

    this.setState({
      error: !result,
      errorMessage: arr.length === 1 ? this.getInvalidEmailMessage() : this.props.errorMessage,
    });
    return result;
  }
}

export class MultilineEmailInput extends MultiEmailInput {
  static defaultProps = {
    multiline: true,
  };

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'Please enter an email address.' });
      return false;
    }

    return true;
  }
}

export class DomainInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    const result = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?/i.test(value.trim());
    this.setState({ error: !result, errorMessage: this.props.errorMessage });
    return result;
  }
}

export class PhoneInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  clearError() {
    this.setState({ error: false, errorMessage: '' });
  }

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    if (required && value) {
      const result = value && value.trim() !== '';
      this.setState({ error: !result, errorMessage: this.props.errorMessage });
      return result;
    }
    return true;
  }
}

export class CustomerEmailInput extends Input {
  static defaultProps = {
    maxLength: '254',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  clearError() {
    this.setState({ error: false, errorMessage: '' });
  }

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    if (value) {
      const result = EMAIL_REGEXP.test(value.toLowerCase().trim());
      this.setState({ error: !result, errorMessage: this.props.errorMessage });
      return result;
    }
    return true;
  }
}

export class NameInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  validate(val) {
    const value = val || this.state.value;
    const result = value && value.trim() !== '';
    this.setState({ error: !result, errorMessage: this.props.errorMessage });
    return result;
  }
}

export class CurrentPasswordInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  validate() {
    if (!this.state.value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    return true;
  }
}

export class PasswordInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }

    const result = value.length >= 8 && value.length <= 40;
    this.setState({ error: !result, errorMessage: this.props.errorMessage });
    return result;
  }
}

export class ConfirmPasswordInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  required() {
    if (!this.state.value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    return true;
  }

  validate(val) {
    const value = val;
    const result = value && value === this.state.value;

    this.setState({ error: !result, errorMessage: this.props.errorMessage });

    return result;
  }
}

export class TagInput extends Input {
  static defaultProps = {
    maxLength: '40',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  validate(val, required) {
    const value = val || this.state.value;
    if (required && !value) {
      this.setState({ error: true, errorMessage: 'This information is required.' });
      return false;
    }
    const result = /[;,]+/.test(value.trim());
    this.setState({ error: result, errorMessage: this.props.errorMessage });
    return !result;
  }
}

const keyCodes = [10, 13, 8, 46];
export class NumberInput extends Input {
  static propTypes = {
    allowZero: PropTypes.bool,
  };

  componentDidMount() {
    super.componentDidMount();
    if (this.input) {
      this.input.addEventListener(
        'paste',
        e => {
          const clipboardData = e.clipboardData || window.clipboardData;
          const pasteData = clipboardData.getData('text/plain');
          if (!pasteData.match(/^\d+$/i)) {
            e.preventDefault();
          }
          if (parseInt(pasteData, 10) < 1) {
            e.preventDefault();
          }
        },
        false,
      );
    }
  }

  handleKeyPress = e => {
    e.persist();

    const keyCode = e.which || e.keyCode;
    if (!(keyCodes.includes(keyCode) || (keyCode >= 48 && keyCode <= 57))) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  handleKeyUp = e => {
    if (!this.props.allowZero) {
      const { value } = this.input;

      if (parseInt(value, 10) < 1) {
        this.setText('1', true, () => {
          if (this.props.onChange) {
            this.props.onChange(e);
          }
        });
      }
    }
  };
}
