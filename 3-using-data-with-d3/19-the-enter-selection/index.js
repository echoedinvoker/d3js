const data = [
  { width: 200, height: 100, fill: 'pink'},
  { width: 150, height: 75, fill: 'red'},
  { width: 100, height: 50, fill: 'black'},
]


const svg = d3.select('svg')

const rects = svg.selectAll('rect')
  .data(data)
  .attr('width', d => d.width)
  .attr('height', d => d.height)
  .attr('fill', d => d.fill)

const enteredRects = rects.enter()
  .append('rect')
  .attr('width', d => d.width)
  .attr('height', d => d.height)
  .attr('fill', d => d.fill)
  

console.log(rects)
console.log(enteredRects)

