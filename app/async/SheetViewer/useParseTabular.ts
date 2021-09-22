import {
  GridColumns,
  GridRowData,
  GridRowsProp,
} from '@mui/x-data-grid';
import Papa from 'papaparse';
import xlsx, { Sheet } from 'xlsx';

import { isCSV, isXLS } from '../../helpers/attachments';

const LIMIT = 1000;

const calcColumns = (sheet: Sheet) => {
  const lastCol = xlsx.utils.decode_range(sheet['!ref']!).e.c + 1;
  const cols: GridColumns = [];
  const flex = !sheet['!cols'] ? 1 : undefined;

  for (let i = 0; i < lastCol; ++i) {
    cols.push({
      field: xlsx.utils.encode_col(i),
      flex,
      hide: sheet['!cols']?.[i].hidden,
      width: sheet['!cols']?.[i].wpx,
    });
  }

  return cols;
};

const openWrappers = ['"', "'", '[', '(', '{', '<'];
const closeWrappers = ['"', "'", ']', ')', '}', '>'];
const ONLY_WRAPPERS = 2;

const trimForViewing = (key: string) => {
  const trimmed = key.trim();

  if (trimmed.length > ONLY_WRAPPERS
    && openWrappers.includes(trimmed[0])
    && closeWrappers.includes(trimmed[trimmed.length - 1])) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const parseCSV = (data: ArrayBuffer): [GridColumns?, GridRowsProp?, string?] => {
  const t = new TextDecoder().decode(data);
  const parsed = Papa.parse<Record<string, string>>(t, {
    header: true,
    skipEmptyLines: true,
    transform: trimForViewing,
    transformHeader: trimForViewing,
  });

  if (parsed.errors.length > 0) {
    return [undefined, undefined, parsed.errors[0].message];
  }

  if (!parsed.meta.fields) {
    return [undefined, undefined, 'Cannot load preview'];
  }

  const gridCols = parsed.meta.fields.slice(0, LIMIT).map((field) => ({
    field,
  })) ?? [];

  const gridRows = parsed.data.slice(0, LIMIT).map((obj, id) => ({
    id,
    ...obj,
  }));

  return [gridCols, gridRows];
};

const parseXLS = (
  data: ArrayBuffer,
  sheetIndex = 0,
): [GridColumns?, GridRowsProp?] => {
  const wb = xlsx.read(data, { type: 'buffer' });
  const sheet = wb?.Sheets?.[wb.SheetNames?.[sheetIndex]];
  const gridCols = calcColumns(sheet);
  const rows: string[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const gridRows: GridRowsProp = rows.map((r, id) => r.reduce(
    (acc: GridRowData, cur: string, i: number): GridRowData => ({
      ...acc,
      [xlsx.utils.encode_col(i)]: cur,
    }),
    { id },
  ));

  return [gridCols, gridRows];
};

export const useParseTabular = (
  url: string,
  contentType: string | undefined,
  data: ArrayBuffer | undefined,
): [GridColumns?, GridRowsProp?, string?] => {
  if (!data) {
    return [];
  }

  if (isCSV(url, contentType)) {
    return parseCSV(data);
  } else if (isXLS(url, contentType)) {
    return parseXLS(data);
  }

  return [];
};
