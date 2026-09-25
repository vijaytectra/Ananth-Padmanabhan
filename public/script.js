/* ---------- source map (internal traceability, not rendered) ---------- */
const SOURCES={
  li:"https://www.linkedin.com/in/ananthpadmanabhan1/details/experience/ (captured 23 Sep 2026)",
  penn:"https://www.law.upenn.edu/live/profiles/498-ananth-padmanabhan",
  cpr:"https://cprindia.org/people/ananth-padmanabhan/",
  carn:"https://carnegieendowment.org/people/ananth-padmanabhan",
  ci:"Carnegie Endowment research/event pages (linked inline)",
  na:"https://www.newamerica.org/insights/anthology-working-papers-new-americas-us-india-fellows/civilian-drones-privacy-challenges-and-potential-resolution-ananth-padmanabhan/",
  scc:"https://www.scconline.com/blog/post/2023/08/12/dr-ananth-padmanabhan-joins-as-dean-of-school-of-law-vmls/",
  cd:"https://collegedunia.com/news/c-60718-interview-ananth-padmanabhan-dean-at-daksha-fellowship-chennai",
  tt1:"https://telanganatoday.com/sreenidhi-university-welcomes-next-generation-of-innovators",
  tt2:"https://telanganatoday.com/sreenidhi-university-launches-sreenidhi-school-of-business",
  oup1:"https://academic.oup.com/book/2618",
  oup2:"https://academic.oup.com/edited-volume/42606/chapter-abstract/357548300",
  spicy:"https://spicyip.com/2012/10/intellectual-property-rights.html"
};

(() => {
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
$("#yr").textContent=new Date().getFullYear();

/* ---------- split headings into masked words ---------- */
function splitWords(el){
  let i=0;
  const walk=node=>{
    [...node.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t=>{
          if(!t) return;
          if(/^\s+$/.test(t)){frag.appendChild(document.createTextNode(" "));return;}
          const w=document.createElement("span");w.className="w";
          const s=document.createElement("span");s.textContent=t;s.style.setProperty("--i",i++);
          w.appendChild(s);frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if(n.nodeType===1) walk(n);
    });
  };
  walk(el);
}
$$(".split").forEach(splitWords);

/* ---------- scroll-inked paragraphs (statement + quote) ---------- */
function inkWords(el,hl){
  const text=el.textContent.trim();
  const words=text.split(/\s+/);
  const hlWords=hl?hl.split(/\s+/):[];
  let hlStart=-1;
  if(hl){for(let k=0;k<=words.length-hlWords.length;k++){if(hlWords.every((h,j)=>words[k+j]===h)){hlStart=k;break;}}}
  el.innerHTML=words.map((w,k)=>`<span class="sw${hlStart>-1&&k>=hlStart&&k<hlStart+hlWords.length?" hl":""}">${w.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}</span>`).join(" ");
  return $$(".sw",el);
}
const inked=[
  {el:$("#stmt"),ws:inkWords($("#stmt"),$("#stmt").dataset.hl)},
  {el:$("#quoteText"),ws:inkWords($("#quoteText"))}
];

/* ---------- intro ---------- */
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add("ready")));

/* ---------- reveal on enter ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}
}),{rootMargin:"0px 0px -10% 0px",threshold:.01});
$$(".rv,.split,.eyebrow").forEach(el=>io.observe(el));
/* image reveals: a fully clipped element never reports as intersecting,
   so watch each image's (unclipped) frame and reveal the image inside it */
const rio=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.querySelectorAll(":scope > .reveal, :scope > * > .reveal").forEach(r=>r.classList.add("in"));rio.unobserve(e.target);}
}),{rootMargin:"0px 0px -8% 0px"});
$$(".reveal").forEach(r=>{ if(!r.closest(".inst-img")) rio.observe(r.parentElement); });
/* institution visual: start the (short) curtain before the section arrives, so it never lags */
const instImg=$(".inst-img");
const iio=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){$(".reveal",e.target).classList.add("in");iio.unobserve(e.target);}
}),{rootMargin:"0px 0px 25% 0px"});
iio.observe(instImg);
/* failsafe: anything already in view (or if observers are unavailable) is revealed */
setTimeout(()=>$$(".reveal,.rv,.split").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add("in");}),1800);
addEventListener("load",()=>{
  setTimeout(()=>$$(".reveal").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add("in");}),600);
  /* decode every image off the critical path so nothing pops in late */
  const idle=window.requestIdleCallback||(f=>setTimeout(f,200));
  idle(()=>$$("img").forEach(i=>{ if(i.decode) i.decode().catch(()=>{}); }));
});

