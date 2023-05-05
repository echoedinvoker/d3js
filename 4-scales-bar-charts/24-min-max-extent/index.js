const svg = d3.select('svg')

d3.json('menu.json').then(data => {
  const rects = svg.selectAll('rect')
    .data(data)

  // const min = d3.min(data, d => d.orders)
  // const max = d3.max(data, d => d.orders)
  // const extent = d3.extent(data, d => d.orders)
  // 
  // console.log(min, max, extent)

  const y = d3.scaleLinear()
    // .domain([0, 1000])
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

