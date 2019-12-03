<!doctype html>
<html>
	<head>
		<title>Monte-Carlo-Simulation: Renewable Energies</title>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">	
	</head>
	<body>
		<div class="container">
			<h1>Monte-Carlo-Simulation: Renewable Energies</h1>
			<ul class="collapsible">
				<li>
				  <div class="collapsible-header">Overview: Input data</div>
				  <div class="collapsible-body">
					<div class="row">
						<div class="col s12 m6">
							<canvas id="chart_radiation"></canvas>
						</div>
						<div class="col s12 m6">
							<canvas id="chart_clear_index"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m6">
							<canvas id="chart_generation"></canvas>
						</div>
						<div class="col s12 m6">
							<canvas id="chart_load"></canvas>
						</div>
					</div>
				  </div>
				</li>
				<li>
				  <div class="collapsible-header">Overview: Simulation and results</div>
				  <div class="collapsible-body">
					<div class="row">
						<div class="col s12 m6">
							<p>
								<a class="waves-effect waves-light btn" style="width: 100%" onclick="startsim();">(Re-)Start simulation</a>
							</p>
						</div>
						<div class="col s12 m6">
							<p class="range-field">
								<label for="simspeed">Simulation speed</label>
								<input id="simspeed" type="range" min="0" max="100"/>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m6">
							<canvas id="chart_result_1"></canvas>
						</div>
						<div class="col s12 m6">
							<canvas id="chart_result_2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col s12">
							<canvas id="chart_result_3"></canvas>
						</div>
					</div>
				  </div>
				</li>
			</ul>
		</div>
			
		<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
		<script type="text/javascript">
			<?php include("load_data.php"); ?>
		
			// collapisbles!
			document.addEventListener('DOMContentLoaded', function() {
				var elems = document.querySelectorAll('.collapsible');
				var instances = M.Collapsible.init(elems, {});
			});
		</script>
		
		<script type="text/javascript" src="NormalDistribution.js"></script>
		<script type="text/javascript" src="main.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	</body>
</html>