(function(){
  /* decide lite mode early: ?lite=1|0 overrides, else heuristics, then a short frame-rate probe */
  (function(){
    var de=document.documentElement,q=(location.search.match(/[?&]lite=([01])/)||[])[1],saved=null;
    try{saved=localStorage.getItem('avin-lite')}catch(e){}
    function set(v){de.classList.toggle('lite',!!v)}
    if(q){try{localStorage.setItem('avin-lite',q)}catch(e){}set(q==='1');return}
    if(saved==='0'||saved==='1'){set(saved==='1');return}
    var weak=(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||
      (window.matchMedia&&(matchMedia('(prefers-reduced-motion:reduce)').matches||(matchMedia('(pointer:coarse)').matches&&innerWidth<820)));
    if(weak){set(true);return}
    var t0=0,n=0,sum=0,last=0;
    function tick(t){if(last){sum+=t-last;n++}last=t;if(n<40)requestAnimationFrame(tick);else if(sum/n>26)set(true)}
    setTimeout(function(){requestAnimationFrame(tick)},1200);
  })();
  var $=function(s,r){return (r||document).querySelector(s)};
  var fa=function(n,d){var a=Math.abs(n),mx=d==null?1:d;if(a>0&&a<10)mx=Math.max(mx,a>=1?2:3);return Number(n).toLocaleString('fa-IR',{minimumFractionDigits:d||0,maximumFractionDigits:mx})};
  var pd=function(n){return String(n).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})};
  var en=function(x){return String(x).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[٬،]/g,',').replace(/٫/g,'.')};
  var amt=function(a){var v=Math.abs(a);return (a>0?'+':'−')+v.toLocaleString('fa-IR',{maximumFractionDigits:v<1?3:2})};
  var DAY=864e5,r4=function(v){return Math.round(v*1e4)/1e4},r6=function(v){return Math.round(v*1e6)/1e6};
  function g2j(gy,gm,gd){var gdm=[0,31,59,90,120,151,181,212,243,273,304,334],jy=(gm>2)?(gy+1):gy,days=355666+(365*gy)+~~((jy+3)/4)-~~((jy+99)/100)+~~((jy+399)/400)+gd+gdm[gm-1];
    jy=-1595+(33*~~(days/12053));days%=12053;jy+=4*~~(days/1461);days%=1461;if(days>365){jy+=~~((days-1)/365);days=(days-1)%365}
    var jm=(days<186)?1+~~(days/31):7+~~((days-186)/30),jd=1+((days<186)?(days%31):((days-186)%30));return [jy,jm,jd]}
  function j2g(jy,jm,jd){jy+=1595;var days=-355668+(365*jy)+~~(jy/33)*8+~~(((jy%33)+3)/4)+jd+((jm<7)?(jm-1)*31:((jm-7)*30)+186),gy=400*~~(days/146097);days%=146097;
    if(days>36524){gy+=100*~~(--days/36524);days%=36524;if(days>=365)days++}
    gy+=4*~~(days/1461);days%=1461;if(days>365){gy+=~~((days-1)/365);days=(days-1)%365}
    var gd=days+1,sal=[0,31,((gy%4===0&&gy%100!==0)||(gy%400===0))?29:28,31,30,31,30,31,31,30,31,30,31],gm;for(gm=0;gm<13&&gd>sal[gm];gm++)gd-=sal[gm];return [gy,gm,gd]}
  function jParts(ts){var d=new Date(ts),j=g2j(d.getFullYear(),d.getMonth()+1,d.getDate());return {y:j[0],m:j[1],d:j[2]}}
  function sod(t){var d=new Date(t);d.setHours(0,0,0,0);return d.getTime()}
  function jKey(ts){var p=jParts(ts);return p.y*12+p.m-1}
  function parseDate(s){
    var m=/(\d{4})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{1,2})/.exec(en(s));if(!m)return null;
    var y=+m[1],mo=+m[2],d=+m[3];if(mo<1||mo>12||d<1||d>31)return null;
    var g;if(y>=1300&&y<=1500){if(mo>6&&d>30)return null;g=j2g(y,mo,d)}else if(y>=1900&&y<=2200)g=[y,mo,d];else return null;
    var dt=new Date(g[0],g[1]-1,g[2],12,0,0);return isNaN(dt.getTime())?null:dt.getTime()}
  function fmtDate(ts){
    var diff=Math.round((sod(Date.now())-sod(ts))/DAY);
    if(diff===0)return 'امروز';if(diff===1)return 'دیروز';if(diff>1&&diff<=14)return pd(diff)+' روز پیش';
    var p=jParts(ts);return pd(p.d)+' '+MONTHS[p.m-1]+' '+pd(p.y)}
  function txDate(t){return t.d||fmtDate(t.ts)}


  /* ---------- icons ---------- */
  var I={
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    swap:'<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
    card:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
    pie:'<path d="M21 12A9 9 0 1112 3v9z"/><path d="M15 3.5A9 9 0 0120.5 9H15z"/>',
    doc:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
    up:'<path d="M12 19V5M5 12l7-7 7 7"/>',
    down:'<path d="M12 5v14M19 12l-7 7-7-7"/>',
    ok:'<circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/>',
    pend:'<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',
    fail:'<circle cx="12" cy="12" r="10"/><path d="M9 9l6 6M15 9l-6 6"/>',
    cloud:'<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1A4.5 4.5 0 0117 18z"/>',
    wallet:'<path d="M3 7a2 2 0 012-2h13v4"/><path d="M3 7v11a2 2 0 002 2h15a1 1 0 001-1V10a1 1 0 00-1-1H5a2 2 0 01-2-2z"/><circle cx="17" cy="14.5" r="1.2"/>',
    home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
    cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
    mega:'<path d="M3 11v3a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6.5a8 8 0 010 11"/>',
    brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>'
  };
  var svg=function(k,extra){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+(extra||'')+'>'+I[k]+'</svg>'};

  /* ---------- data (میلیون تومان) ---------- */
  var MONTHS=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  var DATA={
    7:{labels:['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'],
       inc:[6.2,8.1,5.4,9.8,7.3,10.4,8.9],exp:[4.1,5.2,6.8,4.9,5.6,7.1,5.3],
       dInc:6.4,dExp:2.8,sub:'میلیون تومان · روزانه، ۷ روز گذشته'},
    30:{labels:['۳ مهر','۶ مهر','۹ مهر','۱۲ مهر','۱۵ مهر','۱۸ مهر','۲۱ مهر','۲۴ مهر','۲۷ مهر','۳۰ مهر'],
       inc:[38,42,36,51,47,55,49,58,62,60],exp:[27,30,33,29,35,38,34,37,41,39],
       dInc:12.1,dExp:5.8,sub:'میلیون تومان · هر سه روز، ۳۰ روز گذشته'},
    365:{labels:MONTHS,
       inc:[142,150,138,165,172,168,181,176,190,198,187,214],exp:[98,104,110,102,118,121,115,130,126,134,128,141],
       dInc:15.6,dExp:9.4,sub:'میلیون تومان · ماهانه، ۱۲ ماه گذشته'}
  };
  var CATS=[{n:'مسکن و اجاره',p:41,c:'--s1'},{n:'خوراک و خرید',p:26,c:'--s2'},{n:'حمل‌ونقل و نرم‌افزار',p:19,c:'--s3'},{n:'سایر',p:14,c:'--s4'}];
  var TX=[
    {n:'اشتراک سرویس ابری',c:'نرم‌افزار',d:'امروز ۱۴:۲۰',a:-1.2,s:'ok',i:'cloud'},
    {n:'واریز قرارداد مشاوره',c:'درآمد پروژه',d:'امروز ۱۰:۰۵',a:36,s:'ok',i:'brief'},
    {n:'فاکتور پروژه طراحی',c:'درآمد پروژه',d:'دیروز ۱۸:۴۰',a:24,s:'pend',i:'wallet'},
    {n:'اجاره دفتر کار',c:'مسکن',d:'۲ روز پیش',a:-18,s:'ok',i:'home'},
    {n:'تبلیغات اینستاگرام',c:'بازاریابی',d:'۳ روز پیش',a:-3.5,s:'fail',i:'mega'},
    {n:'خرید ماهانه سوپرمارکت',c:'خوراک',d:'۴ روز پیش',a:-0.85,s:'ok',i:'cart'}
  ];
  var STATUS={ok:'تکمیل‌شده',pend:'در انتظار',fail:'ناموفق'};
  var GOALS=[{n:'صندوق اضطراری',v:72,cur:216,tot:300},{n:'خرید تجهیزات',v:45,cur:67.5,tot:150},{n:'سفر تابستان',v:28,cur:14,tot:50}];

  /* ---------- static bits ---------- */
  var nav=[['داشبورد','grid','dashboard'],['تراکنش‌ها','swap','transactions'],['کارت‌ها','card','cards'],['بودجه','pie','budget'],['گزارش‌ها','doc','reports'],['تنظیمات','gear','prefs']];
  $('#nav').innerHTML=nav.map(function(x){return '<a href="#'+x[2]+'">'+svg(x[1])+'<span>'+x[0]+'</span></a>'}).join('');
  try{$('#today').textContent=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date())+' · خلاصه وضعیت حساب‌ها'}catch(e){}

  /* ---------- state ---------- */
  var U={bal0:2200};
  var S={r:365,filter:'all',q:'',cat:-1};
  var sum=function(a){return a.reduce(function(x,y){return x+y},0)};

  /* ---------- count-up ---------- */
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countTo(el,to,dec){
    var from=parseFloat(el.dataset.v||0),t0=performance.now(),dur=reduce?0:800;
    el.dataset.v=to;
    (function f(t){var k=dur?Math.min(1,(t-t0)/dur):1,e=1-Math.pow(1-k,3);el.textContent=fa(from+(to-from)*e,dec);if(k<1)requestAnimationFrame(f)})(t0);
  }

  /* ---------- KPI ---------- */
  function spark(vals,cls){
    var w=200,h=38,mx=Math.max.apply(null,vals),mn=Math.min.apply(null,vals),rg=(mx-mn)||1;
    var pts=vals.map(function(v,i){return [i*(w/(vals.length-1)),h-4-((v-mn)/rg)*(h-10)]});
    var d=smooth(pts),id='sg'+cls;
    var last=pts[pts.length-1];
    return '<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var('+cls+');stop-opacity:.32"/><stop offset="1" style="stop-color:var('+cls+');stop-opacity:0"/></linearGradient></defs>'+
      '<path d="'+d+' L'+w+','+h+' L0,'+h+'Z" fill="url(#'+id+')" class="fade"/>'+
      '<path d="'+d+'" class="ln draw" pathLength="1" style="stroke:var('+cls+');stroke-width:2;vector-effect:non-scaling-stroke"/></svg>';
  }
  function smooth(p){
    var d='M'+p[0][0].toFixed(1)+','+p[0][1].toFixed(1);
    for(var i=1;i<p.length;i++){var mx=(p[i-1][0]+p[i][0])/2;d+=' C'+mx.toFixed(1)+','+p[i-1][1].toFixed(1)+' '+mx.toFixed(1)+','+p[i][1].toFixed(1)+' '+p[i][0].toFixed(1)+','+p[i][1].toFixed(1)}
    return d;
  }
  function delta(v,good){
    if(v==null)return '<span class="delta">—</span>';
    var up=v>=0,cls=good===false?(up?'warn':'up'):(up?'up':'down');
    return '<span class="delta '+cls+'">'+svg(up?'up':'down')+fa(Math.abs(v),1)+'٪</span>';
  }
  function renderKPIs(){
    var D=DATA[S.r],inc=sum(D.inc),exp=sum(D.exp),sav=inc-exp,rate=inc>0?sav/inc*100:0,dd=function(v){return Math.abs(v)>=100?0:1};
    var netSeries=D.inc.map(function(v,i){return v-D.exp[i]});
    var bal=D.inc.map(function(v,i){var s=0;for(var j=0;j<=i;j++)s+=D.inc[j]-D.exp[j];return U.bal0+(D.pre||0)+s});
    var K=[
      {k:'bal',l:'موجودی کل',c:'--s1',v:bal[bal.length-1],d:'<span class="delta">'+(U.real?'محاسبه از تراکنش‌ها':'')+'</span>',m:'',sp:bal},
      {k:'inc',l:'درآمد',c:'--s1',v:inc,d:delta(D.dInc),m:'نسبت به دوره قبل',sp:D.inc},
      {k:'exp',l:'هزینه',c:'--s2',v:exp,d:delta(D.dExp,false),m:'نسبت به دوره قبل',sp:D.exp},
      {k:'sav',l:'پس‌انداز خالص',c:'--s3',v:sav,d:'<span class="delta '+(sav>=0?'up':'down')+'">'+svg(sav>=0?'up':'down')+fa(Math.abs(rate),1)+'٪</span>',m:'نرخ پس‌انداز از درآمد',sp:netSeries}
    ];
    if(!U.real){K[0].d=delta(4.2);K[0].m='نسبت به دوره قبل'}
    var box=$('#kpis'),first=!box.children.length;
    if(first){
      box.innerHTML=K.map(function(x,i){return '<article class="kpi glass rise" style="--i:'+(2+i)+'" id="k-'+x.k+'"><div class="lab"><i class="sw" style="background:var('+x.c+')"></i>'+x.l+'</div><div class="val"><span class="cu"></span><small>م.ت</small></div><div class="meta"><span class="dl"></span><span class="mt"></span></div><div class="spark"></div></article>'}).join('');
    }
    K.forEach(function(x){
      var a=$('#k-'+x.k);
      countTo($('.cu',a),x.v,dd(x.v));
      $('.dl',a).innerHTML=x.d;$('.mt',a).textContent=x.m;
      $('.spark',a).innerHTML=spark(x.sp,x.c);
    });
  }

  /* ---------- main chart ---------- */
  var tip=$('#tip'),pts=null;
  function niceMax(v){var p=Math.pow(10,Math.floor(Math.log10(v))),n=v/p,m=n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10;return m*p}
  function drawChart(anim){
    var D=DATA[S.r],el=$('#chart'),W=el.clientWidth||600,H=W<520?250:290,pl=38,pr=58,pt=14,pb=28;
    var n=D.labels.length,iw=W-pl-pr,ih=H-pt-pb;
    var mx=niceMax(Math.max.apply(null,D.inc.concat(D.exp))*1.04||10),ticks=4;
    var X=function(i){return pl+i*iw/(n-1)},Y=function(v){return pt+ih-(v/mx)*ih};
    var P1=D.inc.map(function(v,i){return [X(i),Y(v)]}),P2=D.exp.map(function(v,i){return [X(i),Y(v)]});
    pts={X:X,Y:Y,P1:P1,P2:P2,W:W,H:H,pl:pl,pr:pr,pt:pt,ih:ih,n:n};
    var g='';
    for(var t=0;t<=ticks;t++){var v=mx*t/ticks,y=Y(v);g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'"/><text x="'+(pl-8)+'" y="'+(y+4)+'" text-anchor="end">'+fa(v,mx<10?1:0)+'</text>'}
    var step=Math.max(1,Math.ceil(n/(W<520?4:Math.max(2,Math.floor(iw/62))))),xl='';
    D.labels.forEach(function(l,i){if(i%step===0||i===n-1&&n<9)xl+='<text x="'+X(i)+'" y="'+(H-7)+'" text-anchor="middle">'+l+'</text>'});
    var cls=anim?'draw':'',fcls=anim?'fade':'';
    var d1=smooth(P1),d2=smooth(P2),base=pt+ih;
    // end labels: keep them apart when both lines end at (almost) the same height
    var ly=[P1[n-1][1]+4,P2[n-1][1]+4],gap=16;
    if(Math.abs(ly[0]-ly[1])<gap){var mid=(ly[0]+ly[1])/2,up=ly[0]<=ly[1]?0:1;ly[up]=mid-gap/2;ly[1-up]=mid+gap/2;if(ly[up]<pt+8){ly[up]=pt+8;ly[1-up]=pt+8+gap}}
    var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><defs>'+
      '<linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--s1);stop-opacity:.30"/><stop offset="1" style="stop-color:var(--s1);stop-opacity:0"/></linearGradient>'+
      '<linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--s2);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--s2);stop-opacity:0"/></linearGradient></defs>'+
      g+xl+
      '<path class="'+fcls+'" d="'+d2+' L'+X(n-1)+','+base+' L'+X(0)+','+base+'Z" fill="url(#gb)"/>'+
      '<path class="'+fcls+'" d="'+d1+' L'+X(n-1)+','+base+' L'+X(0)+','+base+'Z" fill="url(#ga)"/>'+
      '<path class="ln '+cls+'" pathLength="1" d="'+d2+'" style="stroke:var(--s2)"/>'+
      '<path class="ln '+cls+'" pathLength="1" d="'+d1+'" style="stroke:var(--s1)"/>'+
      '<g id="hv" style="display:none"><line id="hl" y1="'+pt+'" y2="'+base+'" style="stroke:var(--fg3);stroke-width:1;stroke-dasharray:4 4"/>'+
      '<circle id="h1" r="5.5" style="fill:var(--s1);stroke:var(--ring);stroke-width:2"/><circle id="h2" r="5.5" style="fill:var(--s2);stroke:var(--ring);stroke-width:2"/></g>'+
      '<circle cx="'+P1[n-1][0]+'" cy="'+P1[n-1][1]+'" r="5" style="fill:var(--s1);stroke:var(--ring);stroke-width:2"/>'+
      '<circle cx="'+P2[n-1][0]+'" cy="'+P2[n-1][1]+'" r="5" style="fill:var(--s2);stroke:var(--ring);stroke-width:2"/>'+
      '<text class="endl" x="'+(W-pr+12)+'" y="'+ly[0]+'">درآمد</text>'+
      '<text class="endl" x="'+(W-pr+12)+'" y="'+ly[1]+'">هزینه</text>'+
      '<rect id="ov" x="'+pl+'" y="'+pt+'" width="'+iw+'" height="'+ih+'" fill="transparent" style="cursor:crosshair;touch-action:pan-y"/></svg>';
    el.innerHTML=s;
    var ov=$('#ov',el);
    function mv(e){
      var r=ov.getBoundingClientRect(),cx=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
      var i=Math.max(0,Math.min(n-1,Math.round(cx/r.width*(n-1))));
      $('#hv').style.display='';$('#hl').setAttribute('x1',X(i));$('#hl').setAttribute('x2',X(i));
      $('#h1').setAttribute('cx',X(i));$('#h1').setAttribute('cy',P1[i][1]);$('#h2').setAttribute('cx',X(i));$('#h2').setAttribute('cy',P2[i][1]);
      tip.innerHTML='<div class="t">'+D.labels[i]+'</div><div class="r"><i style="background:var(--s1)"></i>درآمد<b>'+fa(D.inc[i],1)+'</b></div><div class="r"><i style="background:var(--s2)"></i>هزینه<b>'+fa(D.exp[i],1)+'</b></div><div class="r n">خالص<b>'+fa(D.inc[i]-D.exp[i],1)+'</b></div>';
      tip.classList.add('on');
      var tw=tip.offsetWidth,left=X(i)-tw/2;left=Math.max(pl,Math.min(W-pr-tw+30,left));tip.style.left=left+'px';
    }
    function lv(){$('#hv').style.display='none';tip.classList.remove('on')}
    ov.addEventListener('pointermove',mv);ov.addEventListener('pointerleave',lv);ov.addEventListener('touchstart',mv,{passive:true});ov.addEventListener('touchmove',mv,{passive:true});ov.addEventListener('touchend',lv);
    $('#chart-sub').textContent=D.sub;
    // table view
    $('#chart-table').innerHTML='<table><thead><tr><th>دوره</th><th class="num">درآمد</th><th class="num">هزینه</th><th class="num">خالص</th></tr></thead><tbody>'+
      D.labels.map(function(l,i){return '<tr><td>'+l+'</td><td class="num">'+fa(D.inc[i],1)+'</td><td class="num">'+fa(D.exp[i],1)+'</td><td class="num">'+fa(D.inc[i]-D.exp[i],1)+'</td></tr>'}).join('')+'</tbody></table>';
  }
  $('#viewtoggle').addEventListener('click',function(){
    var on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',on);
    this.textContent=on?'نمایش نمودار':'نمایش جدول';
    $('#chart').parentNode.hidden=on;$('#chart-table').hidden=!on;
    if(!on)drawChart(false);
  });

  /* ---------- donut ---------- */
  var R=76,C=2*Math.PI*R,CL=[];
  function renderDonut(){
    var exp=sum(DATA[S.r].exp),gap=3,start=0;CL=catsFor(S.r);
    var h='<circle class="track" cx="100" cy="100" r="'+R+'"/>';
    CL.forEach(function(c,i){
      var len=Math.max(0,c.p/100*C-(CL.length>1?gap:0));
      h+='<circle class="seg-c" data-i="'+i+'" cx="100" cy="100" r="'+R+'" style="stroke:var('+c.c+')" stroke-dasharray="0 '+C+'" data-len="'+len+'" stroke-dashoffset="'+(-start)+'"/>';
      start+=c.p/100*C;
    });
    $('#donut').innerHTML=h;
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      document.querySelectorAll('#donut .seg-c').forEach(function(c){var l=c.dataset.len;c.setAttribute('stroke-dasharray',l+' '+(C-l))});
    })});
    $('#cats').innerHTML=CL.length?CL.map(function(c,i){return '<div class="cat" data-i="'+i+'" tabindex="0"><i style="background:var('+c.c+')"></i><span>'+c.n+'</span><b>'+fa(exp*c.p/100,0)+'</b><em>'+fa(c.p)+'٪</em></div>'}).join(''):'<div class="cat" style="cursor:default"><span>هنوز هزینه‌ای در این بازه ثبت نشده است</span></div>';
    $('#donut-sub').textContent=CL.length?'از مجموع '+fa(exp)+' میلیون تومان':'بدون هزینه در این بازه';
    setActive(-1);
  }
  function setActive(i){
    S.cat=i;var exp=sum(DATA[S.r].exp);
    document.querySelectorAll('#donut .seg-c').forEach(function(c){var on=i<0||+c.dataset.i===i;c.style.opacity=on?1:.28;c.style.strokeWidth=(+c.dataset.i===i)?28:24});
    document.querySelectorAll('.cat').forEach(function(c){c.classList.toggle('act',+c.dataset.i===i)});
    if(i<0||!CL[i]){$('#d-name').textContent='مجموع هزینه';$('#d-val').textContent=fa(exp);$('#d-pct').textContent='میلیون تومان'}
    else{var c=CL[i];$('#d-name').textContent=c.n;$('#d-val').textContent=fa(exp*c.p/100,0);$('#d-pct').textContent=fa(c.p)+'٪ از هزینه‌ها'}
  }
  ['mouseover','focusin'].forEach(function(ev){document.addEventListener(ev,function(e){var t=e.target.closest&&e.target.closest('.seg-c,.cat');if(t&&t.dataset.i!=null)setActive(+t.dataset.i)})});
  ['mouseout','focusout'].forEach(function(ev){document.addEventListener(ev,function(e){var t=e.target.closest&&e.target.closest('.seg-c,.cat');if(t)setActive(-1)})});

  ['mousedown','pointerdown','dragstart','selectstart'].forEach(function(ev){$('#donut').addEventListener(ev,function(e){if(ev==='mousedown'||ev==='dragstart'||ev==='selectstart')e.preventDefault()})});

  /* ---------- transactions ---------- */
  function renderTx(){
    var q=S.q.trim();
    var rows=TX.filter(function(t){return (S.filter==='all'||(S.filter==='in'?t.a>0:t.a<0))&&(!q||(t.n+t.c).indexOf(q)>-1)});
    $('#txb').innerHTML=rows.length?rows.map(function(t){
      return '<tr><td><div class="tx-n"><span class="tx-ic">'+svg(t.i)+'</span><div><b>'+t.n+'</b></div></div></td><td>'+t.c+'</td><td>'+txDate(t)+'</td>'+
        '<td><span class="pill '+t.s+'">'+svg(t.s)+STATUS[t.s]+'</span></td>'+
        '<td class="num amt">'+(t.a>0?'+':'−')+Math.abs(t.a).toLocaleString('fa-IR',{maximumFractionDigits:Math.abs(t.a)<1?3:2})+'</td></tr>'}).join('')
      :'<tr><td colspan="5" style="text-align:center;color:var(--fg3);padding:28px">'+(TX.length?'تراکنشی با این فیلتر پیدا نشد.':'هنوز تراکنشی ثبت نشده است.')+'</td></tr>';
  }
  $('#chips').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    document.querySelectorAll('#chips button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});S.filter=b.dataset.f;renderTx()});
  $('#q').addEventListener('input',function(){S.q=this.value;renderTx();var h=location.hash.slice(1);if(h&&h!=='dashboard'&&h!=='transactions')location.hash='transactions';else if(h==='transactions'&&pageTx.draw)pageTx.draw()});

  /* ---------- goals ---------- */
  var goalForm=false;
  function renderGoals(){
    var real=U.real,box=$('#goals');
    var list=GOALS.map(function(g,i){var v=real?Math.max(0,Math.min(100,Math.round(g.cur/g.tot*100))):g.v;
      return '<div class="goal"><div class="gt"><span>'+g.n+'</span><span style="display:flex;align-items:center;gap:8px"><b>'+fa(v)+'٪</b>'+(real?'<button class="x" type="button" data-gdel="'+i+'" aria-label="حذف هدف '+g.n+'">×</button>':'')+'</span></div><div class="bar"><span data-w="'+v+'"></span></div><small>'+fa(g.cur,1)+' از '+fa(g.tot)+' میلیون تومان</small></div>'}).join('');
    var empty=!GOALS.length?'<p style="color:var(--fg3);font-size:13px;margin:6px 0">هنوز هدفی تعریف نشده است.</p>':'';
    var form=!real?'':goalForm?'<form id="g-form" class="form" novalidate style="margin-top:12px"><div class="field full"><label for="g-name">نام هدف</label><input class="inp" id="g-name" maxlength="30" autocomplete="off" placeholder="مثلاً خرید لپ‌تاپ"></div><div class="field"><label for="g-tot">مبلغ هدف (میلیون تومان)</label><input class="inp" id="g-tot" inputmode="decimal" autocomplete="off"></div><div class="field"><label for="g-cur">پس‌انداز تاکنون (میلیون تومان)</label><input class="inp" id="g-cur" inputmode="decimal" autocomplete="off" placeholder="0"></div><div class="full"><div id="g-err" role="alert" style="color:var(--bad);font-size:13px;min-height:20px"></div><div style="display:flex;gap:10px"><button class="btn" type="submit">افزودن هدف</button><button class="btn ghost" type="button" data-gcancel>انصراف</button></div></div></form>':'<button class="link-btn" type="button" data-gadd style="margin-top:8px">+ افزودن هدف</button>';
    box.innerHTML=list+empty+form;
    setTimeout(function(){document.querySelectorAll('.goal .bar span').forEach(function(b){b.style.width=b.dataset.w+'%'})},250);
  }

  /* ---------- range + theme ---------- */
  $('#range').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    document.querySelectorAll('#range button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    S.r=+b.dataset.r;renderKPIs();drawChart(true);renderDonut()});
  function effTheme(){var t=document.documentElement.getAttribute('data-theme');return t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
  try{var saved=localStorage.getItem('avin-theme');if(saved)document.documentElement.setAttribute('data-theme',saved)}catch(e){}
  $('#theme').addEventListener('click',function(){
    var n=effTheme()==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);
    try{localStorage.setItem('avin-theme',n)}catch(e){}
  });
  document.documentElement.lang='fa';document.documentElement.dir='rtl';

  var rt;new ResizeObserver(function(){clearTimeout(rt);rt=setTimeout(function(){var w=$('#chart').clientWidth;if(w&&pts&&w!==pts.W)drawChart(false)},120)}).observe($('#chart'));

  renderKPIs();drawChart(true);renderDonut();renderTx();renderGoals();

  /* ---------- router + other pages ---------- */
  var ROUTES={
    dashboard:{t:'نمای کلی مالی'},
    transactions:{t:'تراکنش‌ها',s:'همه گردش‌های حساب، با جستجو و فیلتر'},
    cards:{t:'کارت‌ها',s:'مدیریت کارت‌ها، سقف خرج و دسترسی‌ها'},
    budget:{t:'بودجه',s:'سقف هر دسته و وضعیت مصرف این ماه'},
    reports:{t:'گزارش‌ها',s:'صورت سود و زیان و روند پس‌انداز'},
    prefs:{t:'تنظیمات',s:'پروفایل، ظاهر، اعلان‌ها و امنیت'}
  };
  var dashSub=$('#today').textContent,toastT,lastId=null,rendered={};
  var pd=function(n){return String(n).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})};
  var amt=function(a){return (a>0?'+':'−')+Math.abs(a).toLocaleString('fa-IR',{maximumFractionDigits:2})};
  function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('on')},2400)}
  var BASE_TX=TX.concat([
    {n:'حقوق تیم فنی',c:'حقوق و دستمزد',d:'۵ روز پیش',a:-48,s:'ok',i:'wallet'},
    {n:'قرارداد طراحی وب‌سایت',c:'درآمد پروژه',d:'۶ روز پیش',a:52,s:'ok',i:'brief'},
    {n:'قبض برق و اینترنت',c:'مسکن',d:'۷ روز پیش',a:-2.4,s:'ok',i:'home'},
    {n:'اشتراک ابزار طراحی',c:'نرم‌افزار',d:'۸ روز پیش',a:-0.9,s:'ok',i:'cloud'},
    {n:'واریز تسویه مشتری',c:'درآمد پروژه',d:'۹ روز پیش',a:18.5,s:'pend',i:'wallet'},
    {n:'کمپین تبلیغات گوگل',c:'بازاریابی',d:'۱۰ روز پیش',a:-7.2,s:'ok',i:'mega'},
    {n:'اسنپ و حمل‌ونقل',c:'حمل‌ونقل',d:'۱۱ روز پیش',a:-1.1,s:'ok',i:'cart'},
    {n:'ناهار تیمی',c:'خوراک',d:'۱۲ روز پیش',a:-2.3,s:'ok',i:'cart'},
    {n:'بیمه تکمیلی',c:'سلامت و بیمه',d:'۱۳ روز پیش',a:-4.8,s:'fail',i:'wallet'},
    {n:'فروش دوره آموزشی',c:'درآمد پروژه',d:'۱۴ روز پیش',a:12.6,s:'ok',i:'brief'}
  ]);
  var ALL=BASE_TX;
  function tile(i,l,c,v,u,m){return '<article class="kpi glass'+(i>=0?' rise':'')+'" style="--i:'+Math.max(i,0)+'"><div class="lab"><i class="sw" style="background:var('+c+')"></i>'+l+'</div><div class="val">'+v+'<small>'+u+'</small></div><div class="meta">'+m+'</div></article>'}
  function txRow(t){return '<tr><td><div class="tx-n"><span class="tx-ic">'+svg(t.i)+'</span><div><b>'+t.n+'</b></div></div></td><td>'+t.c+'</td><td>'+txDate(t)+'</td><td><span class="pill '+t.s+'">'+svg(t.s)+STATUS[t.s]+'</span></td><td class="num amt">'+amt(t.a)+'</td></tr>'}
  function tgl(k,t,d,on){return '<div class="row-set"><div>'+t+(d?'<small>'+d+'</small>':'')+'</div><button class="tgl" type="button" role="switch" aria-checked="'+!!on+'" data-tg="'+k+'" aria-label="'+t+'"></button></div>'}
  function pill(k,t){return '<span class="pill '+k+'">'+svg(k)+t+'</span>'}

  /* generic bar chart with hover tooltip; o.line draws a budget tick over each bar */
  function barChart(wrap,labels,vals,o){
    var host=$('.bc',wrap),tp=$('.tip',wrap),line=o.line||null,col=o.color||'--s1',lw=0,n=vals.length;
    function draw(){
      var W=lw=host.clientWidth||560,H=W<520?230:270,pl=40,pr=10,pt=12,pb=28;
      var mx=niceMax(Math.max.apply(null,vals.concat(line||[]))*1.06||10),iw=W-pl-pr,ih=H-pt-pb,bw=iw/n,w=Math.min(48,bw*.56);
      var Y=function(v){return pt+ih-v/mx*ih},g='',s='',k;
      for(k=0;k<=4;k++){var tv=mx*k/4,ty=Y(tv);g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ty+'" y2="'+ty+'"/><text x="'+(pl-8)+'" y="'+(ty+4)+'" text-anchor="end">'+fa(tv,mx<10?1:0)+'</text>'}
      var step=Math.ceil(n/(W<520?6:12));
      vals.forEach(function(v,i){
        var x=pl+bw*i+(bw-w)/2,y=Y(v),h=pt+ih-y,r=Math.min(4,w/2,h);
        s+='<path class="bar" data-i="'+i+'" style="fill:var('+col+');animation-delay:'+(i*55)+'ms" d="M'+x+','+(y+h)+'V'+(y+r)+'Q'+x+','+y+' '+(x+r)+','+y+'H'+(x+w-r)+'Q'+(x+w)+','+y+' '+(x+w)+','+(y+r)+'V'+(y+h)+'Z"/>';
        if(line){var ly=Y(line[i]);s+='<line x1="'+(x-6)+'" x2="'+(x+w+6)+'" y1="'+ly+'" y2="'+ly+'" style="stroke:var(--s2);stroke-width:3;stroke-linecap:round"/>'}
        if(i%step===0)s+='<text x="'+(pl+bw*(i+.5))+'" y="'+(H-7)+'" text-anchor="middle">'+labels[i]+'</text>';
      });
      host.innerHTML='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'">'+g+s+'<rect x="'+pl+'" y="'+pt+'" width="'+iw+'" height="'+ih+'" fill="transparent" style="cursor:crosshair" id="bov"/></svg>';
      var sv=$('svg',host),ov=$('#bov',host),bars=sv.querySelectorAll('.bar');
      ov.addEventListener('pointermove',function(e){
        var r=ov.getBoundingClientRect(),i=Math.max(0,Math.min(n-1,Math.floor((e.clientX-r.left)/r.width*n)));
        sv.classList.add('hov');bars.forEach(function(b){b.classList.toggle('on',+b.dataset.i===i)});
        var nm=o.names||['مقدار','سقف'];
        tp.innerHTML='<div class="t">'+labels[i]+'</div><div class="r"><i style="background:var('+col+')"></i>'+nm[0]+'<b>'+fa(vals[i],1)+'</b></div>'+(line?'<div class="r"><i style="background:var(--s2)"></i>'+nm[1]+'<b>'+fa(line[i],1)+'</b></div>':'');
        tp.classList.add('on');var tw=tp.offsetWidth;tp.style.left=Math.max(0,Math.min(W-tw,pl+bw*(i+.5)-tw/2))+'px';
      });
      ov.addEventListener('pointerleave',function(){sv.classList.remove('hov');bars.forEach(function(b){b.classList.remove('on')});tp.classList.remove('on')});
    }
    var ro=new ResizeObserver(function(){if(host.clientWidth&&host.clientWidth!==lw)draw()});ro.observe(host);draw();
    return {stop:function(){ro.disconnect()}};
  }
  var CHARTBOX='<div class="chart-wrap"><div class="bc"></div><div class="tip"></div></div>';

  /* ----- تراکنش‌ها ----- */
  function pageTx(root){
    var T={f:'all',c:'all',s:'new',p:0,del:null},PER=8,cats=[],first=true,real=U.real,delT;
    ALL.forEach(function(t){if(cats.indexOf(t.c)<0)cats.push(t.c)});
    root.innerHTML='<section class="grid3" id="tx-sum"></section>'+
      '<article class="card glass rise" style="--i:3"><div class="head"><div class="chips" id="t-chips"><button data-f="all" aria-pressed="true">همه</button><button data-f="in" aria-pressed="false">درآمد</button><button data-f="out" aria-pressed="false">هزینه</button></div>'+
      '<div class="filters"><select class="inp sel" id="t-cat" aria-label="دسته"><option value="all">همه دسته‌ها</option>'+cats.map(function(c){return '<option>'+c+'</option>'}).join('')+'</select>'+
      '<select class="inp sel" id="t-sort" aria-label="مرتب‌سازی"><option value="new">جدیدترین</option><option value="hi">بیشترین مبلغ</option><option value="lo">کمترین مبلغ</option></select>'+
      '<button class="btn" type="button" data-act="add-tx">+ افزودن تراکنش</button><button class="btn ghost" type="button" data-act="import">وارد کردن صورت‌حساب</button></div></div>'+
      '<div class="tbl"><table><thead><tr><th>شرح</th><th>دسته</th><th>تاریخ</th><th>وضعیت</th><th class="num">مبلغ (م.ت)</th>'+(real?'<th></th>':'')+'</tr></thead><tbody id="t-body"></tbody></table></div>'+
      '<div class="pager"><span id="t-info"></span><div class="pgs"><button class="pg" id="t-prev" type="button">قبلی</button><button class="pg" id="t-next" type="button">بعدی</button></div></div></article>';
    function rowHtml(t){var h=txRow(t);if(!real)return h;var on=T.del===t.id;return h.replace(/<\/tr>$/,'<td style="text-align:left"><button class="link-btn'+(on?' danger':'')+'" type="button" data-txdel="'+t.id+'">'+(on?'تأیید حذف':'حذف')+'</button></td></tr>')}
    function draw(){
      var q=S.q.trim(),r=ALL.filter(function(t){return (T.f==='all'||(T.f==='in'?t.a>0:t.a<0))&&(T.c==='all'||t.c===T.c)&&(!q||(t.n+t.c).indexOf(q)>-1)});
      if(T.s==='hi')r.sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)});
      if(T.s==='lo')r.sort(function(a,b){return Math.abs(a.a)-Math.abs(b.a)});
      var pages=Math.max(1,Math.ceil(r.length/PER));T.p=Math.min(T.p,pages-1);
      var inn=0,out=0;r.forEach(function(t){if(t.a>0)inn+=t.a;else out-=t.a});
      var k=first?0:-1;
      $('#tx-sum').innerHTML=tile(k,'تعداد تراکنش','--fg3',fa(r.length),'مورد',q?'جستجو: '+q:'مطابق فیلتر فعلی')+
        tile(k<0?k:1,'مجموع ورودی','--s1',fa(inn,1),'م.ت','از '+fa(r.filter(function(t){return t.a>0}).length)+' تراکنش')+
        tile(k<0?k:2,'مجموع خروجی','--s2',fa(out,1),'م.ت','از '+fa(r.filter(function(t){return t.a<0}).length)+' تراکنش');
      first=false;
      var part=r.slice(T.p*PER,T.p*PER+PER);
      $('#t-body').innerHTML=part.length?part.map(rowHtml).join(''):'<tr><td colspan="'+(real?6:5)+'" style="text-align:center;color:var(--fg3);padding:30px">'+(ALL.length?'تراکنشی با این فیلتر پیدا نشد.':'هنوز تراکنشی ثبت نشده است. با «افزودن تراکنش» یا «وارد کردن صورت‌حساب» شروع کنید.')+'</td></tr>';
      $('#t-info').textContent=r.length?'نمایش '+fa(T.p*PER+1)+' تا '+fa(T.p*PER+part.length)+' از '+fa(r.length):'بدون نتیجه';
      $('#t-prev').disabled=T.p===0;$('#t-next').disabled=T.p>=pages-1;
    }
    $('#t-chips').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      document.querySelectorAll('#t-chips button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});T.f=b.dataset.f;T.p=0;draw()});
    $('#t-cat').addEventListener('change',function(){T.c=this.value;T.p=0;draw()});
    $('#t-sort').addEventListener('change',function(){T.s=this.value;T.p=0;draw()});
    $('#t-prev').addEventListener('click',function(){T.p--;draw()});
    $('#t-next').addEventListener('click',function(){T.p++;draw()});
    root.addEventListener('click',function(e){var b=e.target.closest('[data-txdel]');if(!b)return;var id=b.dataset.txdel;
      if(T.del===id){clearTimeout(delT);U.tx=U.tx.filter(function(t){return t.id!==id});reloadAll(false);toast('تراکنش حذف شد')}
      else{T.del=id;draw();clearTimeout(delT);delT=setTimeout(function(){T.del=null;if(pageTx.draw===draw)draw()},4000)}});
    pageTx.draw=draw;draw();
  }

  /* ----- کارت‌ها ----- */
  function defCards(){return [
    {n:'کارت اصلی',t:'نقدی',no:'۴۸۲۱',bal:312.4,lim:80,sp:46.2,cl:'',exp:'۰۹/۰۸',frz:false,on:true,intl:false,tap:true,day:20},
    {n:'کارت هزینه تیم',t:'اعتباری',no:'۷۳۰۶',bal:128,lim:50,sp:41.5,cl:'c2',exp:'۰۹/۱۱',frz:false,on:true,intl:true,tap:true,day:15},
    {n:'کارت پس‌انداز',t:'نقدی',no:'۱۱۵۹',bal:2413.6,lim:30,sp:2,cl:'c3',exp:'۱۰/۰۳',frz:true,on:false,intl:false,tap:false,day:10}
  ]}
  function pageCards(root){
    var CARDS=U.cards,sel=0,first=true,adding=false,confirmDel=false,MAX=6;
    function en(x){return String(x).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)})}
    function jNow(){try{var o={};new Intl.DateTimeFormat('en-u-ca-persian',{year:'numeric',month:'numeric'}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});var y=parseInt(o.year,10),m=parseInt(o.month,10);if(y>1300&&y<1600&&m>=1)return {y:y,m:m}}catch(e){}return {y:1405,m:1}}
    function mc(c,i){return '<button type="button" class="ccard mc '+c.cl+(c.frz?' frz':'')+(i===sel?' sel':'')+(first?' rise':'')+'" data-card="'+i+'" style="--i:'+i+'" aria-pressed="'+(i===sel)+'" aria-label="'+c.n+'"><div class="r1"><div class="chip"></div><small>'+c.n+(c.frz?' · مسدود':'')+'</small></div><div class="no">•••• •••• •••• '+c.no+'</div><div class="r3"><div><small>موجودی</small><b>'+fa(c.bal,1)+' م.ت</b></div><div><small>انقضا</small><b>'+c.exp+'</b></div></div></button>'}
    function formHtml(){return '<article class="card glass" id="c-form-card"><div class="head"><div><h2>افزودن کارت جدید</h2><p>فقط ۴ رقم آخر شماره کارت ذخیره و نمایش داده می‌شود · '+fa(CARDS.length)+' از '+fa(MAX)+' کارت</p></div></div><form id="c-form" class="form" novalidate>'+
      '<div class="field"><label for="c-no">شماره کارت</label><input class="inp" id="c-no" inputmode="numeric" autocomplete="off" maxlength="19" placeholder="0000 0000 0000 0000" dir="ltr" style="text-align:right;letter-spacing:1px"></div>'+
      '<div class="field"><label for="c-type">نوع کارت</label><select class="inp" id="c-type"><option>نقدی</option><option>اعتباری</option><option>هدیه</option><option>ارزی</option></select></div>'+
      '<div class="field"><label for="c-exp">تاریخ انقضا (سال/ماه)</label><input class="inp" id="c-exp" inputmode="numeric" autocomplete="off" maxlength="5" placeholder="YY/MM" dir="ltr" style="text-align:right"></div>'+
      '<div class="field"><label for="c-name">نام کارت (اختیاری)</label><input class="inp" id="c-name" maxlength="24" placeholder="مثلاً کارت سفر"></div>'+
      '<div class="full"><div id="c-err" role="alert" style="color:var(--bad);font-size:13px;min-height:20px"></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn" type="submit">افزودن کارت</button><button class="btn ghost" type="button" data-cancel>انصراف</button></div></div></form></article>'}
    function grid(rz){return '<section class="grid3">'+CARDS.map(mc).join('')+(CARDS.length<MAX?'<button type="button" class="ccard mc add'+rz+'" data-add style="--i:3" aria-expanded="'+adding+'">+ افزودن کارت<small>'+fa(CARDS.length)+' از '+fa(MAX)+' کارت</small></button>':'<div class="ccard mc add max'+rz+'" role="status" style="--i:3">سقف تعداد کارت‌ها '+fa(MAX)+' عدد است<small>امکان افزودن کارت بیشتر وجود ندارد</small></div>')+'</section>'}
    function draw(){
      var rz=first?' rise':'';
      if(!CARDS.length){
        root.innerHTML=(adding?formHtml():'')+grid(rz)+'<article class="card glass'+rz+'" style="--i:4"><div class="head" style="margin:0"><div><h2>هنوز کارتی ندارید</h2><p>با دکمه «افزودن کارت» اولین کارت را ثبت کنید.</p></div></div></article>';
        first=false;return;
      }
      if(sel>CARDS.length-1)sel=CARDS.length-1;
      var c=CARDS[sel],pct=c.lim?c.sp/c.lim*100:0,stc=pct>=100?'over':pct>=85?'warn':'';
      var act=ALL.slice(sel*2,sel*2+5).map(function(t){return '<div class="row-set"><div class="tx-n"><span class="tx-ic">'+svg(t.i)+'</span><div><b>'+t.n+'</b><small>'+txDate(t)+'</small></div></div><b class="amt" style="font-variant-numeric:tabular-nums">'+amt(t.a)+'</b></div>'}).join('');
      var del=confirmDel?'<span style="font-size:13px;color:var(--fg2)">کارت «'+c.n+'» حذف شود؟</span><button class="btn danger" type="button" data-delok>بله، حذف شود</button><button class="btn ghost" type="button" data-delno>انصراف</button>':'<button class="btn ghost danger" type="button" data-del>حذف کارت</button>';
      root.innerHTML=(adding?formHtml():'')+grid(rz)+
        '<section class="grid2"><article class="card glass'+rz+'" style="--i:4"><div class="head"><div><h2>'+c.n+'</h2><p>کارت '+c.t+' · •••• '+c.no+' · انقضا '+c.exp+'</p></div>'+(c.frz?pill('pend','مسدود موقت'):pill('ok','فعال'))+'</div>'+
        '<div class="big">'+fa(c.bal,1)+'<small>میلیون تومان موجودی</small></div>'+
        '<div style="margin:18px 0 6px;display:flex;justify-content:space-between;font-size:13px;color:var(--fg2)"><span>خرج این ماه از سقف '+fa(c.lim)+' میلیون</span><b style="color:var(--fg)">'+fa(pct,0)+'٪</b></div>'+
        '<div class="pbar"><span class="'+stc+'" style="width:'+Math.min(100,pct)+'%"></span></div>'+
        '<div style="margin:22px 0 4px;display:flex;justify-content:space-between;font-size:13px;color:var(--fg2)"><label for="c-day-r">سقف خرج روزانه</label><b id="c-day" style="color:var(--fg)">'+fa(c.day)+' میلیون تومان</b></div>'+
        '<input type="range" id="c-day-r" data-day min="5" max="100" step="5" value="'+c.day+'" aria-label="سقف خرج روزانه">'+
        '<div style="margin-top:10px">'+tgl('on','پرداخت اینترنتی','خرید از فروشگاه‌های آنلاین',c.on)+tgl('intl','پرداخت خارجی','تراکنش در خارج از کشور',c.intl)+tgl('tap','پرداخت بدون تماس','NFC و کیف پول موبایل',c.tap)+tgl('frz','مسدودسازی موقت','تا زمان فعال‌سازی دوباره، همه تراکنش‌ها رد می‌شوند',c.frz)+'</div>'+
        '<div style="margin-top:16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">'+del+'</div></article>'+
        '<article class="card glass'+rz+'" style="--i:5"><div class="head"><div><h2>فعالیت اخیر</h2><p>آخرین تراکنش‌های '+c.n+'</p></div></div>'+act+'</article></section>';
      first=false;
    }
    root.addEventListener('click',function(e){
      var b=e.target.closest('[data-card],[data-tg],[data-add],[data-cancel],[data-del],[data-delok],[data-delno]');if(!b)return;var f;
      if(b.dataset.card!=null){sel=+b.dataset.card;confirmDel=false;f='[data-card="'+sel+'"]';draw()}
      else if(b.dataset.add!=null){adding=true;f='#c-no';draw()}
      else if(b.dataset.cancel!=null){adding=false;f='[data-add]';draw()}
      else if(b.dataset.del!=null){confirmDel=true;f='[data-delok]';draw()}
      else if(b.dataset.delno!=null){confirmDel=false;f='[data-del]';draw()}
      else if(b.dataset.delok!=null){
        var gone=CARDS.splice(sel,1)[0];sel=Math.max(0,Math.min(sel,CARDS.length-1));confirmDel=false;f=CARDS.length?'[data-card="'+sel+'"]':'[data-add]';draw();toast('کارت «'+gone.n+'» حذف شد')}
      else{var c=CARDS[sel],k=b.dataset.tg;c[k]=!c[k];f='[data-tg="'+k+'"]';draw();toast(k==='frz'?(c.frz?'کارت موقتاً مسدود شد':'کارت دوباره فعال شد'):'تنظیم ذخیره شد')}
      var el=f&&$(f,root);if(el)el.focus();
    });
    root.addEventListener('input',function(e){var t=e.target,d;
      if(t.id==='c-no'){d=en(t.value).replace(/\D/g,'').slice(0,16);t.value=d.replace(/(\d{4})(?=\d)/g,'$1 ')}
      else if(t.id==='c-exp'){d=en(t.value).replace(/\D/g,'').slice(0,4);t.value=d.length>2?d.slice(0,2)+'/'+d.slice(2):d}
      else if(t.dataset.day!=null){CARDS[sel].day=+t.value;$('#c-day',root).textContent=fa(t.value)+' میلیون تومان'}});
    root.addEventListener('submit',function(e){
      if(e.target.id!=='c-form')return;e.preventDefault();
      var err=$('#c-err',root),no=en($('#c-no').value).replace(/\D/g,''),ex=en($('#c-exp').value).split('/'),mm=parseInt(ex[1],10),yy=ex[0]||'',jn=jNow();
      function bad(m,id){err.textContent=m;var el=id&&$(id,root);if(el)el.focus()}
      if(CARDS.length>=MAX){bad('سقف تعداد کارت‌ها '+fa(MAX)+' عدد است.');return}
      if(no.length!==16){bad('شماره کارت باید ۱۶ رقم باشد.','#c-no');return}
      if(!(mm>=1&&mm<=12)||!/^\d\d$/.test(yy)){bad('تاریخ انقضا را به شکل سال/ماه وارد کنید؛ مثل 09/08.','#c-exp');return}
      var fy=1400+parseInt(yy,10);
      if(fy<jn.y||(fy===jn.y&&mm<jn.m)){bad('این کارت منقضی شده است.','#c-exp');return}
      var type=$('#c-type').value,nm=clean($('#c-name').value)||('کارت '+type);
      CARDS.push({n:nm,t:type,no:pd(no.slice(-4)),bal:0,lim:20,sp:0,cl:['','c2','c3'][CARDS.length%3],exp:pd(yy)+'/'+pd(('0'+mm).slice(-2)),f:1,frz:false,on:true,intl:false,tap:true,day:10});
      sel=CARDS.length-1;adding=false;confirmDel=false;draw();
      toast(CARDS.length>=MAX?'کارت اضافه شد. سقف تعداد کارت‌ها '+fa(MAX)+' عدد است.':'کارت جدید اضافه شد');
      var el=$('[data-card="'+sel+'"]',root);if(el)el.focus();
    });
    draw();
  }

  /* ----- بودجه ----- */
  function monthSpent(cat){var k=jKey(Date.now()),s=0;U.tx.forEach(function(t){if(t.s==='ok'&&t.a<0&&t.c===cat&&jKey(t.ts)===k)s-=t.a});return r4(s)}
  function bSpent(b){return U.real?monthSpent(b.n):b.s}
  function monthlyExp(n){
    var k=jKey(Date.now()),arr=[],lab=[],i;
    for(i=0;i<n;i++){arr.push(0);lab.push(MONTHS[(k-n+1+i)%12])}
    U.tx.forEach(function(t){if(t.s!=='ok'||t.a>=0)return;var j=jKey(t.ts)-(k-n+1);if(j>=0&&j<n)arr[j]-=t.a});
    return {labels:lab,act:arr.map(r4)};
  }
  function rerender(id){var n=views[id].cloneNode(false);views[id].replaceWith(n);views[id]=n;rendered[id]=0;VIEWR[id](n);rendered[id]=1;n.hidden=false;revealIn(n)}
  function pageBudget(root){
    var real=U.real,B=U.budget;
    var STX={ok:['ok','در محدوده'],warn:['pend','نزدیک سقف'],over:['fail','از سقف گذشته']};
    function st(b){var s=bSpent(b),p=b.l>0?s/b.l*100:(s>0?999:0);return p>=100?'over':p>=85?'warn':'ok'}
    var cats=[];U.tx.forEach(function(t){if(t.a<0&&cats.indexOf(t.c)<0)cats.push(t.c)});
    var rows=B.map(function(b,i){return '<tr><td><b>'+b.n+'</b></td><td class="num" id="bsp'+i+'"></td><td style="min-width:150px"><div class="pbar"><span id="bp'+i+'"></span></div><small id="bq'+i+'" style="color:var(--fg3);font-size:11.5px"></small></td><td id="bs'+i+'"></td><td class="num"><input class="inp lim" type="number" inputmode="decimal" min="0" step="any" data-i="'+i+'" value="'+b.l+'" aria-label="سقف '+b.n+'" style="width:92px;height:34px"></td>'+(real?'<td><button class="link-btn" type="button" data-bdel="'+i+'">حذف</button></td>':'')+'</tr>'}).join('');
    var form=real?'<article class="card glass rise" style="--i:2"><div class="head" style="margin-bottom:10px"><div><h2>افزودن دسته بودجه</h2><p>سقف ماهانه هر دسته را تعیین کنید؛ خرج این ماه از تراکنش‌ها محاسبه می‌شود</p></div></div><form id="b-form" class="form" novalidate><div class="field"><label for="b-name">نام دسته</label><input class="inp" id="b-name" list="b-cats" maxlength="30" autocomplete="off"><datalist id="b-cats">'+cats.map(function(c){return '<option value="'+c+'">'}).join('')+'</datalist></div><div class="field"><label for="b-lim">سقف ماهانه (میلیون تومان)</label><input class="inp" id="b-lim" inputmode="decimal" autocomplete="off" placeholder="مثلاً 5"></div><div class="full"><div id="b-err" role="alert" style="color:var(--bad);font-size:13px;min-height:20px"></div><button class="btn" type="submit">افزودن دسته</button></div></form></article>':'';
    root.innerHTML='<section class="grid3" id="b-tiles"></section>'+form+
      '<section class="grid2"><article class="card glass rise" style="--i:3"><div class="head"><div><h2>بودجه هر دسته</h2><p>سقف‌ها را ویرایش کنید؛ وضعیت همان لحظه به‌روز می‌شود</p></div></div><div class="tbl"><table><thead><tr><th>دسته</th><th class="num">خرج‌شده</th><th>مصرف</th><th>وضعیت</th><th class="num">سقف (م.ت)</th>'+(real?'<th></th>':'')+'</tr></thead><tbody>'+(rows||'<tr><td colspan="6" style="text-align:center;color:var(--fg3);padding:26px">هنوز دسته‌ای تعریف نشده است. از فرم بالا اولین دسته بودجه را اضافه کنید.</td></tr>')+'</tbody></table></div></article>'+
      '<div class="stack-v"><article class="card glass rise" style="--i:4"><div class="head"><div><h2>شش ماه اخیر</h2><p>خرج واقعی در برابر سقف بودجه</p></div><div class="legend"><span><i style="background:var(--s1)"></i>خرج واقعی</span><span><i style="background:var(--s2);height:4px;border-radius:2px"></i>سقف</span></div></div><div id="b-chart">'+CHARTBOX+'</div></article>'+
      '<article class="card glass rise" style="--i:5"><div class="head" style="margin-bottom:8px"><div><h2>هشدارها</h2></div></div><div id="b-alerts"></div></article></div></section>';
    function upd(){
      var L=0,Sp=0,al='';setTimeout(setSideBudget,0);
      B.forEach(function(b,i){
        var s=bSpent(b),p=b.l>0?s/b.l*100:(s>0?100:0),k=st(b);L+=b.l;Sp+=s;
        var bar=$('#bp'+i);bar.style.width=Math.min(100,p)+'%';bar.className=k==='ok'?'':k;
        $('#bsp'+i).textContent=fa(s,1);$('#bq'+i).textContent=fa(p,0)+'٪ از سقف';$('#bs'+i).innerHTML=pill(STX[k][0],STX[k][1]);
        if(k!=='ok')al+='<div class="row-set"><div>'+b.n+'<small>'+fa(p,0)+'٪ از سقف مصرف شده است</small></div>'+pill(STX[k][0],STX[k][1])+'</div>';
      });
      var rem=L-Sp;
      $('#b-tiles').innerHTML=tile(-1,'سقف کل بودجه','--s1',fa(L,1),'م.ت','مجموع سقف همه دسته‌ها')+tile(-1,'خرج‌شده','--s2',fa(Sp,1),'م.ت',fa(L?Sp/L*100:0,0)+'٪ از سقف')+tile(-1,rem>=0?'باقی‌مانده':'اضافه‌خرج','--s3',fa(Math.abs(rem),1),'م.ت',rem>=0?'تا پایان ماه':'بیش از سقف کل');
      $('#b-alerts').innerHTML=al||'<div class="row-set"><div>'+(B.length?'همه دسته‌ها در محدوده‌اند':'هنوز دسته‌ای تعریف نشده')+'<small>'+(B.length?'هشداری وجود ندارد':'بعد از تعریف بودجه، هشدارها اینجا می‌آیند')+'</small></div>'+(B.length?pill('ok','عالی'):'')+'</div>';
    }
    root.addEventListener('input',function(e){if(e.target.dataset.i==null)return;B[+e.target.dataset.i].l=Math.max(0,parseFloat(en(e.target.value))||0);upd()});
    root.addEventListener('click',function(e){var b=e.target.closest('[data-bdel]');if(!b)return;B.splice(+b.dataset.bdel,1);rerender('budget');toast('دسته بودجه حذف شد')});
    root.addEventListener('submit',function(e){
      if(e.target.id!=='b-form')return;e.preventDefault();
      var nm=clean($('#b-name').value),lim=parseFloat(en($('#b-lim').value)),err=$('#b-err');
      if(nm.length<2){err.textContent='نام دسته را وارد کنید.';$('#b-name').focus();return}
      if(!(lim>0)){err.textContent='سقف را به‌صورت عدد مثبت وارد کنید.';$('#b-lim').focus();return}
      if(B.some(function(x){return x.n===nm})){err.textContent='این دسته قبلاً اضافه شده است.';$('#b-name').focus();return}
      B.push({n:nm,l:r6(lim)});rerender('budget');toast('دسته بودجه اضافه شد');
    });
    upd();
    var hist=real?monthlyExp(6):{labels:['خرداد','تیر','مرداد','شهریور','مهر','آبان'],act:U.bh.act};
    var totL=B.reduce(function(a,b){return a+b.l},0),line=real?(B.length?hist.act.map(function(){return totL}):null):U.bh.line;
    barChart($('#b-chart .chart-wrap',root),hist.labels,hist.act,{color:'--s1',line:line,names:['خرج واقعی','سقف بودجه']});
  }

  /* ----- گزارش‌ها ----- */
  function reportCats(Q,D){
    if(!U.real){var QP=[[41,26,19,14],[40,27,19,14],[42,25,19,14],[40,26,20,14]];return {names:CATS.map(function(c){return c.n}),vals:CATS.map(function(c,ci){return Q.map(function(q,qi){return q.exp*QP[qi][ci]/100})})}}
    var k0=jKey(Date.now())-11,map={};
    U.tx.forEach(function(t){if(t.s!=='ok'||t.a>=0)return;var i=jKey(t.ts)-k0;if(i<0||i>11)return;var q=Math.floor(i/3);(map[t.c]=map[t.c]||[0,0,0,0])[q]-=t.a});
    var arr=Object.keys(map).map(function(n){return {n:n,q:map[n],t:sum(map[n])}}).sort(function(a,b){return b.t-a.t});
    var top=arr.length>4?arr.slice(0,3):arr,rest=arr.length>4?arr.slice(3):[];
    var names=top.map(function(c){return c.n}),vals=top.map(function(c){return c.q});
    if(rest.length){names.push('سایر');vals.push([0,1,2,3].map(function(q){return sum(rest.map(function(c){return c.q[q]}))}))}
    return {names:names,vals:vals};
  }
  function pageReports(root){
    var real=U.real;
    if(real&&!U.tx.length){
      root.innerHTML='<article class="card glass rise" style="--i:0"><div class="head" style="margin:0"><div><h2>هنوز داده‌ای برای گزارش نیست</h2><p>با ثبت یا وارد کردن تراکنش‌ها، سود خالص، روند و صورت سود و زیان اینجا ساخته می‌شود.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="add-tx" type="button">+ افزودن تراکنش</button><button class="btn ghost" data-act="import" type="button">وارد کردن صورت‌حساب</button></div></div></article>';
      return;
    }
    var D=DATA[365],L=D.labels,net=D.inc.map(function(v,i){return v-D.exp[i]});
    var Q=[0,1,2,3].map(function(q){var i=q*3;return {inc:sum(D.inc.slice(i,i+3)),exp:sum(D.exp.slice(i,i+3))}});
    var QN=real?[0,1,2,3].map(function(q){return L[q*3]+'–'+L[q*3+2]}):['بهار','تابستان','پاییز','زمستان'];
    var totInc=sum(D.inc),totExp=sum(D.exp),totNet=totInc-totExp,best=net.indexOf(Math.max.apply(null,net)),worstExp=D.exp.indexOf(Math.max.apply(null,D.exp));
    var growth=D.inc[0]>0?(D.inc[11]/D.inc[0]-1)*100:null,mg=function(q){return q.inc>0?(q.inc-q.exp)/q.inc*100:null},m1=mg(Q[0]),m4=mg(Q[3]);
    var CR=reportCats(Q,D);
    function row(l,vals,tot,b){return '<tr'+(b?' style="font-weight:700"':'')+'><td>'+l+'</td>'+vals.map(function(v){return '<td class="num">'+v+'</td>'}).join('')+'<td class="num"><b>'+tot+'</b></td></tr>'}
    var tb=row('درآمد کل',Q.map(function(q){return fa(q.inc,0)}),fa(totInc,0),1);
    CR.names.forEach(function(n,ci){tb+=row('— '+n,CR.vals[ci].map(function(v){return fa(v,0)}),fa(sum(CR.vals[ci]),0))});
    tb+=row('هزینه کل',Q.map(function(q){return fa(q.exp,0)}),fa(totExp,0),1)+row('سود خالص',Q.map(function(q){return fa(q.inc-q.exp,0)}),fa(totNet,0),1)+
      row('حاشیه سود',Q.map(function(q){var m=mg(q);return m==null?'—':fa(m,1)+'٪'}),totInc>0?fa(totNet/totInc*100,1)+'٪':'—');
    var topShare=totExp>0?sum(CR.vals[0])/totExp*100:0,ins='';
    if(D.inc[0]>0)ins+='<li><span>'+svg('up')+'</span><div>درآمد از <b>'+fa(D.inc[0],0)+'</b> میلیون در '+L[0]+' به <b>'+fa(D.inc[11],0)+'</b> میلیون در '+L[11]+' رسیده است.</div></li>';
    else ins+='<li><span>'+svg('up')+'</span><div>درآمد ثبت‌شده در این بازه: <b>'+fa(totInc,1)+'</b> میلیون تومان.</div></li>';
    if(totExp>0)ins+='<li><span>'+svg('pie')+'</span><div>بیشترین هزینه ماهانه در <b>'+L[worstExp]+'</b> بوده: '+fa(D.exp[worstExp],1)+' میلیون تومان.</div></li>';
    if(m1!=null&&m4!=null)ins+='<li><span>'+svg(m4>=m1?'up':'down')+'</span><div>حاشیه سود از <b>'+fa(m1,1)+'٪</b> در '+QN[0]+' به <b>'+fa(m4,1)+'٪</b> در '+QN[3]+' '+(m4>=m1?'بهتر':'کمتر')+' شده است.</div></li>';
    if(totExp>0)ins+='<li><span>'+svg('home')+'</span><div><b>'+CR.names[0]+'</b> حدود <b>'+fa(topShare,0)+'٪</b> از کل هزینه‌ها را می‌گیرد.</div></li>';
    root.innerHTML='<section class="kpis">'+tile(0,'سود خالص بازه','--s3',fa(totNet,0),'م.ت',totInc>0?'حاشیه '+fa(totNet/totInc*100,1)+'٪':'بدون درآمد ثبت‌شده')+tile(1,'بهترین ماه','--s1',L[best],'','سود '+fa(net[best],1)+' میلیون تومان')+tile(2,'میانگین پس‌انداز ماهانه','--s3',fa(totNet/12,1),'م.ت','در هر ماه')+tile(3,'رشد درآمد','--s1',growth==null?'—':fa(growth,1)+'٪','',growth==null?'مبنای مقایسه ندارد':L[11]+' نسبت به '+L[0])+'</section>'+
      '<section class="grid2"><article class="card glass rise" style="--i:4"><div class="head"><div><h2>سود خالص</h2><p>درآمد منهای هزینه، میلیون تومان</p></div><div class="seg" id="r-seg" role="group" aria-label="دوره"><button data-m="m" aria-pressed="true">ماهانه</button><button data-m="q" aria-pressed="false">فصلی</button></div></div><div id="r-chart">'+CHARTBOX+'</div></article>'+
      '<article class="card glass rise" style="--i:5"><div class="head" style="margin-bottom:12px"><div><h2>نکات کلیدی</h2><p>برداشت از داده‌های ۱۲ ماه</p></div></div><ul class="ins">'+ins+'</ul></article></section>'+
      '<article class="card glass rise" style="--i:6"><div class="head"><div><h2>صورت سود و زیان</h2><p>به تفکیک سه‌ماهه، میلیون تومان</p></div></div><div class="tbl"><table><thead><tr><th>شرح</th>'+QN.map(function(q){return '<th class="num">'+q+'</th>'}).join('')+'<th class="num">جمع</th></tr></thead><tbody>'+tb+'</tbody></table></div></article>';
    var ch=null;
    function chart(m){
      if(ch)ch.stop();var box=$('#r-chart',root);box.innerHTML=CHARTBOX;
      ch=m==='m'?barChart($('.chart-wrap',box),L,net,{color:'--s3',names:['سود خالص']}):barChart($('.chart-wrap',box),QN,Q.map(function(q){return q.inc-q.exp}),{color:'--s3',names:['سود خالص']});
    }
    $('#r-seg',root).addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      document.querySelectorAll('#r-seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});chart(b.dataset.m)});
    chart('m');
  }

  /* ----- تنظیمات ----- */
  function themePref(){try{return localStorage.getItem('avin-theme')||'system'}catch(e){return 'system'}}
  function setTheme(m){
    if(m==='system'){document.documentElement.removeAttribute('data-theme');try{localStorage.removeItem('avin-theme')}catch(e){}}
    else{document.documentElement.setAttribute('data-theme',m);try{localStorage.setItem('avin-theme',m)}catch(e){}}
  }
  function syncTheme(){var p=themePref();document.querySelectorAll('#p-theme button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.m===p)})}
  $('#theme').addEventListener('click',function(){setTimeout(syncTheme,0)});
  function storeText(){
    if(!U.real)return 'حساب نمونه ذخیره نمی‌شود؛ هر بار که صفحه را باز کنید به حالت اولیه برمی‌گردد.';
    if(store.err==='ls')return 'ذخیره‌سازی در این مرورگر در دسترس نیست؛ داده‌ها فقط تا بستن صفحه می‌مانند.';
    if(store.mode==='db')return 'داده‌های این کاربر در فضای خصوصی حساب شما ذخیره می‌شود و بین دستگاه‌ها همگام است.';
    if(store.mode==='local')return 'داده‌های این کاربر فقط در همین مرورگر ذخیره می‌شود (روی دستگاه دیگر دیده نمی‌شود).';
    return 'در حال آماده‌سازی ذخیره‌سازی…';
  }

  /* devices: current device from userAgent, city from IP (best effort) */
  var CITY_FA={Tehran:'تهران',Isfahan:'اصفهان',Esfahan:'اصفهان',Mashhad:'مشهد',Shiraz:'شیراز',Tabriz:'تبریز',Karaj:'کرج',Qom:'قم',Ahvaz:'اهواز',Kermanshah:'کرمانشاه',Urmia:'ارومیه',Rasht:'رشت',Yazd:'یزد',Zahedan:'زاهدان',Hamadan:'همدان',Kerman:'کرمان',Arak:'اراک',Ardabil:'اردبیل',Bandar_Abbas:'بندرعباس','Bandar Abbas':'بندرعباس',Sari:'ساری',Qazvin:'قزوین',Zanjan:'زنجان',Gorgan:'گرگان',Sanandaj:'سنندج',Bushehr:'بوشهر',Birjand:'بیرجند'};
  var curCity='';
  function devName(){var u=navigator.userAgent||'',os=/Windows/.test(u)?'ویندوز':/Android/.test(u)?'اندروید':/iPhone|iPad|iPod/.test(u)?'iOS':/Mac OS X|Macintosh/.test(u)?'مک':/Linux|X11/.test(u)?'لینوکس':'دستگاه',
      br=/Edg\//.test(u)?'Edge':/OPR\//.test(u)?'Opera':/Firefox\//.test(u)?'Firefox':/Chrome\/|CriOS/.test(u)?'Chrome':/Safari\//.test(u)?'Safari':'مرورگر';return br+' روی '+os}
  function agoFa(ts){var m=Math.round((Date.now()-ts)/6e4);if(m<2)return 'اکنون فعال';if(m<60)return fa(m)+' دقیقه پیش';var h=Math.round(m/60);if(h<24)return fa(h)+' ساعت پیش';return fa(Math.round(h/24))+' روز پیش'}
  function trackDevice(P){
    var k=devName(),dv=(P.dv=P.dv||[]),cur=dv.filter(function(d){return d.k===k})[0];
    if(cur)dv.splice(dv.indexOf(cur),1);else cur={k:k,c:''};
    cur.ts=Date.now();if(curCity)cur.c=curCity;dv.unshift(cur);if(dv.length>6)dv.length=6;
    P.sess=dv.map(function(d,i){return [d.k+(d.c?' · '+d.c:''),i===0?'دستگاه فعلی · اکنون فعال':agoFa(d.ts)]});
  }
  function lookupCity(done){
    if(curCity)return done();
    var ac=window.AbortController?new AbortController():null,t=setTimeout(function(){ac&&ac.abort()},4000);
    fetch('https://ipapi.co/json/',ac?{signal:ac.signal}:{}).then(function(r){return r.json()}).then(function(j){
      var c=(j&&j.city)||'';curCity=CITY_FA[c]||c;
    }).catch(function(){}).then(function(){clearTimeout(t);done()});
  }
  function pagePrefs(root){
    var P=U.pf,N=P.N,twofa=P.twofa,sess=P.sess,real=U.real,delArm=false;
    if(real){trackDevice(P);sess=P.sess}
    function sessHtml(){return sess.map(function(s,i){return '<div class="sess"><span class="tx-ic">'+svg('card')+'</span><div style="flex:1"><b>'+s[0]+'</b><small>'+s[1]+'</small></div>'+(i===0?pill('ok','فعلی'):'')+'</div>'}).join('')}
    root.innerHTML='<div class="cols2"><div class="stack-v">'+
      '<article class="card glass rise" style="--i:0"><div class="head"><div><h2>پروفایل</h2><p>اطلاعات نمایش‌داده‌شده در آوین</p></div></div><form id="p-form" class="form"><div class="field"><label for="p-name">نام و نام خانوادگی</label><input class="inp" id="p-name" maxlength="30" value="'+U.name+'" required></div><div class="field"><label for="p-role">عنوان حساب</label><input class="inp" id="p-role" maxlength="30" value="'+U.role+'"></div>'+
      (real?'<div class="field full"><label for="p-bal0">موجودی اولیه حساب (میلیون تومان)</label><input class="inp" id="p-bal0" inputmode="decimal" autocomplete="off" value="'+U.bal0+'"></div>':'')+
      '<div class="full"><button class="btn" type="submit">ذخیره تغییرات</button></div></form></article>'+
      '<article class="card glass rise" style="--i:1"><div class="head"><div><h2>ظاهر</h2><p>حالت نمایش برنامه</p></div><div class="seg" id="p-theme" role="group" aria-label="حالت نمایش"><button data-m="system" aria-pressed="false">سیستم</button><button data-m="light" aria-pressed="false">روشن</button><button data-m="dark" aria-pressed="false">تیره</button></div></div><p style="margin:0;color:var(--fg3);font-size:13px">حالت «سیستم» از تنظیم دستگاه شما پیروی می‌کند.</p></article>'+
      '<article class="card glass rise" style="--i:2"><div class="head" style="margin-bottom:8px"><div><h2>ذخیره‌سازی</h2></div></div><p id="p-store" style="margin:0;color:var(--fg2);font-size:13.5px;line-height:1.9">'+storeText()+'</p></article></div>'+
      '<div class="stack-v"><article class="card glass rise" style="--i:3"><div class="head" style="margin-bottom:4px"><div><h2>اعلان‌ها</h2></div></div><div id="p-notif"></div></article>'+
      '<article class="card glass rise" style="--i:4"><div class="head" style="margin-bottom:4px"><div><h2>امنیت</h2></div></div><div id="p-sec"></div></article>'+
      (real?'<article class="card glass rise" style="--i:5"><div class="head" style="margin-bottom:8px"><div><h2>حذف کاربر</h2><p>همه تراکنش‌ها، کارت‌ها و تنظیمات این کاربر برای همیشه پاک می‌شود.</p></div></div><button class="btn ghost danger" type="button" id="p-deluser">حذف این کاربر</button></article>':'')+'</div></div>';
    function nHtml(){$('#p-notif').innerHTML=tgl('budget','هشدار سقف بودجه','وقتی یک دسته به ۸۵٪ سقف رسید',N.budget)+tgl('big','تراکنش‌های بالای ۱۰ میلیون','اعلان فوری برای مبالغ بزرگ',N.big)+tgl('weekly','خلاصه هفتگی','هر شنبه صبح',N.weekly)+tgl('news','اخبار و بروزرسانی‌ها','حداکثر ماهی یک‌بار',N.news)}
    function sHtml(){$('#p-sec').innerHTML=tgl('twofa','ورود دومرحله‌ای','نمایشی؛ در نسخهٔ واقعی به سرور نیاز دارد',twofa)+'<div style="margin-top:8px"><b style="font-size:13px">دستگاه‌های وارد شده</b>'+sessHtml()+'</div>'+(sess.length>1?'<button class="btn ghost" type="button" id="p-out" style="margin-top:12px">خروج از سایر دستگاه‌ها</button>':'')}
    nHtml();sHtml();syncTheme();
    if(real)lookupCity(function(){if(!curCity||!document.body.contains(root))return;trackDevice(P);sess=P.sess;sHtml()});
    $('#p-form').addEventListener('submit',function(e){e.preventDefault();
      U.name=clean($('#p-name').value)||U.name;U.role=clean($('#p-role').value)||U.role;
      var needReload=false;
      if(real){var b=parseFloat(en($('#p-bal0').value));if(!isNaN(b)&&b!==U.bal0){U.bal0=b;needReload=true}}
      setUserUI();renderDashCard();toast('تغییرات ذخیره شد');
      if(needReload)reloadAll(false);
    });
    $('#p-theme').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;setTheme(b.dataset.m);syncTheme()});
    root.addEventListener('click',function(e){
      var b=e.target.closest('[data-tg]'),o=e.target.closest('#p-out'),dl=e.target.closest('#p-deluser');
      if(b){var k=b.dataset.tg;if(k==='twofa'){twofa=P.twofa=!twofa;sHtml();toast(twofa?'ورود دومرحله‌ای فعال شد':'ورود دومرحله‌ای غیرفعال شد')}else{N[k]=!N[k];nHtml();toast('تنظیم اعلان ذخیره شد')}
        var el=$('[data-tg="'+k+'"]',root);if(el)el.focus()}
      else if(o){if(real)P.dv=P.dv.slice(0,1);sess=P.sess=sess.slice(0,1);sHtml();toast('از سایر دستگاه‌ها خارج شدید')}
      else if(dl){
        if(!delArm){delArm=true;dl.textContent='مطمئن هستید؟ برای حذف دوباره بزنید';dl.classList.remove('ghost');dl.classList.add('danger')}
        else{var gone=U;users=users.filter(function(u){return u!==gone});switchUser(users[0],true);toast('کاربر «'+gone.name+'» حذف شد')}
      }
    });
  }

  /* ----- users ----- */
  var clean=function(s){return String(s).replace(/[<>&"'`]/g,'').replace(/\s+/g,' ').trim()};
  var DATA0=DATA,GOALS0=GOALS,uidN=0,dashDate=dashSub.split(' · ')[0];
  var SEED_B=[{n:'مسکن و اجاره',l:60,s:54},{n:'خوراک و خرید',l:30,s:33},{n:'حمل‌ونقل',l:15,s:10.5},{n:'نرم‌افزار و ابزار',l:12,s:9.6},{n:'بازاریابی',l:20,s:18.5},{n:'سلامت و بیمه',l:10,s:4},{n:'تفریح و سفر',l:8,s:7.2}];
  var BASE_BH={act:[118,121,115,130,126,136.8],line:[140,140,145,150,150,155]};
  function newPrefs(){return {N:{budget:true,big:true,weekly:false,news:false},twofa:false,sess:[['این دستگاه · تهران','دستگاه فعلی · اکنون فعال']]}}
  var users=[{id:'u1',main:true,real:false,name:'نیما کاظمی',role:'حساب نمونه',bal0:2200,data:DATA0,tx:BASE_TX,goals:GOALS0,budget:JSON.parse(JSON.stringify(SEED_B)),bh:{act:BASE_BH.act.slice(),line:BASE_BH.line.slice()},cards:defCards(),
    pf:{N:{budget:true,big:true,weekly:false,news:false},twofa:true,sess:[['مک‌بوک پرو · تهران','دستگاه فعلی · اکنون فعال'],['آیفون · تهران','۲ ساعت پیش'],['ویندوز · اصفهان','۳ روز پیش']]}}];
  U=users[0];
  function makeReal(name,role){uidN++;return {id:'r'+Date.now().toString(36)+uidN+Math.floor(Math.random()*1e4).toString(36),main:false,real:true,name:name,role:role,bal0:0,tx:[],goals:[],budget:[],cards:[],pf:newPrefs(),data:null}}

  /* real-data engine: every number on a real user's pages is computed from U.tx */
  function winCfg(){
    var today=sod(Date.now()),k0=jKey(Date.now())-11;
    return {today:today,k0:k0,7:{n:7,plen:7,loc:function(ts){return Math.floor((sod(ts)-(today-6*DAY))/DAY)}},
      30:{n:10,plen:10,loc:function(ts){return Math.floor((sod(ts)-(today-29*DAY))/(3*DAY))}},
      365:{n:12,plen:12,loc:function(ts){return jKey(ts)-k0}}};
  }
  function buildData(u){
    var tx=u.tx.filter(function(t){return t.s==='ok'}),W=winCfg(),res={};
    [7,30,365].forEach(function(p){
      var c=W[p],inc=[],exp=[],pi=0,pe=0,pre=0,i;for(i=0;i<c.n;i++){inc.push(0);exp.push(0)}
      tx.forEach(function(t){var j=c.loc(t.ts);if(j>=c.n)return;
        if(j<0)pre+=t.a;
        if(j>=0){if(t.a>0)inc[j]+=t.a;else exp[j]-=t.a}
        else if(j>=-c.plen){if(t.a>0)pi+=t.a;else pe-=t.a}});
      var labels=[];
      for(i=0;i<c.n;i++){
        if(p===7)labels.push(new Intl.DateTimeFormat('fa-IR',{weekday:'long'}).format(new Date(W.today-(6-i)*DAY)));
        else if(p===30){var jp=jParts(W.today-(29-3*i-2)*DAY);labels.push(pd(jp.d)+' '+MONTHS[jp.m-1])}
        else labels.push(MONTHS[(W.k0+i)%12]);
      }
      var si=sum(inc),se=sum(exp);
      res[p]={labels:labels,inc:inc.map(r4),exp:exp.map(r4),dInc:pi>0?(si/pi-1)*100:null,dExp:pe>0?(se/pe-1)*100:null,pre:r4(pre),
        sub:'میلیون تومان · '+(p===7?'روزانه، ۷ روز گذشته':p===30?'هر سه روز، ۳۰ روز گذشته':'ماهانه، ۱۲ ماه گذشته')};
    });
    return res;
  }
  function rebuild(u){if(u.real){u.tx.sort(function(a,b){return b.ts-a.ts});u.data=buildData(u)}}
  function catsFor(p){
    if(!U.real)return CATS;
    var c=winCfg()[p],map={},tot=0;
    U.tx.forEach(function(t){if(t.s!=='ok'||t.a>=0)return;var j=c.loc(t.ts);if(j<0||j>=c.n)return;map[t.c]=(map[t.c]||0)-t.a;tot-=t.a});
    if(!tot)return [];
    var arr=Object.keys(map).map(function(n){return {n:n,v:map[n]}}).sort(function(a,b){return b.v-a.v});
    var top=arr.length>4?arr.slice(0,3):arr,rest=arr.length>4?arr.slice(3):[],out=top.map(function(x){return {n:x.n,v:x.v}});
    if(rest.length)out.push({n:'سایر',v:sum(rest.map(function(x){return x.v}))});
    return out.map(function(x,i){return {n:x.n,p:x.v/tot*100,c:['--s1','--s2','--s3','--s4'][i]}});
  }

  /* persistence: private per-viewer db documents when available, otherwise this browser */
  var store={mode:'pending',col:null,last:{},snap:'',busy:false,err:''};
  function snapshotDocs(){
    var docs={},ids=[];
    users.forEach(function(u){
      if(!u.real)return;ids.push(u.id);
      var chunks=[],n=800,i;for(i=0;i<u.tx.length;i+=n)chunks.push(u.tx.slice(i,i+n));
      docs['user-'+u.id]={id:u.id,name:u.name,role:u.role,bal0:u.bal0,cards:u.cards,budget:u.budget,goals:u.goals,pf:u.pf,chunks:chunks.length,count:u.tx.length};
      chunks.forEach(function(c,k){docs['txs-'+u.id+'-'+k]={list:c}});
    });
    if(ids.length)docs.meta={ids:ids,cur:U.real?U.id:'',v:1};
    return docs;
  }
  function flush(){
    if(store.mode==='pending'||store.busy)return Promise.resolve();
    store.busy=true;
    var docs=snapshotDocs(),p;
    if(store.mode==='db'){
      p=Promise.resolve();
      Object.keys(docs).forEach(function(id){p=p.then(function(){var js=JSON.stringify(docs[id]);if(store.last[id]===js)return;return store.col.doc(id).set(docs[id]).then(function(){store.last[id]=js})})});
      Object.keys(store.last).forEach(function(id){if(!(id in docs))p=p.then(function(){return store.col.doc(id).delete().then(function(){delete store.last[id]})})});
    }else{
      p=new Promise(function(res){try{if(Object.keys(docs).length||localStorage.getItem('avin-v1'))localStorage.setItem('avin-v1',JSON.stringify(docs));store.err='';}catch(e){store.err='ls'}res()});
    }
    return p.catch(function(){if(store.mode==='db'){store.mode='local';store.last={};store.snap=''}else store.err='ls'}).then(function(){store.busy=false});
  }
  function adopt(docs){
    var meta=docs.meta;if(!meta||!meta.ids)return;
    meta.ids.forEach(function(id){
      var d=docs['user-'+id];if(!d)return;var tx=[],k;
      for(k=0;k<(d.chunks||0);k++){var c=docs['txs-'+id+'-'+k];if(c&&c.list)tx=tx.concat(c.list)}
      var u=makeReal(clean(d.name||'کاربر'),clean(d.role||'حساب شخصی'));
      u.id=d.id;u.bal0=+d.bal0||0;u.tx=tx;u.cards=(d.cards||[]).map(function(c){if(!c.f&&typeof c.exp==='string'){var a=c.exp.split('/');if(a.length===2)c.exp=a[1]+'/'+a[0];c.f=1}return c});u.budget=d.budget||[];u.goals=d.goals||[];u.pf=d.pf||newPrefs();
      rebuild(u);users.push(u);
    });
    var cur=users.filter(function(u){return u.id===meta.cur})[0];
    if(cur)switchUser(cur,true);else renderUMenu();
  }
  function storeInit(){
    var mode='local',col=null;
    function read(){
      if(mode==='db'){
        return Promise.race([col.get(),new Promise(function(_,rej){setTimeout(function(){rej(new Error('timeout'))},9000)})]).then(function(snap){
          var docs={};store.last={};
          snap.docs.forEach(function(d){var o=JSON.parse(JSON.stringify(d.data()));docs[d.id]=o;store.last[d.id]=JSON.stringify(o)});return docs});
      }
      var raw=null;try{raw=localStorage.getItem('avin-v1')}catch(e){}
      return Promise.resolve(raw?JSON.parse(raw):{});
    }
    var setup=Promise.resolve();
    if(window.claude&&window.claude.use){
      setup=Promise.all([window.claude.use('db'),window.claude.use('user')]).then(function(r){
        if(!r[0]||!r[1])return;return r[1].id().then(function(id){if(id){col=r[0].collection('data/users/'+id);mode='db'}})}).catch(function(){});
    }
    setup.then(read).catch(function(){mode='local';store.last={};return read()}).catch(function(){return {}}).then(function(docs){
      store.mode=mode;store.col=col;adopt(docs||{});store.snap=JSON.stringify(snapshotDocs());
      var ps=$('#p-store');if(ps)ps.textContent=storeText();
    });
  }
  setInterval(function(){if(store.mode==='pending')return;var s=JSON.stringify(snapshotDocs());if(s!==store.snap){store.snap=s;flush()}},1500);
  addEventListener('pagehide',function(){if(store.mode==='local'){try{var d=snapshotDocs();if(Object.keys(d).length||localStorage.getItem('avin-v1'))localStorage.setItem('avin-v1',JSON.stringify(d))}catch(e){}}});

  /* shell: header user, banner, dashboard card, side budget */
  function setSideBudget(){
    var L=0,Sp=0;U.budget.forEach(function(b){L+=b.l;Sp+=bSpent(b)});var p=L?Math.round(Sp/L*100):0;
    $('#sb-txt').textContent=L?fa(p)+'٪ از سقف هزینه مصرف شده است':'هنوز بودجه‌ای تعریف نشده است';$('#sb-bar').style.width=Math.min(100,p)+'%';
  }
  function renderDashCard(){
    var c=U.cards[0],box=$('#d-card');
    box.innerHTML=c?'<div class="ccard '+c.cl+(c.frz?' frz':'')+'" aria-label="'+c.n+'"><div class="r1"><div class="chip"></div><small>'+c.n+' · آوین</small></div><div class="no">•••• •••• •••• '+c.no+'</div><div class="r3"><div><small>صاحب کارت</small><b>'+U.name+'</b></div><div><small>انقضا</small><b>'+c.exp+'</b></div></div></div>'
      :'<div class="ccard empty">کارتی ثبت نشده<small><a href="#cards" style="color:var(--accent);font-weight:600;text-decoration:none">افزودن کارت</a></small></div>';
  }
  function renderBanner(){
    var b=$('#d-banner');
    if(!U.real)b.innerHTML='<div class="banner glass"><span>این حساب نمونه است و همه داده‌هایش ساختگی‌اند. برای ثبت داده واقعی، یک کاربر جدید بسازید.</span><button class="btn" type="button" data-act="add-user">+ افزودن کاربر جدید</button></div>';
    else if(!U.tx.length)b.innerHTML='<div class="banner glass ctr"><span>هنوز تراکنشی ثبت نشده است. داشبورد، بودجه و گزارش‌ها از تراکنش‌های شما ساخته می‌شوند.</span><span style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" type="button" data-act="add-tx">+ افزودن تراکنش</button><button class="btn ghost" type="button" data-act="import">وارد کردن صورت‌حساب</button></span></div>';
    else b.innerHTML='';
  }
  function renderUMenu(){
    $('#umenu-list').innerHTML=users.map(function(u){return '<button type="button" role="menuitemradio" aria-checked="'+(u===U)+'" class="uitem" data-u="'+u.id+'"><span class="av">'+u.name.charAt(0)+'</span><span class="ui"><b>'+u.name+'</b><small>'+u.role+(u.main?'':'')+'</small></span>'+(u===U?svg('ok'):'')+'</button>'}).join('');
  }
  function setUserUI(){
    $('#user-btn .av').textContent=U.name.charAt(0);$('#user-btn b').textContent=U.name;$('#user-btn small').textContent=U.role;
    dashSub=dashDate+' · '+(U.main?'حساب نمونه · داده‌های ساختگی':'حساب '+U.name);
    var rid=ROUTES[lastId]?lastId:'dashboard';$('#today').textContent=ROUTES[rid].s||dashSub;
    renderUMenu();
  }
  function resetViews(){Object.keys(views).forEach(function(k){if(k==='dashboard')return;var n=views[k].cloneNode(false);n.hidden=true;views[k].replaceWith(n);views[k]=n});rendered={};pageTx.draw=null}
  function reloadAll(full){
    rebuild(U);DATA=U.data;TX=U.tx.slice(0,6);ALL=U.tx;GOALS=U.goals;
    resetViews();goalForm=false;
    renderKPIs();drawChart(!!full);renderDonut();renderTx();renderGoals();renderDashCard();renderBanner();setSideBudget();setUserUI();renderBell();
    if(full)lastId=null;
    route();
  }
  function switchUser(u,silent){
    U=u;S.q='';$('#q').value='';
    reloadAll(true);
    if(!silent)toast('حساب «'+U.name+'» فعال شد');
  }

  /* modals */
  var lastFocus=null;
  var mDepth=0,pendingBack=0;
  function openM(id,focusSel){lastFocus=document.activeElement;$('#'+id).hidden=false;if(!mDepth){try{history.pushState({avinModal:1},'');mDepth=1}catch(e){}}var f=$(focusSel);if(f)f.focus()}
  function closeModals(fromPop){var any=false;document.querySelectorAll('.modal').forEach(function(m){if(!m.hidden){m.hidden=true;any=true}});if(any&&lastFocus&&lastFocus.focus)lastFocus.focus();
    if(fromPop===true)mDepth=0;else if(mDepth){mDepth=0;pendingBack++;try{history.back()}catch(e){pendingBack--}}}
  addEventListener('popstate',function(){if(pendingBack>0){pendingBack--;return}if(mDepth)closeModals(true)});
  function closeMenu(){$('#umenu').hidden=true;$('#user-btn').setAttribute('aria-expanded','false');closeN()}
  function placeMenu(){
    var m=$('#umenu');if(m.hidden)return;
    var r=$('#user-btn').getBoundingClientRect(),vw=document.documentElement.clientWidth,w=m.offsetWidth,left=r.left;
    if(left+w>vw-16)left=r.right-w;
    left=Math.max(16,Math.min(left,vw-w-16));
    m.style.left=left+'px';m.style.top=Math.max(8,r.bottom+8)+'px';m.style.maxHeight=Math.max(160,innerHeight-r.bottom-24)+'px';
  }
  addEventListener('resize',placeMenu);addEventListener('scroll',placeMenu,{passive:true});
  /* notifications */
  function notifList(){
    var P=U.pf,N=P.N,out=[],now=Date.now();
    if(!U.real)return [
      {id:'s1',c:'var(--warn)',t:'دسته «بازاریابی» به ۹۱٪ سقف بودجه رسیده است',s:'نمونه · این ماه',h:'#budget'},
      {id:'s2',c:'var(--s2)',t:'پرداخت بزرگ: شرکت آریا · ۴۲٫۵ میلیون تومان',s:'نمونه · دیروز',h:'#transactions'},
      {id:'s3',c:'var(--s1)',t:'خلاصه هفتگی شما آماده است',s:'نمونه · شنبه',h:'#reports'}];
    if(!U.tx.length&&!U.budget.length)out.push({id:'w0',c:'var(--s3)',t:'به آوین خوش آمدید',s:'با ثبت اولین تراکنش، اعلان‌ها اینجا ظاهر می‌شوند.',h:'#transactions'});
    if(N.budget)U.budget.forEach(function(b){if(!b.l)return;var p=Math.round(bSpent(b)/b.l*100);if(p<85)return;var over=p>=100;
      out.push({id:'b:'+b.n+':'+jKey(now)+':'+(over?2:1),c:over?'var(--bad)':'var(--warn)',t:over?'دسته «'+b.n+'» از سقف بودجه گذشته است ('+fa(p)+'٪)':'دسته «'+b.n+'» به '+fa(p)+'٪ سقف بودجه رسیده است',s:'این ماه',h:'#budget'})});
    if(N.big){var c=0;U.tx.forEach(function(t){if(c>=5||t.s!=='ok'||Math.abs(t.a)<10||now-t.ts>30*864e5)return;c++;
      out.push({id:'big:'+t.id,c:t.a>0?'var(--good)':'var(--s2)',t:(t.a>0?'واریز بزرگ: ':'پرداخت بزرگ: ')+(t.n||t.c)+' · '+fa(Math.abs(t.a),1)+' میلیون تومان',s:txDate(t),h:'#transactions'})})}
    if(N.weekly&&U.tx.length){var i=0,e=0;U.tx.forEach(function(t){if(t.s==='ok'&&now-t.ts<=7*864e5){if(t.a>0)i+=t.a;else e-=t.a}});
      out.push({id:'w:'+Math.floor(now/(7*864e5)),c:'var(--s1)',t:'خلاصه هفتگی: درآمد '+fa(i,1)+' · هزینه '+fa(e,1)+' میلیون تومان',s:'۷ روز گذشته',h:'#reports'})}
    return out;
  }
  function notifState(){var L=notifList(),seen=U.pf.seen||(U.pf.seen=[]);return {L:L,seen:seen,un:L.filter(function(n){return seen.indexOf(n.id)<0}).length}}
  function renderBell(){var st=notifState(),d=$('#bell .dot');if(d)d.style.display=st.un?'':'none';$('#bell').setAttribute('aria-label',st.un?'اعلان‌ها · '+fa(st.un)+' خوانده‌نشده':'اعلان‌ها');return st}
  function renderNPanel(){
    var st=renderBell();
    $('#nmenu').innerHTML='<div class="nhead"><b>اعلان‌ها</b>'+(st.un?'<button class="link-btn" type="button" id="n-all">علامت‌گذاری همه به‌عنوان خوانده</button>':'')+'</div>'+
      (st.L.length?st.L.map(function(n){var u=st.seen.indexOf(n.id)<0;return '<button type="button" class="nitem'+(u?' unread':'')+'" data-nid="'+n.id+'" data-h="'+n.h+'"><i style="background:'+n.c+'"></i><span><b>'+n.t+'</b><small>'+n.s+'</small></span></button>'}).join(''):'<div class="nempty">اعلان تازه‌ای ندارید.</div>');
  }
  function placeN(){var m=$('#nmenu');if(m.hidden)return;var r=$('#bell').getBoundingClientRect(),vw=document.documentElement.clientWidth,w=m.offsetWidth,left=r.left;
    if(left+w>vw-16)left=r.right-w;left=Math.max(16,Math.min(left,vw-w-16));m.style.left=left+'px';m.style.top=Math.max(8,r.bottom+8)+'px';m.style.maxHeight=Math.max(160,innerHeight-r.bottom-24)+'px'}
  function closeN(){var m=$('#nmenu');if(m)m.hidden=true;var b=$('#bell');if(b)b.setAttribute('aria-expanded','false')}
  addEventListener('resize',placeN);addEventListener('scroll',placeN,{passive:true});
  $('#bell').addEventListener('click',function(e){e.stopPropagation();var o=$('#nmenu').hidden;$('#umenu').hidden=true;$('#user-btn').setAttribute('aria-expanded','false');
    if(o){renderNPanel();$('#nmenu').hidden=false;this.setAttribute('aria-expanded','true');placeN()}else closeN()});
  $('#nmenu').addEventListener('click',function(e){var all=e.target.closest('#n-all'),b=e.target.closest('[data-nid]');
    if(all){var st=notifState();st.L.forEach(function(n){if(st.seen.indexOf(n.id)<0)st.seen.push(n.id)});renderNPanel();return}
    if(b){var sn=notifState().seen;if(sn.indexOf(b.dataset.nid)<0)sn.push(b.dataset.nid);if(sn.length>300)sn.splice(0,sn.length-300);renderBell();closeN();location.hash=b.dataset.h.slice(1)}});
  setInterval(renderBell,2000);setTimeout(renderBell,0);
  $('#user-btn').addEventListener('click',function(e){e.stopPropagation();closeN();var o=$('#umenu').hidden;$('#umenu').hidden=!o;this.setAttribute('aria-expanded',o);if(o)placeMenu()});
  document.addEventListener('click',function(e){if(!e.target.closest('.uwrap,#umenu,#bell,#nmenu'))closeMenu()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();closeModals()}});
  $('#umenu').addEventListener('click',function(e){var b=e.target.closest('.uitem');if(!b)return;
    if(b.id==='u-add'){closeMenu();openUserModal()}
    else{var u=users.filter(function(x){return x.id===b.dataset.u})[0];closeMenu();if(u&&u!==U)switchUser(u)}});
  document.querySelectorAll('.modal').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeModals()})});
  document.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',closeModals)});

  function openUserModal(){$('#um-name').value='';$('#um-err').textContent='';openM('umodal','#um-name')}
  $('#uform').addEventListener('submit',function(e){
    e.preventDefault();var nm=clean($('#um-name').value),err=$('#um-err');
    if(nm.length<2){err.textContent='نام کاربر را وارد کنید (حداقل ۲ حرف).';$('#um-name').focus();return}
    if(users.some(function(u){return u.name===nm})){err.textContent='کاربری با این نام وجود دارد.';$('#um-name').focus();return}
    var u=makeReal(nm,$('#um-role').value);users.push(u);lastFocus=$('#user-btn');closeModals();switchUser(u,true);toast('کاربر «'+nm+'» اضافه شد؛ حساب او خالی است و داده‌ها را خودتان ثبت می‌کنید');
  });

  /* manual transaction */
  var CAT_ICON=[[/اجاره|رهن|مسکن|برق|گاز|قبض/,'home'],[/خوراک|خرید|سوپر|رستوران|کافه|غذا/,'cart'],[/نرم‌افزار|اشتراک|سرور|هاست|دامنه/,'cloud'],[/بازاریابی|تبلیغ/,'mega'],[/درآمد|فروش|قرارداد|پروژه|مشاوره/,'brief']];
  function iconFor(cat,inc){for(var i=0;i<CAT_ICON.length;i++)if(CAT_ICON[i][0].test(cat))return CAT_ICON[i][1];return inc?'brief':'wallet'}
  function newTxId(){return 't'+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36)}
  function openTx(){
    var cats=['حقوق و دستمزد','مسکن','خوراک و خرید','حمل‌ونقل','نرم‌افزار','بازاریابی','سلامت و بیمه','درآمد پروژه'];
    U.tx.forEach(function(t){if(cats.indexOf(t.c)<0)cats.push(t.c)});
    $('#tx-cats').innerHTML=cats.map(function(c){return '<option value="'+c+'">'}).join('');
    var p=jParts(Date.now());$('#tx-date').value=p.y+'/'+('0'+p.m).slice(-2)+'/'+('0'+p.d).slice(-2);
    ['#tx-amt','#tx-cat','#tx-name'].forEach(function(s){$(s).value=''});$('#tx-err').textContent='';$('#tx-st').value='ok';
    document.querySelectorAll('#tx-type button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t==='out')});
    openM('txmodal','#tx-amt');
  }
  $('#tx-type').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;document.querySelectorAll('#tx-type button').forEach(function(x){x.setAttribute('aria-pressed',x===b)})});
  $('#txform').addEventListener('submit',function(e){
    e.preventDefault();var err=$('#tx-err');
    var v=parseFloat(en($('#tx-amt').value).replace(/,/g,'').trim());
    if(!(v>0)){err.textContent='مبلغ را به‌صورت عدد مثبت وارد کنید.';$('#tx-amt').focus();return}
    var a=r6(v*parseFloat($('#tx-unit').value));
    if(!(a>0)){err.textContent='این مبلغ بسیار کوچک است.';$('#tx-amt').focus();return}
    var ts=parseDate($('#tx-date').value);
    if(ts==null){err.textContent='تاریخ را به شکل شمسی وارد کنید؛ مثل 1405/08/10.';$('#tx-date').focus();return}
    var inc=$('#tx-type [aria-pressed="true"]').dataset.t==='in',cat=clean($('#tx-cat').value)||(inc?'درآمد':'سایر'),nm=clean($('#tx-name').value)||cat;
    U.tx.push({id:newTxId(),n:nm,c:cat,a:inc?a:-a,s:$('#tx-st').value,i:iconFor(cat,inc),ts:ts});
    lastFocus=$('#add-tx');closeModals();reloadAll(false);toast('تراکنش ثبت شد');
  });

  /* statement import (CSV / Excel) */
  var IM={rows:[],hrow:0,items:[],bad:0};
  function bufText(buf){try{return new TextDecoder('utf-8',{fatal:true}).decode(buf)}catch(e){try{return new TextDecoder('windows-1256').decode(buf)}catch(e2){return new TextDecoder('utf-8').decode(buf)}}}
  function parseCSV(text){
    text=text.replace(/^﻿/,'');var first=text.split(/\r?\n/)[0]||'';
    var d=[',',';','\t'].map(function(c){return [c,first.split(c).length]}).sort(function(a,b){return b[1]-a[1]})[0][0];
    var rows=[],row=[],cell='',q=false,i,ch;
    for(i=0;i<text.length;i++){ch=text[i];
      if(q){if(ch==='"'){if(text[i+1]==='"'){cell+='"';i++}else q=false}else cell+=ch}
      else if(ch==='"')q=true;
      else if(ch===d){row.push(cell);cell=''}
      else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cell);rows.push(row);row=[];cell=''}
      else cell+=ch}
    if(cell!==''||row.length){row.push(cell);rows.push(row)}
    return rows.filter(function(r){return r.some(function(c){return String(c).trim()!==''})});
  }
  function loadXLSX(){return new Promise(function(res,rej){if(window.XLSX)return res(window.XLSX);var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=function(){window.XLSX?res(window.XLSX):rej(new Error('x'))};s.onerror=function(){rej(new Error('x'))};document.head.appendChild(s)})}
  function num(v){
    if(typeof v==='number')return isFinite(v)?v:null;
    var s=en(v).trim();if(!s)return null;
    var neg=/^\(.*\)$/.test(s)||/-\s*$/.test(s)||/^-/.test(s)||/^−/.test(s);
    s=s.replace(/[^0-9.]/g,'');if(!s||s==='.')return null;var x=parseFloat(s);return isNaN(x)?null:(neg?-x:x);
  }
  function cellDate(v){
    if(v instanceof Date){var t=v.getTime()+43200000;return isNaN(t)?null:sod(t)+43200000}
    return v==null||v===''?null:parseDate(v);
  }
  var GUESS=[[/اجاره|رهن/,'مسکن'],[/برق|آب|گاز|قبض|اینترنت|موبایل|شارژ/,'قبوض'],[/سوپر|فروشگاه|خرید|رستوران|کافه|نان|میوه|غذا/,'خوراک و خرید'],[/اسنپ|تپسی|بنزین|مترو|اتوبوس|تاکسی|کرایه/,'حمل‌ونقل'],[/حقوق|دستمزد/,'حقوق و دستمزد'],[/بیمه|دارو|درمان|دکتر|بیمارستان/,'سلامت و بیمه'],[/تبلیغ|اینستاگرام|گوگل/,'بازاریابی'],[/اشتراک|نرم‌افزار|سرور|دامنه|هاست/,'نرم‌افزار']];
  function guessCat(desc,inc){for(var i=0;i<GUESS.length;i++)if(GUESS[i][0].test(desc))return GUESS[i][1];return inc?'درآمد':'سایر'}
  function setImErr(m){$('#im-err').textContent=m||''}
  function setRows(rows){
    if(rows.length<2){setImErr('فایل خالی است یا ردیف داده ندارد.');$('#im-map').hidden=true;$('#im-go').disabled=true;return}
    if(rows.length>5001){rows=rows.slice(0,5001);setImErr('فقط ۵٬۰۰۰ ردیف اول خوانده می‌شود.')}
    var kw=/تاریخ|شرح|توضیح|مبلغ|بدهکار|بستانکار|برداشت|واریز|date|amount|desc|debit|credit/i,h=0,i;
    for(i=0;i<Math.min(10,rows.length);i++){if(rows[i].filter(function(c){return kw.test(String(c))}).length>=2){h=i;break}}
    IM.rows=rows;IM.hrow=h;
    var head=rows[h].map(function(c,j){return String(c).trim()||('ستون '+(j+1))});
    var opts='<option value="-1">— ندارد —</option>'+head.map(function(c,j){return '<option value="'+j+'">'+clean(c)+'</option>'}).join('');
    ['date','desc','amt','deb','cre','cat'].forEach(function(k){$('#im-'+k).innerHTML=opts});
    function find(re){for(var j=0;j<head.length;j++)if(re.test(head[j]))return j;return -1}
    $('#im-date').value=find(/تاریخ|date/i);$('#im-desc').value=find(/شرح|توضیح|بابت|desc|memo|narr/i);
    $('#im-deb').value=find(/بدهکار|برداشت|debit|withdraw/i);$('#im-cre').value=find(/بستانکار|واریز|credit|deposit/i);
    $('#im-cat').value=find(/دسته|category/i);var ai=find(/^\s*مبلغ|amount|مقدار/i);$('#im-amt').value=(ai>=0&&($('#im-deb').value<0&&$('#im-cre').value<0))?ai:($('#im-deb').value>=0||$('#im-cre').value>=0?-1:ai);
    var joined=head.join(' ');$('#im-unit').value=/ریال|rial/i.test(joined)?'0.0000001':/میلیون/.test(joined)?'1':'0.000001';
    $('#im-map').hidden=false;updatePreview();
  }
  function buildItems(){
    var g=function(k){return parseInt($('#im-'+k).value,10)},di=g('date'),de=g('desc'),ai=g('amt'),db=g('deb'),cr=g('cre'),ci=g('cat'),k=parseFloat($('#im-unit').value),items=[],bad=0,r;
    for(r=IM.hrow+1;r<IM.rows.length;r++){
      var row=IM.rows[r],ts=di>=0?cellDate(row[di]):null;if(ts==null){bad++;continue}
      var v=null;
      if(ai>=0){var x=num(row[ai]);if(x!=null&&x!==0)v=x}
      if(v==null&&(db>=0||cr>=0)){var dv=db>=0?num(row[db]):null,cv=cr>=0?num(row[cr]):null;if(cv)v=Math.abs(cv);else if(dv)v=-Math.abs(dv)}
      if(!v){bad++;continue}
      var a=r6(v*k);if(!a){bad++;continue}
      var desc=clean(de>=0?row[de]:''),inc=a>0,cat=clean(ci>=0?row[ci]:'')||guessCat(desc,inc);
      items.push({id:newTxId(),n:desc||cat,c:cat,a:a,s:'ok',i:iconFor(cat,inc),ts:ts});
    }
    return {items:items,bad:bad};
  }
  function updatePreview(){
    var r=buildItems();IM.items=r.items;IM.bad=r.bad;
    $('#im-sum').textContent=fa(r.items.length)+' تراکنش معتبر'+(r.bad?'، '+fa(r.bad)+' ردیف رد می‌شود':'');
    $('#im-prev').innerHTML=r.items.slice(0,5).map(function(t){return '<tr><td>'+fmtDate(t.ts)+'</td><td>'+t.n+'</td><td>'+t.c+'</td><td class="num amt">'+amt(t.a)+'</td></tr>'}).join('')||'<tr><td colspan="4" style="text-align:center;color:var(--fg3);padding:16px">با این ستون‌ها ردیفی خوانده نشد؛ ستون‌ها را اصلاح کنید.</td></tr>';
    $('#im-go').disabled=!r.items.length;
    $('#im-go').textContent=r.items.length?'وارد کردن '+fa(r.items.length)+' تراکنش':'وارد کردن';
  }
  function openImport(){IM={rows:[],hrow:0,items:[],bad:0};$('#im-file').value='';$('#im-map').hidden=true;setImErr('');$('#im-go').disabled=true;openM('immodal','#im-file')}
  $('#im-file').addEventListener('change',function(){
    var f=this.files[0];if(!f)return;setImErr('');
    var ext=(f.name.split('.').pop()||'').toLowerCase(),rd=new FileReader();
    rd.onerror=function(){setImErr('خواندن فایل ممکن نشد.')};
    rd.onload=function(){
      if(ext==='xlsx'||ext==='xls'){
        loadXLSX().then(function(X){var wb=X.read(rd.result,{type:'array',cellDates:true});setRows(X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:''}))})
          .catch(function(){setImErr('خواندن فایل اکسل ممکن نشد. فایل را به‌صورت CSV ذخیره کنید و دوباره امتحان کنید.')});
      }else{try{setRows(parseCSV(bufText(rd.result)))}catch(e){setImErr('قالب فایل شناخته نشد.')}}
    };
    rd.readAsArrayBuffer(f);
  });
  ['date','desc','amt','deb','cre','cat','unit'].forEach(function(k){$('#im-'+k).addEventListener('change',updatePreview)});
  $('#im-go').addEventListener('click',function(){
    var have={};U.tx.forEach(function(t){have[sod(t.ts)+'|'+t.a+'|'+t.n]=1});
    var add=0,dup=0;
    IM.items.forEach(function(t){var key=sod(t.ts)+'|'+t.a+'|'+t.n;if(have[key]){dup++;return}have[key]=1;U.tx.push(t);add++});
    var bad=IM.bad;lastFocus=$('#add-tx');closeModals();reloadAll(false);
    toast(fa(add)+' تراکنش وارد شد'+(dup?' · '+fa(dup)+' تکراری رد شد':'')+(bad?' · '+fa(bad)+' ردیف نامعتبر':''));
  });

  /* global action buttons + goals */
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
    if(a==='add-user'){openUserModal();return}
    if(!U.real){toast('حساب نمونه فقط‌خواندنی است. برای ثبت داده واقعی یک کاربر جدید بسازید.');return}
    if(a==='add-tx')openTx();else if(a==='import')openImport();
  });
  $('#goals').addEventListener('click',function(e){
    var b=e.target.closest('[data-gdel],[data-gadd],[data-gcancel]');if(!b)return;
    if(b.dataset.gdel!=null){GOALS.splice(+b.dataset.gdel,1);renderGoals();toast('هدف حذف شد')}
    else{goalForm=b.dataset.gadd!=null;renderGoals();var f=$(goalForm?'#g-name':'[data-gadd]');if(f)f.focus()}
  });
  $('#goals').addEventListener('submit',function(e){
    if(e.target.id!=='g-form')return;e.preventDefault();
    var nm=clean($('#g-name').value),tot=parseFloat(en($('#g-tot').value)),cur=parseFloat(en($('#g-cur').value||'0')),err=$('#g-err');
    if(nm.length<2){err.textContent='نام هدف را وارد کنید.';$('#g-name').focus();return}
    if(!(tot>0)){err.textContent='مبلغ هدف را به‌صورت عدد مثبت وارد کنید.';$('#g-tot').focus();return}
    if(!(cur>=0)){err.textContent='پس‌انداز تاکنون را درست وارد کنید.';$('#g-cur').focus();return}
    GOALS.push({n:nm,tot:r6(tot),cur:r6(cur),v:0});goalForm=false;renderGoals();toast('هدف اضافه شد');
  });

  setUserUI();renderDashCard();renderBanner();setSideBudget();renderGoals();
  setTimeout(storeInit,0);

  /* ----- router ----- */
  var VIEWR={transactions:pageTx,cards:pageCards,budget:pageBudget,reports:pageReports,prefs:pagePrefs},views={};
  Object.keys(ROUTES).forEach(function(k){views[k]=$('#v-'+k)});
  var rmot=matchMedia('(prefers-reduced-motion: reduce)').matches,rvo=null;
  function revealIn(root){
    if(rmot||!('IntersectionObserver' in window))return;
    if(!rvo)rvo=new IntersectionObserver(function(es){var k=0;es.forEach(function(e){if(!e.isIntersecting)return;
      e.target.style.transitionDelay=(k++*110)+'ms';e.target.classList.add('in');rvo.unobserve(e.target);var t=e.target;setTimeout(function(){t.style.transitionDelay=''},1200)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    root.querySelectorAll('.rise').forEach(function(el){
      if(el.dataset.rv)return;el.dataset.rv=1;
      if(el.getBoundingClientRect().top>innerHeight*.92){el.classList.remove('rise');el.classList.add('pre');rvo.observe(el)}
    });
  }
  function route(){
    var id=location.hash.slice(1);if(!ROUTES[id])id='dashboard';
    Object.keys(views).forEach(function(k){views[k].hidden=k!==id});
    document.querySelectorAll('#nav a').forEach(function(a){if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    $('.top h1').textContent=ROUTES[id].t;$('#today').textContent=ROUTES[id].s||dashSub;
    $('#range').hidden=id!=='dashboard';
    if(VIEWR[id]&&!rendered[id]){VIEWR[id](views[id]);rendered[id]=1}
    if(id==='transactions'&&pageTx.draw)pageTx.draw();
    if(id==='prefs')syncTheme();
    if(id==='dashboard'&&lastId!==id){drawChart(true);renderDonut();renderDashCard()}
    if(lastId!==id)window.scrollTo(0,0);
    lastId=id;revealIn(views[id]);
  }
  addEventListener('hashchange',route);
  route();

  /* ---------- scroll animations ---------- */
  var rm2=matchMedia('(prefers-reduced-motion: reduce)').matches,bar=$('#sp'),blobs=document.querySelectorAll('.mesh i'),tk=false;
  function onScroll(){
    tk=false;var y=window.scrollY,mx=document.documentElement.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(mx>0?Math.min(1,y/mx):0)+')';
    if(!rm2)blobs.forEach(function(b,i){b.style.translate='0 '+(y*[.12,-.08,.05][i])+'px'});
  }
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
  if(rm2||!('IntersectionObserver' in window))return;

  // cards below the fold fade/slide in as they are reached
  var pend=[];
  document.querySelectorAll('.rise').forEach(function(el){
    if(el.getBoundingClientRect().top>innerHeight*.92){el.classList.remove('rise');el.classList.add('pre');pend.push(el)}
  });
  var rio=new IntersectionObserver(function(es){
    var k=0;es.forEach(function(e){if(!e.isIntersecting)return;
      e.target.style.transitionDelay=(k++*110)+'ms';e.target.classList.add('in');rio.unobserve(e.target);
      setTimeout(function(){e.target.style.transitionDelay=''},1200)});
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  pend.forEach(function(el){rio.observe(el)});

  // replay the donut and goal bars when they scroll into view
  function once(el,fn){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();fn()}},{threshold:.4});o.observe(el)}
  once($('.donut'),function(){
    var segs=document.querySelectorAll('#donut .seg-c');
    segs.forEach(function(c){c.style.transition='none';c.setAttribute('stroke-dasharray','0 '+C)});
    void $('#donut').getBoundingClientRect();
    segs.forEach(function(c,i){c.style.transition='';setTimeout(function(){var l=c.dataset.len;c.setAttribute('stroke-dasharray',l+' '+(C-l))},i*120)});
  });
  once($('#goals'),function(){
    var bs=document.querySelectorAll('.goal .bar span');
    bs.forEach(function(b){b.style.transition='none';b.style.width='0'});
    void $('#goals').getBoundingClientRect();
    bs.forEach(function(b,i){b.style.transition='';setTimeout(function(){b.style.width=b.dataset.w+'%'},i*150)});
  });
})();
