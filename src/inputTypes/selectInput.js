var React = require('react');

class SelectInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };
  }

  handleChange(e) {
    this.setState({
      value : e.target.value
    }, this.props.onChange.bind(null, e.target.value));
  }

  render() {
    var options = this.props.options.map(opt => {
      if (typeof opt.conditions !== 'undefined' && opt.conditions.length > 0) {
        let c = 0;
        opt.conditions
        .forEach(condition => {
          if (this.props.conditionalAnswers[condition.questionId] === condition.value) {
            c++;
          }
        });
        if (opt.conditions.length == c) {
          return (
            <option key={opt.value}
                    value={opt.value}>
              {opt.text}
            </option>
          );
        }
      } else {
        return (
          <option key={opt.value}
                  value={opt.value}>
            {opt.text}
          </option>
        );
      }
    });

    return (
      <select name={this.props.name}
              id={this.props.id}
              className={this.props.classes.select}
              value={this.state.value}
              ref="select"
              required={this.props.required
                          ? 'required'
                          : undefined}
              onChange={this.handleChange.bind(this)}
              onBlur={this.props.onBlur.bind(null, this.state.value)}>
        {options}
      </select>
    );
  }

  componentDidMount() {
    /*
     * Selects automatically pick the first item, so
     * make sure we set it.
     */
    this.handleChange({
      target : {
        value : this.refs.select.value
      }
    });
  }

};

SelectInput.defaultProps = {
  classes     : {},
  name        : '',
  id          : '',
  value       : '',
  options     : [],
  onChange    : () => {},
  onBlur      : () => {}
};

module.exports = SelectInput;