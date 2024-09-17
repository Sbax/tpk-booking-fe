export type GoogleSheetsScope =
  | "https://www.googleapis.com/auth/spreadsheets"
  | "https://www.googleapis.com/auth/spreadsheets.readonly";

export type CellAddress = `${string}${number}`;
export type SheetRange = `${string}!${CellAddress}:${CellAddress}`;
