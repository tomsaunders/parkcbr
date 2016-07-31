var deg2rad = function(deg) {
	return deg * (Math.PI / 180)
};

setTimeout(function() {

	var $address = $('#rhs_block [data-dtype=d3adr]');

	if ($address.length) {
		var streetAddress = $address.find('span:last-child').text();

		if (streetAddress.indexOf('ACT') === -1){
			//this is not an address in Canberra, so we have no smart parking to look up
			return;
		}

		var $map = $("#rhs_block [data-dtype=d3mm] a[href^='/maps/place']");

		var mapURL = $map.attr('href');

		var bits   = mapURL.split('/');
		var coords = bits[4];
		var bits   = coords.split(',');

		var lat = bits[0].replace('@', '');
		var lng = bits[1];

		var url = [config.root, config.capacity, config.apiKey, config.siteURL, lat, lng, 500, ''].join('/');
		console.log(url);

		$.get(url, function(data, status, xhr) {
			var $park = $address.clone();
			$park.find('span:first-child').text('Parking: ');

			var msg = '';
			if (data.length == 0) {
				msg = 'No spots found :(';
			} else {
				data = data.map(function(occupancy) {
					var lot = lotIndex[occupancy.LotCode];

					lot = $.extend(lot, occupancy);

					var latLot = lot.Latitude;
					var lngLot = lot.Longitude;

					var R    = 6371; // Radius of the earth in km
					var dLat = deg2rad(latLot - lat);  // deg2rad below
					var dLon = deg2rad(lngLot - lng);
					var a    =
							Math.sin(dLat / 2) * Math.sin(dLat / 2) +
							Math.cos(deg2rad(latLot)) * Math.cos(deg2rad(lat)) *
							Math.sin(dLon / 2) * Math.sin(dLon / 2)
						;
					var c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					var d    = R * c; // Distance in km

					lot.Distance = Math.floor(d * 1000); //metres

					return lot;
				});

				data = data.filter(function(lot){
					var badTypes = ['Disabled', 'Dropoff', 'LZ']
					var idx = badTypes.indexOf(lot.BayType);

					return idx === -1 && lot.Free > 0;
				});

				data = data.sort(function(lotA, lotB) {
					if (lotA.Distance < lotB.Distance) {
						return -1;
					}
					if (lotA.Distance > lotB.Distance) {
						return 1;
					}
					return 0;
				});

				for (var i = 0; i < data.length && i < 3; i++){
					var lot = data[i];
					var url = "/maps/dir/Current+Location/" + lot.Latitude + "," + lot.Longitude + "/";
					var a = "<a href='" + url + "'>" + lot.Street + "</a>";
					msg += "<br />" + lot.Free + "/" + lot.BayCount + " free at " + a + " (" + lot.BayType + ") - " + lot.Distance + " m";
				}
			}

			$park.find('span:last-child').html(msg);
			$park.insertAfter($address);

		}, 'json');
	}
}, 1000);