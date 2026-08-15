const assert = require('assert');
function clamp(n,a,b){return Math.min(b,Math.max(a,Number(n)||0))}
function model(sales,expenses,deductPct,pricing){sales=Math.max(0,+sales||0);expenses=Math.max(0,+expenses||0);const d=clamp(deductPct,0,100)/100;const expenseVat=expenses*25/125;const inputVat=expenseVat*d;const noVatContribution=sales-expenses;let netSales,outputVat,customerPay;if(pricing==='add'){netSales=sales;outputVat=sales*.25;customerPay=sales*1.25}else{customerPay=sales;netSales=sales/1.25;outputVat=sales-netSales}const netExpenses=expenses-inputVat;const withVatContribution=netSales-netExpenses;return{inputVat,outputVat,customerPay,netExpenses,noVatContribution,withVatContribution,difference:withVatContribution-noVatContribution,required:sales>50000}}
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
let r=model(30000,10000,100,'same');near(r.noVatContribution,20000);near(r.withVatContribution,16000);near(r.difference,-4000);near(r.outputVat,6000);near(r.inputVat,2000);
r=model(30000,10000,100,'add');near(r.noVatContribution,20000);near(r.withVatContribution,22000);near(r.difference,2000);near(r.customerPay,37500);
r=model(30000,10000,50,'add');near(r.withVatContribution,21000);near(r.difference,1000);near(r.inputVat,1000);
r=model(50000,0,100,'add');assert.equal(r.required,false);near(r.difference,0);
r=model(50001,0,100,'add');assert.equal(r.required,true);
r=model(30000,0,100,'same');near(r.difference,-6000);
r=model(0,10000,100,'add');near(r.difference,2000);
console.log('7/7 VAT-choice tests passed');
