import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createOptions, createColorOptions } from '../helpers/options';

export const Inputs = function (props) {
  return (
    props.fields.map((field, index) => {
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
            onChange={props.onSelect} 
            label={props.labels[index]} 
            fullWidth
            required
          />
        </Grid>
      )
    })
  )
};

export const Notes = function(props) {
  const { notes, onSelect } = props;
  return (
    <Grid item xs={12} md={6}>
      <TextField
        id="order-notes"
        label="Notes"
        name="notes"
        style={{
          marginLeft: '25%',
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={notes}
        onChange={onSelect}
        multiline
        fullWidth
        variant="outlined"
        rows="4"
        required
        />
    </Grid>
  )
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
            fullWidth
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
          required
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
            required
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

/**
 *
 * Options created by populating array with undefines
 *
 */
export class EmbroideryColors extends Component {

  render() {

    const colorCount = 4;
    return (
      Array.from({length: colorCount}).map((_, index) => {
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
              fullWidth
            />
          </Grid>
        );
      })
    );
  }
}

export class Pillow extends Component {
  render() {
    const { pillowOption, onSelect, sizeOption } = this.props;
    let pillows = ['None', 'Pillow Shams', 'Body Pillow', 'Pillow Wedge', 'Pillow Wrap'];

    // delete the Pillow Shams if the Foot protector option is twin
    if (sizeOption.toLowerCase() === 'twin') {
      pillows.splice(1, 1);
    }
 
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
          required
          margin="normal"
          value={pillowOption}
          onChange={onSelect}
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
          required
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
          required
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
          required
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
          required
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
    const fabrics = ['Banger/Cambridge', 
      'Jett/Slate',
      'Jett/Heather',
      'Jett/Khaki',
      'Jett/Ruby',
      'Mercer/Smoke',
      'Mercer/Flannel',
      'Peak/Buff',
      'Peak/Lt-Grey',
      'Peak/Fog',
      'Peak/Cardinal',
      'Optima/Stone',
      'Optima,Espresso',
      'Optima/Charcoal',
      'Optima/Black',
      'Optima/Navy',
      'Lustre/Coal',
      'Tacoma/Chocolate',
    ];

    return (
      <Grid item xs={12} md={6}>
        <TextField 
          id="order-fabric" 
          label="Fabric Option"
          name="fabricOption" 
          select
          required
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
          required
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
          required
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
          required
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

