const svg = d3.select('svg')

d3.json('planets.json').then(data => {

  const circles = svg.selectAll('circle')
    .data(data)

  // Add attrs to circles which already in DOM
  circles.attr('cy', 200)
    .attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill)

  // append the enter selection to the DOM
  circles.enter()
    .append('circle')
      .attr('cy', 200)
      .attr('cx', d => d.distance)
      .attr('r', d => d.radius)
      .attr('fill', d => d.fill)
})

