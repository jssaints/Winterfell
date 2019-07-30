var React = require('react');
import Dropzone from 'react-dropzone';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  handleChange(file) {
    this.setState(
      {
        value: file
      },
      this.props.onChange.bind(null, file)
    );
  }

  onDrop(files) {
    Object.assign(files[0], {
      preview: URL.createObjectURL(files[0])
    });
    this.setState(
      {
        value: files[0]
      },
      this.props.onChange.bind(null, files[0])
    );
  }

  render() {
    const img = {
      display: 'block',
      width: 100,
      height: 100,
      marginBottom: 10
    };
    const baseStyle = {
      width: '100%',
      height: 70,
      textAlign: 'center',
      padding: '20px 0px',
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };
    const activeStyle = {
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    };
    const rejectStyle = {
      borderStyle: 'solid',
      borderColor: '#c66',
      backgroundColor: '#eee'
    };
    return (
      <section>
        {this.state.value.preview && (
          <img src={this.state.value.preview} style={img} />
        )}
        <Dropzone
          multiple={false}
          name={this.props.name}
          onDrop={this.onDrop}
          onChange={this.handleChange.bind(this)}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            acceptedFiles,
            rejectedFiles
          }) => {
            let styles = { ...baseStyle };
            styles = isDragActive ? { ...styles, ...activeStyle } : styles;
            styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

            return (
              <div {...getRootProps()} style={styles}>
                <input
                  type="file"
                  name={this.props.name}
                  id={this.props.id}
                  aria-labelledby={this.props.labelId}
                  className={this.props.classes.file}
                  required={this.props.required ? 'required' : undefined}
                  onBlur={this.props.onBlur.bind(null, this.state.value)}
                  {...getInputProps()}
                />
                <div>Choose a file or drag it here...</div>
                {isDragReject && <div>Unsupported file type...</div>}
              </div>
            );
          }}
        </Dropzone>
      </section>
    );
  }
}

FileInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  onChange: () => {},
  onBlur: () => {}
};

module.exports = FileInput;