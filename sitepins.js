(function(){
  function en(){var d=document.querySelector('[data-lang]');return !!d&&d.getAttribute('data-lang')==='en';}
  function t(v){return v&&typeof v==='object'?(en()?v.en:v.ko):v;}
  var img,stage,open=null;
  function close(){if(open){open.card.style.display='none';open=null;}}
  function render(){
    if(!stage)return;
    stage.querySelectorAll('.sp-pin').forEach(function(n){n.remove();});
    open=null;
    var src=(img.getAttribute('src')||'').split('/').pop();
    var list=(window.PINS||{})[src]||[];
    list.forEach(function(p){
      var pin=document.createElement('div');
      pin.className='sp-pin';
      pin.style.cssText='position:absolute;left:'+p.x+'%;top:'+p.y+'%;transform:translate(-9px,-9px);z-index:3;cursor:pointer';
      var right=p.x>60;
      pin.innerHTML=
        '<div style="display:flex;align-items:center;gap:8px;'+(right?'flex-direction:row-reverse;transform:translateX(calc(-100% + 18px))':'')+'">'+
          '<span style="position:relative;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(131,196,216,0.55),0 2px 8px rgba(0,0,0,0.4);flex:none"><span style="position:absolute;inset:5px;border-radius:50%;background:#14161A"></span></span>'+
          '<span style="background:rgba(20,22,26,0.88);color:#fff;font-size:13px;line-height:1;padding:8px 11px;white-space:nowrap">'+t(p.label)+'</span>'+
        '</div>';
      var card=document.createElement('div');
      card.style.cssText='display:none;position:absolute;top:30px;'+(right?'right:-9px':'left:-9px')+';width:250px;background:#fff;color:#14161A;padding:18px 20px;box-shadow:0 12px 32px rgba(0,0,0,0.35);cursor:default';
      var rows=(p.rows||[]).map(function(r){return '<div style="margin-top:10px"><div style="font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:#A79E92;margin-bottom:4px">'+t(r[0])+'</div><div style="font-size:13.5px;color:#3A3E44;line-height:1.6;word-break:keep-all">'+t(r[1])+'</div></div>';}).join('');
      card.innerHTML='<div style="font-size:16px;font-weight:600;word-break:keep-all">'+t(p.label)+'</div>'+rows+
        (p.href?'<a href="'+p.href+'" style="display:inline-block;margin-top:14px;font-size:12.5px;letter-spacing:0.08em;color:#4E7B93">'+(en()?'View product':'제품 보기')+' →</a>':'');
      pin.appendChild(card);
      function show(){if(open&&open.pin!==pin)close();card.style.display='block';open={pin:pin,card:card};}
      pin.addEventListener('mouseenter',show);
      pin.addEventListener('mouseleave',function(){if(matchMedia('(hover:hover)').matches){card.style.display='none';open=null;}});
      pin.addEventListener('click',function(e){e.stopPropagation();if(open&&open.pin===pin&&!matchMedia('(hover:hover)').matches)close();else show();});
      stage.appendChild(pin);
    });
  }
  function init(){
    img=document.getElementById('viewerImg');
    if(!img)return;
    stage=img.parentNode;
    new MutationObserver(render).observe(img,{attributes:true,attributeFilter:['src']});
    stage.addEventListener('click',function(e){if(e.target===img){e.stopPropagation();close();}});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
