'use strict';

class Chart {
  constructor (container) {
    this.chart = d3.select('#' + container);
    var el = document.getElementById(container);
    var WIDTH = el.clientWidth, HEIGHT = el.clientHeight;
    var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };

    this.xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 100]);

    this.yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 100]);

    var xAxis = d3.svg.axis()
      .scale(this.xRange)
      .tickSize(5)
      .tickSubdivide(true);

    var yAxis = d3.svg.axis()
      .scale(this.yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);

    this.chart.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    this.chart.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);

    return this;
  }

  getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  addData(data) {
  this.chart.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('cx', (d) => { return this.xRange(d[0]); })
       .attr('cy', (d) => { return this.yRange(d[1]); })
       .attr('r', (d) => { return 3; })
       .style('fill', this.getRandomColor());
  }
}

let left = new Chart('left');
let right = new Chart('right');

left.addData([[25, 23], [12,38]]);
