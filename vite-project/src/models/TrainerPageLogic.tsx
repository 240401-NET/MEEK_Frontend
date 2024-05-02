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
    
    // Function to generate and download a text file
    
     }
    
    