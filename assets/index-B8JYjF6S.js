var f=Object.defineProperty;var y=(s,t,e)=>t in s?f(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>y(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const w="/doctor-duck/assets/duck-CYmu2Z3f.png";var x=Object.defineProperty,v=(s,t,e)=>t in s?x(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,u=(s,t,e)=>v(s,typeof t!="symbol"?t+"":t,e);class h{constructor(t,e){u(this,"x"),u(this,"y"),this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}set(t,e){this.x=t,this.y=e}add(t){return new h(this.x+t.getX(),this.y+t.getY())}subtract(t){return new h(this.x-t.getX(),this.y-t.getY())}multiply(t){return new h(this.x*t,this.y*t)}divide(t){return new h(this.x/t,this.y/t)}dot(t){return this.x*t.getX()+this.y*t.getY()}cross(t){return this.x*t.getY()-this.y*t.getX()}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){const t=this.magnitude();return new h(this.x/t,this.y/t)}clone(){return new h(this.x,this.y)}equals(t){return this.x===t.getX()&&this.y===t.getY()}toString(){return`(${this.x}, ${this.y})`}distance(t){const e=this.x-t.getX(),r=this.y-t.getY();return Math.sqrt(e*e+r*r)}angle(){return Math.atan2(this.y,this.x)}rotate(t){const e=Math.cos(t),r=Math.sin(t);return new h(this.x*e-this.y*r,this.x*r+this.y*e)}lerp(t,e){return new h(this.x+e*(t.getX()-this.x),this.y+e*(t.getY()-this.y))}}class b{constructor(){i(this,"position",new h(0,0));i(this,"bindTarget",null);i(this,"width",250);i(this,"height",50);i(this,"xPadding",16);i(this,"yPadding",16);i(this,"offsetX",0);i(this,"offsetY",-150);i(this,"message",null);i(this,"isOpen",!1);i(this,"isOpening",!1);i(this,"isClosing",!1);i(this,"opacityFactor",95);i(this,"fontSize",24);i(this,"opacity",0);i(this,"backgroundColor","cccccc")}open(t){this.isClosing||this.isOpening||this.isOpen||(this.isOpening=!0,this.isOpen=!0,this.message=t)}close(){this.isClosing||this.isOpening||(this.isClosing=!0)}bind(t){this.bindTarget=t}numberToHex(t,e=0,r=100){const n=(t-e)/(r-e);return Math.floor(255*n).toString(16)}update(t){if(this.bindTarget&&(this.position=this.bindTarget.position.clone()),this.isClosing){this.opacity-=t/1e3*this.opacityFactor,this.opacity<=0&&(this.isOpen=!1,this.message=null,this.isClosing=!1);return}this.isOpen&&!this.isClosing&&this.isOpening&&(this.opacity+=t/1e3*this.opacityFactor,this.opacity>=100&&(this.opacity=100,this.isOpening=!1))}draw(t){if(this.message&&this.isOpen){const e=this.numberToHex(this.opacity).padStart(2,"0"),r=this.position.getX()+this.offsetX-this.width/2,n=this.position.getY()+this.offsetY;t.beginPath(),t.roundRect(r-this.xPadding,n-this.yPadding,this.width+this.xPadding,this.height+this.yPadding,15),t.closePath(),t.fillStyle=`#${this.backgroundColor}${e}`,t.strokeStyle=`#000000${e}`,t.lineWidth=2,t.stroke(),t.fill(),t.save(),t.font=`${this.fontSize}px regular Times New Roman`,t.textAlign="center",t.textRendering="geometricPrecision",t.fillStyle=`#000000${e}`,t.fillText(this.message,r+this.width/2-this.xPadding/2,n+this.height/2);const a=t.measureText(this.message);this.width=a.width,t.restore()}}}const S=["Ты хороший, у тебя все получится","Я в тебя верю","Рада видеть, как ты стараешься стать лучше","Ты способен на большее, чем ты думаешь","Твои усилия не пройдут даром","Каждый день ты становишься лучше","Твои успехи вдохновляют окружающих","Ты силен и можешь преодолеть любые трудности","Не сдавайся, впереди светлое будущее","Ты заслуживаешь лучшего, и у тебя это будет","Каждая маленькая победа ведет к большому успеху","Ты на правильном пути, продолжай в том же духе","Твоя решимость восхищает меня","Ты пример для многих","Твои способности впечатляют","Ты делаешь этот мир лучше","Ты достоин всех похвал","Ты справишься с любой задачей","Ты уникален и это твоя сила","Ты настоящий друг и замечательный человек","Ты находишь решения там, где другие видят проблемы","Ты наделен великим потенциалом","Ты даришь радость и свет людям вокруг","Ты меня вдохновляешь своей настойчивостью","Ты всегда находишь правильные слова","Ты приносишь счастье людям","Ты великолепен в том, что делаешь","Ты сильнее, чем ты думаешь","Ты умеешь видеть красоту в мелочах","Ты умеешь слушать и понимать","Ты вселяешь уверенность в других","Ты настоящий творец своей судьбы","Ты находишь мудрость в каждом дне","Ты всегда помогаешь тем, кто в этом нуждается","Ты прекрасный человек, который заслуживает счастья","Ты делаешь этот мир лучше своим присутствием","Ты вдохновляешь других на подвиги","Ты всегда готов прийти на помощь","Ты излучаешь позитивную энергию","Ты наделен великим талантом","Ты прекрасный пример для подражания","Ты уникален в своем роде","Ты всегда стремишься к лучшему","Ты меняешь мир к лучшему своими действиями","Ты заслуживаешь только самого лучшего","Ты приносишь радость и свет людям вокруг","Ты человек с большим сердцем","Ты всегда видишь в людях только хорошее","Ты настоящий оптимист","Ты умеешь радоваться каждому дню","Ты делаешь этот мир ярче","Ты прекрасный слушатель","Ты всегда готов поддержать","Ты наделен невероятной силой духа","Ты находишь радость в простых вещах","Ты умеешь вдохновлять и мотивировать","Ты человек с большим потенциалом","Ты делаешь этот мир лучше своим присутствием","Ты всегда стремишься к совершенству","Ты излучаешь доброту и теплоту","Ты всегда находишь выход из любой ситуации","Ты прекрасный человек, который заслуживает счастья","Ты умеешь находить красоту в повседневных вещах","Ты всегда стремишься к новым знаниям","Ты наделен великим потенциалом","Ты умеешь радовать окружающих своим присутствием","Ты настоящий друг и поддержка","Ты находишь радость в каждом дне","Ты всегда готов прийти на помощь","Ты человек с большим сердцем","Ты наделен великим талантом","Ты всегда видишь в людях только хорошее","Ты настоящий оптимист","Ты умеешь радоваться каждому дню","Ты делаешь этот мир ярче","Ты прекрасный слушатель","Ты всегда готов поддержать","Ты наделен невероятной силой духа","Ты находишь радость в простых вещах","Ты умеешь вдохновлять и мотивировать","Ты человек с большим потенциалом","Ты делаешь этот мир лучше своим присутствием","Ты всегда стремишься к совершенству","Ты излучаешь доброту и теплоту","Ты всегда находишь выход из любой ситуации","Ты прекрасный человек, который заслуживает счастья","Ты умеешь находить красоту в повседневных вещах","Ты всегда стремишься к новым знаниям","Ты наделен великим потенциалом","Ты умеешь радовать окружающих своим присутствием","Ты настоящий друг и поддержка","Ты находишь радость в каждом дне","Ты всегда готов прийти на помощь","Ты человек с большим сердцем","Ты наделен великим талантом"],l={idle:{row:0,framesCount:6},idle_reversed:{row:1,framesCount:6},walk:{row:2,framesCount:8},walk_reversed:{row:3,framesCount:8},jump:{row:4,framesCount:6},jump_reversed:{row:5,framesCount:6}};class C{constructor(){i(this,"position",new h(0,0));i(this,"velocity",new h(0,0));i(this,"targetPoint",new h(0,0));i(this,"image");i(this,"currentFrame",0);i(this,"frameWidth",128);i(this,"frameHeight",128);i(this,"animationUpdateRateMS",1e3/24);i(this,"lastFrameElapsedTimeMS",0);i(this,"currentAnimationState","walk");this.image=new Image(200,400),this.image.src=w}setAnimationState(t){this.currentAnimationState=t,this.currentFrame=0}draw(t,e){const r=this.currentFrame*this.frameWidth,n=l[this.currentAnimationState].row*this.frameHeight,a=this.frameWidth,d=this.frameHeight;t.drawImage(this.image,r,n,a,d,this.position.getX()-64,this.position.getY()-64,128,128),this.lastFrameElapsedTimeMS+=e,this.lastFrameElapsedTimeMS>=this.animationUpdateRateMS&&(this.lastFrameElapsedTimeMS=0,this.currentFrame++,this.currentFrame>=l[this.currentAnimationState].framesCount&&(this.currentFrame=0))}moveTo(t,e){this.targetPoint.set(t,e),this.position.subtract(this.targetPoint).getX()<0?this.setAnimationState("walk"):this.setAnimationState("walk_reversed")}update(t){const e=this.targetPoint.subtract(this.position).normalize().multiply(this.velocity.getX()*(t/1e3));this.targetPoint.subtract(this.position).magnitude()>5?this.position=this.position.add(e):this.currentAnimationState==="walk"?this.setAnimationState("idle"):this.currentAnimationState==="walk_reversed"&&this.setAnimationState("idle_reversed")}}class P{constructor(){i(this,"duck",new C);i(this,"_canvas");i(this,"_ctx");this._canvas=this.createCanvasElement();const t=this._canvas.getContext("2d");if(!t)throw new Error("Cannot get canvas context!");this._ctx=t}get ctx(){return this._ctx}createCanvasElement(){const t=document.createElement("canvas");return t.width=window.innerWidth,t.height=window.innerHeight,t.style.cssText="display: block;",t}mount(t){t.appendChild(this._canvas)}update(t){this.duck.update(t)}render(t){this.duck.draw(this._ctx,t)}}const o=new P;o.mount(document.body);o.duck.position.setX(-128);o.duck.position.setY(o.ctx.canvas.height/2);o.duck.velocity.set(350,0);o.duck.moveTo(o.ctx.canvas.width/2,o.ctx.canvas.height/2);const c=new b;c.bind(o.duck);let g=Date.now();function k(s){o.ctx.clearRect(0,0,o.ctx.canvas.width,o.ctx.canvas.height),o.render(s),c.draw(o.ctx)}function O(s){o.update(s),c.update(s)}function p(){const s=Date.now(),t=s-g;g=s,k(t),O(t),window.requestAnimationFrame(p)}c.open("Привет, я доктор-утка :)");setTimeout(()=>{c.close()},3500);const m=S;o.ctx.canvas.addEventListener("mousedown",()=>{const s=Math.floor(Math.random()*m.length);c.open(m[s]),setTimeout(()=>{c.close()},3500)});p();
