const assert=require('assert');
const clamp=(n,a,b)=>Math.min(b,Math.max(a,Number(n)||0));
function model(amount,type,expensePct,taxPct){amount=Math.max(0,+amount||0);expensePct=clamp(expensePct,0,100)/100;taxPct=clamp(taxPct,0,65)/100;const customerPays=type==='excl'?amount*1.25:amount;const netSales=type==='excl'?amount:amount/1.25;const vatBuffer=customerPays-netSales;const expenseBuffer=netSales*expensePct;const profit=Math.max(0,netSales-expenseBuffer);const taxReserve=profit*taxPct;const available=Math.max(0,customerPays-vatBuffer-expenseBuffer-taxReserve);return{customerPays,netSales,vatBuffer,expenseBuffer,profit,taxReserve,available}}
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
let r=model(12500,'incl',30,40);near(r.customerPays,12500);near(r.netSales,10000);near(r.vatBuffer,2500);near(r.expenseBuffer,3000);near(r.profit,7000);near(r.taxReserve,2800);near(r.available,4200);
r=model(10000,'excl',0,0);near(r.customerPays,12500);near(r.vatBuffer,2500);near(r.available,10000);
r=model(12500,'incl',100,65);near(r.profit,0);near(r.taxReserve,0);near(r.available,0);
r=model(0,'incl',30,40);near(r.available,0);
console.log('4/4 invoice-buffer tests passed');
