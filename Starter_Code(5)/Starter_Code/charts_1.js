function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("samples_1.json").then((data) => {
    console.log(data)
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples_1.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples_1.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var charts = data.samples;
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = charts.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var PANEL = d3.select("#sample-charts");
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var labels = result.otu_labels;
    var samples = result.sample_values;
    // Deliverable 3: 3. Create a variable that holds the washing frequency.


    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0,10).map(row => "ID: " + row).reverse();
    var x_data = samples.slice(0, 10).reverse();

    // Deliverable 1: 8. Create the trace for the bar chart. 
    // var barData = [

    // ];
    var trace = {
      x: x_data,
      y: yticks,
      type: 'bar',
      orientation: "h",
    };

    var data = [trace];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {yticks}
      
    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, barLayout);
    
    // Deliverable 2: 1. Create the trace for the bubble chart.
    var trace = {
      x: otuIds,
      y: samples,
      text: labels,
      type: 'bubble',
      mode: 'markers',
      marker: {
        size: samples,
        color: otuIds,
        colorscale: 'Portland'
      },
    };
    var data_2 = [trace];
    // Deliverable 2: 2. Create the layout for the bubble chart.
    var bublayout = {
      title: "Bacteria Cultures Per Sample",
      showlegend: false,
      xaxis: {title: "OTU IDs"},
    }
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", data_2, bublayout);
    // Deliverable 3: 4. Create the trace for the gauge chart.
    
    // Deliverable 3: 5. Create the layout for the gauge chart.

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

  });
}
