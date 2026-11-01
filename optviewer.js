(function(){
  var L=[],V=[],cur=0,el;
  function en(){var d=document.querySelector('[data-lang]');return !!d&&d.getAttribute('data-lang')==='en';}
  function lab(t){return '<div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A79E92;margin-bottom:8px">'+t+'</div>';}
  function build(){
    el=document.createElement('div');
    el.id='optViewer';
    el.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(12,14,17,0.94);display:none;align-items:center;justify-content:center;padding:clamp(16px,4vw,56px)';
    var nb='position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:0;color:#fff;width:46px;height:46px;font-size:20px;cursor:pointer';
    el.innerHTML=
      '<button data-x="1" aria-label="닫기" style="position:absolute;top:20px;right:24px;background:none;border:0;color:rgba(255,255,255,0.7);font-size:30px;line-height:1;cursor:pointer">×</button>'+
      '<button data-s="-1" aria-label="이전" style="left:14px;'+nb+'">‹</button>'+
      '<button data-s="1" aria-label="다음" style="right:14px;'+nb+'">›</button>'+
      '<div data-in="1" style="display:flex;flex-wrap:wrap;align-items:stretch;gap:1px;max-width:900px;width:100%;max-height:100%;overflow:auto">'+
        '<img id="ovImg" alt="" style="flex:1 1 320px;min-width:0;max-height:70vh;object-fit:cover;background:#fff;outline:1px solid rgba(20,22,26,0.13);outline-offset:-1px" />'+
        '<div style="flex:0 1 260px;background:#fff;padding:26px 28px;display:flex;flex-direction:column;gap:16px">'+
          '<div>'+lab('Item')+'<div id="ovCode" style="font-size:19px;font-weight:600;letter-spacing:0.02em;word-break:keep-all"></div></div>'+
          '<div id="ovSizeW">'+lab('Size')+'<div id="ovSize" style="font-size:14px;color:#3A3E44;line-height:1.7"></div></div>'+
          '<div id="ovFinW">'+lab('Finish')+'<div id="ovFin" style="font-size:14px;color:#3A3E44;line-height:1.7"></div></div>'+
          '<div id="ovSiteW">'+lab('Delivered to')+'<div id="ovSite" style="display:flex;flex-direction:column;gap:12px"></div></div>'+
        '</div>'+
      '</div>'+
      '<div id="ovNum" style="position:absolute;bottom:22px;left:0;right:0;text-align:center;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:0.1em"></div>';
    el.addEventListener('click',function(e){
      var t=e.target.closest('[data-x],[data-s],[data-in]');
      if(!t||t.hasAttribute('data-x')){close();return;}
      if(t.hasAttribute('data-s')){step(+t.getAttribute('data-s'));}
    });
    document.body.appendChild(el);
    document.addEventListener('keydown',function(e){
      if(el.style.display!=='flex')return;
      if(e.key==='Escape')close();
      if(e.key==='ArrowRight')step(1);
      if(e.key==='ArrowLeft')step(-1);
    });
  }
  function set(id,v){var w=document.getElementById(id+'W');document.getElementById(id).textContent=v||'';if(w)w.style.display=v?'':'none';}
  function paint(){
    var f=L[cur],E=en();
    var img=document.getElementById('ovImg');img.src=f.img;img.alt=f.code;
    document.getElementById('ovCode').textContent=f.code;
    set('ovSize',E&&f.sizeEn?f.sizeEn:f.size);
    set('ovFin',E&&f.finEn?f.finEn:f.fin);
    var box=document.getElementById('ovSite'),s=f.sites||[];
    document.getElementById('ovSiteW').style.display=s.length?'':'none';
    box.innerHTML='';
    s.forEach(function(x){
      var d=document.createElement('div');
      var n=document.createElement('div');n.style.cssText='font-size:14px;color:#3A3E44;line-height:1.6;word-break:keep-all';n.textContent=E?x.en:x.ko;d.appendChild(n);
      if(x.url){var a=document.createElement('a');a.href=x.url;a.style.cssText='display:inline-block;margin-top:6px;font-size:12.5px;letter-spacing:0.08em;color:#4E7B93';a.textContent=(E?'View photos':'시공 사진 보기')+' →';d.appendChild(a);}
      box.appendChild(d);
    });
    document.getElementById('ovNum').textContent=(V.indexOf(cur)+1)+' / '+V.length;
  }
  function step(d){var p=V.indexOf(cur);p=(p+d+V.length)%V.length;cur=V[p];paint();}
  function close(){el.style.display='none';document.body.style.overflow='';}
  window.OptViewer={
    open:function(list,i,vis){if(!el)build();L=list;V=vis&&vis.length?vis.slice():list.map(function(_,k){return k;});cur=i;paint();el.style.display='flex';document.body.style.overflow='hidden';},
    show:function(i){this.open(window.OPTS||[],i);}
  };
})();
