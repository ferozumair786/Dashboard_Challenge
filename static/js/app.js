async function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    if (sample != undefined)
    {let metaURL =  `/metadata/${sample}`
    console.log(sample)
    console.log(metaURL)
    let metaData = await d3.json(metaURL);
    console.log(metaData)
    // // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    Object.entries(metaData).forEach(([key, value]) => {
      panel.append("h6").html(`<b>${key}:</b> ${value}`)
    });}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
buildMetadata();

async function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    if (sample != undefined )
    {let sampleURL = `/samples/${sample}`
    console.log(sample)
    console.log(sampleURL)
    let sampleData = await d3.json(sampleURL);
    console.log(sampleData)
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // top10 = sampleData.slice(0,10)
    // console.log(`Top 10: ${top10}`)
    // otu_ids, and labels (10 each).
    }
};
buildCharts();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
