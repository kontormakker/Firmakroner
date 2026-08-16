const assert=require('assert');
function rate(km){km=Math.max(0,Number(km)||0);return Math.min(km,20000)*3.94+Math.max(0,km-20000)*2.28}
function actual(business,total,running,depreciation){business=Math.max(0,Number(business)||0);total=Math.max(0,Number(total)||0);running=Math.max(0,Number(running)||0);depreciation=Math.max(0,Number(depreciation)||0);if(total<=0||business>total)return null;return business/total*(running+depreciation)}
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
near(rate(8000),31520);
near(rate(20000),78800);
near(rate(25000),90200);
near(actual(8000,20000,24500,37500),24800);
near(actual(8000,20000,50000,30000),32000);
assert.strictEqual(actual(21000,20000,20000,0),null);
assert.strictEqual(actual(1000,0,20000,0),null);
console.log('7/7 mileage comparison tests passed');
