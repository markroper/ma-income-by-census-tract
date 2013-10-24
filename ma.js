$(document).ready(function(){
	var width = $("body").width(),
		height = $("body").height();
	var active;
	
	var projection = d3.geo.albers()
    .center([0, 42.1])
    .rotate([71.7, 0])//71.7
    .parallels([41, 44])
    .scale(width * 16)
    .translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	
	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	var g = svg.append("g");
	
	d3.json("tractToIncome.json", function(err, maIncome){
		
		d3.json("maGEOID10.json", function(error, ma) {	
			g.selectAll(".subunit")
			  .data(topojson.object(ma, ma.objects.ma).geometries)
			.enter().append("path")
			  .attr("class", function(d) 
			  {
			  	var classes = "tract";
			  	if(maIncome[d.id])
			  	{
			  		var inc = maIncome[d.id];
			  		if(inc > 160000)
			  			classes += " i160000";
			  		else if(inc > 155000)
			  			classes += " i155000";
			  		else if(inc > 150000)
			  			classes += " i150000";
			  		else if(inc > 145000)
			  			classes += " i145000";
			  		else if(inc > 140000)
			  			classes += " i140000";
			  		else if(inc > 135000)
			  			classes += " i135000";
			  		else if(inc > 130000)
			  			classes += " i130000";
			  		else if(inc > 125000)
			  			classes += " i125000";
			  		else if(inc > 120000)
			  			classes += " i120000";
			  		else if(inc > 115000)
			  			classes += " i115000";
			  		else if(inc > 110000)
			  			classes += " i110000";
			  		else if(inc > 105000)
			  			classes += " i105000";
			  		else if(inc > 100000)
			  			classes += " i100000";
			  		else if(inc > 95000)
			  			classes += " i95000";
			  		else if(inc > 90000)
			  			classes += " i90000";
			  		else if(inc > 85000)
			  			classes += " i85000";
			  		else if(inc > 80000)
			  			classes += " i80000";
			  		else if(inc > 75000)
			  			classes += " i75000";
			  		else if(inc > 70000)
			  			classes += " i70000";
			  		else if(inc > 65000)
			  			classes += " i65000";
			  		else if(inc > 60000)
			  			classes += " i60000";
			  		else if(inc > 55000)
			  			classes += " i55000";
			  		else if(inc > 50000)
			  			classes += " i50000";
			  		else if(inc > 45000)
			  			classes += " i45000";
			  		else if(inc > 40000)
			  			classes += " i40000";
			  		else if(inc > 35000)
			  			classes += " i35000";
			  		else if(inc > 30000)
			  			classes += " i30000";
			  		else if(inc > 25000)
			  			classes += " i25000";
			  		else if(inc > 20000)
			  			classes += " i20000";
			  		else if(inc > 15000)
			  			classes += " i15000";
			  		else if(inc > 10000)
			  			classes += " i10000";
			  		else if(inc > 5000)
			  			classes += " i5000";
			  	}
			  	return classes; 
			  })
			  .attr("data-income", function(d){ return maIncome[d.id]; })
			  .attr("id", function(d){ return d.id; })
			  .attr("d", path);
		});	
		
		d3.json("maTowns.json", function(err, ma){
			var mark = ma;
			g.selectAll(".town")
				.data(topojson.object(ma, ma.objects.TOWNS_POLY_V_CPA).geometries)
				.enter().append("path")
				.attr("class", function(d){ return "town " + d.id; })
				.attr("d", path)
				.attr("title", function(d) { return d.id.charAt(0) + d.id.toLowerCase().slice(1); })
				.on("click", mapClick);
			g.selectAll(".town")
				.on("mouseover", function(d){ displayTooltip(event, d); });
			
			var tooltipOpts = {
				disabled: true
			};
			$(".town").tooltip(tooltipOpts);
			
			function mapClick(d)
			{
				if (active === d) return reset();
				g.selectAll(".active").classed("active", false);
				d3.select(this).classed("active", active = d);
				var b = path.bounds(d);
				g.transition().duration(750).attr("transform",
					"translate(" + projection.translate() + ")"
					+ "scale(6)"//+ "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
					+ "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
				$("#pageTitle, #legend").hide();
			}
			function reset() {
				g.selectAll(".active").classed("active", active = false);
				g.transition().duration(750).attr("transform", "");
				$("#pageTitle, #legend").show();
			}
			
			var displayTooltip = _.debounce(function(e, el){
				$("#currentTown").text(el.id);
			}, 250);
		//	var resizeMap = _.debounce(function(e){
		//		g.transition().duration(750).
		//	});

		});
					
	});
	
});