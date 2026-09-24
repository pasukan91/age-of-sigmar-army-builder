import { createServer } from 'vite';
const server = await createServer({logLevel:'silent',server:{middlewareMode:true},appType:'custom'});
try {
 const {default:factions}=await server.ssrLoadModule('/src/data/factions.js');
 const rr=await server.ssrLoadModule('/src/utils/regimentRules.js');
 const f=factions.find(x=>x.id==='kruleboyz');
 const hero=f.units.find(x=>x.id==='breaka-boss-on-mirebrute-troggoth');
 const option=hero.details.regimentOptions[0];
 const optionHero={...hero,details:{...hero.details,regimentOptions:[option]}};
 const list={faction:f,regiments:[]}; const regiment={id:'x',hero:optionHero,units:[]};
 console.log(option);
 console.log('candidate', f.units.find(x=>x.name.startsWith('Swampcalla'))?.details);
 console.log('matches', f.units.filter(x=>rr.doesUnitMatchRegimentOption(x,option)).map(x=>[x.name,x.details.canJoinRegimentAs]));
 console.log(rr.getAvailableUnitsForRegiment(list,regiment).map(x=>[x.name,x.details.canJoinRegimentAs]));
} finally {await server.close();}
