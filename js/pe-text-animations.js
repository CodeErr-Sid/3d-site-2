class peTextAnimation{constructor(DOM_el,revert,options,fromOptions,scroll,out){this.DOM={el:null,chars:null,words:null,lines:null};this.DOM.el=DOM_el;this.settings=this.DOM.el.dataset.settings;const properties=this.settings.slice(1,-1).split(';');const settings=properties.reduce((acc,property)=>{const[key,value]=property.split('=');acc[key]=parseValue(value);return acc;},{});function parseValue(value){if(value==="true"||value==="false"){return value==="true";}
const parsedNumber=parseFloat(value.replace(',','.'));if(!isNaN(parsedNumber)){return parsedNumber;}
return value;}
this.stagger=settings.stagger;this.duration=settings.duration;this.delay=settings.delay;this.scrub=settings.scrub;this.pin=settings.pin;this.pinTarget=settings.pinTarget;this.animOut=settings.out;this.target=settings.target;this.inserted=settings.inserted;this.parented=settings.parented;function parents(element,selector){const parentsArray=[];let currentElement=element.parentElement;while(currentElement!==null){if(currentElement.matches(selector)){parentsArray.push(currentElement);}
currentElement=currentElement.parentElement;}
return parentsArray;}
if(this.parented){this.parent=parents(this.DOM.el,'.tde__parent');}
this.animations=['charsUp','charsDown','charsRight','charsLeft','wordsUp','wordsDown','linesUp','linesDown','charsFadeOn','wordsFadeOn','linesFadeOn','charsScaleUp','charsScaleDown','charsRotateIn','charsFlipUp','charsFlipDown','linesMask','wordsJustifyCollapse','wordsJustifyExpand','slideLeft','slideRight'];this.defaults={yPercent:0,xPercent:0,x:0,y:0,duration:1,delay:0,stagger:0,ease:'expo.out',onComplete:()=>{this.DOM.el.classList.add('is-inview')
this.progress=1;}};this.from={yPercent:0,xPercent:0,x:0,y:0,}
this.scroll={scrollTrigger:{trigger:null,scrub:null,pin:null,start:'top bottom',end:'bottom center',onEnter:()=>{this.DOM.el.classList.add('viewport-enter');this.parent?this.parent[0].classList.add('tde__enter'):'';}}}
this.out={yPercent:null,stagger:null,duration:null,ease:'expo.in',delay:0}
this.id=Math.random().toString(16).slice(2);this.scroll.scrollTrigger.start=settings.item_ref_start+' '+settings.window_ref_start;this.scroll.scrollTrigger.end=settings.item_ref_end+' '+settings.window_ref_end;this.progress=0;this.pin==null?this.pin=false:'';this.scrub==null?this.scrub=false:'';this.animOut==null?this.animOut=false:'';let animations=this.animations;this.anim=this.DOM.el.dataset.animation;this.anim.includes('chars')?this.type='chars, words':'';this.anim.includes('words')?this.type='words, chars':'';this.anim.includes('lines')?this.type='lines':'';this.anim.includes('Justify')?this.type='lines, words':'';this.split=new SplitText(this.DOM.el,{type:this.type,charsClass:'anim_char',linesClass:'anim_line',wordsClass:'anim_word',reduceWhiteSpace:true});if(this.DOM.el.querySelectorAll('[class^="inner--"]')){let inner=this.DOM.el.querySelectorAll('[class^="inner--"]');inner.forEach((element)=>{let wrap=document.createElement('div'),span=document.createElement('span');wrap.classList.add(this.anim.includes('chars')?'anim_char':this.anim.includes('words')?'anim_word':'');document.createElement('span');element.parentNode.insertBefore(wrap,element);wrap.appendChild(span);span.appendChild(element);})}
if(this.anim.includes('words')){let words=this.DOM.el.querySelectorAll('.anim_word');words.forEach(function(word){word.innerHTML='<span>'+word.innerHTML+'</span>';});this.target=this.DOM.el.querySelectorAll('.anim_word > span:not(.dynamic-word span)');}
if(this.anim.includes('chars')){let chars=this.DOM.el.querySelectorAll('.anim_char');chars.forEach(function(char){char.innerHTML='<span>'+char.innerHTML+'</span>';});this.target=this.DOM.el.querySelectorAll('.anim_char > span:not(.dynamic-word span)');}
if(this.anim.includes('lines')){this.DOM.el.querySelectorAll('.anim_line').innerHTML='<span>'+this.DOM.el.querySelectorAll('.anim_line').innerHTML+'</span>';let lines=this.DOM.el.querySelectorAll('.anim_line');lines.forEach(function(line){line.innerHTML='<span>'+line.innerHTML+'</span>';});this.target=this.DOM.el.querySelectorAll('.anim_line > span:not(.dynamic-word span)');}
if(this.anim==='charsUp'){this.from.yPercent=100;this.defaults.yPercent=0;this.defaults.stagger=0.05;this.defaults.duration=2;this.animOut?this.out.yPercent=-100:'';}
if(this.anim==='charsDown'){this.from.yPercent=-100
this.defaults.stagger=0.035;this.defaults.duration=2;this.animOut?this.out.yPercent=100:'';}
if(this.anim==='charsRight'){this.from.x=-100
this.defaults.x=0}
if(this.anim==='charsLeft'){this.from.x=100
this.defaults.x=0}
if(this.anim==='wordsUp'){this.from.yPercent=100
this.defaults.stagger=0.025;this.defaults.duration=2;this.animOut?this.out.yPercent=-100:'';}
if(this.anim==='wordsDown'){this.from.yPercent=-100
this.defaults.stagger=-0.01;this.defaults.duration=2;}
if(this.anim==='linesUp'){this.from.yPercent=100
this.defaults.stagger=0.15;this.defaults.duration=2;this.defaults.ease='expo.out';}
if(this.anim==='linesDown'){this.from.yPercent=-100
this.defaults.stagger=-0.1;this.defaults.duration=1.5;}
if(this.anim==='charsFadeOn'){this.defaults.opacity=1;this.defaults.stagger=0.01;this.defaults.duration=1.5;this.animOut?this.out.opacity=0:'';this.animOut?this.out.stagger=-0.01:'';this.animOut?this.out.ease='none':'';}
if(this.anim==='wordsFadeOn'){this.defaults.opacity=1;this.defaults.stagger=0.02;this.defaults.duration=3;}
if(this.anim==='linesFadeOn'){this.defaults.opacity=1;this.defaults.stagger=0.1;this.defaults.duration=2;}
if((this.anim==='charsScaleUp')||(this.anim==='charsScaleDown')){this.from.scaleY=0
this.defaults.scaleY=1
this.defaults.stagger=0.05;this.defaults.duration=2;}
if(this.anim==='charsRotateIn'){this.from.rotateX=-90
this.defaults.rotateX=0;this.defaults.stagger=0.03;this.defaults.duration=2;this.animOut?this.out.rotateX=90:'';}
if(this.anim==='charsFlipUp'){this.from.x=-50
this.from.yPercent=50
this.from.rotateY=180
this.from.opacity=0
this.defaults.x=0
this.defaults.yPercent=0
this.defaults.rotateY=0
this.defaults.opacity=1
this.defaults.stagger=-0.05;this.defaults.duration=1;}
if(this.anim==='charsFlipDown'){this.from.x=50
this.from.yPercent=-50
this.from.rotateY=-180
this.from.opacity=0
this.defaults.x=0
this.defaults.yPercent=0
this.defaults.rotateY=0
this.defaults.opacity=1
this.defaults.stagger=0.05;this.defaults.duration=1;}
if(this.anim==='linesMask'){var elements=this.DOM.el.querySelectorAll('.anim_line');elements.forEach(function(element){var span=element.querySelector('span');var clone=span.cloneNode(true);clone.classList.add('clone');element.appendChild(clone);});this.from.width='0%';this.defaults.width='100%';this.defaults.stagger=0.2;this.defaults.duration=2;if(this.scrub==true){this.defaults.ease='none';}
this.scroll.scrollTrigger.start='top 70%';this.scroll.scrollTrigger.end='bottom center';}
this.stagger==null?this.stagger=this.defaults.stagger:'';this.delay==null?this.delay=this.defaults.delay:'';this.duration==null?this.duration=this.defaults.duration:'';this.options=Object.assign(this.defaults,options);this.fromOptions=Object.assign(this.from,fromOptions);this.scroll=Object.assign(this.scroll,scroll);this.options.stagger=this.stagger;this.options.delay=this.delay;this.options.duration=this.duration;this.scroll.scrollTrigger.trigger=this.DOM.el;if(this.pin){this.scrub=true
this.scroll.scrollTrigger.scrub=1;if(this.pinTarget){this.scroll.scrollTrigger.pin=this.pinTarget;this.scroll.scrollTrigger.trigger=this.pinTarget;const element=document.querySelector(this.pinTarget);element.style.cssText+='transition-duration:0s';}else{this.scroll.scrollTrigger.pin=true;}}
if((this.scrub)&&(!this.pin)){this.scroll.scrollTrigger.scrub=1;}
if(this.animOut){this.out.stagger=this.options.stagger;this.out.duration=this.options.duration;this.out=Object.assign(this.out,out);}
this.render();}
render(){this.tl=gsap.timeline(this.scroll)
this.tl.fromTo(this.target,this.fromOptions,this.options);this.animOut==true?this.tl.to(this.target,this.out):'';this.tl.eventCallback("onStart",()=>{this.DOM.el.classList.add('anim_start')});}}