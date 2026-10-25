/* Pure date and duration helpers, shared with automated verification. */
(function(root){
 const pad=n=>String(n).padStart(2,'0');
 const day=(date=new Date())=>`${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
 const parse=s=>new Date(s+'T00:00:00');
 const shift=(s,n)=>{let d=parse(s);d.setDate(d.getDate()+n);return day(d)};
 const validDay=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(+parse(s))&&day(parse(s))===s;
 const elapsed=(t,now=Date.now())=>Math.min(t.target||Infinity,t.acc+(t.running?Math.max(0,now-t.started):0));
 function split(start,end){let out=[];while(start<end){let d=new Date(start),next=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();let stop=Math.min(next,end);out.push({date:day(d),ms:stop-start});start=stop}return out}
 function streak(records,today=day()){const dates=new Set(records.filter(r=>r.ms>0).map(r=>r.date));let cursor=dates.has(today)?today:shift(today,-1),n=0;while(dates.has(cursor)){n++;cursor=shift(cursor,-1)}return n}
 const api={day,shift,validDay,elapsed,split,streak}; root.PracticeCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
