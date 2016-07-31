var tariffs = [
	{
		"TariffCode": "SS06_30m",
		"Rate": 0.8,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS06_1P",
		"Rate": 1.7,
		"Clasification": "",
		"Duration": "per hour",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS06_2P",
		"Rate": 4.5,
		"Clasification": "",
		"Duration": "per 2 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 9,
		"Clasification": "",
		"Duration": "All day",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS03",
		"Rate": 10.7,
		"Clasification": "",
		"Duration": "per 4 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free_5_mins",
		"Rate": 0,
		"Clasification": "",
		"Duration": "5 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free_15_mins",
		"Rate": 0,
		"Clasification": "",
		"Duration": "15 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free_30_mins",
		"Rate": 0,
		"Clasification": "",
		"Duration": "30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free_1_hr",
		"Rate": 0,
		"Clasification": "",
		"Duration": "1 hour",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free_2_hrs",
		"Rate": 0,
		"Clasification": "",
		"Duration": "2 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "Free",
		"Rate": 0,
		"Clasification": "",
		"Duration": "All day",
		"TariffHours": ""
	},
	{
		"TariffCode": "LZ_&_1P",
		"Rate": 0,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": "0730-1800"
	},
	{
		"TariffCode": "LZ_&_1P",
		"Rate": 0,
		"Clasification": "",
		"Duration": "1 hour",
		"TariffHours": "1800-0730"
	},
	{
		"TariffCode": "SS06_1P",
		"Rate": 0.8,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS06_2P",
		"Rate": 0.8,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS06_2P",
		"Rate": 1.7,
		"Clasification": "",
		"Duration": "per hour",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 0.55,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 1.1,
		"Clasification": "",
		"Duration": "per hour",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 2.8,
		"Clasification": "",
		"Duration": "per 2 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 5.1,
		"Clasification": "",
		"Duration": "per 3 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "MS04",
		"Rate": 7.9,
		"Clasification": "",
		"Duration": "per 4 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS03",
		"Rate": 0.55,
		"Clasification": "",
		"Duration": "per 30 minutes",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS03",
		"Rate": 1.1,
		"Clasification": "",
		"Duration": "per hour",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS03",
		"Rate": 3.4,
		"Clasification": "",
		"Duration": "per 2 hours",
		"TariffHours": ""
	},
	{
		"TariffCode": "SS03",
		"Rate": 6.2,
		"Clasification": "",
		"Duration": "per 3 hours",
		"TariffHours": ""
	}
];

var tariffIndex = {};
for (var i = 0; i < tariffs.length; i++){
	var tariff = tariffs[i];

	if (!tariffIndex[tariff.TariffCode]){
		tariffIndex[tariff.TariffCode] = [];
	}
	tariffIndex[tariff.TariffCode].push(tariff);
}