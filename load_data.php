<?php
// ----------------------------------
// PARSE LOAD
$load = array();

$csvFile = file('data/load.csv');
$data = [];
foreach ($csvFile as $line) {
	$data[] = str_getcsv($line);
}

for ($i = 1; $i <= 24; $i++) {
	$tmp = array(
		"mean" => $data[$i][1],
		"var" => $data[$i][2],
	);
	array_push($load, $tmp);
}

echo "var load = " . json_encode($load) . ";";

// ----------------------------------
// PARSE SOLAR (DAILY)

$solar = array();

$csvFile = file('data/solar.csv');
$data = [];
foreach ($csvFile as $line) {
	$data[] = str_getcsv($line);
}

foreach ($data as $dat) {
	$month = strval($dat[1]);
	$day = strval($dat[2]);
	$rad = $dat[3];
	$ci  = $dat[4];
	
	if ($rad == -999 || $ci == -999) {
		continue;
	}

	$rad = $rad / 100;
	$ci = $ci / 100;
	
	if (!array_key_exists($month, $solar)) {
		$solar[$month] = array();
	}
	if (!array_key_exists($day, $solar[$month])) {
		$solar[$month][$day] = array("radiation" => array(), "clear_index" => array());
	}
	
	array_push($solar[$month][$day]["radiation"], $rad);
	array_push($solar[$month][$day]["clear_index"], $ci);
}

echo "var solar = " . json_encode($solar) . ";";

// ----------------------------------
// PARSE SOLAR (HOURLY)

// calculate dnorm(hour, 13, 2) * radiation * clear_index







