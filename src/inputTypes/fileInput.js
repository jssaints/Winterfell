var React = require('react');
import Dropzone from 'react-dropzone';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      progress: 0
    };
  }

  handleChange(file, progress) {
    this.setState(
      {
        value: file
      },
      this.props.onChange.bind(null, file, progress)
    );
  }

  progressEvent(progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    this.setState({
      progress: percentCompleted
    });
    this.forceUpdate();
  }

  onDrop(files) {
    const progress = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: this.progressEvent.bind(this)
    };
    Object.assign(files[0], {
      preview: URL.createObjectURL(files[0])
    });
    this.setState(
      {
        value: files[0]
      },
      this.props.onChange.bind(null, files[0], progress)
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
      borderRadius: 5,
      cursor: 'pointer'
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
    const progressBar = {
      float: 'left',
      width: '0',
      height: '100%',
      fontSize: '12px',
      lineHeight: '20px',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: '#337ab7',
      WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
      boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
      WebkitTransition: 'width .6s ease',
      Otransition: 'width .6s ease',
      transition: 'width .6s ease'
    };
    const progressWrapper = {
      height: '10px',
      marginTop: '10px',
      width: '400px',
      float: 'left',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
    };
    progressBar.width = `${this.state.progress}%`;
    let message = <span>Uploading ...</span>;
    if (this.state.progress === 100) {
      message = <span>Successfully uploaded</span>;
    }
    return (
      <section>
        {this.state.value.preview && (
          <img src={this.state.value.preview} style={img} />
        )}
        <Dropzone
          accept="image/*"
          multiple={false}
          name={this.props.name}
          onDrop={this.onDrop.bind(this)}
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
        {this.state.progress !== 0 && (
          <React.Fragment>
            <div style={progressWrapper}>
              <div style={progressBar} />
            </div>
            <div style={{ clear: 'left' }}>{message}</div>
          </React.Fragment>
        )}
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