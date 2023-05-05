// const svg = d3.select('svg')
const svg = d3.select('.canvas').append('svg')
  .attr('width', 600)
  .attr('height', 600)

const margin = {top: 20, right: 20, bottom: 100, left: 100}
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

d3.json('menu.json').then(data => {
  // const rects = svg.selectAll('rect')
  const rects = graph.selectAll('rect')
    .data(data)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])
    .range([0, 500])

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  // attrs for elements which is already in DOM
  rects.attr('width', x.bandwidth())
    .attr('fill', 'orange')
    .attr('height', d => y(d.orders))
    .attr('x', d => x(d.name))

  // enter virtual elements to DOM and attrs to them
  rects.enter().append('rect')
    .attr('width', x.bandwidth())
    .attr('fill', 'orange')
    .attr('height', d => y(d.orders))
    .attr('x', d => x(d.name))
})

