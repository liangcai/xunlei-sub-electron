import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class Basic extends Component {
  // constructor() {
  //   super();
  //   this.onDrop = (files) => {
  //     this.setState({files});
  //     console.log(files);
  //   };
  //   this.state = {
  //     files: []
  //   };
  // }

  render() {
    const files = this.props.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default Basic;
