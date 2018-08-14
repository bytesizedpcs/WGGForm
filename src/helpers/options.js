import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * 
 * @param {*} options 
 * Takes in options and creates option tags populated for the selection tag
 * 
 */
export function createOptions(options) {
  return options.map((option, index) => {
    return <MenuItem value={option.toLowerCase()} key={index}>{option}</MenuItem>;
  })
}

/**
 * Takes fabric option and desides certain color options to be shown
 * 
 */

export function createColorOptions(options, fabric) {
  switch (fabric) {
    case 'banger':
      options.splice(1, options.length);
      break;
    case 'jett':
      options.splice(0, 1);
      options.splice(4, options.length);
      break;
    case 'mercer':
      options.splice(0, 5);
      options.splice(2, options.length);
      break;
    case 'peak':
      options.splice(0, 7);
      options.splice(4, options.length);
      break;
    case 'optima':
      options.splice(0, 11);
      options.splice(5, options.length);
      break;
    case 'lustre':
      options.splice(0, 16);
      options.splice(1, options.length);
      break;
    default:
      break;
  }

  return createOptions(options);
}