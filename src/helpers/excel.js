
export function getExcelData(_state) {
  const data = [];
  const cols = [];
  const rows = [];

  Object.entries(_state).forEach(([key, val]) => {
    cols.push([key]);
    rows.push([val]);

  });

  data.push(cols, rows);

  return data;
}

