var fill = function(i) {
    tones = ['#A3A3A3', '#818181', '#606060', '#4A4A4A', '#2B2B2B']
    // return tones[i%5];
    var index = Math.floor(Math.random() * tones.length);
    return tones[index];
}
var fill = d3.scale.category20();

var w = $(".word-cloud").width(),
    h = $(".word-cloud").height();

var scaleWords = function(size) {
  return (size * 7) + 'px';
}

function drawSpeechCloud(words) {
  d3.select("#speechCloud").style('width', w).style('height', h)
    .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
    .append("g")
      .attr("transform", "translate(" + speechLayout.size()[0] / 2 + "," + speechLayout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return scaleWords(d.size) })
      .style("font-family", "Lato")
      .style("fill", function(d, i) { return fill(i); })
      // .style('padding', '1rem')
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

function drawProposalCloud(words) {
  d3.select("#proposalCloud").style('width', w).style('height', h)
    .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
    .append("g")
      .attr("transform", "translate(" + proposalLayout.size()[0] / 2 + "," + proposalLayout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return scaleWords(d.size) })
      .style("font-family", "Lato")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}