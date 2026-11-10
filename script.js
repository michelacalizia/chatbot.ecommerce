const P={
    coratina:{n:"Olio EVO Coratina",d:"Bottiglia 500 ml · fruttato intenso",p:12.9,e:"🫒",c:"#dfe5b8",t:"olio"},
    ogliarola:{n:"Olio EVO Ogliarola",d:"Bottiglia 750 ml · delicato",p:14.5,e:"🫒",c:"#e9e8c3",t:"olio"},
    finocchietto:{n:"Taralli al finocchietto",d:"Sacchetto 250 g · croccanti",p:3.5,e:"🥨",c:"#f3dcb4",t:"taralli"},
    cipolla:{n:"Taralli alla cipolla",d:"Sacchetto 250 g · saporiti",p:3.5,e:"🥨",c:"#f0d2a6",t:"taralli"},
    orecchiette:{n:"Orecchiette al bronzo",d:"Pacco 500 g · grano duro",p:3.9,e:"🍝",c:"#f6e6c0",t:"orecchiette"},
    friselle:{n:"Friselle integrali",d:"Confezione 400 g",p:3.2,e:"🍞",c:"#ecd4ab",t:"friselle"},
    primitivo:{n:"Primitivo di Manduria DOP",d:"Rosso 75 cl · 14,5%",p:14.5,e:"🍷",c:"#e7c3c3",t:"vino"},
    negroamaro:{n:"Negroamaro Salento IGP",d:"Rosso 75 cl · morbido",p:9.9,e:"🍷",c:"#e3c9cf",t:"vino"}
};
const cart={};const $=s=>document.querySelector(s);const log=$("#log");
const eur=v=>v.toFixed(2).replace(".",",")+" €";
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
function scroll(){log.scrollTop=log.scrollHeight}
function say(t,who){const d=document.createElement("div");d.className="m "+who;d.textContent=t;log.appendChild(d);scroll()}
function cards(ids){const w=document.createElement("div");w.className="prods";ids.forEach(id=>{const x=P[id],c=document.createElement("div");c.className="p";
    c.innerHTML='<div class="ph" style="background:'+x.c+'">'+x.e+'</div><b></b><span></span><div class="pr"><em></em><button class="add" type="button">Aggiungi</button></div>';
    c.querySelector("b").textContent=x.n;c.querySelector("span").textContent=x.d;c.querySelector("em").textContent=eur(x.p);
    const b=c.querySelector("button");b.onclick=()=>{cart[id]=(cart[id]||0)+1;upd();b.textContent="Aggiunto ✓";b.disabled=true;setTimeout(()=>{b.textContent="Aggiungi";b.disabled=false},1200);say("Ho aggiunto “"+x.n+"” al carrello.","bot")};
    w.appendChild(c)});log.appendChild(w);scroll()}
    function chips(a){const c=$("#chips");c.innerHTML="";a.forEach(t=>{const b=document.createElement("button");b.type="button";b.textContent=t;b.onclick=()=>ask(t);c.appendChild(b)})}
    function upd(){$("#cnt").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
    function summary(){const k=Object.keys(cart);if(!k.length)return"Il carrello è ancora vuoto. Vuoi che ti consigli qualcosa di buono?";
        let t=0,l=k.map(i=>{t+=P[i].p*cart[i];return cart[i]+" × "+P[i].n}).join("\n");const ship=t>=49?"Spedizione gratuita!":"Mancano "+eur(49-t)+" per la spedizione gratuita.";
        return l+"\n\nTotale: "+eur(t)+"\n"+ship}
        const by=t=>Object.keys(P).filter(i=>P[i].t===t);
        const R=[
            [/(svuot|vuot|cancell|elimin|togli).*carrell/, () => { clearCart(); return { t: "Carrello vuoto. Vuoi ripartire da un'altro prodotto?" }; }],
            [/\b(ciao|salve|buongiorno|buonasera|hey)\b/,()=>({t:"Ciao e benvenuto in masseria! 🌿 Posso consigliarti i nostri prodotti, spiegarti le spedizioni o aiutarti a comporre un cesto regalo."})],
            [/olio|evo|coratina|ogliarola|oliv/,()=>({t:"Il nostro olio extravergine viene spremuto a freddo da olive pugliesi. La Coratina è più intensa e piccante, l’Ogliarola più dolce e delicata.",p:by("olio")})],
            [/tarall/,()=>({t:"I taralli sono fatti con olio, vino bianco e farina, cotti nel forno a legna. Quale gusto preferisci?",p:by("taralli")})],
            [/orecchiett|pasta/,()=>({t:"Le orecchiette sono trafilate al bronzo, quindi tengono bene il condimento. Provale con le cime di rapa!",p:["orecchiette"]})],
            [/fris(e|a)ll/,()=>({t:"Le friselle sono perfette bagnate un istante con pomodoro, origano e un filo d’olio.",p:["friselle"]})],
            [/vino|rosso|primitivo|negroamaro|bere/,()=>({t:"Due rossi del Salento, entrambi ottimi con arrosti e formaggi stagionati.",p:by("vino")})],
            [/regal|cesto|box|pensierino/,()=>({t:"Per un regalo ti suggerisco un cesto classico: olio Coratina, taralli, orecchiette e un Primitivo. Li puoi aggiungere tutti!",p:["coratina","finocchietto","orecchiette","primitivo"]})],
            [/abbin|ricett|cucin|cena/,()=>({t:"Un classico: orecchiette con cime di rapa, olio Coratina a crudo e un bicchiere di Negroamaro. Ti faccio vedere i prodotti?",p:["orecchiette","coratina","negroamaro"]})],
            [/spedi|consegn|corriere|quando arriv|tempi/,()=>({t:"Spediamo in tutta Italia con corriere espresso in 2–4 giorni lavorativi. La spedizione costa 5,90 € ed è gratuita sopra i 49 €."})],
            [/pagament|paypal|carta|contrassegno/,()=>({t:"Puoi pagare con carta, PayPal o bonifico. Tutti i pagamenti sono protetti."})],
            [/rest|reso|rimbors|rotto|danneggiat/,()=>({t:"Se qualcosa arriva danneggiato scrivici entro 48 ore con una foto: lo sostituiamo o rimborsiamo senza problemi."})],
            [/contatt|telefon|mail|orari|umano|operator/,()=>({t:"Puoi scriverci a info@saporidipuglia.example. Rispondiamo dal lunedì al sabato, 9–18."})],
            [/carrell|totale|ordine|acquist|checkout/,()=>({t:summary()})],
            [/grazie|gentile|perfett/,()=>({t:"Con piacere! Se ti serve altro sono qui. 🌾"})]
        ];
        function ask(txt){say(txt,"me");const q=norm(txt);const hit=R.find(r=>r[0].test(q));const out=hit?hit[1]():{t:"Non disponibile, ma posso aiutarti con olio, taralli, orecchiette, spedizioni o idee regalo. Cosa ti incuriosisce?"};
        const ty=document.createElement("div");ty.className="m bot typing";ty.innerHTML="<i></i><i></i><i></i>";log.appendChild(ty);scroll();
        setTimeout(()=>{ty.remove();say(out.t,"bot");if(out.p)cards(out.p)},650)}
        $("#f").onsubmit=e=>{e.preventDefault();const v=$("#in").value.trim();if(!v)return;$("#in").value="";ask(v)};
        $("#cartBtn").onclick=()=>ask("Mostra il carrello");
        function start() {
  say("Benvenuto da Sapori di Puglia! 🌿 Sono l’assistente della masseria: ti aiuto a scegliere olio, taralli, orecchiette e vino, e a completare l’ordine.", "bot");
  chips(["Olio extravergine", "Taralli", "Orecchiette", "Vini", "Idee regalo", "Spedizioni", "Pagamenti"]);
}

function clearCart() {
  Object.keys(cart).forEach(k => delete cart[k]);
  upd();
}

function reset() {
  clearCart();
  log.innerHTML = "";
  start();
}

$("#resetBtn").onclick = reset;
// Scorrimento orizzontale con rotellina e trascinamento del mouse


document.addEventListener("wheel", e => {
  const el = e.target.closest(".chips");
  if (!el || el.scrollWidth <= el.clientWidth) return;
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}, { passive: false });




start();