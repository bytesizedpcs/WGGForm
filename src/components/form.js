import React, { Component } from 'react';
import _ from 'lodash';
import XLSX from 'xlsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
  FileName,
  Size,
  Notes,
} from './fields.js';
import { getExcelData } from '../helpers/excel';

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
   * Creates and excel sheet from an array of arrays
   */
  createExcelSheet = (data) => {

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'WGG Order Form');

    try {
      XLSX.writeFile(newWorkbook, `${this.state.fileName}.xlsb`);
    } catch(error) {
      console.error(error);

      this.setState({ hasError: true });
    }

  } 

  /**
   * 
   * Submit the form to create XML document and send to MySQL database
   */
  handleSubmit = () => {

    const { values } = this.state;

    /**
    const form = Object.entries(values).reduce(([key, value]) => ({
      prev[_.startCase(key)] = value
    }));
    */
    
    const form = Object.entries(values).reduce((accum, [key, value]) => {
      console.log('Accum', accum)
      console.log('Key', key)
      console.log('value', value)
      accum.push([key, value]);
      return accum;
    }, []);

    console.log('Form', form);

    /**
    const form = {
      'Foot Option': this.state.footOption,
      'Fabric': this.state.fabricOption,
      'Color': this.state.colorOption,
      'Backing': this.state.backingOption,
      'Pockets': this.state.pocketOption,
      'Quantity': this.state.quantityOption,
      'Customer Name': this.state.customerName,
      'Customer Code': this.state.customerCode,
      'Size': this.state.sizeOption,
      'Date': this.state.date,
      'Embroidery': this.state.embroideryOption,
      'Foot Protector Item Number': this.state.footProtectorItemNumber,
      'Pillow Item Number': this.state.pillowItemNumber,
      'Embroidery Number': this.state.embroideryNumber,
      'Embroidery Color 1': this.state.embroideryColor0,
      'Embroidery Color 2': this.state.embroideryColor1,
      'Embroidery Color 3': this.state.embroideryColor2,
      'Embroidery Color 4': this.state.embroideryColor3,
      'Order Number': this.state.orderNumber,
      'Pillow': this.state.pillowOption,
      'Submitted By': this.state.submittedBy,
      'Notes': this.state.notes,
    };
    */

    const data = getExcelData(form);

    this.createExcelSheet(data);
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
            <FileName
              onSelect={this.handleSelection}
              formName={values.formName}
            ></FileName>
            <Notes
              onSelect={this.handleSelection}
              notes={values.notes}
            ></Notes>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </form>
        <Button 
          variant="contained" 
          onClick={this.handleSubmit}
          style={{
            margin: '5%',
            color: 'white',
            backgroundColor: '#338BAE'
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(Form);
