

exports.minCost = function (req, res) {
	var productOne = (req.params.productOne).toString().split(",");
	var productTwo = (req.params.productTwo).toString().split(",");
	var productThree = (req.params.productThree).toString().split(",");
	var productFour = (req.params.productFour).toString().split(",");
	var productFive = (req.params.productFive).toString().split(",");
	var productSix = (req.params.productSix).toString().split(",");
	var productSeven = (req.params.productSeven).toString().split(",");
	var productEight = (req.params.productEight).toString().split(",");
	var productNine = (req.params.productNine).toString().split(",");

	var quantities = [productOne[0], productTwo[0], productThree[0], productFour[0], productFive[0], productSix[0], productSeven[0], productEight[0], productNine[0]]; 
	var products = [productOne[1], productTwo[1], productThree[1], productFour[1], productFive[1], productSix[1], productSeven[1], productEight[1], productNine[1]];
	var c1 = 0;
	var c2 = 0;
	var c3 = 0;
	var d = 0;
	var route = 0;
	var cost = 0;
	var weight = 0;
	var path;

	//locations involved:
	if (quantities[0]>0) c1++;
	if (quantities[1]>0) c1++;
	if (quantities[2]>0) c1++;
	if (quantities[3]>0) c2++;
	if (quantities[4]>0) c2++;
	if (quantities[5]>0) c2++;
	if (quantities[6]>0) c3++;
	if (quantities[7]>0) c3++;
	if (quantities[8]>0) c3++;

	// distance calculation
	if(c1>0 && c2==0 && c3==0) {
		d = 3;
		route = 1; //i.e. from c1 
		weight = weight + (quantities[0]*3);
		weight = weight + (quantities[1]*2);
		weight = weight + (quantities[2]*8);
	} else if (c1==0 && c2>0 && c3==0) {
		d = 2.5;
		route = 2; //i.e. from c2 
		weight = weight + (quantities[3]*12);
		weight = weight + (quantities[4]*25);
		weight = weight + (quantities[5]*15);
	} else if (c1==0 && c2==0 && c3>0) {
		c = 2;
		route = 3; //i.e. from c3 
		weight = weight + (quantities[6]*500);
		weight = weight + (quantities[7]*1);
		weight = weight + (quantities[8]*2);
	} else if (c1>0 && c2>0 && c3==0) {
		d = 6.5; // c1-c2-l1
		route = 4; // i.e. c1
		weight = weight + (quantities[0]*3);
		weight = weight + (quantities[1]*2);
		weight = weight + (quantities[2]*8);
		weight = weight + (quantities[3]*12);
		weight = weight + (quantities[4]*25);
		weight = weight + (quantities[5]*15);
	} else if (c2>0 && c3>0 && c1==0) {
		d = 5; // c2-c3-l1
		route = 5; // i.e. from c2
		weight = weight + (quantities[3]*12);
		weight = weight + (quantities[4]*25);
		weight = weight + (quantities[5]*15);
		weight = weight + (quantities[6]*500);
		weight = weight + (quantities[7]*1);
		weight = weight + (quantities[8]*2);
	} else if (c1>0 && c3>0 && c2==0) {
		d = 7; //c1-l1-c3-l1
		route = 6; //i.e. from c1
		weight = weight + (quantities[0]*3);
		weight = weight + (quantities[1]*2);
		weight = weight + (quantities[2]*8);
		weight = weight + (quantities[6]*500);
		weight = weight + (quantities[7]*1);
		weight = weight + (quantities[8]*2);
	} else if (c1>0 & c2>0 & c3>0) {
		d = 9; // c1-c2-c3-l1
		route = 7;  //i.e. from c1
		weight = weight + (quantities[0]*3);
		weight = weight + (quantities[1]*2);
		weight = weight + (quantities[2]*8);
		weight = weight + (quantities[3]*12);
		weight = weight + (quantities[4]*25);
		weight = weight + (quantities[5]*15);
		weight = weight + (quantities[6]*500);
		weight = weight + (quantities[7]*1);
		weight = weight + (quantities[8]*2);
	}
	if (weight < 5) {
			cost = 10;
		} else {
			weight = weight - 5;
			cost = cost + 10;
			var x = weight/5;
			cost = cost + (x*8);
			if ((weight%5) > 0) {
				cost = cost + (weight%5);
			}
		}
		cost = cost + d;
		switch (route)
		{
			case 1:
				{
					path = "C1 -> L1";
					break;
				}
			case 2:
				{
					path = "C2 -> L1";
					break;
				}
			case 3:
				{
					path = "C3 -> L1";
					break;
				}
			case 4:
				{
					path = "C1 -> C2 -> L1";
					break;
				}
			case 5:
				{
					path = "C2 -> C3 -> L1";
					break;
				}
			case 6:
				{
					path = "C1 -> L1 -> C3 -> L1";
					break;
				}
			case 7:
				{
					path = "C1 -> C2 -> C3 -> L1";
					break;
				}
			default: 
				path: "no path";
		}

	res.json({
		Minimum_Cost: cost,
		Path: path
	});	
};