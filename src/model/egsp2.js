export class EGSP2{
	constructor(annualPremium,paymentTerm){
		this.annualPremium=annualPremium;
		this.paymentTerm=paymentTerm;
		this.cashValueList=null;
	}
}
export class CashValue{
	constructor(year,cash){
		this.year = year;
		this.cashValue=cash;
	}
}
let EGSP2_10K5Y = new EGSP2(10000,5);
let cashValueList = [];
cashValueList.push(new CashValue());
EGSP2_10K5Y.cashValueList=cashValueList;


