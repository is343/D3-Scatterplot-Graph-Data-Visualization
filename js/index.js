const url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
d3.json(url, (error, data) => {
      if (error) {
        throw new Error(console.error);
      }
      else {
    const margin = {
      top: 60,
      left: 60,
      bottom: 60,
      right: 90
    };
    const height = 400,
      width = 700;

    const axisTimeFormat = d3.timeParse('%M:%S');

    const yScale = d3.scaleLinear()
                    .domain([0, 36])
                    .range([0, height]);
    const xScale = d3.scaleTime()
                    .domain([axisTimeFormat('39:55'), axisTimeFormat('36:50')])
                    .range([0, width - 200]);

    const xAxis = d3.axisBottom(xScale)
          .tickFormat(d3.timeFormat("%M:%S'"));
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select('body')
      .append('svg')
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', height + margin.left + margin.right)
      .attr('transform', 'translate(50, 50)');

    let tooltip = d3.select('body')
      .append('div')
      .classed('tooltip', true);

    svg.append('rect')
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.left + margin.right)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'white')
      .attr('fill-opacity', 0.8);


    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const tooltipPadding = 5,
      tooltipSize = {
        dx: parseInt(tooltip.style('width')),
        dy: parseInt(tooltip.style('height'))
      };



    function dopingCheck(playerData) {
      return playerData !== '' ? 'red' : 'blue';
    }

    function showTooltip(d, i) {
      tooltip.styles({
        'left': `${(d3.event.pageX + tooltipSize.dx + 5)}px`,
        'top': `${(d3.event.pageY + tooltipSize.dy + 5)}px`,
      }).html(`<span><b>${d.Name}: ${d.Nationality}<br/>
              Place: ${d.Place} | Time: ${d.Time}<br/>
              Year: ${d.Year}<br/>
              Doping: ${d.Doping !== '' ? d.Doping : 'None'} </b></span>`);
      tooltip.styles({
        'height': '125px',
        'width': '200px',
        'opacity': '0.9'
      });
    }

    function hideTooltip(d, i) {
      tooltip.styles({
        'height': 0,
        'width': 0,
        'opacity': 0
      }).html('');
    }

    function openEntry(d) {
      if (d.URL) {
        let win = window.open(d.URL, '_blank');
        win.focus();
      }
    }

        svg.append('g')
          .attr('transform', `translate(10, ${height})`)
          .call(xAxis)
          .append('text')
          .style('fill', 'black')
          .attr('transform', `translate(${width - 200}, +30)`)
          .attr('dy', '1.8em')
          .attr('text-anchor', 'end')
          .text('Race time for 13.8km')

        svg.append('g')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('dy', '-0.8em')
          .attr('text-anchor', 'end')
          .text('Rank')
          .style('fill', 'black')

        let cyclist = svg.selectAll('body') 
          .data(data)
          .enter()
          .append('g')
          .attr('x', (d) => xScale(axisTimeFormat(d.Time)))
          .attr('y', (d) => yScale(d.Place))
          .attr('transform', 'translate(10, 0)');

        cyclist.append('circle')
          .attr('cx', (d) => xScale(axisTimeFormat(d.Time)))
          .attr('cy', (d) => yScale(d.Place))
          .attr('r', 5)
          .attr('fill', (d) => dopingCheck(d.Doping))
          .on('mouseover', showTooltip)
          .on('mouseout', hideTooltip)
          .on('click', openEntry);

        cyclist.append('text')
          .attr('x', (d) => xScale(axisTimeFormat(d.Time)) + 7)
          .attr('y', (d) => yScale(d.Place) + 5)

        const isDopped = svg.append('g')
          .attr('transform', `translate(${width - 375}, ${height - 75})`)
          .append('text')
          .attr('x', 10)
          .attr('y', 5)
          .attr('fill', 'red')
          .text('● Doping allegations')
        const isNotDopped = svg.append('g')
          .attr('transform', `translate(${width - 375}, ${height - 50})`)
          .append('text')
          .attr('x', 10)
          .attr('y', 5)
          .attr('fill', 'blue')
          .text('● No doping allegations')

      } // end of else


    });