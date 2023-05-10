// graph constant settings
const dims = { height: 300, width: 300, radius: 150 }
const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5) }

// insert svg to div.canvas
const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150)

// insert graph group to svg, this is where we put shapes
const graph = svg.append('g')
  .attr('transform', `translate(${cent.x}, ${cent.y})`)

// return a function which can derive angle of each slide
const pie = d3.pie()
  .sort(null)
  .value(d => d.cost)

// use returned function to get angles
const angles = pie([
  { name: 'rent', cost: 500 },
  { name: 'bills', cost: 300 },
  { name: 'gaming', cost: 200 },
])

console.log(angles)

