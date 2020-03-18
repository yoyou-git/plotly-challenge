var data;

d3.json("./samples.json").then(function(response){
    console.log(response)
    data=response
    dropdown()
})

function dropdown(){
const selector=d3.select("#selDataset")
const names=data.names;
names.forEach(function(name){
    selector
        .append("option")
        .property('value',name)
        .text(name);
});
optionChanged(names[0])
}

function optionChanged(newId){
metadata(newId)
charts(newId)
}

function metadata(id){
const selectdata=data.metadata.filter(obj=>obj.id==id)[0];
const selector=d3.select("#sample-metadata");
selector.html("")
Object.entries(selectdata).forEach(function([key,value]){
    selector
    .append("p")
    .text(`${key}: ${value}`);
});
}

function charts(id){

    const selectdata=data.samples.filter(obj=>obj.id==id)[0];
const otu_ids=selectdata.otu_ids
const sample_values=selectdata.sample_values
const otu_labels=selectdata.otu_labels


    var bubbletrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      };
      
      var bubbledata = [bubbletrace];
      
      Plotly.newPlot('bubble', bubbledata);

      var bardata = [{
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(id=>`OTU ${id}`).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
      
    
      Plotly.newPlot('bar', bardata);
}