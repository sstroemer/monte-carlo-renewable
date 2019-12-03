// hour in [0,23]
function get_load(hour) {
	return Math.max(rnorm(parseFloat(load[hour]["mean"]), parseFloat(load[hour]["var"])), 0);
}

// hour in [0,23]
// day in ["1", "31"]
// month in ["1", "12"]
function get_gen(hour, day, month) {
	var r = solar[month][day]["radiation"][nextInt(solar[month][day]["radiation"].length)];
	var c = solar[month][day]["clear_index"][nextInt(solar[month][day]["clear_index"].length)];
	
	var nd1 = new NormalDistribution(12 + (Math.random() * 2 - 1), 2 + (Math.random() - 0.5));
	var nd2 = new NormalDistribution(14 + (Math.random() - 0.5), (Math.random()*0.5 - 0.25));
	return Math.max((nd1.pdf(hour) * 0.9 + nd2.pdf(hour)*0.1) * r * c, 0);
}

// month in ["1", "12"]
function avg_radiation(month) {
	var sum = 0;
	var count = 0;
	
	for (var day in solar[month]) {
		for (var rad in solar[month][day]["radiation"]) {
			sum += solar[month][day]["radiation"][rad];
			count++;
		}
	}
	
	return sum/count;
}

// month in ["1", "12"]
function avg_clear_index(month) {
	var sum = 0;
	var count = 0;
	
	for (var day in solar[month]) {
		for (var rad in solar[month][day]["clear_index"]) {
			sum += solar[month][day]["clear_index"][rad];
			count++;
		}
	}
	
	return sum/count;
}


function rnorm(mu, sigma) {
	var u1 = 0;
	var u2 = Math.random();
	
	while (u1 <= 0.000001) {
	   u1 = Math.random();
	}

	var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * 3.14159265358979323846 * u2);
	return z * sigma + mu;
}

// max is exclusive
function nextInt(max) {
	return Math.floor(Math.random() * max);
}

/*
 * #######################################################################################################
 * #######################################################################################################
 */
 
// This is the chart creation stuff

var chart_radiation = new Chart(document.getElementById('chart_radiation').getContext('2d'), {
	type: 'bar',
	data: {
		labels: ['January', 'February', 'March', 'April',
				 'May', 'June', 'July', 'August',
				 'September', 'October', 'November', 'December'],
		datasets: [{
			label: 'Average daily radiation',
			backgroundColor: 'rgb(200,50,0)',
			borderColor: 'rgb(200,50,0)',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(avg_radiation)
		}]
	},
	options: {
		scales: {
            yAxes: [{
				scaleLabel: { display: true, labelString: 'kWh / m2 / day' }
            }]
        }
	}
}); 

var chart_clear_index = new Chart(document.getElementById('chart_clear_index').getContext('2d'), {
	type: 'bar',
	data: {
		labels: ['January', 'February', 'March', 'April',
				 'May', 'June', 'July', 'August',
				 'September', 'October', 'November', 'December'],
		datasets: [{
			label: 'Average clearness index',
			backgroundColor: 'rgb(99, 132, 255)',
			borderColor: 'rgb(99, 132, 255)',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(avg_clear_index)
		}]
	},
	options: {
		scales: {
            yAxes: [{
				scaleLabel: { display: true, labelString: 'surface radiation / extraterrerstrial radiation' }
            }]
        }
	}
});

var chart_generation = new Chart(document.getElementById('chart_generation').getContext('2d'), {
	type: 'bar',
	data: {
		labels: ['January', 'February', 'March', 'April',
				 'May', 'June', 'July', 'August',
				 'September', 'October', 'November', 'December'],
		datasets: [{
			label: 'Average daily radiation at panel',
			backgroundColor: 'rgb(255,165,0)',
			borderColor: 'rgb(255,165,0)',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(avg_radiation).map((val, ind) => val * avg_clear_index(ind))
		}]
	},
	options: {
		scales: {
            yAxes: [{
				scaleLabel: { display: true, labelString: 'kWh / m2 / day' }
            }]
        }
	}
});

var chart_load = new Chart(document.getElementById('chart_load').getContext('2d'), {
	type: 'line',
	data: {
		labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		datasets: [{
			label: 'Average hourly load',
			backgroundColor: 'rgba(0,165,0,0.25)',
			borderColor: 'rgb(0,165,0)',
			data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(val => load[val]["mean"])
		}]
	},
	options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0
                },
				scaleLabel: { display: true, labelString: 'kWh' }
            }]
        }
    }
});

