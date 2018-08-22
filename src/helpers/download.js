import convert from 'xml-js';

/**
 * 
 * @param {Name of file to download} filename 
 * @param {Data that will be added to file} data 
 * Creates an invisible link for the user to download once a download
 * button is clicked
*/
export function download(filename, data) {

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
 * 
 * Takes state as the data
*/
export const downloadXML = (state) => {

    const xmlData = convert.json2xml(JSON.stringify(state), {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    });

    download('XML-Form.xml', xmlData);
  }
