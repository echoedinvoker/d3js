const data = [
  { width: 200, height: 100, fill: 'pink'},
  { width: 150, height: 75, fill: 'red'},
  { width: 100, height: 50, fill: 'black'},
]


const svg = d3.select('svg')

svg.selectAll('rect')
  // .attr('width', 200)
  // .attr('height', 100)
  // .attr('fill', 'pink')
  .data(data)
  .attr('width', (d, i, n) => {
    console.log(d, i, n)
    return d.width
  })
  .attr('height', (d) => {
    return d.height
  })
  .attr('fill', (d) => {
    return d.fill
  })

