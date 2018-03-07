import PropTypes from 'prop-types';
import React, {Component} from 'react'
import styles from './styles.css';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className={["upload-btn-wrapper", this.props.className].join(' ')}>
        <div className="upload-btn">
           <button className="btn btn-default">{this.props.label ? this.props.label : 'Upload'}</button>
           <input title="" type="file" id={this.props.name} name={this.props.name} accept={this.props.accept} onChange={this.props.onChange} />
        </div>
        <span className="button-tooltip">{this.props.tooltip}</span>
      </div>
    )
  }
}

UploadButton.propTypes = {
  accept: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default UploadButton;
