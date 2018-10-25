import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { 
  Inputs,
  Date, 
  FootProtector, 
  Pillow, 
  Fabric, 
  Embroidery,
  EmbroideryNumber, 
  EmbroideryColors, 
  Size,
  Notes,
  FootProtectorQuantity,
} from './fields.js';
import ImageUpload from './ImageUpload';
import { createPdf } from '../helpers/pdf';
const pdfMake = require('pdfmake/build/pdfmake.js');
const vfsFonts = require('pdfmake/build/vfs_fonts.js');
const { vfs } = vfsFonts.pdfMake;
pdfMake.vfs = vfs;

/**
 * 
 * @param {*} theme 
 * Styles for Material UI components
 */
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Form extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      values: {
        fileName: '',
        footOption: '',
        fabricOption: '',
        colorOption: '',
        backingOption: '',
        pocketOption: '',
        quantityOption: '',
        customerName: '',
        customerCode: '',
        sizeOption: '',
        date: '',
        embroideryNumber: '',
        embroideryOption: '',
        orderNumber: '',
        pillowOption: '',
        submittedBy: '',
        notes: '',
      },
      hasError: false,
      file: '',
      imagePreviewUrl: '',
    };

  }

  /**
   * Function that is called everytime the form renders to 
   * change the title for the PDF print/save
   *
   */
  componentDidUpdate() {
    const { values } = this.state;

    let suffix = '';

    switch(values.sizeOption.toLowerCase()) {
      case 'twin':
        suffix = 'T';
        break;
      case 'full':
        suffix = 'F';
        break;
      case 'queen':
        suffix = 'Q';
        break;
      case 'king':
        suffix = 'K';
        break;
      default:
        suffix = '';
    }

    const formName = `${values.customerCode}${values.salesOrderNumber}_${suffix}`
    document.title = formName;
  }

  /**
   * Gets the suffix from the size option
   */
  getSuffix = (state) => {
    const { values } = state;

    let suffix = '';

    switch(values.sizeOption.toLowerCase()) {
      case 'twin':
        suffix = 'T';
        break;
      case 'full':
        suffix = 'F';
        break;
      case 'queen':
        suffix = 'Q';
        break;
      case 'king':
        suffix = 'K';
        break;
      default:
        suffix = '';
    }

    return suffix;
  }

  /**
   * Creates the form name from state values
   */
  getFormName = () => {
    const { values } = this.state;
    const suffix = this.getSuffix(this.state);

    const formName = `${values.customerCode}${values.salesOrderNumber}_${suffix}`

    return formName;
  }

  /**
   * 
   * Submit the form to create XML document and send to MySQL database
   * Name will be decided on the size of the pillow option (suffix)
   */
  handleSubmit = () => {
    const docShape = createPdf(this.state);

    pdfMake.createPdf(docShape).download(this.getFormName()); 
  }

  /**
   * Handles the creation and email of file
   */
  handleImageChange = (e) => {
    e.preventDefault();

    const reader  = new FileReader();
    const file    = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    }

  }

  /**
   * Function to add all selections to state for XML parsing
   */
  handleSelection = (event) => {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  }

  /**
   * Function to handle the setting of the state while footOption is 'no'
   * Sets the value of fpQ as 0
   */
  handleFPQuantitySelection = (event) => {
    const { target: { name } } = event;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: '0',
      }
    }))
  }

  /**
   * Function to handle setting the state of the component's actual value
   * and the state of footProtectorQuantity
   */
  handleFPSelection = (event) => {
    const { target: { name, value } } = event;
    
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
        'footProtectorQuantity': '0',
      }
    }))
  }

  /**
   * 
   */

  render() {
    const { classes } = this.props;
    const { values, imagePreviewUrl } = this.state;
    
    return (
      <div className="form" noValidate autoComplete="off">
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container spacing={8}>
            <Date
              onSelect={this.handleSelection}
            ></Date>
            <Inputs
              onSelect={this.handleSelection}
              fields={['submittedBy', 'customerCode', 'customerName', 'salesOrderNumber']}
              labels={['Submitted By', 'Customer Code', 'Customer Name', 'Sales Order Number']}
            ></Inputs>
            <Size
              onSelect={this.handleSelection}
              sizeOption={values.sizeOption}
            ></Size>
            <Inputs
              onSelect={this.handleSelection}
              fields={['footProtectorItemNumber', 'pillowItemNumber']}
              labels={['Foot Protector Item Number', 'Pillow Item Number']}
            ></Inputs>
            <Pillow
              pillowOption={values.pillowOption}
              onSelect={this.handleSelection}
              sizeOption={values.sizeOption}
            ></Pillow>
            <Inputs
              onSelect={this.handleSelection}
              fields={['pillowQuantity']}
              labels={['Pillow Quantity']}
            ></Inputs>
            <FootProtector
              footOption={values.footOption}
              onSelect={this.handleSelection}
              onFPSelect={this.handleFPSelection}
            ></FootProtector>
            <FootProtectorQuantity
              onSelect={this.handleSelection}
              onFPSelect={this.handleFPQuantitySelection}
              footProtector={values.footOption}
              footProtectorQuantity={values.footProtectorQuantity}
            ></FootProtectorQuantity>
            <Fabric
              onSelect={this.handleSelection}
              fabricOption={values.fabricOption}
            ></Fabric>
            <Embroidery
              onSelect={this.handleSelection}
              embroideryOption={values.embroideryOption}
            ></Embroidery>
            <EmbroideryNumber
              onSelect={this.handleSelection}
              embroideryOption={values.embroideryOption}
              embroideryNumber={values.embroideryNumber}
            ></EmbroideryNumber>
            <EmbroideryColors
              onSelect={this.handleSelection}
              embroideryColors={values.embroideryColors}
            ></EmbroideryColors>
            <Notes
              onSelect={this.handleSelection}
              notes={values.notes}
            ></Notes>
            <ImageUpload
              url={imagePreviewUrl}
              handleChange={this.handleImageChange}
            ></ImageUpload>
            <Grid item xs={12} md={6}>
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={this.handleSubmit}
                style={{
                  marginTop: '15%',
                  marginLeft: '95%',
                  maxHeight: '80px',
                  width: '120px'
                }}
              >
                Save to PDF
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}


export default withStyles(styles)(Form);
