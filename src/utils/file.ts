// source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const unitMultiple = 1024;
  const decimalPoint = decimals < 0 ? 0 : decimals;
  const sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));

  return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimalPoint)) + ' ' + sizeUnits[unitChanges];
};
