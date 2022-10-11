import{a as V,b as W,r,o as R,e as U,f as o,w as _,v as S,t as b,h as A,u as F,i as G,j as E}from"./entry.3068155e.js";const K=""+globalThis.__publicAssetsURL("load.png"),H={class:"flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]"},M=o("p",{class:"text-lg text-gray-300"},"Lamp Display Emulator by KK",-1),T=o("a",{class:"mb-5 text-xs text-blue-400 underline",href:"https://github.com/KK-mp4/Lamp-Display-Emulator#readme",target:"_blank",rel:"noopener noreferrer"},"More info in GitHub",-1),$={class:"flex flex-wrap flex-row justify-center"},z={class:"w-[300px] mb-5"},O=o("p",{class:"mb-1 text-sm text-gray-300"},"Lamp texture resolution:",-1),J=E('<option value="1x1">1x1</option><option value="2x2">2x2</option><option value="4x4">4x4</option><option value="8x8">8x8</option><option value="16x16">16x16</option><option value="32x32">32x32</option>',6),q=[J],Q={class:"mb-1 text-sm text-gray-300"},X={class:"w-[300px] mb-5"},Y=o("p",{class:"mb-1 text-sm text-gray-300"},"Dithering algorithm:",-1),Z=E('<option value="None">None</option><option value="Random noise">Random noise WIP</option><option value="Bayer 2x2">Bayer 2x2 WIP</option><option value="Bayer 4x4">Bayer 4x4 WIP</option><option value="Bayer 8x8">Bayer 8x8 WIP</option><option value="Floyd-Steinberg">Floyd-Steinberg WIP</option>',6),ee=[Z],te={class:"block mb-2 text-sm font-medium text-gray-300"},oe={key:0,class:"animate-spin h-7 w-7 top-52 absolute",src:K},ae={class:"w-full h-full flex justify-center",style:{"image-rendering":"pixelated"}},ne=["src"],re=V({__name:"index",setup(se){W({title:"Generator"});const i=r("16x16"),I=r("");let n=16;const s=r(512);let p;const B=r("None"),m=r(128);let x=r(!1),c=document.createElement("canvas");c.width=16,c.height=16;let C=c.getContext("2d");async function D(){const a=Date.now();x.value=!0,j();const e=new Image;e.src=p,await new Promise(l=>{e.onload=()=>l(1)});let t=e.width,u=e.height;t>s.value&&(t=s.value),u>s.value&&(u=s.value);const f=document.createElement("canvas");f.width=t,f.height=u;const P=f.getContext("2d");P.drawImage(e,0,0,e.width,e.height);const h=new Image;h.src="./"+i.value+"/redstone_lamp_off.png",await new Promise(l=>{h.onload=()=>l(1)});const w=new Image;w.src="./"+i.value+"/redstone_lamp_on.png",await new Promise(l=>{w.onload=()=>l(1)});const g=document.createElement("canvas");g.width=t*n,g.height=u*n;const L=g.getContext("2d");for(let l=0;l<u;l++)for(let d=0;d<t;d++){const y=P.getImageData(d,l,1,1).data;.2126*y[0]+.7152*y[1]+.0722*y[2]>=m.value?L.drawImage(w,d*n,l*n):L.drawImage(h,d*n,l*n)}I.value=g.toDataURL(),x.value=!1,k(),console.log(Date.now()-a+"ms - Calculation time")}async function N(a){if(a.target.files&&a.target.files[0]){let e=new FileReader;e.readAsDataURL(a.target.files[0]),e.onload=t=>{p=t.target.result,D()}}}async function v(){i.value==="1x1"?(n=1,s.value=8192):i.value==="2x2"?(n=2,s.value=4096):i.value==="4x4"?(n=4,s.value=2048):i.value==="8x8"?(n=8,s.value=1024):i.value==="32x32"?(n=32,s.value=256):(n=16,s.value=512),p&&D()}async function j(){const a=new Image;a.src="./faviconLoad.ico",await new Promise(t=>{a.onload=()=>t(1)}),C.drawImage(a,0,0,16,16),document.getElementById("favicon").setAttribute("href",c.toDataURL()),history.replaceState(null,null,window.location.hash=="#1"?"#0":"#1")}async function k(){const a=new Image;a.src="./favicon.ico",await new Promise(t=>{a.onload=()=>t(1)}),C.drawImage(a,0,0,16,16),document.getElementById("favicon").setAttribute("href",c.toDataURL()),history.replaceState(null,null,window.location.hash=="#1"?"#0":"#1")}return(a,e)=>(R(),U("div",H,[M,T,o("div",$,[o("div",z,[O,_(o("select",{"onUpdate:modelValue":e[0]||(e[0]=t=>i.value=t),class:"w-[90%] mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400",onChange:e[1]||(e[1]=t=>v())},q,544),[[S,i.value]]),o("p",Q,"PNG or JPG ("+b(s.value)+"x"+b(s.value)+"px max)",1),o("input",{class:"block w-[90%] text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400",type:"file",accept:".png, .jpg",onChange:e[2]||(e[2]=t=>N(t))},null,32)]),o("div",X,[Y,_(o("select",{"onUpdate:modelValue":e[3]||(e[3]=t=>B.value=t),class:"w-[90%] mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400",onChange:e[4]||(e[4]=t=>v())},ee,544),[[S,B.value]]),o("label",te,"Threshold: "+b(m.value),1),_(o("input",{"onUpdate:modelValue":e[5]||(e[5]=t=>m.value=t),type:"range",min:"0",max:"255",class:"w-[90%] h-2 rounded-lg appearance-none cursor-pointer bg-gray-700",onChange:e[6]||(e[6]=t=>v())},null,544),[[A,m.value]])])]),F(x)?(R(),U("img",oe)):G("",!0),o("div",ae,[o("img",{src:I.value,class:"w-[75%]"},null,8,ne)])]))}});export{re as default};
