// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Reset the filters
    filters = {};
  // Save the element, value, and id of the filter that was changed
    let date = d3.select("#datetime").property("value")
    let city = d3.select("#city").property("value")
    let state = d3.select("#state").property("value")
    let country = d3.select("#country").property("value")
    let shape = d3.select("#shape").property("value") 

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
    if (date) {
        filters.datetime = date
    }

    if (city) {
        filters.city = city
    }

    if (state) {
        filters.state = state
    }

    if (country) {
        filters.country = country
    }

    if (shape) {
        filters.shape = shape
    }
  // Call function to apply all filters and rebuild the table
  console.log(filters)
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
    let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values
    Object.entries(filters).forEach(([filt, val]) => {
        if (filt == "datetime") {
            filteredData = filteredData.filter(row => row.datetime === val);
        }
        if (filt == "city") {
            filteredData = filteredData.filter(row => row.city === val);
        }
        if (filt == "state") {
            filteredData = filteredData.filter(row => row.state === val);
        }
        if (filt == "country") {
            filteredData = filteredData.filter(row => row.country === val);
        }
        if (filt == "shape") {
            filteredData = filteredData.filter(row => row.shape === val);
        }
        }
    );


  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("#filter-btn").on("click", updateFilters);


// Build the table when the page loads
buildTable(tableData);