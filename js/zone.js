//////////////////////////////////////////////////////////
///////////////     EN TETE LES 3    /////////////////////
//////////////////////////////////////////////////////////
function entete(){
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]
	
		
		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code) 
				d.properties.nom = (result[0] !== undefined) ? (result[0].name) : '0'

				d.properties.Code1 = (result[0] !== undefined) ? parseInt(result[0].Code1) : 0
				d.properties.Code2 = (result[0] !== undefined) ? parseInt(result[0].Code2) : 0
				d.properties.Code3 = (result[0] !== undefined) ? parseInt(result[0].Code3) : 0

				d.properties.Candidat1 = (result[0] !== undefined) ? (result[0].Candidat1) : 0
				d.properties.Candidat2 = (result[0] !== undefined) ? (result[0].Candidat2) : 0
				d.properties.Candidat3 = (result[0] !== undefined) ? (result[0].Candidat3) : 0

				d.properties.Pourcentage1 = (result[0] !== undefined) ? parseFloat(result[0].Pourcentage1).toFixed(2) : 0
				d.properties.Pourcentage2 = (result[0] !== undefined) ? parseFloat(result[0].Pourcentage2).toFixed(2) : 0
				d.properties.Pourcentage3 = (result[0] !== undefined) ? parseFloat(result[0].Pourcentage3).toFixed(2) : 0
				
				d.properties.AbsExp = (result[0] !== undefined) ? parseFloat(result[0].AbsExp).toFixed(2) : 0
				
				d.properties.Voix1 = (result[0] !== undefined) ? parseInt(result[0].Voix1) : 0
				d.properties.Voix2 = (result[0] !== undefined) ? parseInt(result[0].Voix2) : 0
				d.properties.Voix3 = (result[0] !== undefined) ? parseInt(result[0].Voix3) : 0
				
			// console.log(d.properties.PourcentageVoixExpA)
			// // var toto=2.243
			// // console.log(toto.toFixed(2))
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)

 // PARAMETRES CARTE			
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])
			var geoPath = d3.geoPath().projection(projection)
			// var min =d3.min(data.features, d => d.properties.NListeA)	
			// var max =d3.max(data.features, d => d.properties.PourcentageVoixExpA)
			// var mean =d3.mean(data.features, d => d.properties.NListeA)
			// console.log(data)

			var areaScale = d3.scaleQuantile()
				.domain([33,7653,7657,7664,7675,7681,7682])
				.range(['grey','#FE2E2E','orange','#fc9be5','#543C9C','#5882fa','#A5DF00']);

 			var svg = d3.select("svg"),
				width = +svg.attr("width"),
				height = +svg.attr("height");

			var zoom = d3.zoom()
				.scaleExtent([1, 40])
				.translateExtent([[-100, -100], [width + 90, height + 100]])
				.on("zoom", zoomed);

 //CARTE
				var carte=d3.select('svg#entete')
					.append('g')
					.attr('id', 'carte')
					.selectAll('path')
					.data(data.features)
					.enter()
					.append('path')
					.attr('d',geoPath)
					.attr('cursor','pointer')
					.style('fill',d => areaScale(d.properties.Code1))
					.on('mouseover',(d,i,nodes) => {
						d3.select(nodes[i]).classed('visu2',true)
						div
					        .transition()
					        .duration(200)
					        .style('opacity', 0.9);
					    div
					        .html('<div class="tooltiptitre">'+d.properties.nom+'</div>'
					        	+ '<div class="nomcandidat">'+d.properties.Candidat1+'</div>'
					        	+ '<div class="puce code'+d.properties.Code1+'" style="width:'+d.properties.Pourcentage1*3+'px;"></div><div class="pourcentages">'+d.properties.Pourcentage1+'% ('+d.properties.Voix1+' voix)</div>'
					        	
					        	+ '<div class="nomcandidat">'+d.properties.Candidat2+'</div>'
					        	+ '<div class="puce code'+d.properties.Code2+'" style="width:'+d.properties.Pourcentage2*3+'px;"></div><div class="pourcentages">'+d.properties.Pourcentage2+'% ('+d.properties.Voix2+' voix)</div>'
					        	
					        	+ '<div class="nomcandidat">'+d.properties.Candidat3+'</div>'
					        	+ '<div class="puce code'+d.properties.Code3+'" style="width:'+d.properties.Pourcentage3*3+'px;"></div><div class="pourcentages">'+d.properties.Pourcentage3+'% ('+d.properties.Voix3+' voix)</div>'
					   				        	
					        	+ '<div class="nomcandidat">Taux d\'abstention</div>'
					        	+ '<div class="puce abstention" style="width:'+d.properties.AbsExp*3+'px;"></div><div class="pourcentages">'+d.properties.AbsExp+'%</div>')

					        .style('left', d3.event.pageX + 'px')
					        .style('top', d3.event.pageY - 28 + 'px');
					})
					.on('mouseout',(d,i,nodes) => {
						d3.select(nodes[i]).classed('visu2',false)
						div
					        .transition()
					        .duration(500)
					        .style('opacity', 0);
					})

					svg.call(zoom);
				function zoomed() {
				  carte.attr("transform", d3.event.transform);
				  // gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
				  // gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
				}		
			
	// TOOL TIPS
					const div = d3
					  .select('body')
					  .append('div')
					  .attr('class', 'tooltip')
					  .style('opacity', 0);




		    //////////////////////////////////
		    //////  NAVIGATION CARTE  ////////
		    //////////////////////////////////

			d3.select('#button1')
				.append('button')
				.text('Partis en tête')
				.on('click', changeParti1)

			d3.select('#button2')
				.append('button')
				.text('En 2ème position')
				.on('click', changeParti2)

			d3.select('#button3')
				.append('button')
				.text('En 3ème position')
				.on('click', changeParti3)

			function changeParti1(){
				carte
					.transition()
					.duration(300)
					.style('fill',d => areaScale(d.properties.Code1))
					d3.select('#button1')
					.style('opacity',0.5)
					d3.select('#button2')
					.style('opacity',1)
					d3.select('#button3')
					.style('opacity',1)		
			}

			function changeParti2(){
				carte
					.transition()
					.duration(300)
					.style('fill',d => areaScale(d.properties.Code2))
					d3.select('#button1')
					.style('opacity',1)
					d3.select('#button2')
					.style('opacity',0.5)
					d3.select('#button3')
					.style('opacity',1)		
			}

			function changeParti3(){
				carte
					.transition()
					.duration(300)
					.style('fill',d => areaScale(d.properties.Code3))
					d3.select('#button1')
					.style('opacity',1)
					d3.select('#button2')
					.style('opacity',1)
					d3.select('#button3')
					.style('opacity',0.5)		
			}
		}
}
//////////////////////////////////////////////////////////
///////////////      ABSTENTION      /////////////////////
//////////////////////////////////////////////////////////
function Labstention(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.AbsExp = (result[0] !== undefined) ? parseFloat(result[0].AbsExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.AbsExp))
			var max = Math.round(d3.max(data.features, d => d.properties.AbsExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.AbsExp))
			console.log(min*2,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#2D1500']);
 //CARTE
			d3.select('svg#Labstention')
				.attr("preserveAspectRatio","xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id','carteLabstention')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.AbsExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name+ '</span><br/>'
				        	+ '<span>Score : '+d.properties.AbsExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptLabstention")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleabs');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform","translate(158, 20)")
		       .attr("id",'graduationLabstention')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,100])
			    .range(['white','#2D1500']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendLabstention');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
/////////////    RASSEMBLEMENT NATIONAL    ///////////////
//////////////////////////////////////////////////////////
function RassemblementNational(){
	// var parti = document.getElementById("parti01").value;
	// console.log(rr)
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.RNExp = (result[0] !== undefined) ? parseFloat(result[0].RNExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.RNExp))
			var max = Math.round(d3.max(data.features, d => d.properties.RNExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.RNExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#1E0077']);
 //CARTE
			d3.select('svg#RassemblementNational')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id', 'carteRassemblementNational')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.RNExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name + '</span><br/>'
				        	+ '<span>Score : '+d.properties.RNExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptRassemblementNational")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleRassemblementNational');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationRassemblementNational')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,40])
			    .range(['white','#1E0077']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendRassemblementNational');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
//////////////    LA REPUBLIQUE EN MARCHE   //////////////
//////////////////////////////////////////////////////////
function LaRepubliqueEnMarche(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.LREMExp = (result[0] !== undefined) ? parseFloat(result[0].LREMExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.LREMExp))
			var max = Math.round(d3.max(data.features, d => d.properties.LREMExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.LREMExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','orange']);
 //CARTE
			d3.select('svg#LaRepubliqueEnMarche')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id', 'carteLaRepubliqueEnMarche')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.LREMExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name + '</span><br/>'
				        	+ '<span>Score : '+d.properties.LREMExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptLaRepubliqueEnMarche")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleLaRepubliqueEnMarche');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationGauche')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,40])
			    .range(['white','orange']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendLaRepubliqueEnMarche');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
////////////      LES REPUBLICAINS      //////////////////
//////////////////////////////////////////////////////////
function LesRepublicains(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.LRExp = (result[0] !== undefined) ? parseFloat(result[0].LRExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.LRExp))
			var max = Math.round(d3.max(data.features, d => d.properties.LRExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.LRExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#0040FF']);
 //CARTE
			d3.select('svg#LesRepublicains')
				.attr("preserveAspectRatio","xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id','carteLesRepublicains')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.LRExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name+ '</span><br/>'
				        	+ '<span>Score : '+d.properties.LRExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptLesRepublicains")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleLesRepublicains');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationLesRepublicains')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,8,30])
			    .range(['white','#0040FF']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendLesRepublicains');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
///////////////////     EELV    //////////////////////////
//////////////////////////////////////////////////////////
function EuropeEcologie(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.EEVExp = (result[0] !== undefined) ? parseFloat(result[0].EEVExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.EEVExp))
			var max = Math.round(d3.max(data.features, d => d.properties.EEVExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.EEVExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#A5DF00']);
 //CARTE
			d3.select('svg#EuropeEcologie')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id', 'carteEuropeEcologie')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.EEVExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name + '</span><br/>'
				        	+ '<span>Score : '+d.properties.EEVExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptEuropeEcologie")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleEuropeEcologie');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationEuropeEcologie')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,40])
			    .range(['white','#A5DF00']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendEuropeEcologie');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
//////////////    FRANCE INSOUMISE    ////////////////////
//////////////////////////////////////////////////////////
function FranceInsoumise(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.FIExp = (result[0] !== undefined) ? parseFloat(result[0].FIExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.FIExp))
			var max = Math.round(d3.max(data.features, d => d.properties.FIExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.FIExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#FE2E2E']);
 //CARTE
			d3.select('svg#FranceInsoumise')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id', 'carteFranceInsoumise')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.FIExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name + '</span><br/>'
				        	+ '<span>Score : '+d.properties.FIExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptFranceInsoumise")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleFranceInsoumise');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationFranceInsoumise')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,40])
			    .range(['white','#FE2E2E']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendFranceInsoumise');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
//////////////////////////////////////////////////////////
///////////////   PARTIS SOCIALISTE   ////////////////////
//////////////////////////////////////////////////////////
function PartiSocialiste(){
	
	var promises = [
			d3.json('js/maps/region/zone-diffusion-communesOpti.geojson'),
			d3.csv('datas/Euro2019Communes.csv')
		]

		Promise.all(promises).then(function(value){
			var map = value[0]
			var data = value[1]

			map.features.forEach(d=>{
				var result = data.filter(dep => d.properties.code == dep.Code)
				d.properties.name = (result[0] !== undefined) ? (result[0].name) : 'nc'
				d.properties.PSExp = (result[0] !== undefined) ? parseFloat(result[0].PSExp) : 0
				// console.log(result)
			})
			parseData(map)	
		})

		function parseData(data){
			// console.log(data)
 // PARAMETRES CARTE
			var projection = d3.geoMercator()
				.scale(7600)
				.translate([400,7000])

			var geoPath = d3.geoPath().projection(projection)
			var min = Math.round(d3.min(data.features, d => d.properties.PSExp))
			var max = Math.round(d3.max(data.features, d => d.properties.PSExp))
			var mean = Math.round(d3.mean(data.features, d => d.properties.PSExp))
			console.log(min,max)

			var areaScale = d3.scaleLinear()
				.domain([min*1.3,max])
				.range(['white','#FE2EC8']);
 //CARTE
			d3.select('svg#PartiSocialisteppnd')
				.attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "0 -20 640 795")
				.append('g')
				.attr('id', 'cartePartiSocialiste')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('d',geoPath)
				.attr('cursor','pointer')
				.style('stroke','none')
				.style('fill',d => areaScale(d.properties.PSExp))
				.on('mouseover',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',true)
					div
				        .transition()
				        .duration(200)
				        .style('opacity', 0.9);
				    div
				        .html('<span class="tooltiptitre">'+d.properties.name + '</span><br/>'
				        	+ '<span>Score : '+d.properties.PSExp+'%</span>')

				        .style('left', d3.event.pageX + 'px')
				        .style('top', d3.event.pageY - 28 + 'px');
				})
				.on('mouseout',(d,i,nodes) => {
					d3.select(nodes[i]).classed('visu2',false)
					div
				        .transition()
				        .duration(500)
				        .style('opacity', 0);
				})

 //LEGENDE
		    var width = 320,
		        height = 40;

		    var svg = d3.select("div#deptPartiSocialiste")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height)
		        .attr("preserveAspectRatio", "xMinYMin meet")
	        	.attr("viewBox", "-70 -10 480 60")
		        .attr("id",'echelleGauche');

			var scale = d3.scaleQuantile()
                .domain([min,mean,max])
                .range([-108,0,92]);

		    // Add scales to axis
		    var x_axis = d3.axisTop()
                   .scale(scale);

		    //Append group and insert axis
		    svg.append("g")
		       .attr("transform", "translate(158, 20)")
		       .attr("id",'graduationPartiSocialiste')
		       .call(x_axis);

 //COLORBAR
			var colors = d3.scaleLinear()
			   	.domain([0,10,40])
			    .range(['white','#FE2EC8']);

		     var legend = svg.append('g')
                .attr('transform', 'translate(40, 10)')
                .attr('id', 'legendPartiSocialiste');
            
            legend.selectAll('.colorbar')
                .data(d3.range(10))
               	.enter()
				.append("rect")
				.attr("y", 10)
				.attr("height", 25)
				.attr("x", (d,i)=>10 + i*20)
				.attr("width", 25)
				.attr("fill", d=>colors(d));

 // TOOL TIPS
			const div = d3
			  .select('body')
			  .append('div')
			  .attr('class', 'tooltip')
			  .style('opacity', 0);

	    };
}
