export function TrainerPageLogic(){

const search = document.querySelector('.input-group input') as HTMLInputElement;
let table_rows= document.querySelectorAll('tbody tr'); // returns a list of all table rows
let table_headings = document.querySelectorAll('thead th'); // returns a list of all table headings


// Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent?.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data!.indexOf(search_data) < 0);
        (row as HTMLTableRowElement).style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        (visible_row as HTMLTableRowElement).style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
    console.log("searching");
}

// Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc : boolean = true;  
    (head as HTMLHeadingElement).addEventListener('click', () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');
        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })
        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;
        sortTable(i, sort_asc);
    });

});


function sortTable(column: number, sort_asc : boolean) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent!.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent!.toLowerCase();

        return sort_asc ? first_row.localeCompare(second_row) : second_row.localeCompare(first_row);
    })
        .map(sorted_row => document.querySelector('tbody')?.appendChild(sorted_row));
}

// // Converting HTML table to JSON

// const pokemon_table = document.querySelector('#pokemon_table');
// const json_btn = document.querySelector('#toJSON');

// const toJSON = function (table) {
//     let table_data = [],
//         t_head = [],

//         t_headings = table.querySelectorAll('th'),
//         t_rows = table.querySelectorAll('tbody tr');

//     for (let t_heading of t_headings) {
//         let actual_head = t_heading.textContent.trim().split(' ');

//         t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
//     }

//     t_rows.forEach(row => {
//         const row_object = {},
//             t_cells = row.querySelectorAll('td');

//         t_cells.forEach((t_cell, cell_index) => {
//             const img = t_cell.querySelector('img');
//             if (img) {
//                 row_object['pokemon image'] = decodeURIComponent(img.src);
//             }
//             row_object[t_head[cell_index]] = t_cell.textContent.trim();
//         })
//         table_data.push(row_object);
//     })

//     return JSON.stringify(table_data, null, 4);
// }

// json_btn.onclick = () => {
//     const json = toJSON(pokemon_table);
//     downloadFile(json, 'json')
// }

// const downloadFile = function (data, fileType, fileName = '') {
//     const a = document.createElement('a');
//     a.download = fileName;
//     const mime_types = {
//         'json': 'application/json',
//         'csv': 'text/csv',
//         'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     }
//     a.href = `
//         data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
//     `;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
// }
}

