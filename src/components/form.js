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
      fileName: '',
      footOption: '',
      fabricOption: 'banger',
      colorOption: 'slate',
      backingOption: 'mousepad',
      pocketOption: 'one',
      quantityOption: '',
      customerName: '',
      customerCode: '',
      itemNumber: '',
      date: '',
      embroideryNumber: '',
      embroideryOption: 'New',
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
      'Foot Option': this.state.footOption,
      'Fabric': this.state.fabricOption,
      'Color': this.state.colorOption,
      'Backing': this.state.backingOption,
      'Pockets': this.state.pocketOption,
      'Quantity': this.state.quantityOption,
      'Customer Name': this.state.customerName,
      'Customer Code': this.state.customerCode,
      'Date': this.state.date,
      'Embroidery': this.state.embroideryOption,
      'Embroidery Number': this.state.embroideryNumber,
      'Embroidery Color 1': this.state.embroideryColor0,
      'Embroidery Color 2': this.state.embroideryColor1,
      'Embroidery Color 3': this.state.embroideryColor2,
      'Embroidery Color 4': this.state.embroideryColor3,
      'Embroidery Color 5': this.state.embroideryColor4,
      'Embroidery Color 6': this.state.embroideryColor5,
      'Reveal Directions': this.state.revealDirection,
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
      XLSX.writeFile(newWorkbook, `${this.state.fileName}.xlsb`);
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
            <FootProtector
              footOption={this.state.footOption}
              onSelect={this.handleSelection}
            ></FootProtector>
            <Pillow
              pillowOption={this.state.pillowOption}
              onSelect={this.handleSelection}
            ></Pillow>
            <ItemNumber
              itemNumber={this.state.itemNumber}
              onSelect={this.handleSelection}
            ></ItemNumber>
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
            <RevealDirection
              revealDirection={this.state.revealDirection}
              onSelect={this.handleSelection}
            ></RevealDirection>
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

class Inputs extends Component {
  render() {
    const fields = ['submittedBy', 'customerCode', 'customerName', 
                    'quantityOption', 'orderNumber'];
    const labels = ['Submitted By', 'Customer Code', 'Customer Name',
                    'Quantity', 'Order Number'];
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

class FileName extends Component {
  render() {
    return (
      <Grid item xs={12} md={6}>
          <TextField 
            name="fileName"
            style={{
              marginBottom: '5%',
              width: '50%'
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.props.onSelect} 
            label="File Name (When Downloaded)"
            fullwidth
          />
      </Grid>
    );
  }
}

class Embroidery extends Component {
  render() {
    const options = ['New', 'Standing'];
    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-embroidery" 
          label="Embroidery Tape"
          name="embroideryOption" 
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          select
          margin="normal"
          value={this.props.embroideryOption}
          onChange={this.props.onSelect}
        >
          {
            createOptions(options)
          }
        </TextField>
      </Grid>
    );
  }
}

class EmbroideryNumber extends Component {
  render() {
    if (this.props.embroideryOption === 'standing') {
      return (
        <Grid item xs={12} md={6}>
          <TextField
            id="embroideryNumber"
            label="Embroidery Tape #"
            name="embroideryNumber"
            style={{
              marginBottom: '5%',
              width: '50%'
            }}
            margin="normal"
            value={this.props.embroideryNumber}
            onChange={this.props.onSelect}
          >
          </TextField>
        </Grid>
      )
    } else {
      return null;
    }
  }
}

class EmbroideryColors extends Component {

  render() {
    return (
      Array.from({length: 6}).map((_, index) => {
        return (
          <Grid item xs={12} md={6}>
            <TextField
              label={`Embroidery Color ${index + 1}`}
              id={`embroidery-color-${index}`}
              name={`embroideryColor${index}`}
              style={{
                marginBottom: '5%',
                width: '50%'
              }}
              onChange={this.props.onSelect}
              fullwidth
            />
          </Grid>
        );
      })
    );
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

class ItemNumber extends Component {
  render() {
    const options = ['Body Pillow', 'Pillow Wrap', 'None'];
    return (
      <Grid item xs={12} md={6}>
        <TextField
          id="order-itemNumber"
          label="Item Number"
          name="itemNumber"
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          select
          margin="normal"
          value={this.props.itemNumber}
          onChange={this.props.onSelect}
        >
          {
            createOptions(options)
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

class FootProtector extends Component {
  render() {
    const options = ['None', 'Twin', 'Full', 'Queen', 'King'];

    return (
      <Grid item xs={12} md={6}>
        <TextField
          id="order-footprotector"
          label="Foot Protector"
          name="footOption"
          select
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          value={this.props.footOption}
          onChange={this.props.onSelect}
        >
          {
            createOptions(options)
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
            shrink: true
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

class RevealDirection extends Component {
  render() {
    const options = ['Hinge Top', 'Hinge Left', 'Hinge Right'];

    return (
      <Grid item xs={12} md={6}>
        <TextField
          id="reveal-direction"
          label="Reveal Direction"
          name="revealDirection"
          margin="normal"
          style={{
            marginBottom: '5%',
            width: '50%'
          }}
          InputLabelProps={{
            shrink: true
          }}
          select
          value={this.props.revealDirection}
          onChange={this.props.onSelect}
        >
          {
            createOptions(options)
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

export default withStyles(styles)(Form);
