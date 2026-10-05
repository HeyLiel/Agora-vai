
const values=window.CHALLENGE_VALUES, KEY="desafio10000-site-v2";
let state=JSON.parse(localStorage.getItem(KEY)||"null");
if(!Array.isArray(state)||state.length!==values.length) state=Array(values.length).fill(false);
const brl=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid=document.querySelector("#grid");
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function render(){
 grid.innerHTML="";
 values.forEach((v,i)=>{
  const b=document.createElement("button"); b.className="cell"+(state[i]?" done":"");
  b.textContent="R$ "+v;
  b.title=state[i]?"Desmarcar":"Marcar como guardado";
  b.onclick=()=>{state[i]=!state[i];save();render()};
  grid.appendChild(b);
 });
 const total=values.reduce((a,b)=>a+b,0), saved=values.reduce((a,v,i)=>a+(state[i]?v:0),0);
 const done=state.filter(Boolean).length,pct=total?saved/total*100:0;
 document.querySelector("#saved").textContent=brl(saved);
 document.querySelector("#remaining").textContent=brl(total-saved);
 document.querySelector("#percent").textContent=pct.toFixed(1).replace(".",",")+"%";
 document.querySelector("#count").textContent=`${done} / ${values.length}`;
 document.querySelector("#bar").style.width=pct+"%";
}
document.querySelector("#all").onclick=()=>{state=values.map(()=>true);save();render()};
document.querySelector("#clear").onclick=()=>{state=values.map(()=>false);save();render()};
document.querySelector("#reset").onclick=()=>{if(confirm("Zerar todo o progresso?")){state=values.map(()=>false);save();render()}};
const modal=document.querySelector("#modal");
document.querySelector("#loginBtn").onclick=()=>modal.classList.remove("hidden");
document.querySelector("#close").onclick=()=>modal.classList.add("hidden");
document.querySelector("#demoLogin").onclick=()=>{alert("Demonstração: o login online será conectado na próxima etapa.");modal.classList.add("hidden")};
render();
