// hard coded data : change to data from DataBase later
var data = [  
        { description: 'accident de voiture', address: 'rue du bois', from: 'John Dubois', date: '23-05-23' },
        { description: "chute d'arbre", address: 'rue Albert', from: 'Jean Nemar', date: '25-11-23' },
        { description: 'trou dans le sol', address: 'rue Puit', from: 'Luc Ogre', date: '09-12-23' },
        { description: 'voiture accidentée', address: 'rue Grand', from: 'Louis Deschamps', date: '12-02-23' }
];

// create the submission table for the HTML
function create_table() {
    let table = '<table style="width: 90%;"><tr><td>Description</td><td>Adresse</td><td>Rapporté par</td><td>Date</td></tr>';
    // TODO: should get the data from DataBase
    data.forEach(submission => {
        table += `<tr><td>${submission.description}</td><td>${submission.address}</td><td>${submission.from}</td><td>${submission.date}</td></tr>`;
    });
    table += "</table>";

    let tableContainer = document.getElementById('table-container');  
    tableContainer.innerHTML = table;
};
