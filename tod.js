var deg2rad = function(deg) {
	return deg * (Math.PI / 180)
};

setTimeout(function() {
	var $social  = $('#jsn-social-icons ul');
	var $parking = $('<li />').addClass('parking');
	$parking.append($("<img />").attr('src', chrome.extension.getURL('park.webp')))
	$social.prepend($parking);

	var lat = -35.320441567506414;
	var lng = 149.1329453497376;

	var greenDistanceThreshold = 200;
	var greenCountThreshold    = 10;
	var amberDistanceThreshold = 500;
	var amberCountThreshold    = 10;

	var url = [config.root, config.capacity, config.apiKey, config.siteURL, lat, lng, 500, ''].join('/');

	$.get(url, function(data, status, xhr) {
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

		data = data.filter(function(lot) {
			var badTypes = ['Disabled', 'Dropoff', 'LZ'];
			var idx      = badTypes.indexOf(lot.BayType);

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

		var green      = data.filter(function(lot) {
			return lot.Distance < greenDistanceThreshold;
		});
		var greenCount = green.reduce(function(total, lot) {
			if (total && total.Free) total = total.Free;
			return total + parseInt(lot.Free, 10);
		});
		var amber      = data.filter(function(lot) {
			return lot.Distance < amberDistanceThreshold;
		});
		var amberCount = amber.reduce(function(total, lot) {
			if (total && total.Free) total = total.Free;
			return total + parseInt(lot.Free, 10);
		});

		var status;
		var rating;
		if (greenCount >= greenCountThreshold) {
			status = 'green';
			rating = 'Good';
		} else if (amberCount >= amberCountThreshold) {
			status = 'amber';
			rating = 'Okay';
		} else {
			status = 'red';
			rating = 'Poor';
		}

		$parking.click(function() {
			var $dialog = $("<div id='dialog'></div>");
			$dialog.addClass(status);

			$dialog.append("<p><b>Parking rating: </b>" + rating + "</p>");

			var $table = $('<table><thead><tr><th>Free Spaces</th><th class="location">Location</th><th>Type</th><th>Distance</th></tr></thead></table>').appendTo($dialog);

			for (var i = 0; i < 10 && i < data.length; i++) {
				var lot = data[i];
				var url = "/maps/dir/Current+Location/" + lot.Latitude + "," + lot.Longitude + "/";
				var a   = "<a target='_blank' href='" + url + "'>" + lot.Street + "</a>";

				var $tr       = $('<tr></tr>').appendTo($table);
				var $space    = $('<td></td>').appendTo($tr).text(lot.Free);
				var $location = $('<td></td>').appendTo($tr).html(a);
				var $type     = $('<td></td>').appendTo($tr).text(lot.BayType);
				var $distance = $('<td></td>').appendTo($tr).text(lot.Distance + " m");
			}

			var off     = $parking.offset();
			var imgSize = 48;
			$dialog.css('top', off.top + imgSize);
			$dialog.css('left', off.left + imgSize);

			$('body').append($dialog);
		});

		$parking.addClass(status);
	}, 'json');

}, 50);