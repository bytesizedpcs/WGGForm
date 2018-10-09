import React, { Component } from 'react';
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
  Pockets, 
  FileName,
  Size,
} from './fields.js';
import { getExcelData } from '../helpers/excel';

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
      'Embroidery Color 5': this.state.embroideryColor4,
      'Embroidery Color 6': this.state.embroideryColor5,
      'Order Number': this.state.orderNumber,
      'Pillow': this.state.pillowOption,
      'Submitted By': this.state.submittedBy,
    };

    const data = getExcelData(form);

    this.createExcelSheet(data);
  }

  /**
   * Function to add all selections to state for XML parsing
   */
  handleSelection = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    }, () => console.log(this.state))
  }

  render() {
    const { classes } = this.props;
    const fields = ['submittedBy', 'customerCode', 'customerName', 
                    'quantityOption', 'orderNumber', 'footProtectorItemNumber', 'pillowItemNumber',
                    'footProtectorQuanity', 'pillowQuantity'];
    const labels = ['Submitted By', 'Customer Code', 'Customer Name',
                    'Quantity', 'Order Number', 'Foot Protector Item Number', 'Pillow Item Number',
                    'Foot Protector Quantity', 'Pillow Quantity'];

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
              sizeOption={this.state.sizeOption}
            ></Size>
            <FootProtector
              footOption={this.state.footOption}
              onSelect={this.handleSelection}
            ></FootProtector>
            <Pillow
              pillowOption={this.state.pillowOption}
              onSelect={this.handleSelection}
            ></Pillow>
            <Fabric
              onSelect={this.handleSelection}
              fabricOption={this.state.fabricOption}
            ></Fabric>
            <Embroidery
              onSelect={this.handleSelection}
              embroideryOption={this.state.embroideryOption}
            ></Embroidery>
            <EmbroideryNumber
              onSelect={this.handleSelection}
              embroideryOption={this.state.embroideryOption}
              embroideryNumber={this.state.embroideryNumber}
            ></EmbroideryNumber>
            <EmbroideryColors
              onSelect={this.handleSelection}
              embroideryColors={this.state.embroideryColors}
            ></EmbroideryColors>
            <Color
              fabricOption={this.state.fabricOption}
              colorOption={this.state.colorOption}
              onSelect={this.handleSelection}
            ></Color>
            <Pockets
              pocketOption={this.state.pocketOption}
              onSelect={this.handleSelection}
            ></Pockets>
            <FileName
              onSelect={this.handleSelection}
              formName={this.state.formName}
            ></FileName>
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
