// create the submission table for the HTML
function create_table(data) {
    let table = '<table style="width: 90%;"><tr><td>Description</td><td>Adresse</td><td>Rapporté par</td><td>Date</td></tr>';
    data.forEach(submission => {
        table += `<tr><td>${submission.description}</td><td>${submission.address}</td><td>${submission.from}</td><td>${submission.date}</td></tr>`;
    });
    table += "</table>";

    let tableContainer = document.getElementById('table-container');  
    tableContainer.innerHTML = table;
};
