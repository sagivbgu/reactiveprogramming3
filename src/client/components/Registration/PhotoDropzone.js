import React from 'react';
import ReactDropzone from "react-dropzone";

import './photoDropzone.scss';

class PhotoDropzone extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);

        this.state = {photo: null};
    }

    onDrop(files) {
        let photo = files[0];
        console.log(photo);
        this.setState({photo: photo});
        if (this.props.onPhoto) {
            this.props.onPhoto(photo);
        }
    }

    render() {
        return (
            <div id='photo-dropzone'>
                <ReactDropzone
                    onDrop={this.onDrop}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    multiple={false}
                >
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {this.state.photo ? this.state.photo.path : 'Click or drag to upload a photo'}
                        </div>
                    )}
                </ReactDropzone>
            </div>
        );
    }
}

export default PhotoDropzone;
