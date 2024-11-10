document.addEventListener("DOMContentLoaded", function(){

    let data
    let CSVdata

    document.getElementById('downloadJSONButton').addEventListener('click', function() {

        const blob = new Blob([jsonData], { type: 'application/json' });

        const url = URL.createObjectURL(blob);

        if (window.currentDownloadUrl) {
            console.log("Revokeing previous URL");
            URL.revokeObjectURL(window.currentDownloadUrl); 
        }

        window.currentDownloadUrl = url;

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
    });


    document.getElementById('downloadCSVButton').addEventListener('click', function() {

        CSVdata = convert(data)

        const jsonData = JSON.stringify(CSVdata, null, 2);

        const blob = new Blob([jsonData], { type: 'text/csv' });

        const url = URL.createObjectURL(blob);

        if (window.currentDownloadUrl) {
            console.log("Revokeing previous URL");
            URL.revokeObjectURL(window.currentDownloadUrl); 
        }

        window.currentDownloadUrl = url;

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
    });




    function convert(jsonData) {
        let csv = '';
        
        const headers = Object.keys(jsonData[0]);
        csv += headers.join(',') + '\n';
        
        jsonData.forEach(obj => {
            const values = headers.map(header => obj[header]);
            csv += values.join(',') + '\n';
        });
        return csv;
    }




    function readyData(){
        var search = document.getElementById('search').value;
        var attribute = document.getElementById('attribute').value;

        var formData = {
            search: search,
            attribute: attribute
        };
    

        if (formData.search == ""){
            parametri = '3/all/all'
        }

        else if(formData.attribute == 'all'){
            parametri = '2/' + formData.search + '/' + formData.attribute
        }

        else if(formData.attribute == 'current_captains'){
            parametri = '1/' + formData.search + '/' + formData.attribute
        }

        else {
            parametri = '0/' + formData.search + '/' + formData.attribute
        }

        upit = 'http://localhost:3000/datatable/getData/' + parametri

        console.log(upit)
        fetchData(upit)
    }


    async function fetchData(upit) {
        try{
            const response = await fetch(upit);
            data = await response.json();
            console.log("Podaci iz baze:", data);
            displayData(data)
        } catch (error){
            console.error("Greška pri dohvatu podataka", error);
        }
    }

    fetchData("http://localhost:3000/datatable/getData/3/all/all")


    function displayData(data) {
        const tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = ""; 

        data.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.club_name}</td>
                <td>${item.city_name}</td>
                <td>${item.stadium_name}</td>
                <td>${item.abreviation}</td>
                <td>${item.manager_name}</td>
                <td>${item.nickname}</td>
                <td>${new Date(item.date_of_establishment).toLocaleDateString()}</td>
                <td>${item.main_sponsor}</td>
                <td>${item.trophies_won}</td>
                <td class="captains">${item.current_captains.join(", ")}</td>
            `;

            tableBody.appendChild(row); 
        });
    }

    document.getElementById("filter-button").addEventListener("click", readyData);
})

