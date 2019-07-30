'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var React = require('react');

var FileInput = (function (_React$Component) {
  _inherits(FileInput, _React$Component);

  function FileInput(props) {
    _classCallCheck(this, FileInput);

    _get(Object.getPrototypeOf(FileInput.prototype), 'constructor', this).call(this, props);

    this.state = {
      value: this.props.value
    };
  }

  _createClass(FileInput, [{
    key: 'handleChange',
    value: function handleChange(file) {
      this.setState({
        value: file
      }, this.props.onChange.bind(null, file));
    }
  }, {
    key: 'onDrop',
    value: function onDrop(files) {
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0])
      });
      this.setState({
        value: files[0]
      }, this.props.onChange.bind(null, files[0]));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var img = {
        display: 'block',
        width: 100,
        height: 100,
        marginBottom: 10
      };
      var baseStyle = {
        width: '100%',
        height: 70,
        textAlign: 'center',
        padding: '20px 0px',
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      var activeStyle = {
        borderStyle: 'solid',
        borderColor: '#6c6',
        backgroundColor: '#eee'
      };
      var rejectStyle = {
        borderStyle: 'solid',
        borderColor: '#c66',
        backgroundColor: '#eee'
      };
      return React.createElement(
        'section',
        null,
        this.state.value.preview && React.createElement('img', { src: this.state.value.preview, style: img }),
        React.createElement(
          _reactDropzone2['default'],
          {
            multiple: false,
            name: this.props.name,
            onDrop: this.onDrop,
            onChange: this.handleChange.bind(this)
          },
          function (_ref) {
            var getRootProps = _ref.getRootProps;
            var getInputProps = _ref.getInputProps;
            var isDragActive = _ref.isDragActive;
            var isDragReject = _ref.isDragReject;
            var acceptedFiles = _ref.acceptedFiles;
            var rejectedFiles = _ref.rejectedFiles;

            var styles = _extends({}, baseStyle);
            styles = isDragActive ? _extends({}, styles, activeStyle) : styles;
            styles = isDragReject ? _extends({}, styles, rejectStyle) : styles;

            return React.createElement(
              'div',
              _extends({}, getRootProps(), { style: styles }),
              React.createElement('input', _extends({
                type: 'file',
                name: _this.props.name,
                id: _this.props.id,
                'aria-labelledby': _this.props.labelId,
                className: _this.props.classes.file,
                required: _this.props.required ? 'required' : undefined,
                onBlur: _this.props.onBlur.bind(null, _this.state.value)
              }, getInputProps())),
              React.createElement(
                'div',
                null,
                'Choose a file or drag it here...'
              ),
              isDragReject && React.createElement(
                'div',
                null,
                'Unsupported file type...'
              )
            );
          }
        )
      );
    }
  }]);

  return FileInput;
})(React.Component);

FileInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};

module.exports = FileInput;