export function createPdf(data){
  const { values, imagePreviewUrl } = data;

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
      '\n',
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
      '\n',
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
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
      },
      '\n',
      {
        columns: [
          {
            text: 'Notes',
            style: 'header',
          },
        ],
      },
      values.notes,
      '\n',
      '\n',
      {
        image: imagePreviewUrl,
        fit: [300, 300],
      }
    ],
    styles: {
      header: {
        bold: true,
      }
    }
  }

  return docShape;
}
