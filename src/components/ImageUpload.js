import React from 'react';
import '../App.css';

export default class ImageUpload extends React.Component {

  render() {
    const { url, handleChange } = this.props;
    let imagePreview = null;
    console.log('props', this.props);

    if (url) {
      imagePreview = (<img className="thumbnail-img" alt="Thumbnail" src={url} />);
    } else {
      imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }

    return (
      <div className="previewComponent">
        <input 
          className="fileInput" 
          type="file"
          onChange={handleChange}
        />
        <div className="imgPreview">
          {imagePreview}
        </div>
      </div>
    )
  }
}
