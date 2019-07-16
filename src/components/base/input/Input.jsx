import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const INPUT_TYPES = {
  email: 'email',
  number: 'number',
  password: 'password',
  text: 'text',
};

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      prevCalc: false,
      value: null,
    };
    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    const { maxRows, minRows, textarea, value } = this.props;

    // If is textarea and has a default value we calculate the height
    if (textarea && value) {
      // We need to reset to minRows before calculating height
      this.textareaRef.current.rows = minRows;

      const { scrollHeight } = this.textareaRef.current;
      const res = this.calculateRows(scrollHeight);

      this.textareaRef.current.rows = res.rows;
      if (res.scrollTop) {
        this.textareaRef.current.scrollTop = res.scrollTop;
      }

      this.setState({ value, rows: res.rows < maxRows ? res.rows : maxRows });
    } else {
      this.setState({ value, rows: minRows });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { maxRows, minRows, textarea, value } = this.props;
    const { prevCalc, value: stVal } = this.state;

    // If is textarea and has a default value we calculate the height
    if (textarea && value && !prevCalc && !prevState.value && stVal) {
      // We need to reset to minRows before calculating height
      this.textareaRef.current.rows = minRows;

      const { scrollHeight } = this.textareaRef.current;
      const res = this.calculateRows(scrollHeight);

      this.textareaRef.current.rows = res.rows;
      if (res.scrollTop) {
        this.textareaRef.current.scrollTop = res.scrollTop;
      }

      this.setState({ value, rows: res.rows < maxRows ? res.rows : maxRows });
    } else if (prevProps.value !== value || prevState.value !== value) {
      this.setState({ value });
    }
  }

  calculateRows = (scrollHeight) => {
    const { textareaLineHeight, maxRows } = this.props;

    const result = {
      rows: null,
      scrollTop: null,
    };

    result.rows = ~~(scrollHeight / textareaLineHeight);

    if (result.rows >= maxRows) {
      result.rows = maxRows;
      result.scrollTop = scrollHeight;
    }

    return result;
  };

  onChangeTextarea = (event) => {
    const { maxLength, maxRows, minRows, onChange } = this.props;
    // We need to reset to minRows before calculating height
    event.target.rows = minRows;

    const { scrollHeight, value: val } = event.target;
    const res = this.calculateRows(scrollHeight);

    event.target.rows = res.rows;
    if (res.scrollTop) {
      event.target.scrollTop = res.scrollTop;
    }
    let value = val;

    if (maxLength && value > maxLength) {
      value = value.substring(0, maxLength);
    }

    this.setState({ value, rows: res.rows < maxRows ? res.rows : maxRows }, () => (onChange ? onChange(value) : null));
  };

  onChange = (val) => {
    const { maxLength, onChange } = this.props;
    let value = val;

    if (maxLength && value > maxLength) {
      value = value.substring(0, maxLength);
    }

    this.setState({ value }, () => (onChange ? onChange(value) : null));
  };

  keyPress = (event) => {
    const { onEnter, withOnEnterAndSpace } = this.props;
    const { value } = this.state;
    // charCode 32 is spacebar
    if ('Enter' === event.key || (withOnEnterAndSpace && 32 === event.charCode)) {
      onEnter(value);
    }
  };

  getValue = () => {
    const { value } = this.state;

    if (0 === value) {
      return 0;
    }
    if (value) {
      return value;
    }
    return '';
  };

  render() {
    const { rows, focused } = this.state;
    const {
      className,
      disabled,
      error,
      errorText,
      icon,
      iconRight,
      infoText,
      placeholder,
      textarea,
      type,
      ...rest
    } = this.props;

    return (
      <div
        className={`input${error ? ' error' : ''}${disabled ? ' disabled' : ''}${className ? ` ${className}` : ''}${
          focused ? ' input-focused' : ''
        }`}>
        <div>
          {placeholder ? (
            <p
              className={`placeholder${'' !== this.getValue() || focused ? ' with-content' : ''}${
                icon ? ' with-icon' : ''
              }`}>
              {placeholder}
            </p>
          ) : null}
          {icon && !iconRight && <i className={icon} aria-hidden="true" />}
          {textarea ? (
            <textarea
              {...rest}
              onBlur={() => this.setState({ focused: false })}
              onChange={(event) => this.onChangeTextarea(event)}
              onKeyPress={this.keyPress}
              onFocus={() => this.setState({ focused: true })}
              placeholder=""
              ref={this.textareaRef}
              row={rows}
              value={this.getValue()}
            />
          ) : (
            <input
              {...rest}
              onBlur={() => this.setState({ focused: false })}
              onChange={(event) => this.onChange(event.target.value)}
              onKeyPress={this.keyPress}
              onFocus={() => this.setState({ focused: true })}
              placeholder=""
              value={this.getValue()}
            />
          )}
          {icon && iconRight && <i className={icon} aria-hidden="true" />}
        </div>
        {infoText && <p className="input-info">{infoText}</p>}
        {error && errorText && <p className="input-error">{errorText}</p>}
      </div>
    );
  }
}

Input.defaultProps = {
  className: null,
  disabled: false,
  error: false,
  errorText: null,
  icon: null,
  iconRight: false,
  infoText: null,
  maxLength: null,
  minRows: 1,
  minLength: null,
  maxRows: 5,
  onChange: () => true,
  onEnter: () => true,
  placeholder: null,
  textarea: false,
  textareaLineHeight: 20,
  type: INPUT_TYPES.text,
  value: null,
  withOnEnterAndSpace: false,
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.any,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  icon: PropTypes.string,
  iconRight: PropTypes.bool,
  infoText: PropTypes.string,
  maxLength: PropTypes.number,
  minRows: PropTypes.number,
  minLength: PropTypes.number,
  maxRows: PropTypes.number,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  textareaLineHeight: PropTypes.number,
  type: PropTypes.oneOf(Object.values(INPUT_TYPES).map((type) => type)),
  value: PropTypes.any,
  withOnEnterAndSpace: PropTypes.bool,
};
