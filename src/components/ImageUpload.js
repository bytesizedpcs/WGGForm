import React from 'react';
import '../App.css';

export default class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      file: '',
      imagePreviewUrl: '',
    }
  }

  _handleImageChange = (e) => {
    e.preventDefault();

    const reader  = new FileReader();
    const file    = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img className="thumbnail-img" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }

    return (
      <div className="previewComponent">
        <input 
          className="fileInput" 
          type="file"
          onChange={(e) => this._handleImageChange(e)}
        />
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}