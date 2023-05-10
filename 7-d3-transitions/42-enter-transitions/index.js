const svg = d3.select('.canvas').append('svg')
  .attr('width', 600)
  .attr('height', 600)

const margin = { top: 20, right: 20, bottom: 100, left: 100 }
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const yAxisGroup = graph.append('g')
const xAxisGroup = graph.append('g')

const y = d3.scaleLinear()
  .range([graphHeight, 0])

const x = d3.scaleBand()
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2)


// create and call the axes
const xAxis = d3.axisBottom(x)
const yAxis = d3.axisLeft(y)

const update = (data) => {
  const rects = graph.selectAll('rect')
    .data(data)

  y.domain([0, d3.max(data, d => d.orders)])
  x.domain(data.map(d => d.name))


  rects.exit().remove()

  // attrs for elements which is already in DOM
  rects.attr('width', x.bandwidth())
    .attr('fill', 'orange')
    .attr('height', d => graphHeight - y(d.orders))
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.orders))

  // enter virtual elements to DOM and attrs to them
  rects.enter().append('rect')
    .attr('width', x.bandwidth())
    .attr('fill', 'orange')
    // .attr('height', d => graphHeight - y(d.orders))
    .attr('x', d => x(d.name))
    .attr('y', () => graphHeight)
    .attr('height', () => 0)
    .transition().duration(5000)
    .attr('y', d => y(d.orders))
    .attr('height', d => graphHeight - y(d.orders))

  yAxisGroup.call(yAxis)
  xAxisGroup.call(xAxis)
    .attr('transform', `translate(0,${graphHeight})`)
}

let data = []

db.collection('dishes').onSnapshot(res => {
  console.log(res.docChanges())
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    switch (change.type) {
      case 'added':
        data.push(doc)
        break
      case 'modified':
        const index = data.findIndex(item => item.id === doc.id)
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