/* ---------- header: hide on down, show on up; progress; nav ink ---------- */
const hdr=$("#hdr"),prog=$(".progress");
let lastY=scrollY;

/* ---------- parallax registry ---------- */
const pxEls=$$("[data-speed]").map(el=>({el,host:el.closest("[data-px-host]")||el.parentElement,speed:parseFloat(el.dataset.speed),mouse:parseFloat(el.dataset.mouse||0),mx:0,my:0}));
const mobileFactor=()=>innerWidth<900?.5:1;

/* ---------- journey rail ---------- */
const rows=$("#rows"),railFill=$(".rail b");
/* ---------- type band ---------- */
const band=$(".band"),bandTrack=$("#bandTrack"),bandLines=$$(".band-line"),bandWords=$$(".band-track .w");
/* fit: the widest line fills the column; every line's slack (free space) bounds its drift */
function fitBand(){
  bandLines.forEach(l=>l.style.transform="");
  bandTrack.style.fontSize="";
  const avail=bandTrack.clientWidth; if(!avail) return;
  const base=parseFloat(getComputedStyle(bandTrack).fontSize);
  const stacked=matchMedia("(max-width:600px)").matches;   // phones: words wrap, centred
  const widest=Math.max(...(stacked?bandWords:bandLines).map(l=>l.scrollWidth));
  const fs=Math.min(base,base*avail*(stacked?.96:.9)/widest);
  bandTrack.style.fontSize=fs.toFixed(2)+"px";
  bandLines.forEach(l=>{ l._slack=stacked?0:Math.max(0,(avail-l.scrollWidth)*.5); });
}

let ticking=false;
function frame(){
  ticking=false;
  const y=scrollY,vh=innerHeight,h=document.documentElement.scrollHeight-vh;
  prog.style.transform=`scaleX(${h>0?y/h:0})`;
  hdr.classList.toggle("scrolled",y>8);
  if(!document.body.classList.contains("lock")){
    if(y>lastY+4&&y>240) hdr.classList.add("hide");
    else if(y<lastY-4||y<240) hdr.classList.remove("hide");
  }
  lastY=y;
  if(RM) { inked.forEach(o=>o.ws.forEach(w=>w.classList.add("on"))); return; }

  // parallax
  const f=mobileFactor();
  pxEls.forEach(p=>{
    const r=p.host.getBoundingClientRect();
    if(r.bottom<-200||r.top>vh+200) return;
    const center=r.top+r.height/2-vh/2;
    // framed images: displacement is bounded by the image overscan so edges never show
    const ty=p.el.classList.contains("px")
      ? -clamp(center/vh,-1,1)*r.height*.075*(p.speed/.12)
      : -center*p.speed*f + p.my;
    p.el.style.transform=`translate3d(${p.mx}px,${ty}px,0)`;
  });

  // inked words
  const atEnd=y>=h-4;
  inked.forEach(o=>{
    const r=o.el.getBoundingClientRect();
    // completes while the paragraph is still comfortably on screen (and always at the page end)
    const prog=atEnd?1:clamp((vh*.92-r.top)/(r.height*.6+vh*.35),0,1);
    const n=Math.round(prog*o.ws.length*1.1);
    o.ws.forEach((w,i)=>w.classList.toggle("on",i<n));
  });

  // journey rail
  const rr=rows.getBoundingClientRect();
  railFill.style.transform=`scaleY(${clamp((vh*.6-rr.top)/rr.height,0,1)})`;

  // big type band drift
  const br=band.getBoundingClientRect();
  if(br.bottom>0&&br.top<vh){
    // pan from the first word (flush left) to the last word (flush right): every word is fully shown
    // t: 0 as the band enters at the bottom → 1 as it reaches the header; lines drift only inside their spare room
    const t=clamp((vh-br.top)/Math.max(1,vh-hdr.offsetHeight+br.height*.2),0,1);
    bandLines.forEach((l,k)=>{const s=l._slack||0;const x=k%2? -s*t : s*t; l.style.transform=`translate3d(${x.toFixed(1)}px,0,0)`;});
    const on=Math.round(clamp((vh*.92-br.top)/(vh*.55),0,1)*bandWords.length);
    bandWords.forEach((w,i)=>w.classList.toggle("on",i<on));
  }
}
const req=()=>{if(!ticking){ticking=true;requestAnimationFrame(frame);}};
addEventListener("scroll",req,{passive:true});
addEventListener("resize",req);
frame();

