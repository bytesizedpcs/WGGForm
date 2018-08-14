import React, { Component } from 'react';
import { createOptions, createColorOptions } from '../helpers/options';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import convert from 'xml-js';
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

    this.state = {};
  }


  /**
   * Initializes the state once Form component has rendered
   */
  componentDidMount = () => {

    this.setState({
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
    });

  }

  /**
   * NOT IMPLEMENTED
   * Submit the form to create XML document and send to MySQL database
   */
  handleSubmit = () => {
    const excelData = [];
    const column = [];
    const row = [];

    Object.entries(this.state).forEach(([key, value]) => {
      column.push([key]);
      row.push([value]);
    });

    excelData.push(column);
    excelData.push(row);

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "WGG Order Form");
    XLSX.writeFile(new_workbook, 'workform.xlsb');
  }

  /**
   * 
   * @param {Name of file to download} filename 
   * @param {Data that will be added to file} data 
   * Creates an invisible link for the user to download once a download
   * button is clicked
   */
  download(filename, data) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  /**
   * Creates the XML data for the user to download
   * Uses an option object
   * https://www.npmjs.com/package/xml-js
   */
  downloadXML = () => {
    const xmlData = convert.json2xml(JSON.stringify(this.state), {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    });
    this.download('XML-Form.xml', xmlData);
  }

  /**
   * Function to add all selections to state for XML parsing
   */
  handleSelection = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => console.log(this.state));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="form" noValidate autoComplete="off">
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container spacing={12}>
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
        <Button 
          color="primary" 
          variant="contained" 
          onClick={this.handleSubmit}
          style={{
            marginTop: '5%'
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
