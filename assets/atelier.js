(() => {
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);menu.querySelector('span').textContent=open?'-':'+';});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){menu.click();menu.focus();}});
  const cards=[...document.querySelectorAll('.work-grid .work-card')],filters=[...document.querySelectorAll('[data-filter]')],search=document.querySelector('#project-search');
  let category='All';
  function filter(){let count=0;const query=search.value.trim().toLowerCase();cards.forEach(card=>{const visible=(category==='All'||card.dataset.category===category)&&card.dataset.search.includes(query);card.hidden=!visible;if(visible)count++;});document.querySelector('#work-count').textContent=`${count} project${count===1?'':'s'}`;document.querySelector('.empty-state').hidden=count!==0;}
  filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filter();}));
  search?.addEventListener('input',filter);
  const categorySelect=document.querySelector('#category-select');
  categorySelect?.addEventListener('change',()=>filters.find(b=>b.dataset.filter===categorySelect.value)?.click());
  filters.forEach(button=>button.addEventListener('click',()=>{if(categorySelect)categorySelect.value=button.dataset.filter;}));
  document.querySelector('#reset-filters')?.addEventListener('click',()=>{search.value='';filters[0].click();search.focus();});
  const dialog=document.querySelector('.image-dialog');let trigger;
  dialog?.querySelector('img').addEventListener('load',()=>{const img=dialog.querySelector('img');dialog.classList.toggle('is-tall',img.naturalHeight/img.naturalWidth>1.5);dialog.scrollTop=0;});
  document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{trigger=button;dialog.querySelector('img').src=button.dataset.image;dialog.querySelector('img').alt=button.dataset.caption||'';dialog.querySelector('p').textContent=button.dataset.caption||'';dialog.showModal();document.body.style.overflow='hidden';}));
  dialog?.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog?.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus();});

  const motionOK=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=document.querySelector('.site-header'),progress=document.querySelector('.scroll-progress');
  let ticking=false;
  function onScroll(){ticking=false;const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;header?.classList.toggle('is-scrolled',y>8);progress?.style.setProperty('--progress',max>0?Math.min(y/max,1):0);}
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});onScroll();

  const revealSelector='.section-heading,.work-card,.proof-band>div,.research-main,.upstream,.about-teaser>*,.experience-row,.capability-grid article,.case-numbers>div,.reading-body>section,.evidence-item,.resources>a,.contribution-row,.next-project,.footer-top,.world-content>*,.intro-bottom,.biography>*,.case-cover,.contributions-intro>*,.resume-viewer';
  const revealTargets=[...document.querySelectorAll(revealSelector)].filter(el=>!el.closest('.home-hero'));
  if('IntersectionObserver' in window&&motionOK){
    revealTargets.forEach(el=>{const siblings=[...el.parentElement.children].filter(c=>c.matches(revealSelector));el.style.setProperty('--delay',`${Math.min(siblings.indexOf(el)%4,3)*.08}s`);el.classList.add('will-reveal');});
    const revealer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealer.unobserve(entry.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
    revealTargets.forEach(el=>revealer.observe(el));
  }

  document.querySelectorAll('.work-card-link,.research-main').forEach(link=>link.addEventListener('pointermove',e=>{const art=link.querySelector('.project-art');if(!art)return;const r=art.getBoundingClientRect();art.style.setProperty('--mx',`${e.clientX-r.left}px`);art.style.setProperty('--my',`${e.clientY-r.top}px`);}));

  const counters=document.querySelectorAll('.proof-band strong');
  if(counters.length&&'IntersectionObserver' in window&&motionOK){
    const countUp=el=>{const match=el.textContent.trim().match(/^([\d.]+)(.*)$/);if(!match)return;const target=parseFloat(match[1]),decimals=(match[1].split('.')[1]||'').length,start=performance.now(),duration=1600;const step=now=>{const t=Math.min((now-start)/duration,1),eased=1-Math.pow(1-t,4);el.textContent=(target*eased).toFixed(decimals)+match[2];if(t<1)requestAnimationFrame(step);};requestAnimationFrame(step);};
    const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){countUp(entry.target);counterObserver.unobserve(entry.target);}}),{threshold:.6});
    counters.forEach(el=>counterObserver.observe(el));
  }

  const spyLinks=[...document.querySelectorAll('.reading-nav a')];
  if(spyLinks.length&&'IntersectionObserver' in window){
    const sections=spyLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spy=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)spyLinks.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+entry.target.id));}),{rootMargin:'-35% 0px -60% 0px'});
    sections.forEach(s=>spy.observe(s));
  }

  // Folded triangular panels, built as a closed mesh and depth-sorted each frame.
  const canvas=document.querySelector('#sculpture');if(!canvas)return;
  const context=canvas.getContext('2d');if(!context)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),toggle=document.querySelector('#pause-art');
  let paused=reduced.matches,inView=true,width=0,height=0,targetX=0,targetY=0,mouseX=0,mouseY=0,phase=.3,previous=0,lastDraw=0,frame;
  const phi=(1+Math.sqrt(5))/2;
  const vertices=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]];
  const indices=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
  const panels=[];
  indices.forEach((ids,index)=>{
    const points=ids.map(i=>vertices[i]);
    const center=[0,1,2].map(k=>points.reduce((sum,p)=>sum+p[k],0)/3*.64);
    for(let j=0;j<3;j++)panels.push({points:[points[j],points[(j+1)%3],center],index,fold:j});
  });
  function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);draw();}
  function draw(){
    context.clearRect(0,0,width,height);
    const a=.34+mouseY*.10,b=.45+phase*.35+mouseX*.14,c=-.16;
    const ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b),cc=Math.cos(c),sc=Math.sin(c),scale=Math.min(width,height)*.26;
    const rotate=([x,y,z])=>{const y1=y*ca-z*sa,z1=y*sa+z*ca,x2=x*cb+z1*sb;return[x2*cc-y1*sc,x2*sc+y1*cc,z1*cb-x*sb];};
    const project=([x,y,z])=>{const f=9/(9-z*.35);return[width*.52+x*scale*f,height*.47+y*scale*f];};
    const faces=panels.map(panel=>{
      const p=panel.points.map(rotate),u=p[1].map((v,k)=>v-p[0][k]),v=p[2].map((v,k)=>v-p[0][k]);
      const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],len=Math.hypot(...n);
      n.forEach((v,k)=>n[k]=v/len);
      const light=Math.max(0,-n[0]*.35-n[1]*.5+n[2]*.79);
      // Obsidian facets that catch lime light on the lit folds.
      const t=Math.pow(light,2.2)*(panel.fold===0?.95:panel.fold===1?.6:.32),dark=[16,21,19],lit=[217,247,128];
      const rgb=dark.map((v,k)=>Math.round(v+(lit[k]-v)*t+light*14));
      return {p:p.map(project),z:p.reduce((s,v)=>s+v[2],0)/3,color:'rgb('+rgb.join(',')+')',light};
    }).sort((a,b)=>a.z-b.z);
    for(const face of faces){
      context.beginPath();face.p.forEach(([x,y],i)=>i?context.lineTo(x,y):context.moveTo(x,y));context.closePath();
      context.fillStyle=face.color;context.fill();context.strokeStyle=`rgba(217,247,128,${.14+face.light*.4})`;context.lineWidth=.8;context.stroke();
      // Fine inset scoring emphasizes the physical folds without a wireframe overlay.
      const center=[0,1].map(k=>face.p.reduce((s,p)=>s+p[k],0)/3);
      context.beginPath();face.p.forEach((p,i)=>{const x=p[0]*.965+center[0]*.035,y=p[1]*.965+center[1]*.035;i?context.lineTo(x,y):context.moveTo(x,y);});
      context.closePath();context.strokeStyle='rgba(255,255,240,.07)';context.lineWidth=.6;context.stroke();
    }
  }
  function tick(now){if(!paused&&inView&&!document.hidden){const delta=Math.min((now-previous)/1000,.05)||0;phase+=delta*.14;mouseX+=(targetX-mouseX)*.04;mouseY+=(targetY-mouseY)*.04;if(now-lastDraw>1000/30){draw();lastDraw=now;}}previous=now;frame=requestAnimationFrame(tick);}
  canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width*2-1;targetY=(e.clientY-r.top)/r.height*2-1;});
  canvas.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  function syncToggle(){toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));}
  toggle.addEventListener('click',()=>{paused=!paused;syncToggle();});reduced.addEventListener('change',()=>{paused=reduced.matches;syncToggle();});
  new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{previous=performance.now();});syncToggle();resize();frame=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
})();
