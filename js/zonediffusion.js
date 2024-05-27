function zonediffusion(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion.geojson'),
			d3.csv('datas/nav.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.DepNum)
				d.properties.Dep = (result[0] !== undefined) ? (result[0].Dep) : 6
				console.log(d.properties.Dep)
			})
			parseData(map)	
		})

		function parseData(data){
			
// PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(4500)
				.translate([320,4130])

			var geoPath = d3.geoPath().projection(projection)
			
//CARTE
			d3.select('svg#zonediffusion')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 0 640 410")
				.append('g')
				.attr('id', 'carte')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('a')
				.attr('href',function(d, i) { return "dep" + d.properties.code +".php"; })
				.attr('d',geoPath)
				.append('path')
				.attr("id", function(d, i) { return "dep" + d.properties.code; })
				.attr('class','navigation')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				
				.on('mouseover',(d,i,nodes) => {
						d3.select(nodes[i]).classed('visu2',true)
						div
					        .transition()
					        .duration(200)
					        .style('opacity', 0.9);
					    div
					        .html('<div>'+d.properties.Dep+'</div>')
					        .style('left', d3.event.pageX + 'px')
					        .style('top', d3.event.pageY + 'px');
					})
				.on('mouseout',(d,i,nodes) => {
						d3.select(nodes[i]).classed('visu2',false)
						div
					        .transition()
					        .duration(500)
					        .style('opacity', 0);
					})
		}  
	// TOOL TIPS
		const div = d3
			.select('body')
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0);
	
}
