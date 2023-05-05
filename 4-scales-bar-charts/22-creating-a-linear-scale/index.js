const svg = d3.select('svg')

d3.json('menu.json').then(data => {
  const rects = svg.selectAll('rect')
    .data(data)

  const y = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, 500])

  // attrs for elements which is already in DOM
  rects.attr('width', 50)
    .attr('fill', 'orange')
    // .attr('height', d => d.orders)
    .attr('height', d => y(d.orders))
    .attr('x', (_, i) => i * 70)

  // enter virtual elements to DOM and attrs to them
  rects.enter().append('rect')
    .attr('width', 50)
    .attr('fill', 'orange')
    // .attr('height', d => d.orders)
    .attr('height', d => y(d.orders))
    .attr('x', (_, i) => i * 70)
})

