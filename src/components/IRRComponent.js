import React, { Component } from 'react';
import {glossary} from "../glossary";
import {extendObservable} from "mobx";
import {observer} from "mobx-react"
import {URL} from "../config.js"
//import {helper} from "../"

const initCashValue=[{year:10,amount:null},{year:15,amount:null},{year:20,amount:null},{year:25,amount:null},{year:30,amount:null}];

 class IRRComponent extends Component{
	
	

	constructor(props){
		super(props);
		//console.log("glossary", glossary);
		extendObservable(this,{
			result:[],
			cashFlow:initCashValue,
			premium:20000,
			paymentTerm:5,
			birthYYMM:810926,
			author: "Huang YanFang",
			i18n:glossary,
			
	})	
	}

	handleClick = (input)=>{
		//console.log("handleClick", JSON.stringify(input));
		fetch(URL.irr, {
      		method: 'post',
      		headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(input)
        })
       .then(response => response.json())
       .then(response => { 
       		console.log(response);
       	    this.result=response;
       		
       	   })
       .catch((e)=>console.error(e));
      
	}
	
	
	render(){
		
		return (<div>
			<ProposalComponment 
			handleSubmit={this.handleClick} 
			cashFlow = {this.cashFlow}
			premium = {this.premium}
			paymentTerm ={this.paymentTerm}
			birthYYMM ={this.birthYYMM}
			author= {this.author}/>
			<IRRResultComponent result ={this.result} hidden={this.result.length===0}/>
			<span>{this.count}</span>
			</div>);
	}

}

class ProposalComponment extends Component{
	constructor(props){
		super(props);
		this.state={
			cashFlow:this.props.cashFlow,
			premium: this.props.premium,
			paymentTerm:this.props.paymentTerm,
			birthYYMM:this.props.birthYYMM,
			author: this.props.author,
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
   		// console.log(index,':',item);
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
			return(<div className={this.props.hidden?"hidden":""}>
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
		 	<td><input type="text" value={item.year? item.year:""} onChange= {(e)=>{this.clickUpdateCashFlow(e,index,"year")}} ></input></td>
		 	<td><input type="text" value={item.amount?item.amount:""} onChange= {(e)=>{this.clickUpdateCashFlow(e,index,"amount")}}></input></td>
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
class IRRResultComponent extends Component{
	
	render(){
		const{result} =this.props;
		const i18n= glossary;
		return (
			<table className={this.props.hidden?"hidden":""}>
			<thead><tr>
			<td>{i18n.labelPolicyYear}</td><td>{i18n.labelPercentage}</td><td>{i18n.labelIRR}</td>
			</tr></thead>
			<tbody>
			{ result && result.length > 0 &&
				 ( result.map((item,key)=>{
					return (<tr key={key}>
							<td>{item.year} </td>
							<td>{item.percentage} </td>
							<td>{item.irr} </td>
							</tr>);
				   }
				  )
				)
			}
			</tbody>
			</table>
			);
	}
}
export default observer(IRRComponent);