var chart_result1 = new Chart(document.getElementById('chart_result_1').getContext('2d'), {
	type: 'bar',
	data: {
		labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		datasets: [{
			label: 'Consumption',
			backgroundColor: 'rgba(200, 0, 0, 0.75)',
			borderColor: 'rgb(200, 0, 0)',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},{
			label: 'Production',
			backgroundColor: 'rgba(0, 200, 0, 0.75)',
			borderColor: 'rgb(0, 200, 0)',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}]
	},
	options: {
		scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
					suggestedMax: 0.8
                },
				scaleLabel: { display: true, labelString: 'kWh' }
            }]
        },
		events: []
    }
});

var chart_result2 = new Chart(document.getElementById('chart_result_2').getContext('2d'), {
	type: 'bar',
	data: {
		labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		datasets: [{
			label: 'Saved energy',
			backgroundColor: 'rgba(0, 0, 200, 0.75)',
			borderColor: 'rgb(0, 0, 200)',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},{
			label: 'Excess energy',
			backgroundColor: 'rgba(0, 200, 0, 0.75)',
			borderColor: 'rgb(0, 200, 0)',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}]
	},
	options: {
		scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
					suggestedMax: 0.6
                },
				scaleLabel: { display: true, labelString: 'kWh' }
            }]
        },
		events: []
    }
});

var chart_result3 = new Chart(document.getElementById('chart_result_3').getContext('2d'), {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Saved energy',
			backgroundColor: 'rgba(0, 0, 0, 0.0)',
			borderColor: 'rgb(0, 0, 200)',
			pointBorderColor: 'rgba(0,0,0,0)',
			lineTension: 0,
			data: []
		},{
			label: 'Excess energy',
			backgroundColor: 'rgba(0, 0, 0, 0.0)',
			borderColor: 'rgb(0, 200, 0)',
			pointBorderColor: 'rgba(0,0,0,0)',
			lineTension: 0,
			data: []
		}]
	},
	options: {
		scales: {
            yAxes: [{
				scaleLabel: { display: true, labelString: 'kWh / day' }
            }]
        }
    }
});

/*
 * #######################################################################################################
 * #######################################################################################################
 */
 
 
// that's where the fun stuff starts

var saved  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var excess = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var prod   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cons   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var div = 0;

var started = false;

function startsim() {
	saved  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	excess = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	prod   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	cons   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	div = 0;
	
	chart_result1.data.datasets[0].data = [];
	chart_result1.data.datasets[1].data = [];
	chart_result2.data.datasets[0].data = [];
	chart_result2.data.datasets[1].data = [];
	chart_result3.data.labels = [];
	chart_result3.data.datasets[0].data = [];
	chart_result3.data.datasets[1].data = [];
	
	if (!started) {
		started = true;
		setTimeout(simulate, 0);
	}
}

function simulate() {
	var keys = Object.keys(solar);
	var month = keys[keys.length * Math.random() << 0];
	
	keys = Object.keys(solar[month]);
	var day = keys[keys.length * Math.random() << 0];
	
	// add a new random day
	for (var h = 0; h < 24; h++) {
		var r_gen  = get_gen(h, day, month);
		var r_load = get_load(h);
		
		saved[h]  += Math.min(r_gen, r_load);
		excess[h] += Math.max(0, r_gen-r_load);
		prod[h]   += r_gen;
		cons[h]   += r_load;
	}
	div++;
	
	// update charts
	chart_result1.data.datasets[0].data = cons.map(val => val / div);
	chart_result1.data.datasets[1].data = prod.map(val => val / div);
	chart_result1.update();
	
	chart_result2.data.datasets[0].data = saved.map(val => val / div);
	chart_result2.data.datasets[1].data = excess.map(val => val / div);
	chart_result2.update();
	
	chart_result3.data.labels.push(chart_result3.data.labels.length);

	var sum = 0;
	saved.map(val => sum+=val);
	chart_result3.data.datasets[0].data.push(sum / div);
	sum = 0;
	excess.map(val => sum+=val);
	chart_result3.data.datasets[1].data.push(sum / div);
	chart_result3.update();
	
	setTimeout(simulate, 1000 - document.getElementById("simspeed").value * 10);
}



 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 