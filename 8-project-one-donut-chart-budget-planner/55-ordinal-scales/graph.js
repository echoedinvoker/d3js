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

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2)

// const colour = d3.scaleOrdinal(['red', 'blue', 'yellow'])
const colour = d3.scaleOrdinal(d3['schemeSet3'])

const update = (data) => {

  colour.domain(data.map(d => d.name))

  // join enhanced (pie) data to path elements
  const paths = graph.selectAll('path')
    .data(pie(data))

  paths.enter()
    .append('path')
    .attr('class', 'arc')
    .attr('d', arcPath)
    .attr('stroke', '#fff')
    .attr('stroke-width', 3)
    .attr('fill', d => colour(d.data.name))
}

// local data response to firestore collection 'expenses'
let data = []

// listen to firestore collection 'expenses'
db.collection('expenses').onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    switch (change.type) {
      case 'added':
        data.push(doc)
        break
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id)
        data[index] = doc
        break
      case 'removed':
        data = data.filter(item => item.id !== doc.id)
        break
      default:
        break
    }
  })

  update(data)
})
