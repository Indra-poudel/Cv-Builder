import { CsvRowState } from 'src/services/upload-csv';

/**
 * Convert JSON payload to object structure.
 *
 *
 * @returns {Object}
 */
export default function fromJson({ csvRow, message, status, email, domain }: CsvRowState): CsvRowState {
  const encoded = {
    csvRow: `Row ${csvRow}`,
    message: message,
    status,
    email,
    domain,
  };

  return {
    ...encoded,
  };
}
