import { GoogleSheetsScope, SheetRange } from "@/types";
import { google } from "googleapis";

export const getAuth = (scopes: GoogleSheetsScope[]) =>
  new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes,
  });

export async function getSheetData({
  spreadsheetId,
  range,
}: {
  spreadsheetId: string;
  range: SheetRange;
}) {
  const auth = getAuth([
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ]);

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(
      "Errore durante il caricamento dei dati da Google Sheets:",
      error
    );
    return [];
  }
}

export async function appendDataToSheet({
  spreadsheetId,
  range,
  data,
}: {
  spreadsheetId: string;
  range: SheetRange;
  data: unknown[];
}) {
  const auth = getAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Errore durante l'inserimento dei dati:", error);
    return [];
  }
}

async function getSheetIdByName({
  spreadsheetId,
  sheetName,
}: {
  spreadsheetId: string;
  sheetName: string;
}) {
  const auth = getAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = sheetMetadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    if (!sheet || !sheet.properties?.sheetId) {
      throw new Error(`Foglio con nome '${sheetName}' non trovato.`);
    }

    return sheet.properties.sheetId;
  } catch (error) {
    console.error("Errore durante il recupero dello sheetId:", error);
    return null;
  }
}

async function getRowIndexById({
  data,
  id,
  columnIndex = 0,
}: {
  data: unknown[][];
  id: string;
  columnIndex?: number;
}) {
  return data.findIndex((row) => row[columnIndex] === id) + 1; // 1 header
}

export async function updateRowById({
  spreadsheetId,
  range,
  id,
  newData,
  columnIndex = 0,
}: {
  spreadsheetId: string;
  range: SheetRange;
  id: string;
  newData: unknown[];
  columnIndex?: number;
}) {
  const auth = getAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  const sheets = google.sheets({ version: "v4", auth });
  const sheetName = range.split("!")[0];

  try {
    const data = await getSheetData({ spreadsheetId, range });
    const rowIndex = await getRowIndexById({ data, id, columnIndex });

    if (rowIndex === -1) {
      console.error("ID non trovato");
      return null;
    }

    const updateRequest = {
      spreadsheetId,
      range: `${sheetName}!A${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [newData],
      },
    };

    const response = await sheets.spreadsheets.values.update(updateRequest);

    return response.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della riga:", error);
    return null;
  }
}

export async function deleteRowById({
  spreadsheetId,
  range,
  id,
  columnIndex = 0,
}: {
  spreadsheetId: string;
  range: SheetRange;
  id: string;
  columnIndex?: number;
}) {
  const auth = getAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  const sheets = google.sheets({ version: "v4", auth });
  const sheetName = range.split("!")[0];

  try {
    const sheetId = await getSheetIdByName({ spreadsheetId, sheetName });
    if (!sheetId) return null;

    const data = await getSheetData({ spreadsheetId, range });
    const rowIndex = await getRowIndexById({ data, id, columnIndex });

    if (rowIndex === -1) {
      console.error("ID non trovato");
      return null;
    }

    const deleteRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    };

    const response = await sheets.spreadsheets.batchUpdate(deleteRequest);

    return response.data;
  } catch (error) {
    console.error("Errore durante la cancellazione della riga:", error);
    return null;
  }
}
