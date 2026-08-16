const fs=require('fs');
const assert=require('assert');

const html=fs.readFileSync('skjul-hjemmeadresse-cvr.html','utf8');
assert(/rel="canonical" href="https:\/\/kontormakker\.github\.io\/Firmakroner\/skjul-hjemmeadresse-cvr\.html"/i.test(html),'CVR page canonical missing');
assert(/virksomhedsadresser altid skal offentliggøres/i.test(html),'exact business-address publication rule must be explained');
assert(/virk\.dk\/myndigheder\/stat\/ERST\/selvbetjening\/Det_Offentlige_Ejerregister\/det-offentlige-ejerregister-faq/i.test(html),'exact Virk address-protection FAQ must be cited');
assert(/datatilsynet\.dk\/regler-og-vejledning\/medier-registre-og-arkiver/i.test(html),'Datatilsynet public-register guidance must be cited');
assert(/virksomhedsguiden\.dk\/content\/ydelser\/faa-reklamebeskyttet-din-virksomhed-i-cvr/i.test(html),'official CVR marketing-protection guidance must be cited');
assert(/support\.google\.com\/business\/answer\/3038177/i.test(html),'Google service-area guidance must be cited');
assert(!/partner-ads\.com/i.test(html),'CVR privacy answer must not be monetized before a relevant address partner is separately approved');
assert(!/køb|bestil adresse|virtuel adresse/i.test(html),'CVR checker must not steer users to an unverified paid-address product');
console.log('cvr-compliance-test: official-source and no-monetization guards passed');
