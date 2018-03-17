import React, { Component } from 'react';
import {glossary} from "../glossary";
//import {helper} from "../"


class ProposalComponment extends Component{
	constructor(props){
		super(props);
		console.log("glossary", glossary);
		this.state={
			cashFlow:[{year:10,amount:null},{year:15,amount:null},{year:20,amount:null},{year:25,amount:null},{year:30,amount:null}],
			premium:20000,
			paymentTerm:5,
			birthYYMM:810926,
			author: "Huang YanFang",
			i18n:glossary,

		};
	}
	clickAddRow=()=>{
		let cashFlow = this.state.cashFlow;
		cashFlow.push({year:null,amount:null});
		this.setState({
			cashFlow:cashFlow
		})
	}
	clickUpdate=(e,key)=>{
		this.setState({
			key:e.target.value
		})
	}

   clickUpdateCashFlow=(e,index,key)=>{
   	    // console.log("clickUpdateCashFlow",e.target.value,index,key);
   		let cashFlow=this.state.cashFlow;
   		cashFlow[index][key]=e.target.value;
   		this.setState({
			cashFlow:cashFlow
		})
		
   }

   hanldeSubmit=()=>{
   	
   	
   let cashFlow =	this.state.cashFlow.map((item,index)=>{
   		 console.log(index,':',item);
   		let cashFlowItem={ value:item.amount};
   		if(item.year && (item.year+"").startsWith("@")) {
   			cashFlowItem["anb"]= item.year;
   		} else {
   			cashFlowItem["year"]= item.year;
   		}
   		return cashFlowItem;
   	   	}) ;


   	let request={
   		author:this.state.author,
   		anb:37,
   		deposit:{
   			amount:this.state.premium,
   			paymentTerm: this.state.paymentTerm,
   		},
   		cashValue:cashFlow,

   	};
   	this.props.handleSubmit(request);
   }

	render(){
		const{i18n,cashFlow,premium,paymentTerm,birthYYMM,author} = this.state;
			return(<div>
		<table><tbody>
		<tr>
			<td><label>{i18n.labelAmountDeposit}</label> </td>
			<td align="left"><input type="text" value={premium} onChange={(e)=>this.clickUpdate(e,"premium")}></input></td>
		</tr>
		<tr>
			<td><label>{i18n.labelPaymentTerm}</label></td>
			<td><input type="text" value={paymentTerm} onChange={(e)=>this.clickUpdate(e,"paymentTerm")}></input></td>
		</tr>
		<tr>
			<td><label>{i18n.labelBirthday}</label></td>
			<td><input type="text" value={birthYYMM} onChange={(e)=>this.clickUpdate(e,"birthYYMM")}></input></td>
		</tr>
		<tr>
			<td><label>{i18n.labelAgent}</label></td>
			<td><input type="text" value={author} onChange={(e)=>this.clickUpdate(e,"author")}></input></td>
		</tr>
		
		</tbody>
		</table>
		<br/>
		<table><thead>
		<tr><td>{i18n.labelPolicyYear}</td><td>{i18n.labelCashValue}</td></tr>
		</thead>
		<tbody>

		{ cashFlow.map( (item,index)=>{ return (<tr key={index}>
		 	<td><input type="text" value={item.year} onChange= {(e)=>{this.clickUpdateCashFlow(e,index,"year")}} ></input></td>
		 	<td><input type="text" value={item.amount} onChange= {(e)=>{this.clickUpdateCashFlow(e,index,"amount")}}></input></td>
		 	</tr>) } )
		}
		
		</tbody>
		</table>



		<table><tbody>
		<tr>
		<td><button onClick={this.clickAddRow}>{i18n.btnAddRow}</button></td>
		</tr>
		 <tr>
		<td colSpan="2">
		<button onClick={this.hanldeSubmit}>{i18n.btnSubmit}</button>
		</td></tr>
		</tbody></table></div>);
	}
}

export default class IRRComponent extends Component{
	constructor(props){
		super(props);
		console.log("glossary", glossary);
		this.state={
			result:""
		}
	}

	handleClick=(input)=>{
		console.log("handleClick", input)
		this.setState({
			result: JSON.stringify(input)
		});
	}
	
	
	render(){
		const{result} = this.state;
		
		return (<div>
			<ProposalComponment handleSubmit={this.handleClick}/>
			<textarea rows="10" value={result} />
			</div>);
	}

}
