// Mobile menu
const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.addEventListener('click',()=>links.classList.toggle('open'));

// Rotating testimonials (home)
const quote=document.getElementById('quote');
if(quote){
  const list=['"The Kenya safari was flawless. Our guide knew every animal by name." - Priya S.','"Rome in 4 days, zero stress. Voyago planned it all." - Daniel R.','"The Nepal trek changed how I see mountains." - Hannah L.'];
  const dots=document.getElementById('dots');let i=0,timer;
  list.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Quote '+(k+1));b.onclick=()=>{show(k);restart()};dots.appendChild(b)});
  function show(k){i=k;quote.style.opacity=0;setTimeout(()=>{quote.textContent=list[i];quote.style.opacity=1},200);
    [...dots.children].forEach((d,j)=>d.classList.toggle('on',j===i))}
  function restart(){clearInterval(timer);timer=setInterval(()=>show((i+1)%list.length),5000)}
  show(0);restart();
}

// Price calculator (packages)
const pkg=document.getElementById('pkg');
if(pkg){
  const calc=()=>{
    const ppl=Math.max(1,+ppl_.value||1),nights=Math.max(1,+nts.value||1);
    let t=+pkg.value*ppl*(nights/7);if(ins.checked)t*=1.08;
    total.textContent='$'+Math.round(t).toLocaleString();
  };
  const ppl_=document.getElementById('ppl'),nts=document.getElementById('nts'),ins=document.getElementById('ins'),total=document.getElementById('total');
  [pkg,ppl_,nts,ins].forEach(el=>el.addEventListener('input',calc));calc();
}

// FAQ accordion (tips)
document.querySelectorAll('.q').forEach(q=>q.addEventListener('click',()=>{
  q.classList.toggle('open');q.nextElementSibling.classList.toggle('show');
}));

// Booking form (contact)
const book=document.getElementById('book');
if(book){book.addEventListener('submit',e=>{
  e.preventDefault();let ok=true;
  const rule=(id,err,test,msg)=>{const v=document.getElementById(id).value.trim();const bad=!test(v);
    document.getElementById(err).textContent=bad?msg:'';if(bad)ok=false};
  rule('n','en',v=>v.length>1,'Enter your full name.');
  rule('m','em',v=>/^[^@\s]+@[^@\s]+\.\w+$/.test(v),'Enter a valid email.');
  rule('d','ed',v=>v&&new Date(v)>new Date(),'Choose a future date.');
  document.getElementById('done').textContent=ok?'Request sent! We will email you within 24 hours.':'';
  if(ok)book.reset();
})}