/* ---------- hero mouse parallax (desktop) ---------- */
if(FINE&&!RM){
  const hero=$(".hero");
  hero.addEventListener("pointermove",e=>{
    const r=hero.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
    pxEls.forEach(p=>{if(p.mouse){p.mx=nx*p.mouse;p.my=ny*p.mouse*.6;}});
    req();
  });
  hero.addEventListener("pointerleave",()=>{pxEls.forEach(p=>{p.mx=0;p.my=0;});req();});
}

/* ---------- nav ink indicator + active section ---------- */
const navUl=$(".nav ul"),ink=$(".nav .ink"),links=$$(".nav ul a");
function moveInk(a){ if(!a){ink.style.opacity=0;return;} ink.style.opacity=1; ink.style.width=a.offsetWidth+"px"; ink.style.transform=`translateX(${a.offsetLeft}px)`; }
let current=null;
links.forEach(a=>{a.addEventListener("mouseenter",()=>moveInk(a));});
navUl.addEventListener("mouseleave",()=>moveInk(current));
const secObs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    current=links.find(a=>a.getAttribute("href")==="#"+e.target.id)||null;
    links.forEach(a=>a.toggleAttribute("aria-current",a===current));
    moveInk(current);
  }
}),{rootMargin:"-45% 0px -50% 0px"});
links.forEach(a=>{const s=$(a.getAttribute("href"));if(s)secObs.observe(s);});

/* ---------- mobile drawer ---------- */
const mb=$(".menu-btn"),dr=$("#drawer");
function menu(o){
  mb.setAttribute("aria-expanded",o);mb.setAttribute("aria-label",o?"Close menu":"Open menu");
  dr.classList.toggle("open",o);dr.setAttribute("aria-hidden",!o);
  document.body.classList.toggle("lock",o);hdr.classList.remove("hide");
  $$("a",dr).forEach(a=>a.tabIndex=o?0:-1);
  if(o) setTimeout(()=>$("a",dr).focus({preventScroll:true}),300);
}
$$("a",dr).forEach(a=>{a.tabIndex=-1;a.addEventListener("click",()=>menu(false));});
mb.addEventListener("click",()=>menu(mb.getAttribute("aria-expanded")!=="true"));
addEventListener("keydown",e=>{if(e.key==="Escape"&&dr.classList.contains("open")){menu(false);mb.focus();}});
addEventListener("resize",()=>{if(innerWidth>1024&&dr.classList.contains("open"))menu(false);});

/* ---------- journey accordion ---------- */
const rowEls=$$("#rows .row");
const setRow=(r,o)=>{r.classList.toggle("open",o);$("button",r).setAttribute("aria-expanded",o);};
rowEls.forEach(r=>$("button",r).addEventListener("click",()=>{const o=!r.classList.contains("open");rowEls.forEach(x=>setRow(x,false));setRow(r,o);}));
setRow(rowEls[rowEls.length-1],true);

/* ---------- institution tabs (+ gentle autoplay with visible timer) ---------- */
const tabs=$$(".tabs button"),slides=$$(".slide"),timer=$("#tabTimer");
let ti=2,auto=null,start=0;const DUR=7000;
/* one atmospheric visual per institution. Frames 0 and 1 reuse images already in the page
   (no extra download); swap in campus photography by setting a real src on these frames. */
