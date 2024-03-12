import ExcelJS from 'exceljs';
import {Border} from "exceljs";

export async function exportEventsExcel(data, language = 'en', fromDate:string, toDate:string) {
  const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Izvjestaj");
    let borderStyle: Partial<Border> = { style: 'thin', color: { argb: '00000000' } };
      worksheet.addRow([`Pregled dogadjaja ${fromDate} do ${toDate}`])
      worksheet.columns = [
          { header: "ID", key: "id", width: 10 },
          { header: "Klijent", key: "client", width: 30 },
          { header: "Tip dogadjaja", key: "type_of_event", width: 12, alignment: { vertical: 'middle', horizontal: 'center' } },
          { header: "Status dogadjaja", key: "status_event", width: 15, alignment: { vertical: 'middle', horizontal: 'center' }},
          { header: "Lokacija", key: "location", width: 15 },
          { header: "Korisnik", key: "user", width: 20 },
          { header: "Opis", key: "description", width: 80 },
          { header: "Datum", key: "date", width: 12, alignment: { vertical: 'middle', horizontal: 'center' } },
          { header: "Vrijeme", key: "time", width: 10, alignment: { vertical: 'middle', horizontal: 'center' } },
          { header: "Ocjena dogadjaja", key: "event_rating", width: 8 },
          { header: "Broj ucesnika", key: "number_of_participants", width: 11, alignment: { vertical: 'middle', horizontal: 'center' } }
          ]
    let header = worksheet.addRow(worksheet.columns.map(column => column.header));
      header.eachCell((cell, number) => {
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle
            };
          cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'e1e1e1' }
          }
      });
    let cell = worksheet.getCell('A1');
    cell.value = `Pregled dogadjaja ${fromDate} do ${toDate}`;
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f1f1f1' }
    }
    cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
    };
    worksheet.mergeCells('A1:K1');
      for (let i = 0; i < data.length; i++) {
          console.log(i);
          const newRow = worksheet.addRow([
              data[i].id,
              data[i].client.name,
              data[i].type_of_event.name,
              data[i].status_event.name,
              data[i].location.name,
              data[i].user.name,
              data[i].description,
              data[i].date,
              data[i].time.name,
              data[i].event_rating,
              data[i].number_of_participants
          ]);
            newRow.eachCell((cell, number) => {
                cell.border = {
                    top: borderStyle,
                    left: borderStyle,
                    bottom: borderStyle,
                    right: borderStyle
                };
            });
      }
      // workbook.xlsx.write(res).then(function() {
      //     res.end();
      // });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;

}


export async function exportAssignmentsExcel(data, language = 'en', fromDate:string, toDate:string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Izvjestaj");
    let borderStyle: Partial<Border> = { style: 'thin', color: { argb: '00000000' } };
    worksheet.addRow([`Pregled zadataka ${fromDate} do ${toDate}`])
    worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Opis zadatka", key: "opis", width: 30 },
        { header: "Status", key: "status", width: 12 },
        { header: "Prioritet", key: "prioritet", width: 15, alignment: { vertical: 'middle', horizontal: 'center' }},
        { header: "Datum", key: "datum", width: 15 },
        { header: "Operater", key: "operater", width: 20 },
    ]
    let header = worksheet.addRow(worksheet.columns.map(column => column.header));
    header.eachCell((cell, number) => {
        cell.border = {
            top: borderStyle,
            left: borderStyle,
            bottom: borderStyle,
            right: borderStyle
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e1e1e1' }
        }
    });
    let cell = worksheet.getCell('A1');
    cell.value = `Pregled zadataka ${fromDate} do ${toDate}`;
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f1f1f1' }
    }
    cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
    };
    worksheet.mergeCells('A1:F1');
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        const newRow = worksheet.addRow([
            data[i].id,
            data[i].description,
            data[i].status === 0 ? "Aktivan" : "Zavrsen",
            data[i].priority.name,
            data[i].date,
            data[i].user.name,
        ]);
        newRow.eachCell((cell, number) => {
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle
            };
        });
    }
    // workbook.xlsx.write(res).then(function() {
    //     res.end();
    // });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;

}

export async function exportScheduleExcel(data, language = 'en', fromDate:string, toDate:string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Izvjestaj");
    let borderStyle: Partial<Border> = { style: 'thin', color: { argb: '00000000' } };
    worksheet.addRow([`Pregled rasporeda ${fromDate} do ${toDate}`])
    worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Opis rasporeda", key: "opis", width: 30 },
        { header: "Pocetak", key: "pocetak", width: 12},
        { header: "Kraj", key: "kraj", width: 15 }
    ]
    let header = worksheet.addRow(worksheet.columns.map(column => column.header));
    header.eachCell((cell, number) => {
        cell.border = {
            top: borderStyle,
            left: borderStyle,
            bottom: borderStyle,
            right: borderStyle
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e1e1e1' }
        }
    });
    let cell = worksheet.getCell('A1');
    cell.value = `Pregled dogadjaja ${fromDate} do ${toDate}`;
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f1f1f1' }
    }
    cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
    };
    worksheet.mergeCells('A1:D1');
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        const newRow = worksheet.addRow([
            data[i].id,
            data[i].description,
            data[i].start_time.name,
            data[i].end_time.name
        ]);
        newRow.eachCell((cell, number) => {
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle
            };
        });
    }
    // workbook.xlsx.write(res).then(function() {
    //     res.end();
    // });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;

}

export async function exportCostExcel(data, language = 'en', fromDate:string, toDate:string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Izvjestaj");
    let borderStyle: Partial<Border> = { style: 'thin', color: { argb: '00000000' } };
    worksheet.addRow([`Pregled troskova ${fromDate} do ${toDate}`])
    worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Opis troska", key: "opis", width: 30 },
        { header: "Vrsta troska", key: "vrsta troska", width: 12},
        { header: "Klijent", key: "klijent", width: 20 },
        { header: "Datum", key: "datum", width: 20 },
        { header: "Iznos", key: "iznos", width: 20 }
    ]
    let header = worksheet.addRow(worksheet.columns.map(column => column.header));
    header.eachCell((cell, number) => {
        cell.border = {
            top: borderStyle,
            left: borderStyle,
            bottom: borderStyle,
            right: borderStyle
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e1e1e1' }
        }
    });
    let cell = worksheet.getCell('A1');
    cell.value = `Pregled troskova ${fromDate} do ${toDate}`;
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f1f1f1' }
    }
    cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
    };
    worksheet.mergeCells('A1:F1');
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        const newRow = worksheet.addRow([
            data[i].id,
            data[i].description,
            data[i].type_of_cost.name,
            data[i].client.name,
            data[i].date,
            data[i].amount
        ]);
        newRow.eachCell((cell, number) => {
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle
            };
        });
    }
    // workbook.xlsx.write(res).then(function() {
    //     res.end();
    // });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;

}

export async function exportAnalisysExcel(){
    const filePath = "/Applications/XAMPP/xamppfiles/htdocs/lgprojekat/backend/src/templates/analyse_template.xlsx"
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);


    let cell = worksheet.getCell('C4');
    cell.value = "Mujo";


    cell = worksheet.getCell('A9');
    cell.value = "01.01"
    cell = worksheet.getCell('B9');
    cell.value = 1000


    cell = worksheet.getCell('A10');
    cell.value = "02.01"
    cell = worksheet.getCell('B10');
    cell.value = 1100
    await workbook.xlsx.writeFile(filePath);
}
