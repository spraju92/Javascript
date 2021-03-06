let convert;
let radix;
 convert = function(x)
 {
 // Checking is number or not
 if(isNaN(x))
	{
		throw new Error('Not a number');
	}
			const readline = require('readline');
			const fs = require('fs');
			let CountryName = [];
			let IndicatorName = [];
			let Year = [];
			let Value = [];
			let i = 0;
			let tempData = {};
			let output = [];
			let result = {};
			let result1 = [];
			let encoding = 'utf8';
			const rl = readline.createInterface({
				// Reading file form file system
			input: fs.createReadStream('./inputdata/Indicators.csv')
			});
			// Fetching line by line
			rl.on('line', function(line) {
				let lines = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
				// Checking required reqirements
				if(lines.includes('India') && (lines.includes('Urban population (% of total)') ||
				lines.includes('Rural population (% of total population)')))
				{
					CountryName [i] = lines[0];
					IndicatorName[i] = lines[2];
					Year[i] = lines[4];
					Value[i] = lines[5];
					tempData['CountryName'] = CountryName[i];
					tempData['IndicatorName'] = IndicatorName[i];
					tempData['Year'] = Year[i];
					tempData['Value'] = Value[i];
					output.push(tempData);
					tempData = {};
					i = i + 1;
				}
			});
			rl.on('close', function() {
						for(let i1 = 1960; i1 <= 2014; i1 = i1 + 1)
						{
							let m = 0; let n = 0;
							output.map(function(x1)
							{
								if(parseInt(x1.Year, radix) === i1)
								{
									if(x1.IndicatorName === 'Urban population (% of total)')
									{
										m = parseFloat(x1.Value);
									}
									if(x1.IndicatorName === 'Rural population (% of total population)')
									{
										n = parseFloat(x1.Value);
									}
								}
							});

							result = {CountryName: 'India', ruralpop: m, Year: i1, urbanpop: n };
							result1.push(result);
							result = {};
						}
						// Storing data in local file
						fs.writeFileSync('./outputdata/worldDevIndicatorUrbanizationRaju.json',
						JSON.stringify(result1), encoding);
					});

	return 'JSON written successfully';
};
module.exports = convert;
