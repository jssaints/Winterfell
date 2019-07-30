var React = require('react');

class CheckboxInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checked : props.defaultChecked
    };
  }

  handleChange(e) {
    if (e) {
      this.setState({
        checked : !this.state.checked
      }, () => {
        this.props.onChange(this.state.checked
                            ? this.props.value
                            : undefined);
      });
    } else {
      this.props.onChange(this.state.checked
                            ? this.props.value
                            : undefined);
    }
  }

  componentDidMount() {
    if (this.state.checked) {
      this.handleChange();
    }
  }

  render() {
    return (
      <div className={this.props.classes.checkboxInput}>
          <input type="checkbox"
                 name={this.props.name}
                 aria-labelledby={this.props.labelId}
                 className={this.props.classes.checkbox}
                 defaultChecked={this.state.checked}
                 value={this.props.value}
                 id={this.props.labelId}
                 required={this.props.required
                             ? 'required'
                             : undefined}
                 onChange={this.handleChange.bind(this)}
                 onBlur={this.props.onBlur.bind(null, (this.state.checked
                                                        ? this.props.value
                                                        : undefined))} />      
        <label className={this.props.classes.checkboxLabel}
               id={this.props.labelId} for={this.props.labelId}>

          {this.props.text}
        </label>
      </div>
    );
  }

};

CheckboxInput.defaultProps = {
  text     : '',
  defaultChecked: false,
  classes  : {},
  name     : '',
  value    : '',
  onChange : () => {},
  onBlur   : () => {}
};

module.exports = CheckboxInput;