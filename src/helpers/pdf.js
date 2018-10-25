export function createPdf(data){
  const { values } = data;

  const docShape = {
    content: [
      {
        columns: [
          {
            text: 'Date',
            style: 'header',
          },
            values.date,
          {
            text: 'Customer Name',
            style: 'header',
          },
            values.customerName,
        ],
      },
      {
        columns: [
          {
            text: 'Customer Code',
            style: 'header',
          },
            values.customerCode,
          {
            text: 'Fabric',
            style: 'header',
          },
            values.fabricOption,
        ],
      },
      {
        columns: [
          {
            text: 'Sales Order Number',
            style: 'header',
          },
            values.salesOrderNumber,
          {
            text: 'Submitted By',
            style: 'header',
          },
            values.submittedBy,
        ],
      },{
        columns: [
          {
            text: 'Fabric',
            style: 'header',
          },
            values.fabricOption,
          {
            text: 'Size',
            style: 'header',
          },
            values.sizeOption,
        ],
      },{
        columns: [
          {
            text: 'Embroidery',
            style: 'header',
          },
            values.embroideryOption,
          {
            text: 'Embroidery Number',
            style: 'header',
          },
            values.embroideryNumber,
        ],
      },{
        columns: [
          {
            text: 'Foot Protector',
            style: 'header',
          },
            values.footOption,
          {
            text: 'Foot Protector Item Number',
            style: 'header',
          },
            values.footProtectorItemNumber,
        ],
      },{
        columns: [
          {
            text: 'Foot Protector Quantity',
            style: 'header',
          },
            values.footProtectorQuantity,
          {
            text: 'Pillow',
            style: 'header',
          },
            values.pillowOption,
        ],
      },{
        columns: [
          {
            text: 'Pillow Item Number',
            style: 'header',
          },
            values.pillowItemNumber,
          {
            text: 'Pillow Quantity',
            style: 'header',
          },
            values.pillowQuantity,
        ],
      },{
        columns: [
          {
            text: 'Embroidery Color 1',
            style: 'header',
          },
            values.embroideryColor0,
          {
            text: 'Embroidery Color 2',
            style: 'header',
          },
            values.embroideryColor1,
        ],
      },{
        columns: [
          {
            text: 'Embroidery Color 3',
            style: 'header',
          },
            values.embroideryColor2,
          {
            text: 'Embroidery Color 4',
            style: 'header',
          },
            values.embroideryColor3,
        ],
      },{
        columns: [
          {
            text: 'Notes',
            style: 'header',
          },
        ],
      },
      values.notes,
    ],
    styles: {
      header: {
        bold: true,
      }
    }
  }

  return docShape;
}

/**
 * {…}
backingOption: ""
colorOption: ""
customerCode: "012334"
customerName: "Test Customer"
date: "2018-10-17"
embroideryColor0: "13213"
embroideryColor1: "43214314"
embroideryColor2: "1243143214"
embroideryColor3: "123421423"
embroideryNumber: "13213"
embroideryOption: "standing"
fabricOption: "jett/ruby"
fileName: ""
footOption: "yes"
footProtectorItemNumber: "1321313"
footProtectorQuantity: "213214"
notes: ";jflkdsa;jfsdkla;jfdskla;jfkdlsa;"
orderNumber: ""
pillowItemNumber: "132131"
pillowOption: "pillow shams"
pillowQuantity: "13213"
pocketOption: ""
quantityOption: ""
salesOrderNumber: "3123123"
sizeOption: "full"
submittedBy: "Austin Canada"
 */