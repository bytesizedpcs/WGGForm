import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createOptions, createColorOptions } from '../helpers/options';

export class Inputs extends Component {

  render() {
    const fields = ['submittedBy', 'customerCode', 'customerName', 
                    'quantityOption', 'orderNumber', 'footProtectorItemNumber', 'pillowItemNumber'];
    const labels = ['Submitted By', 'Customer Code', 'Customer Name',
                    'Quantity', 'Order Number', 'Foot Protector Item Number', 'Pillow Item Number'];

    return fields.map((field, index) => {
      return (
        <Grid item xs={12} md={6} key={index}>
          <TextField 
            name={field} 
            style={{
              marginBottom: '5%',
              width: '50%'
            }}
            InputLabelProps={{
              shrink: true,
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

export class FileName extends Component {

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

export class Embroidery extends Component {

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

export class EmbroideryNumber extends Component {

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

export class EmbroideryColors extends Component {

  render() {
    return (
      Array.from({length: 6}).map((_, index) => {
        return (
          <Grid item xs={12} md={6} key={index}>
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

export class Pillow extends Component {
  render() {
    const pillows = ['None', 'Pillow Shams', 'Body Pillow', 'Pillow Wedge', 'Pillow Wrap'];

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

export class ItemNumber extends Component {
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

export class Date extends Component {
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

export class Size extends Component {

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

export class FootProtector extends Component {
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

export class Fabric extends Component {
  
  render() {
    const fabrics = ['Banger', 'Jett', 'Mercer', 'Peak', 'Optima', 'Lustre', 'Tacoma'];

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

export class Color extends Component {
  render() {
    const colors = ['Cambridge', 'Slate', 'Heather', 'Khaki', 'Ruby', 'Smoke',
                    'Flannel', 'Buff', 'Lt-Grey', 'Fog', 'Cardinal', 'Stone',
                    'Espresso', 'Charcoal', 'Black', 'Navy', 'Coal', 'Chocolate'];
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

export class RevealDirection extends Component {
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

export class Pockets extends Component {
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

