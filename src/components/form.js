import React, { Component } from 'react';
import { createOptions, createColorOptions } from '../helpers/options';
import { getExcelData } from '../helpers/excel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogContent';
import DialogContent from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';

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
      sizeOption: 'twin',
      fabricOption: 'banger',
      colorOption: 'slate',
      backingOption: 'mousepad',
      pocketOption: 'one',
      quantityOption: '',
      customerName: '',
      customerCode: '',
      itemNumber: '',
      date: '',
      embroideryOption: '',
      orderNumber: '',
      pillowOption: 'sham',
      submittedBy: '',
      hasError: false,
    };

  }
  
  /**
   * 
   * Submit the form to create XML document and send to MySQL database
   */
  handleSubmit = () => {
    const form = {
      'Size': this.state.sizeOption,
      'Fabric': this.state.fabricOption,
      'Color': this.state.colorOption,
      'Backing': this.state.backingOption,
      'Pockets': this.state.pocketOption,
      'Quantity': this.state.quantityOption,
      'Customer Name': this.state.customerName,
      'Customer Code': this.state.customerCode,
      'Date': this.state.date,
      'Embroidery': this.state.embroideryOption,
      'Order Number': this.state.orderNumber,
      'Pillow': this.state.pillowOption,
      'Submitted By': this.state.submittedBy,
    };

    const data = getExcelData(form);

    this.createExcelSheet(data);
  }

  /**
   * 
   * @param {Array of Arrays} data 
   * Takes an array of arrays and makes an excel sheet
   */
  createExcelSheet(data) {

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'WGG Order Form');

    try {
      XLSX.writeFile(newWorkbook, 'workform.xlsb');
    } catch(error) {
      console.error(error);

      this.setState({ hasError: true });
    }

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

    return (
      <div className="form" noValidate autoComplete="off">
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container spacing={8}>
            <Inputs
              onSelect={this.handleSelection}
            ></Inputs>
            <Date
              onSelect={this.handleSelection}
            ></Date>
            <Size
              sizeOption={this.state.sizeOption}
              onSelect={this.handleSelection}
            ></Size>
            <Pillow
              pillowOption={this.state.pillowOption}
              onSelect={this.handleSelection}
            ></Pillow>
            <Fabric
              onSelect={this.handleSelection}
              fabricOption={this.state.fabricOption}
            ></Fabric>
            <Color
              fabricOption={this.state.fabricOption}
              colorOption={this.state.colorOption}
              onSelect={this.handleSelection}
            ></Color>
            <Pockets
              pocketOption={this.state.pocketOption}
              onSelect={this.handleSelection}
            ></Pockets>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
        </form>
        <div className="information">
          <h3>
            DETAIL AREA:
          </h3>
          <span>
            <h4>Pillow Sham</h4>
            30" x 20" standard fabric sham with coordinating solid fabric back with zipper closure
          </span>
          <span>
            <h4>Foot Protector</h4>
            56" x 16" foam backed fabric foot protector with 18" x 11" reveal and 2 stitched vinyl windows.  Windows are 12" x 9.5" to accomodate standard letter sized paper. Reveal has styrene and dacron to give it a smooth tailored look.
          </span>

        </div>
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

class Inputs extends Component {
  render() {
    const fields = ['submittedBy', 'itemNumber', 'customerCode', 'customerName', 
                    'quantityOption', 'embroideryOption', 'orderNumber'];
    const labels = ['Submitted By', 'Item Number', 'Customer Code', 'Customer Name',
                    'Quantity', 'Embroidery', 'Order Number'];
    return fields.map((field, index) => {
      return (
        <Grid item xs={12} md={6}>
          <TextField 
            name={field} 
            key={index} 
            style={{
              marginBottom: '5%',
              width: '50%'
            }}
            onChange={this.props.onSelect} 
            label={labels[index]} 
            fullwidth
          />
        </Grid>
      )
    })
  }
}

class Pillow extends Component {
  render() {
    const pillows = ['Sham', 'Wedge'];
    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-pillow" 
          label="Pillow Option"
          name="pillowOption" 
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          select
          margin="normal"
          value={this.props.pillowOption}
          onChange={this.props.onSelect}
        >
          {
            createOptions(pillows)
          }
        </TextField>
      </Grid>
    );
  }
}

class Date extends Component {
  render() {
    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="date"
          label="Date"
          type="date" 
          name="date" 
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.props.onSelect} 
        />
      </Grid>
    );
  }
}

class Size extends Component {

  render() {
    const sizes = ['Twin', 'Full', 'Queen', 'King'];

    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-size" 
          label="Size"
          name="sizeOption" 
          select
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          value={this.props.sizeOption}
          onChange={this.props.onSelect}
        >
          {
            createOptions(sizes)
          }
        </TextField>
      </Grid>
    );
  }

}

class Fabric extends Component {
  
  render() {
    const fabrics = ['Banger', 'Jett', 'Mercer', 'Peak', 'Optima', 'Lustre'];

    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-fabric" 
          label="Fabric Option"
          name="fabricOption" 
          select
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          value={this.props.fabricOption} 
          onChange={this.props.onSelect}
        >
          {
            createOptions(fabrics)
          }
        </TextField>
      </Grid>
    );
  }
}

class Color extends Component {
  render() {
    const colors = ['Cambridge', 'Slate', 'Heather', 'Khaki', 'Ruby', 'Smoke',
                    'Flannel', 'Buff', 'Lt-Grey', 'Fog', 'Cardinal', 'Stone',
                    'Espresso', 'Charcoal', 'Black', 'Navy', 'Coal'];
    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-color" 
          label="Color"
          name="colorOption" 
          margin="normal"
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          select
          value={this.props.colorOption}
          onChange={this.props.onSelect}
        >
          {
            createColorOptions(colors, this.props.fabricOption)
          }
        </TextField>
      </Grid>
    );
  }
}

class Pockets extends Component {
  render() {
    const pockets = ['One', 'Two'];

    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-pockets" 
          label="Pockets"
          name="pocketOption" 
          margin="normal"
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          select
          value={this.props.pocketOption}
          onChange={this.props.onSelect}
        >
        {
          createOptions(pockets)
        }
        </TextField>
      </Grid>
    );
  }
}

class Logo extends Component {
  render () {
    const options = ['New', 'Existing'];

    return (
      <div>
        <select type="text" name="embroiderOption" id="embroider-option"></select>
        {
          createOptions(options)
        }
        <input type="file" accept=".psd,.ai,image/*" name="logo-upload" id="logo-upload"></input>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
