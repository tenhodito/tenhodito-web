
var defineBarClasses = function (type) {
    var classes = 'column bar';
    if (type === 'negative') {
        return classes;
    } else {
        return classes + ' align-self-bottom';
    }
};

var getMarginTop = function (data, type) {
    if (type === 'negative') {
        return (scaleHeight(data)) - 4 + 'rem';
    } else {
        return -4 + 'rem';
    }
}

var getNameAndParty = function (data) {
    return `${data[3]} - ${data[4]}`;
}

var scaleHeight = function (value) {
    return Math.abs(value) * 2.5;
}

var scaleFontSize = function (value) {
    return Math.abs(value) * 1.5;
}

var drawChart = function (divSelector, data, type) {
    var chart = d3.select(divSelector).selectAll('p')
        .data(data)
        .enter()
        .append('div')
            .attr('class', defineBarClasses(type))
            .style('height', function(d) { return scaleHeight(d[0]) + 'rem'})
            .style('font-size', function(d) { return scaleFontSize(d[0]) + 'rem'});

    chart.append('div').attr('class', 'deputy-index')
        .append('span').text(function(d) { return d[0] });
    chart.append('div').attr('class', 'deputy-name')
        .append('span').text(function(d) {return getNameAndParty(d)});
    chart.append('div').attr('class', 'deputy-img float-center')
        .style('margin-top', function(d) { return getMarginTop(d[0], type) })
        .append('a').attr('href', function(d) { return d[2]; } )
        .append('img')
            .attr('src', function(d) { return d[1];})
            .attr('class', 'float-center');
}
// drawChart('#positiveChart', data, 'positive');