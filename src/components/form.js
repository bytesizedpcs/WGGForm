import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
  Color, 
  Size,
  Notes,
} from './fields.js';
import ImageUpload from './ImageUpload';

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
   * 
   * Submit the form to create XML document and send to MySQL database
   * Name will be decided on the size of the pillow option (suffix)
   */
  handleSubmit = () => {

  }

  /**
   * Handles the creation and email of file
   */
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

  render() {
    const { classes } = this.props;
    const { values } = this.state;
    
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
            <FootProtector
              footOption={values.footOption}
              onSelect={this.handleSelection}
            ></FootProtector>
            <Pillow
              pillowOption={values.pillowOption}
              onSelect={this.handleSelection}
              sizeOption={values.sizeOption}
            ></Pillow>
            <Inputs
              onSelect={this.handleSelection}
              fields={['footProtectorQuantity', 'pillowQuantity']}
              labels={['Foot Protector Quantity', 'Pillow Quantity']}
            ></Inputs>
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
            <Color
              fabricOption={values.fabricOption}
              colorOption={values.colorOption}
              onSelect={this.handleSelection}
            ></Color>
            <Notes
              onSelect={this.handleSelection}
              notes={values.notes}
            ></Notes>
            <ImageUpload
            ></ImageUpload>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}


export default withStyles(styles)(Form);
