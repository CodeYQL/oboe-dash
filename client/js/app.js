'use strict';

let getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

let draw = (container, data) => {
  var chart = d3.select('#' + container);
  var el = document.getElementById(container);
  var WIDTH = el.clientWidth, HEIGHT = el.clientHeight;
  var MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  var xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
    return d.x;
  }), d3.max(data, function(d) {
    return d.x;
  })]);

  var yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
    return d.y;
  }), d3.max(data, function(d) {
    return d.y;
  })]);

  var xAxis = d3.svg.axis()
    .scale(xRange)
    .tickSize(5)
    .tickSubdivide(true);

  var yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient('left')
    .tickSubdivide(true);

  chart.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  chart.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

  chart.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('cx', (d) => { return xRange(d.x); })
       .attr('cy', (d) => { return yRange(d.y); })
       .attr('r', (d) => { return 3; })
       .style('fill', getRandomColor());
}

var data = [{
  x: 1,
  y: 5
}, {
  x: 20,
  y: 20
}, {
  x: 40,
  y: 10
}, {
  x: 60,
  y: 40
}, {
  x: 80,
  y: 5
}, {
  x: 100,
  y: 60
}];

draw('main', data);