const frameHost=$("#instFrames"),cap=$("#instCap");
const frames=[];
[[0,".tile:nth-child(4) img"],[1,".feature img"]].forEach(([i,sel])=>{
  const from=$(sel); if(!from) return;
  const im=new Image(); im.className="inst-frame"; im.dataset.i=i; im.alt=""; im.decoding="async"; im.src=from.getAttribute("src");
  frameHost.insertBefore(im,frameHost.firstChild);
});
$$(".inst-frame",frameHost).forEach(f=>frames[+f.dataset.i]=f);
function showFrame(){
  frames.forEach((f,k)=>f&&f.classList.toggle("on",k===ti));
  if(!frames[ti]) frames[2].classList.add("on");
  const s=slides[ti];
  cap.classList.add("swap");
  setTimeout(()=>{
    $(".k",cap).textContent=$(".eyebrow",s).textContent;
    $(".t",cap).textContent=$("h3",s).textContent.replace(/ & the Daksha Fellowship$/,"");
    cap.classList.remove("swap");
  },RM?0:260);
}
function go(n,focus){
  ti=(n+slides.length)%slides.length;
  slides.forEach((s,k)=>s.classList.toggle("on",k===ti));
  showFrame();
  tabs.forEach((t,k)=>{t.setAttribute("aria-selected",k===ti);t.tabIndex=k===ti?0:-1;});
  if(focus) tabs[ti].focus();
  start=performance.now();
}
tabs.forEach((t,k)=>{
  t.addEventListener("click",()=>{go(k);stopAuto();});
  t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){go(ti+1,true);stopAuto();}if(e.key==="ArrowLeft"){go(ti-1,true);stopAuto();}});
});
function loop(now){ if(!auto) return; const p=(now-start)/DUR; timer.style.transform=`scaleX(${Math.min(p,1)})`; if(p>=1) go(ti+1); auto=requestAnimationFrame(loop); }
function startAuto(){ if(RM||auto) return; start=performance.now(); auto=requestAnimationFrame(loop); }
function stopAuto(){ if(auto) cancelAnimationFrame(auto); auto=null; timer.style.transform="scaleX(0)"; }
const instSec=$("#institutions");
new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?startAuto():stopAuto()),{threshold:.45}).observe(instSec);
instSec.addEventListener("pointerenter",()=>{ if(FINE) stopAuto(); });
instSec.addEventListener("focusin",stopAuto);

/* ---------- about: questions open to a short answer ---------- */
$$("#qs>li").forEach(li=>{
  const b=$(".q-btn",li),a=$(".q-a",li);
  a.inert=true;
  b.addEventListener("click",()=>{const o=!li.classList.contains("open");li.classList.toggle("open",o);b.setAttribute("aria-expanded",o);a.inert=!o;});
});

/* ---------- journey rail: exactly first marker → last marker ---------- */
const rail=$(".rail");
function sizeRail(){
  const ys=$$("#rows .yr");if(ys.length<2)return;
  // offsetTop ignores the rows' reveal transforms, so this is stable mid-animation
  const c=el=>el.closest(".row").offsetTop+el.offsetTop+el.offsetHeight/2;
  const a=c(ys[0]),b=c(ys[ys.length-1]);
  rail.style.top=a+"px";rail.style.bottom="auto";rail.style.height=Math.max(0,b-a)+"px";
}
if(window.ResizeObserver) new ResizeObserver(sizeRail).observe(rows);
sizeRail();

/* ---------- footer wordmark: always fits its column, never cropped ---------- */
const wm=$(".wordmark");
function fitWordmark(){
  const avail=wm.clientWidth; if(!avail) return;
  wm.classList.remove("two"); wm.style.fontSize="100px";
  const sp=$$("span",wm);
  const rg=document.createRange(); rg.selectNodeContents(wm);
  const one=rg.getBoundingClientRect().width+7;             // +.07em: negative tracking + stroke on the last glyph
  let fs=Math.min(avail/one*100,210);
  if(fs<64 && sp.length>1){                                  // narrow screens: stack the name on two lines
    wm.classList.add("two");
    const w=Math.max(...sp.map(s=>{const r=document.createRange();r.selectNodeContents(s);return r.getBoundingClientRect().width;}))+7;
    fs=Math.min(avail/w*100,150);
  }
  wm.style.fontSize=Math.floor(fs*.99*10)/10+"px";
}
const fitAll=()=>{fitWordmark();fitBand();sizeRail();req();};
fitAll();
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fitAll);
let fitRaf=0;addEventListener("resize",()=>{cancelAnimationFrame(fitRaf);fitRaf=requestAnimationFrame(fitAll);});
addEventListener("load",fitAll);

/* ---------- desktop-only pointer craft: magnetic buttons, tilt, cursor ---------- */
if(FINE&&!RM){
  $$(".magnetic").forEach(b=>{
    b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform=`translate(${x*.18}px,${y*.3}px)`;});
    b.addEventListener("pointerleave",()=>{b.style.transition="transform .7s cubic-bezier(.16,1,.3,1),color .5s,border-color .5s";b.style.transform="";setTimeout(()=>b.style.transition="",700);});
  });
  $$(".tilt").forEach(c=>{
    c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*14}deg) rotateX(${-y*12}deg) translateY(-6px)`;});
    c.addEventListener("pointerleave",()=>{c.style.transform="";});
  });
}
})();