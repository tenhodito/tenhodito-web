var fill = function(i) {
    tones = ['#A3A3A3', '#818181', '#606060', '#4A4A4A', '#2B2B2B']
    return tones[i%5];
}

var w = $(".word-cloud").width(),
    h = $(".word-cloud").height();

var speechLayout = d3.layout.cloud()
    .size([w, h])
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(10)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Lato")
    .fontSize(function(d) { return d.size; })
    .on("end", drawSpeechCloud);

speechLayout.start();

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
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Lato")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

var proposalLayout = d3.layout.cloud()
    .size([w, h])
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this", "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(10)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Lato")
    .fontSize(function(d) { return d.size; })
    .on("end", drawProposalCloud);

proposalLayout.start();

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
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Lato")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}