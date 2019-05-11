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
    const bubbleTrace = {
        type: "scatter",
        mode: "markers",
        name: "Bubble Chart",
        text: sampleData.otu_labels,
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        marker: {
          size: sampleData.sample_values,
          sizeref: 1.8,
          color: sampleData.otu_ids
        }
    };

    const dataBubble = [bubbleTrace];

    const bubbleLayout = {
      title: "Belly Button Biodiversity",
      showlegend: false,
      xaxis: {
        title: "Microorganism Operational Taxonomic Unit ID (OTU ID)"
      },
      yaxis: {
        title: "Number of Reads of Microorganism"
      }
    }
    const BUBBLE = document.getElementById("bubble");
    Plotly.newPlot(BUBBLE, dataBubble, bubbleLayout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // top10 = sampleData.forEach(data => {data.slice(0,10)})
    // console.log(`Top 10: ${top10}`)
    // otu_ids, and labels (10 each).
    const PIE = document.getElementById("pie");
    
    const pieTrace = {
      type: "pie",
      name: "Pie Chart",
      hoverinfo: sampleData.otu_labels.slice(0,10),
      values: sampleData.sample_values.slice(0,10),
      labels: sampleData.otu_ids.slice(0,10)
    }

    const pieData = [pieTrace]

    const pieLayout = {
      title: "Top 10 Microbes Found in Bellybutton"
    }
  
    Plotly.newPlot(PIE, pieData, pieLayout)
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
