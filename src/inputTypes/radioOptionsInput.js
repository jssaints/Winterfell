var React = require('react');

class RadioOptionsInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };
  }

  handleChange(value) {
    this.setState({
      value : value
    }, this.props.onChange.bind(null, value));
  }

  render() {
    return (
      <ul className={this.props.classes.radioList}>
        {this.props.options.map((opt,ind) =>
          <li key={opt.value}
              className={this.props.classes.radioListItem}>
              <input type="radio"
                     name={this.props.name}
                     id={this.props.labelId+'-'+ind}
                     aria-labelledby={this.props.labelId}
                     checked={this.state.value == opt.value}
                     className={this.props.classes.radio}
                     required={this.props.required
                                 ? 'required'
                                 : undefined}
                     onChange={this.handleChange.bind(this, opt.value)}
                     onBlur={this.props.onBlur.bind(null, this.state.value)} />
            <label className={this.props.classes.radioLabel}
                   id={this.props.labelId} for={this.props.labelId+'-'+ind}>
              {opt.text}
            </label>
          </li>
        )}
      </ul>
    );
  }

};

RadioOptionsInput.defaultProps = {
  classes  : {},
  name     : '',
  value    : '',
  options  : [],
  onChange : () => {},
  onBlur   : () => {}
};

module.exports = RadioOptionsInput;