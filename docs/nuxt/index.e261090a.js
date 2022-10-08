import{a as D,b as I,r as x,o as E,e as P,w as R,v as S,f as i,t as _,u as y,h as U}from"./entry.dbc4630a.js";const j={class:"flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]"},k=i("p",{class:"text-lg text-gray-300"},"Lamp Display Emulator by KK",-1),G=i("a",{class:"mb-5 text-xs text-blue-400 underline",href:"https://github.com/KK-mp4/Lamp-Display-Emulator#readme",target:"_blank",rel:"noopener noreferrer"},"More info in GitHub",-1),K=U('<option value="1x1">1x1</option><option value="2x2">2x2</option><option value="4x4">4x4</option><option value="8x8">8x8</option><option value="16x16">16x16</option>',5),L=[K],B={class:"mt-1 text-sm text-gray-300"},H={class:"w-full h-full mt-5 flex justify-center",style:{"image-rendering":"pixelated"}},N=["src"],O=D({__name:"index",setup(V){I({title:"Generator"});const l=x("16x16"),f=x("");let o=16,n=x(512),u;async function v(){const t=new Image;t.src=u,await new Promise(s=>{t.onload=()=>s(1)});let e=t.width,a=t.height;e>n.value&&(e=n.value),a>n.value&&(a=n.value);const d=document.createElement("canvas");d.width=e,d.height=a;const h=d.getContext("2d");h.drawImage(t,0,0,t.width,t.height);const g=new Image;g.src="./"+l.value+"/redstone_lamp_off.png",await new Promise(s=>{g.onload=()=>s(1)});const m=new Image;m.src="./"+l.value+"/redstone_lamp_on.png",await new Promise(s=>{m.onload=()=>s(1)});const c=document.createElement("canvas");c.width=e*o,c.height=a*o;const w=c.getContext("2d");for(let s=0;s<a;s++)for(let r=0;r<e;r++){const p=h.getImageData(r,s,1,1).data;.2126*p[0]+.7152*p[1]+.0722*p[2]>=.5?w.drawImage(m,r*o,s*o):w.drawImage(g,r*o,s*o)}f.value=c.toDataURL()}async function b(t){if(t.target.files&&t.target.files[0]){let e=new FileReader;e.readAsDataURL(t.target.files[0]),e.onload=a=>{u=a.target.result,v()}}}async function C(){l.value==="1x1"?(o=1,n.value=8192):l.value==="2x2"?(o=2,n.value=4096):l.value==="4x4"?(o=4,n.value=2048):l.value==="8x8"?(o=8,n.value=1024):(o=16,n.value=512),u&&v()}return(t,e)=>(E(),P("div",j,[k,G,R(i("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>l.value=a),class:"w-64 mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400",onChange:e[1]||(e[1]=a=>C())},L,544),[[S,l.value]]),i("input",{class:"block text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400",type:"file",accept:".png, .jpg",onChange:e[2]||(e[2]=a=>b(a))},null,32),i("p",B,"PNG or JPG ("+_(y(n))+"x"+_(y(n))+"px max)",1),i("div",H,[i("img",{src:f.value,class:"w-[75%]"},null,8,N)])]))}});export{O as default};
