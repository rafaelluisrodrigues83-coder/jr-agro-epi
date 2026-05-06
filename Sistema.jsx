import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// BASE DE DADOS RICA
// ══════════════════════════════════════════════════════════════════════════════
const CLIENTES = [
  {
    id:1, nome:"Coplacana — Piracicaba", segmento:"Coop. Canavieira",
    cidade:"Piracicaba, SP", telefone:"(19) 3401-2200",
    contato:"João Silva", cargo:"Resp. SST", email:"sst@coplacana.com.br",
    funcionarios:420, hectares:18500, cultura:"Cana-de-açúcar",
    status:"ativo", desde:"Fev/2024", ticket:32000, cor:"#1B5E20",
    trabalhadores:[
      {id:101,nome:"Carlos Mendes",    funcao:"Aplicador de defensivos",  setor:"Campo",    admissao:"2022-03-10"},
      {id:102,nome:"Ana Paula Ramos",  funcao:"Operadora de colhedora",   setor:"Máquinas", admissao:"2021-07-15"},
      {id:103,nome:"José Ferreira",    funcao:"Técnico de segurança",     setor:"SST",      admissao:"2020-01-08"},
      {id:104,nome:"Marcos Oliveira",  funcao:"Aplicador de defensivos",  setor:"Campo",    admissao:"2023-05-20"},
      {id:105,nome:"Sandra Lima",      funcao:"Colhedora manual",         setor:"Campo",    admissao:"2022-11-03"},
      {id:106,nome:"Ricardo Costa",    funcao:"Operador de trator",       setor:"Máquinas", admissao:"2021-04-18"},
    ],
    historico:[
      {data:"10/03/2025",evento:"Entrega mensal",          valor:32000,itens:"Respiradores ×20 • Macacões ×15 • Luvas ×40"},
      {data:"08/02/2025",evento:"Troca preventiva de CA",  valor:8500, itens:"Respiradores ×10 • Filtros ×30"},
      {data:"15/01/2025",evento:"Entrega mensal",          valor:29000,itens:"Luvas ×60 • Óculos ×12 • Botinas ×8"},
    ],
  },
  {
    id:2, nome:"Coopercitrus — Mogi Mirim", segmento:"Coop. Citrus/Grãos",
    cidade:"Mogi Mirim, SP", telefone:"(19) 3862-1100",
    contato:"Maria Costa", cargo:"Gerente de Campo", email:"maria.costa@coopercitrus.com.br",
    funcionarios:145, hectares:6800, cultura:"Laranja • Soja • Milho",
    status:"ativo", desde:"Mai/2024", ticket:12500, cor:"#2E7D32",
    trabalhadores:[
      {id:201,nome:"Paulo Souza",    funcao:"Aplicador de defensivos",setor:"Campo",    admissao:"2023-02-14"},
      {id:202,nome:"Fernanda Alves", funcao:"Colhedora de laranja",   setor:"Campo",    admissao:"2022-08-01"},
      {id:203,nome:"Roberto Nunes",  funcao:"Operador de máquinas",   setor:"Máquinas", admissao:"2021-12-10"},
      {id:204,nome:"Carla Martins",  funcao:"Auxiliar de campo",      setor:"Campo",    admissao:"2024-01-20"},
    ],
    historico:[
      {data:"05/03/2025",evento:"Entrega safra citrus", valor:14200,itens:"Luvas ×30 • Óculos ×10 • Protetor solar ×20"},
      {data:"20/01/2025",evento:"Entrega mensal",       valor:11800,itens:"Respiradores ×8 • Macacões ×6"},
    ],
  },
  {
    id:3, nome:"Holambra Coop. Agroin.", segmento:"Coop. Flores/Grãos",
    cidade:"Holambra, SP", telefone:"(19) 2144-1232",
    contato:"Pedro Holanda", cargo:"Resp. Compras", email:"compras@holambra.coop.br",
    funcionarios:280, hectares:12000, cultura:"Flores • Soja • Milho • Algodão",
    status:"atencao", desde:"Ago/2024", ticket:22000, cor:"#558B2F",
    trabalhadores:[
      {id:301,nome:"Tulipa van der Berg",funcao:"Aplicador de defensivos",setor:"Flores",  admissao:"2022-06-15"},
      {id:302,nome:"Henrique Swart",     funcao:"Operador de estufa",     setor:"Flores",  admissao:"2023-03-08"},
      {id:303,nome:"Luciana Derks",      funcao:"Colhedora de flores",    setor:"Campo",   admissao:"2021-09-22"},
      {id:304,nome:"André Molan",        funcao:"Técnico agrícola",       setor:"Campo",   admissao:"2020-11-30"},
      {id:305,nome:"Beatriz Serrarens",  funcao:"Auxiliar de produção",   setor:"Flores",  admissao:"2024-02-10"},
    ],
    historico:[
      {data:"01/03/2025",evento:"Entrega mensal",              valor:23500,itens:"Macacões ×20 • Luvas ×35 • Óculos ×8"},
      {data:"14/02/2025",evento:"⚠️ CA vencido — substituição",valor:4200, itens:"Respiradores ×6 (urgência)"},
    ],
  },
  {
    id:4, nome:"Friuna Alimentos", segmento:"Frigorífico",
    cidade:"Piracicaba, SP", telefone:"(19) 9818-20899",
    contato:"Ana Souza", cargo:"Coord. SST", email:"daiane.monteiro@friuna.com.br",
    funcionarios:310, hectares:0, cultura:"Abate de suínos",
    status:"critico", desde:"Out/2024", ticket:28000, cor:"#C62828",
    trabalhadores:[
      {id:401,nome:"Diego Ribeiro",    funcao:"Operador de linha de abate",setor:"Produção", admissao:"2022-04-05"},
      {id:402,nome:"Patricia Boiago",  funcao:"Técnica de segurança",      setor:"SST",      admissao:"2021-08-18"},
      {id:403,nome:"Wellington Sousa", funcao:"Operador de câmara fria",   setor:"Logística",admissao:"2023-07-12"},
      {id:404,nome:"Camila Neto",      funcao:"Auxiliar de processamento", setor:"Produção", admissao:"2024-03-01"},
    ],
    historico:[
      {data:"08/03/2025",evento:"Entrega mensal",                  valor:27000,itens:"Luvas nitrílicas ×80 • Botas ×12 • Aventais ×15"},
      {data:"20/02/2025",evento:"⛔ CA VENCIDO — emergencial",      valor:9800, itens:"Respiradores ×15 (vencidos há 3 dias)"},
    ],
  },
];

const EPIS = [
  {id:1,nome:"Respirador filtro químico", ca:"CA-12345",validadeCA:"2025-12-01",vidaUsos:30, preco:85, categoria:"Respiratória"},
  {id:2,nome:"Luvas nitrílicas longas",   ca:"CA-23456",validadeCA:"2026-03-15",vidaUsos:20, preco:18, categoria:"Mãos"},
  {id:3,nome:"Macacão impermeável Tyvek", ca:"CA-34567",validadeCA:"2025-11-20",vidaUsos:15, preco:42, categoria:"Corporal"},
  {id:4,nome:"Óculos ampla visão",        ca:"CA-45678",validadeCA:"2026-06-01",vidaUsos:50, preco:22, categoria:"Visual"},
  {id:5,nome:"Botina bico de aço",        ca:"CA-56789",validadeCA:"2026-09-10",vidaUsos:200,preco:145,categoria:"Pés"},
  {id:6,nome:"Protetor auricular plug",   ca:"CA-67890",validadeCA:"2026-01-30",vidaUsos:60, preco:8,  categoria:"Auditiva"},
];

const ESTOQUE = [
  {epiId:1,estoque:8, minimo:15,diasRepos:7},
  {epiId:2,estoque:22,minimo:30,diasRepos:3},
  {epiId:3,estoque:4, minimo:20,diasRepos:5},
  {epiId:4,estoque:18,minimo:10,diasRepos:7},
  {epiId:5,estoque:31,minimo:12,diasRepos:10},
  {epiId:6,estoque:9, minimo:20,diasRepos:5},
];

const gerarRegistros = () => {
  const base = new Date(); let id=1; const regs=[];
  CLIENTES.forEach(c => {
    c.trabalhadores.forEach(t => {
      const episTrab = c.segmento.includes("Frigorífico") ? [2,4,5,6]
        : c.segmento.includes("Flores") ? [1,2,3,4]
        : [1,2,3,4];
      episTrab.forEach(epiId => {
        const epi = EPIS.find(e=>e.id===epiId);
        const f = c.status==="critico"?0.93:c.status==="atencao"?0.72:0.48;
        const dt = new Date(base); dt.setDate(dt.getDate()-Math.floor(Math.random()*60+10));
        const ul = new Date(base); ul.setDate(ul.getDate()-Math.floor(Math.random()*7));
        regs.push({
          id:id++, clienteId:c.id, trabId:t.id, trabNome:t.nome, funcao:t.funcao,
          epiId, dataEntrega:dt.toISOString().split("T")[0],
          usos:Math.floor(epi.vidaUsos*f*(0.6+Math.random()*0.4)),
          ultimoUso:ul.toISOString().split("T")[0], status:"ativo",
        });
      });
    });
  });
  return regs;
};

// ── Utils ─────────────────────────────────────────────────────────────────────
const diasAte = d => Math.ceil((new Date(d)-new Date())/86400000);
const pct     = (v,m) => Math.min(Math.round(v/m*100),100);
const fmtBRL  = v => `R$ ${v.toLocaleString("pt-BR")}`;
const corUso  = p => p>=90?"#C62828":p>=70?"#E65100":p>=50?"#F9A825":"#2E7D32";
const corCA   = d => d<0?"#C62828":d<=30?"#E65100":d<=60?"#F9A825":"#2E7D32";
const labelCA = d => d<0?"VENCIDO":d<=30?"Urgente":d<=60?"Atenção":"OK";
const COR_STATUS = {ativo:"#2E7D32",atencao:"#E65100",critico:"#C62828"};
const LABEL_STATUS = {ativo:"✅ Ativo",atencao:"⚠️ Atenção",critico:"⛔ Crítico"};

// ── Componentes base ──────────────────────────────────────────────────────────
const Badge = ({label,color}) => (
  <span style={{background:color+"20",color,border:`1px solid ${color}40`,
    borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
    {label}
  </span>
);

const Barra = ({v,max,cor}) => (
  <div style={{background:"#ECEFF1",borderRadius:4,height:7,overflow:"hidden"}}>
    <div style={{width:`${pct(v,max)}%`,background:cor||corUso(pct(v,max)),height:"100%",
      borderRadius:4,transition:"width 0.6s ease"}}/>
  </div>
);

const Card = ({children,style={},onClick}) => (
  <div onClick={onClick} style={{background:"#fff",borderRadius:12,padding:16,
    boxShadow:"0 2px 10px rgba(0,0,0,0.07)",
    cursor:onClick?"pointer":"default",transition:"all 0.18s",...style}}
    onMouseEnter={e=>{if(onClick){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.13)";}}}
    onMouseLeave={e=>{if(onClick){e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.07)";}}}
  >{children}</div>
);

const Voltar = ({onClick,label="← Voltar"}) => (
  <button onClick={onClick} style={{background:"#E8F5E9",color:"#1B5E20",border:"none",
    borderRadius:8,padding:"7px 16px",fontSize:12,cursor:"pointer",fontWeight:700,
    display:"flex",alignItems:"center",gap:6,alignSelf:"flex-start"}}>
    {label}
  </button>
);

// ── DETALHE DO TRABALHADOR ────────────────────────────────────────────────────
const DetalhesTrabalhador = ({trab, regs, onVoltar}) => {
  const meus = regs.filter(r=>r.trabId===trab.id);
  return (
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:14}}>
      <Voltar onClick={onVoltar}/>

      {/* Perfil */}
      <div style={{background:"linear-gradient(135deg,#1B5E20,#388E3C)",borderRadius:14,
        padding:22,color:"#fff",display:"flex",gap:16,alignItems:"center"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(255,255,255,0.15)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>👷</div>
        <div>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.3px"}}>{trab.nome}</div>
          <div style={{fontSize:13,color:"#A5D6A7",marginTop:3}}>{trab.funcao} — {trab.setor}</div>
          <div style={{fontSize:12,color:"#C8E6C9",marginTop:5}}>
            📅 Admissão: {trab.admissao} &nbsp;•&nbsp; 🛡️ {meus.length} EPI(s) sob responsabilidade
          </div>
        </div>
      </div>

      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>🛡️ EPIs sob responsabilidade</div>

      {meus.map((r,i) => {
        const epi = EPIS.find(e=>e.id===r.epiId);
        const d = diasAte(epi?.validadeCA);
        const p = pct(r.usos, epi?.vidaUsos);
        const st = d<0||p>=90?"critico":d<=30||p>=70?"urgente":d<=60||p>=50?"atencao":"ok";
        const cores = {critico:"#C62828",urgente:"#E65100",atencao:"#F9A825",ok:"#2E7D32"};
        const msgs  = {critico:"Trocar agora — risco de multa",urgente:"Agende a troca esta semana",
          atencao:"Troca prevista em breve",ok:"Em dia — sem ação necessária"};
        return (
          <div key={i} style={{background:"#fff",borderRadius:12,padding:16,
            borderLeft:`5px solid ${cores[st]}`,boxShadow:"0 2px 8px rgba(0,0,0,0.07)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              flexWrap:"wrap",gap:8,marginBottom:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#37474F"}}>{epi?.nome}</div>
                <div style={{fontSize:11,color:"#78909C",marginTop:2}}>
                  {epi?.ca} &nbsp;•&nbsp; Entregue em {r.dataEntrega}
                </div>
              </div>
              <Badge label={msgs[st]} color={cores[st]}/>
            </div>
            {st!=="ok" && (
              <div style={{background:cores[st]+"12",borderRadius:8,padding:"6px 12px",
                fontSize:11,color:cores[st],fontWeight:600,marginBottom:12}}>
                {st==="critico"&&"A JR Agro EPI já foi avisada e entrará em contato para substituição imediata."}
                {st==="urgente"&&"A JR Agro EPI entrará em contato esta semana para agendar a troca."}
                {st==="atencao"&&"Fique tranquilo — a JR Agro EPI avisará com antecedência quando chegar a hora."}
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div style={{fontSize:10,color:"#78909C",marginBottom:5}}>
                  Validade CA &nbsp;<strong style={{color:corCA(d)}}>{epi?.validadeCA} ({d}d)</strong>
                </div>
                <Barra v={Math.max(0,d)} max={365} cor={corCA(d)}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"#78909C",marginBottom:5}}>
                  Desgaste &nbsp;<strong style={{color:corUso(p)}}>{r.usos}/{epi?.vidaUsos} usos ({p}%)</strong>
                </div>
                <Barra v={r.usos} max={epi?.vidaUsos}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── DETALHE DA COOPERATIVA ────────────────────────────────────────────────────
const DetalhesCooperativa = ({cli, regs, onVoltar}) => {
  const [trabSel, setTrabSel] = useState(null);
  const meus = regs.filter(r=>r.clienteId===cli.id);
  const venc = meus.filter(r=>diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA)<0);
  const urg  = meus.filter(r=>{const d=diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA);return d>=0&&d<=30;});
  const total= cli.historico.reduce((s,h)=>s+h.valor,0);

  if(trabSel) return (
    <DetalhesTrabalhador trab={trabSel} regs={meus}
      onVoltar={()=>setTrabSel(null)}/>
  );

  return (
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:14}}>
      <Voltar onClick={onVoltar} label="← Voltar para lista"/>

      {/* Header cooperativa */}
      <div style={{background:`linear-gradient(140deg,${cli.cor},${cli.cor}BB)`,
        borderRadius:14,padding:22,color:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",
          alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
          <div>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>{cli.nome}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:4}}>
              {cli.segmento} &nbsp;•&nbsp; {cli.cidade}
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:3}}>
              📞 {cli.telefone} &nbsp;•&nbsp; ✉️ {cli.email}
            </div>
            <div style={{marginTop:10}}>
              <Badge label={LABEL_STATUS[cli.status]} color={COR_STATUS[cli.status]}/>
            </div>
          </div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {[
              {v:cli.funcionarios,l:"Funcionários"},
              {v:cli.hectares>0?`${cli.hectares.toLocaleString()} ha`:"—",l:"Área produtiva"},
              {v:fmtBRL(cli.ticket),l:"Ticket/mês"},
            ].map((k,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800}}>{k.v}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.2)",
          fontSize:12,color:"rgba(255,255,255,0.75)",display:"flex",gap:24,flexWrap:"wrap"}}>
          <span>🌾 <strong style={{color:"#fff"}}>{cli.cultura}</strong></span>
          <span>👤 <strong style={{color:"#fff"}}>{cli.contato}</strong> — {cli.cargo}</span>
          <span>📅 Cliente desde <strong style={{color:"#fff"}}>{cli.desde}</strong></span>
        </div>
      </div>

      {/* Alerta crítico */}
      {venc.length>0 && (
        <div style={{background:"#FFEBEE",border:"2px solid #C62828",borderRadius:10,
          padding:14,display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:28}}>⛔</span>
          <div>
            <div style={{fontWeight:700,color:"#C62828",fontSize:13}}>
              {venc.length} CA(s) vencido(s) — regularizar imediatamente
            </div>
            <div style={{fontSize:11,color:"#78909C",marginTop:3}}>
              {venc.map(r=>`${r.trabNome} — ${EPIS.find(e=>e.id===r.epiId)?.nome}`).join(" • ")}
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[
          {v:meus.length,l:"EPIs monitorados",c:"#1B5E20"},
          {v:venc.length,l:"CAs vencidos",    c:"#C62828",s:"Ação imediata"},
          {v:urg.length, l:"Vencem em 30d",   c:"#E65100"},
          {v:fmtBRL(total),l:"Histórico total",c:"#1565C0"},
        ].map((k,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 16px",flex:1,
            textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.07)",minWidth:110}}>
            <div style={{fontSize:22,fontWeight:800,color:k.c,lineHeight:1}}>{k.v}</div>
            <div style={{fontSize:10,color:"#78909C",marginTop:4}}>{k.l}</div>
            {k.s&&<div style={{fontSize:9,color:k.c,marginTop:2,fontWeight:600}}>{k.s}</div>}
          </div>
        ))}
      </div>

      {/* Trabalhadores clicáveis */}
      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>
        👷 Trabalhadores — clique para ver EPIs individuais
      </div>
      <div style={{display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>
        {cli.trabalhadores.map(t => {
          const rt = meus.filter(r=>r.trabId===t.id);
          const critico = rt.some(r=>{const e=EPIS.find(ep=>ep.id===r.epiId);
            return diasAte(e?.validadeCA)<0||pct(r.usos,e?.vidaUsos)>=90;});
          const atencao = rt.some(r=>{const e=EPIS.find(ep=>ep.id===r.epiId);
            return diasAte(e?.validadeCA)<=30||pct(r.usos,e?.vidaUsos)>=70;});
          const c2 = critico?"#C62828":atencao?"#E65100":"#2E7D32";
          return (
            <Card key={t.id} onClick={()=>setTrabSel(t)}
              style={{borderLeft:`4px solid ${c2}`,padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:c2+"18",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
                  👷
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:12,color:"#37474F",
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {t.nome}
                  </div>
                  <div style={{fontSize:11,color:"#78909C"}}>{t.funcao}</div>
                  <div style={{fontSize:10,color:c2,fontWeight:600,marginTop:2}}>
                    {rt.length} EPI(s) &nbsp;•&nbsp;
                    {critico?"⛔ Ação urgente":atencao?"⚠️ Atenção":"✅ OK"}
                  </div>
                </div>
                <span style={{color:"#BDBDBD",fontSize:18}}>›</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Histórico de compras */}
      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>📦 Histórico de Compras</div>
      <Card>
        {cli.historico.map((h,i)=>(
          <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",
            padding:"11px 0",borderBottom:i<cli.historico.length-1?"1px solid #F0F0F0":"none"}}>
            <div style={{width:42,height:42,borderRadius:10,background:"#E8F5E9",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:18,flexShrink:0}}>📦</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:13,color:"#37474F"}}>{h.evento}</div>
              <div style={{fontSize:11,color:"#78909C",marginTop:2}}>{h.data}</div>
              <div style={{fontSize:11,color:"#78909C",marginTop:4}}>{h.itens}</div>
            </div>
            <div style={{fontWeight:800,color:"#1B5E20",fontSize:14,flexShrink:0}}>
              {fmtBRL(h.valor)}
            </div>
          </div>
        ))}
      </Card>

      {/* Tabela de EPIs — linhas clicáveis */}
      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>
        📋 Status de EPIs — clique na linha para ver o trabalhador
      </div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr style={{background:"#1B5E20",color:"#fff"}}>
                {["Trabalhador","Função","EPI","CA","Desgaste","Status"].map(h=>(
                  <th key={h} style={{padding:"8px 12px",textAlign:"left",
                    whiteSpace:"nowrap",fontWeight:600}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meus.map((r,i)=>{
                const epi=EPIS.find(e=>e.id===r.epiId);
                const p=pct(r.usos,epi?.vidaUsos);
                const d=diasAte(epi?.validadeCA);
                const st=d<0||p>=90?"⛔ Crítico":d<=30||p>=70?"🔴 Urgente":p>=50||d<=60?"🟡 Atenção":"✅ OK";
                return (
                  <tr key={i}
                    onClick={()=>setTrabSel(cli.trabalhadores.find(t=>t.id===r.trabId))}
                    style={{background:i%2===0?"#fff":"#F9F9F9",borderBottom:"1px solid #EEE",
                      cursor:"pointer",transition:"background 0.1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#E8F5E9"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#F9F9F9"}>
                    <td style={{padding:"8px 12px",fontWeight:600,color:"#1B5E20"}}>{r.trabNome}</td>
                    <td style={{padding:"8px 12px",color:"#78909C",fontSize:11}}>{r.funcao}</td>
                    <td style={{padding:"8px 12px"}}>{epi?.nome}</td>
                    <td style={{padding:"8px 12px",color:"#1565C0",fontWeight:700,fontSize:11}}>{epi?.ca}</td>
                    <td style={{padding:"8px 12px",minWidth:120}}>
                      <Barra v={r.usos} max={epi?.vidaUsos}/>
                      <div style={{fontSize:10,color:corUso(p),fontWeight:600,marginTop:2}}>{p}%</div>
                    </td>
                    <td style={{padding:"8px 12px"}}>{st}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ── DASHBOARD INTERNO ─────────────────────────────────────────────────────────
const Dashboard = ({regs, onClicar}) => {
  const venc = regs.filter(r=>diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA)<0);
  const urg  = regs.filter(r=>{const d=diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA);return d>=0&&d<=30;});
  const desg = regs.filter(r=>pct(r.usos,EPIS.find(e=>e.id===r.epiId)?.vidaUsos)>=80);
  const estBaixo = ESTOQUE.filter(e=>e.estoque<e.minimo);

  return (
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:16}}>
      {/* KPIs */}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[
          {v:regs.length,  l:"EPIs Monitorados", c:"#1B5E20"},
          {v:venc.length,  l:"CAs Vencidos",     c:"#C62828",s:"Ação imediata"},
          {v:urg.length,   l:"Vencem em 30 dias",c:"#E65100",s:"Agendar troca"},
          {v:desg.length,  l:"Desgaste >80%",    c:"#F9A825",s:"Monitorar"},
          {v:estBaixo.length,l:"Estoque Baixo",  c:"#E65100",s:"Repor urgente"},
        ].map((k,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:12,padding:"14px 18px",
            flex:1,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.07)",minWidth:100}}>
            <div style={{fontSize:30,fontWeight:800,color:k.c,lineHeight:1}}>{k.v}</div>
            <div style={{fontSize:11,color:"#78909C",marginTop:4}}>{k.l}</div>
            {k.s&&<div style={{fontSize:9,color:k.c,marginTop:2,fontWeight:600}}>{k.s}</div>}
          </div>
        ))}
      </div>

      {/* Cards de clientes */}
      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>
        🏢 Clientes — clique para ver detalhes completos
      </div>
      <div style={{display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
        {CLIENTES.map(c=>{
          const rc = regs.filter(r=>r.clienteId===c.id);
          const vc = rc.filter(r=>diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA)<0);
          return (
            <Card key={c.id} onClick={()=>onClicar(c)}
              style={{borderTop:`4px solid ${c.cor}`,padding:0,overflow:"hidden"}}>
              <div style={{padding:14}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"#37474F"}}>{c.nome}</div>
                    <div style={{fontSize:11,color:"#78909C",marginTop:2}}>
                      {c.segmento} • {c.cidade}
                    </div>
                  </div>
                  <Badge label={LABEL_STATUS[c.status]} color={COR_STATUS[c.status]}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {[
                    {v:c.funcionarios,l:"Funcionários",c:c.cor},
                    {v:vc.length,     l:"CA Vencidos", c:vc.length>0?"#C62828":"#2E7D32"},
                    {v:fmtBRL(c.ticket),l:"Ticket/mês",c:"#1565C0"},
                  ].map((k,i)=>(
                    <div key={i} style={{background:"#F9F9F9",borderRadius:8,
                      padding:"6px 8px",textAlign:"center"}}>
                      <div style={{fontWeight:800,fontSize:14,color:k.c}}>{k.v}</div>
                      <div style={{fontSize:9,color:"#78909C"}}>{k.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:11,color:"#78909C"}}>
                    👤 {c.contato} ({c.cargo})
                  </div>
                  <span style={{fontSize:12,color:c.cor,fontWeight:700}}>Ver detalhes →</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Estoque */}
      <Card style={{border:"2px solid #E65100"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{fontSize:20}}>📦</span>
          <div style={{fontWeight:700,color:"#E65100",fontSize:14}}>Estoque — Pontos de Atenção</div>
        </div>
        <div style={{display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>
          {ESTOQUE.map(es=>{
            const epi=EPIS.find(e=>e.id===es.epiId);
            const abaixo=es.estoque<es.minimo;
            const crit=es.estoque<es.minimo*0.4;
            const ce=crit?"#C62828":abaixo?"#E65100":"#2E7D32";
            const be=crit?"#FFEBEE":abaixo?"#FFF3E0":"#E8F5E9";
            return (
              <div key={es.epiId} style={{background:be,borderRadius:10,padding:12,
                borderLeft:`4px solid ${ce}`}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"flex-start",marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#37474F",
                    flex:1,paddingRight:8}}>{epi?.nome}</div>
                  <span style={{background:ce,color:"#fff",borderRadius:20,
                    padding:"2px 8px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>
                    {crit?"⛔ Crítico":abaixo?"🔴 Baixo":"✅ OK"}
                  </span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",
                  fontSize:11,color:"#78909C",marginBottom:6}}>
                  <span>Atual: <strong style={{color:ce}}>{es.estoque} un</strong></span>
                  <span>Mínimo: {es.minimo} un</span>
                </div>
                <Barra v={es.estoque} max={es.minimo*1.5} cor={ce}/>
                {abaixo&&(
                  <div style={{fontSize:10,color:ce,fontWeight:600,marginTop:6}}>
                    ⚡ Repor {es.minimo-es.estoque+10} un — prazo {es.diasRepos}d
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Visão por produto */}
      <Card>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{fontSize:20}}>🛡️</span>
          <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>Visão por Produto</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {EPIS.map(epi=>{
            const re=regs.filter(r=>r.epiId===epi.id);
            const tot=re.reduce((s,r)=>s+r.usos,0);
            const med=re.length>0?Math.round(tot/re.length):0;
            const pm=pct(med,epi.vidaUsos);
            const d=diasAte(epi.validadeCA);
            const es=ESTOQUE.find(e=>e.epiId===epi.id);
            const prev=re.filter(r=>pct(r.usos,epi.vidaUsos)>=70).length;
            return (
              <div key={epi.id} style={{background:"#FAFAFA",borderRadius:10,
                padding:14,border:"1px solid #E0E0E0"}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#1B5E20"}}>{epi.nome}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <Badge label={`CA: ${d}d — ${labelCA(d)}`} color={corCA(d)}/>
                    <Badge label={es&&es.estoque>=es.minimo?`Estoque OK (${es?.estoque}un)`:`⚠️ Estoque baixo (${es?.estoque}un)`}
                      color={es&&es.estoque>=es.minimo?"#2E7D32":"#E65100"}/>
                    {prev>0&&<Badge label={`${prev} troca(s) prevista(s)`} color="#F9A825"/>}
                  </div>
                </div>
                <div style={{display:"grid",
                  gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8,marginBottom:8}}>
                  {[
                    {l:"Clientes usando",  v:re.length,           c:"#1B5E20"},
                    {l:"Total usos reg.",  v:tot,                  c:"#1565C0"},
                    {l:"Uso médio/cliente",v:`${med}/${epi.vidaUsos}`,c:"#E65100"},
                    {l:"Desgaste médio",   v:`${pm}%`,             c:corUso(pm)},
                  ].map(m=>(
                    <div key={m.l} style={{background:"#fff",borderRadius:8,
                      padding:"8px 10px",border:"1px solid #E0E0E0"}}>
                      <div style={{fontSize:9,color:"#78909C",marginBottom:2}}>{m.l}</div>
                      <div style={{fontSize:16,fontWeight:800,color:m.c}}>{m.v}</div>
                    </div>
                  ))}
                </div>
                <Barra v={med} max={epi.vidaUsos}/>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Anomalias */}
      <Card>
        <div style={{fontWeight:700,color:"#E65100",marginBottom:12,fontSize:14}}>
          ⚠️ Anomalias de Uso
        </div>
        <div style={{display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
          {regs.filter(r=>{
            const e=EPIS.find(ep=>ep.id===r.epiId);
            const p=pct(r.usos,e?.vidaUsos);
            return p>95||(p<20&&r.usos>0);
          }).slice(0,6).map((r,i)=>{
            const cli=CLIENTES.find(c=>c.id===r.clienteId);
            const epi=EPIS.find(e=>e.id===r.epiId);
            const p=pct(r.usos,epi?.vidaUsos);
            const tipo=p>95?"alto":"precoce";
            return (
              <div key={i} onClick={()=>onClicar(cli)}
                style={{border:`1px solid ${tipo==="alto"?"#C62828":"#F9A825"}40`,
                  background:tipo==="alto"?"#FFEBEE":"#FFF8E1",
                  borderRadius:10,padding:12,cursor:"pointer"}}>
                <div style={{fontWeight:700,fontSize:12,
                  color:tipo==="alto"?"#C62828":"#E65100",marginBottom:6}}>
                  {tipo==="alto"?"🔴 Desgaste excessivo":"🟡 Troca antes do previsto"}
                </div>
                <div style={{fontSize:11,color:"#37474F",lineHeight:1.6}}>
                  <strong>{cli?.nome}</strong><br/>
                  {r.trabNome} — {epi?.nome}<br/>
                  {r.usos}/{epi?.vidaUsos} usos ({p}%)
                </div>
                <div style={{fontSize:10,color:"#1B5E20",marginTop:6,fontWeight:600}}>
                  Clique para ver detalhes →
                </div>
              </div>
            );
          })}
        </div>
        {regs.filter(r=>{const e=EPIS.find(ep=>ep.id===r.epiId);const p=pct(r.usos,e?.vidaUsos);return p>95||p<20;}).length===0&&(
          <div style={{color:"#78909C",fontSize:12,textAlign:"center",padding:20}}>
            ✅ Nenhuma anomalia identificada no momento
          </div>
        )}
      </Card>
    </div>
  );
};

// ── VISÃO DO CLIENTE ──────────────────────────────────────────────────────────
const VisaoCliente = ({clienteId, regs}) => {
  const [trabSel, setTrabSel] = useState(null);
  const cli = CLIENTES.find(c=>c.id===clienteId);
  const meus = regs.filter(r=>r.clienteId===clienteId);
  const venc = meus.filter(r=>diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA)<0);
  const urg  = meus.filter(r=>{const d=diasAte(EPIS.find(e=>e.id===r.epiId)?.validadeCA);return d>=0&&d<=30;});

  if(trabSel) return (
    <div>
      <div style={{padding:"10px 16px",background:"#fff",borderBottom:"1px solid #EEE"}}>
        <Voltar onClick={()=>setTrabSel(null)}/>
      </div>
      <DetalhesTrabalhador trab={trabSel} regs={meus} onVoltar={()=>setTrabSel(null)}/>
    </div>
  );

  return (
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:14}}>
      {/* Header */}
      <div style={{background:`linear-gradient(140deg,${cli?.cor||"#1B5E20"},#388E3C)`,
        borderRadius:14,padding:22,color:"#fff"}}>
        <div style={{fontSize:12,color:"#A5D6A7",fontWeight:600}}>Painel do Cliente</div>
        <div style={{fontSize:20,fontWeight:800,marginTop:4}}>{cli?.nome}</div>
        <div style={{fontSize:13,color:"#C8E6C9",marginTop:2}}>
          {cli?.segmento} • {cli?.cidade}
        </div>
        <div style={{marginTop:16,display:"flex",gap:24,flexWrap:"wrap"}}>
          {[
            {v:meus.length, l:"EPIs monitorados",  c:"#F9A825"},
            {v:venc.length, l:"CA(s) vencido(s)",  c:venc.length>0?"#EF9A9A":"#A5D6A7"},
            {v:urg.length,  l:"Vencem em 30 dias", c:"#FFF176"},
          ].map((k,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:k.c}}>{k.v}</div>
              <div style={{fontSize:11,color:"#A5D6A7"}}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {venc.length>0&&(
        <div style={{background:"#FFEBEE",border:"2px solid #C62828",borderRadius:10,
          padding:14,display:"flex",gap:12}}>
          <span style={{fontSize:24}}>⛔</span>
          <div>
            <div style={{fontWeight:700,color:"#C62828",fontSize:13}}>
              CA(s) vencido(s) — risco de autuação NR 31
            </div>
            <div style={{fontSize:12,color:"#78909C",marginTop:4}}>
              Entre em contato com a JR Agro EPI para substituição imediata.
            </div>
          </div>
        </div>
      )}

      <div style={{fontWeight:700,color:"#1B5E20",fontSize:14}}>
        👷 Minha equipe — clique para ver EPIs
      </div>
      <div style={{display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {cli?.trabalhadores.map(t=>{
          const rt=meus.filter(r=>r.trabId===t.id);
          const crit=rt.some(r=>{const e=EPIS.find(ep=>ep.id===r.epiId);
            return diasAte(e?.validadeCA)<0||pct(r.usos,e?.vidaUsos)>=90;});
          const aten=rt.some(r=>{const e=EPIS.find(ep=>ep.id===r.epiId);
            return diasAte(e?.validadeCA)<=30||pct(r.usos,e?.vidaUsos)>=70;});
          const c2=crit?"#C62828":aten?"#E65100":"#2E7D32";
          return (
            <Card key={t.id} onClick={()=>setTrabSel(t)}
              style={{borderLeft:`4px solid ${c2}`,padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:24}}>👷</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:12,color:"#37474F"}}>{t.nome}</div>
                  <div style={{fontSize:11,color:"#78909C"}}>{t.funcao}</div>
                  <div style={{fontSize:10,color:c2,fontWeight:600,marginTop:2}}>
                    {crit?"⛔ Trocar agora":aten?"⚠️ Atenção":"✅ Em dia"}
                  </div>
                </div>
                <span style={{color:"#BDBDBD",fontSize:16}}>›</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{background:"#E8F5E9",borderRadius:10,padding:14,textAlign:"center"}}>
        <div style={{fontSize:12,color:"#1B5E20",fontWeight:600}}>JR Agro EPI — Campinas, SP</div>
        <div style={{fontSize:11,color:"#78909C",marginTop:4}}>
          Dúvidas? WhatsApp: (19) 99999-9999
        </div>
      </div>
    </div>
  );
};

// ── BOT WHATSAPP ──────────────────────────────────────────────────────────────
const ETAPAS = [
  {campo:"nome",    tipo:"texto",  msg:"Olá! 👋 Sou o assistente da *JR Agro EPI*. Qual é o seu nome?"},
  {campo:"empresa", tipo:"opcoes", msg:"Oi, {nome}! 😊 De qual empresa você é?",         opcoes:CLIENTES.map(c=>c.nome)},
  {campo:"epi",     tipo:"opcoes", msg:"Qual EPI você vai registrar?",                    opcoes:EPIS.map(e=>e.nome)},
  {campo:"acao",    tipo:"opcoes", msg:"O que aconteceu com o equipamento?",              opcoes:["Registrar uso","Registrar lavagem","Substituição por desgaste","Substituição por dano","Devolução"]},
  {campo:"obs",     tipo:"texto",  msg:"Alguma observação? (ou 'não' para pular)"},
  {campo:"ok",      tipo:"opcoes", msg:"✅ Confirmar:\n\n👤 *{nome}*\n🏢 *{empresa}*\n🛡️ *{epi}*\n📋 *{acao}*\n\nConfirmo?", opcoes:["✅ Confirmar","❌ Cancelar"]},
];

const BotWpp = ({onRegistro}) => {
  const [msgs,setMsgs]=useState([]); const [etapa,setEtapa]=useState(0);
  const [dados,setDados]=useState({}); const [input,setInput]=useState("");
  const [dig,setDig]=useState(false); const [done,setDone]=useState(false);
  const fim=useRef(null);
  const interp=(t,d)=>t.replace(/\{(\w+)\}/g,(_,k)=>d[k]||k);
  const add=(t,de="bot")=>setMsgs(p=>[...p,{t,de,h:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]);
  useEffect(()=>{if(etapa===0&&msgs.length===0)setTimeout(()=>add(ETAPAS[0].msg),400);fim.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const resp=(v)=>{
    const e=ETAPAS[etapa]; const nd={...dados,[e.campo]:v};
    setDados(nd); add(v,"user"); setInput("");
    if(e.campo==="ok"){
      if(v.includes("Confirmar")){setDig(true);setTimeout(()=>{setDig(false);add("🎉 Registro salvo! Obrigado, "+nd.nome+"!");setDone(true);onRegistro&&onRegistro(nd);},1200);}
      else{add("Cancelado. Chame quando precisar.");setDone(true);}return;
    }
    const prox=etapa+1;
    if(prox<ETAPAS.length){setDig(true);setTimeout(()=>{setDig(false);setEtapa(prox);add(interp(ETAPAS[prox].msg,nd));},800);}
  };
  const reset=()=>{setMsgs([]);setEtapa(0);setDados({});setInput("");setDone(false);setTimeout(()=>add(ETAPAS[0].msg),400);};
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#ECE5DD"}}>
      <div style={{background:"#075E54",color:"#fff",padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛡️</div>
        <div><div style={{fontWeight:700,fontSize:15}}>JR Agro EPI</div><div style={{fontSize:12,color:"#B2EBF2"}}>Registro de EPI • Online</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 8px",display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.de==="bot"?"flex-start":"flex-end"}}>
            <div style={{maxWidth:"80%",padding:"8px 12px",borderRadius:m.de==="bot"?"0 12px 12px 12px":"12px 0 12px 12px",background:m.de==="bot"?"#fff":"#DCF8C6",boxShadow:"0 1px 2px rgba(0,0,0,0.15)",fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap"}}>
              <span dangerouslySetInnerHTML={{__html:m.t.replace(/\*(.*?)\*/g,"<strong>$1</strong>")}}/>
              <div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:4}}>{m.h} ✓✓</div>
            </div>
          </div>
        ))}
        {dig&&<div style={{display:"flex",gap:4,padding:"10px 14px",background:"#fff",borderRadius:"0 12px 12px 12px",width:60}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#999",animation:`bounce 1s infinite ${i*0.2}s`}}/>)}</div>}
        <div ref={fim}/>
      </div>
      {!done&&etapa<ETAPAS.length&&(
        <div style={{padding:"8px 8px 12px",background:"#F0F0F0"}}>
          {ETAPAS[etapa]?.tipo==="opcoes"?(
            <div style={{display:"flex",flexWrap:"wrap",gap:8,padding:"0 4px"}}>
              {ETAPAS[etapa].opcoes.map(op=><button key={op} onClick={()=>resp(op)} style={{background:"#fff",border:"1px solid #25D366",color:"#075E54",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:600}}>{op}</button>)}
            </div>
          ):(
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&input.trim()&&resp(input.trim())} placeholder="Digite sua resposta..." style={{flex:1,padding:"10px 14px",borderRadius:24,border:"none",fontSize:13,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}/>
              <button onClick={()=>input.trim()&&resp(input.trim())} disabled={!input.trim()} style={{width:44,height:44,borderRadius:"50%",background:"#25D366",border:"none",cursor:"pointer",fontSize:18,color:"#fff",opacity:input.trim()?1:0.5}}>➤</button>
            </div>
          )}
        </div>
      )}
      {done&&<div style={{padding:12,textAlign:"center"}}><button onClick={reset} style={{background:"#25D366",color:"#fff",border:"none",borderRadius:24,padding:"10px 24px",fontSize:13,cursor:"pointer",fontWeight:700}}>✚ Novo Registro</button></div>}
    </div>
  );
};

// ── ASSISTENTE IA ─────────────────────────────────────────────────────────────
const AssistenteIA = ({ regs }) => {
  const [aba, setAba]         = useState("analise");
  const [lA, setLA]           = useState(false);
  const [analise, setAnalise] = useState(null);
  const [lP, setLP]           = useState(false);
  const [cliP, setCliP]       = useState(1);
  const [pedido, setPedido]   = useState(null);
  const [msg, setMsg]         = useState("");
  const [hist, setHist]       = useState([
    { de:"ia", t:"Ola! Sou o assistente NR 31 da JR Agro EPI. Descreva a atividade e te digo quais EPIs sao obrigatorios." }
  ]);
  const [lC, setLC] = useState(false);
  const chatR       = useRef(null);

  useEffect(() => { chatR.current?.scrollIntoView({ behavior:"smooth" }); }, [hist]);

  const callClaude = async (messages, system) => {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: system,
          messages: messages,
        }),
      });
      const data = await res.json();
      if (data.error) return "Erro API (" + data.error.type + "): " + data.error.message;
      if (!data.content || !data.content[0]) {
        return "Resposta inesperada: " + JSON.stringify(data).slice(0,120);
      }
      return data.content[0].text;
    } catch (err) {
      return "Erro de conexao: " + err.message;
    }
  };

  const analisar = async () => {
    setLA(true);
    setAnalise(null);
    const resumo = CLIENTES.map(c => ({
      cliente: c.nome,
      segmento: c.segmento,
      status: c.status,
      epis: regs
        .filter(r => r.clienteId === c.id)
        .map(r => {
          const e = EPIS.find(ep => ep.id === r.epiId);
          return { epi: e.nome, pctUso: pct(r.usos, e.vidaUsos), diasCA: diasAte(e.validadeCA), trabalhador: r.trabNome };
        }),
    }));
    const prompt = "Analise estes dados de EPI:\n" + JSON.stringify(resumo, null, 2) +
      "\nForneca: 1) Anomalias 2) Alertas criticos 3) Padroes por segmento 4) 3 acoes prioritarias esta semana 5) Economia potencial. Use emojis.";
    const resp = await callClaude([{ role: "user", content: prompt }],
      "Voce e especialista em EPI agricola e NR 31 com 20 anos de experiencia no agronegocio paulista.");
    setAnalise(resp);
    setLA(false);
  };

  const gerarPedido = async () => {
    setLP(true);
    setPedido(null);
    const cli = CLIENTES.find(c => c.id === cliP);
    const dados = regs
      .filter(r => r.clienteId === cliP)
      .map(r => {
        const e = EPIS.find(ep => ep.id === r.epiId);
        return { epi: e.nome, pctUso: pct(r.usos, e.vidaUsos), diasCA: diasAte(e.validadeCA), trabalhador: r.trabNome };
      });
    const prompt = "Gere proposta de reposicao de EPI para " + cli.nome + " (" + cli.segmento + "):\n" +
      JSON.stringify(dados, null, 2) +
      "\nInclua: tabela EPI/quantidade/urgencia, observacoes e mensagem WhatsApp pronta.";
    const resp = await callClaude([{ role: "user", content: prompt }],
      "Voce e especialista em reposicao de EPI da JR Agro EPI, Campinas. Responda em portugues.");
    setPedido(resp);
    setLP(false);
  };

  const enviar = async () => {
    if (!msg.trim()) return;
    const texto = msg.trim();
    setMsg("");
    const novoHist = [...hist, { de: "user", t: texto }];
    setHist(novoHist);
    setLC(true);
    const mensagens = novoHist.map(x => ({
      role: x.de === "user" ? "user" : "assistant",
      content: x.t,
    }));
    const resp = await callClaude(mensagens,
      "Voce e especialista em NR 31 e EPI agricola da JR Agro EPI. Responda em portugues simples, citando a norma.");
    setHist(prev => [...prev, { de: "ia", t: resp }]);
    setLC(false);
  };

  return (
    <div style={{ padding:16, display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ background:"linear-gradient(135deg,#1A237E,#283593)", borderRadius:14,
        padding:22, color:"#fff", display:"flex", alignItems:"center", gap:16 }}>
        <span style={{ fontSize:48, lineHeight:1 }}>&#129302;</span>
        <div>
          <div style={{ fontSize:20, fontWeight:800 }}>Assistente IA -- JR Agro EPI</div>
          <div style={{ fontSize:13, color:"#9FA8DA", marginTop:4 }}>
            Analise de padroes * Pedido automatico * Consultor NR 31
          </div>
        </div>
      </div>

      <div style={{ background:"#fff", borderRadius:10, display:"flex",
        overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
        {[
          { id:"analise", icon:"Analise" },
          { id:"pedido",  icon:"Pedido"  },
          { id:"chat",    icon:"Consultor NR 31" },
        ].map(a => (
          <button key={a.id} onClick={() => setAba(a.id)}
            style={{ flex:1, padding:"12px 8px", border:"none", cursor:"pointer",
              background: aba === a.id ? "#E8EAF6" : "#fff",
              color: aba === a.id ? "#1A237E" : "#78909C",
              fontWeight: aba === a.id ? 700 : 400, fontSize:13,
              borderBottom: aba === a.id ? "3px solid #3949AB" : "3px solid transparent" }}>
            {a.icon}
          </button>
        ))}
      </div>

      {aba === "analise" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card>
            <div style={{ fontWeight:700, color:"#1A237E", fontSize:14, marginBottom:8 }}>
              Analise Inteligente de Padroes
            </div>
            <div style={{ fontSize:12, color:"#78909C", marginBottom:14 }}>
              A IA analisa todos os registros e identifica anomalias, alertas e recomendacoes.
            </div>
            <button onClick={analisar} disabled={lA}
              style={{ background: lA ? "#9FA8DA" : "#1A237E", color:"#fff",
                border:"none", borderRadius:8, padding:"10px 24px",
                fontSize:13, fontWeight:700, cursor: lA ? "wait" : "pointer" }}>
              {lA ? "Analisando..." : "Analisar agora"}
            </button>
          </Card>
          {analise && (
            <Card>
              <div style={{ fontWeight:700, color:"#1A237E", fontSize:14, marginBottom:12 }}>
                Resultado da Analise
              </div>
              <div style={{ fontSize:13, color:"#37474F", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
                {analise}
              </div>
            </Card>
          )}
        </div>
      )}

      {aba === "pedido" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card>
            <div style={{ fontWeight:700, color:"#1A237E", fontSize:14, marginBottom:8 }}>
              Pedido de Reposicao Automatico
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              <select value={cliP} onChange={e => setCliP(Number(e.target.value))}
                style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #DDD",
                  fontSize:13, flex:1, outline:"none" }}>
                {CLIENTES.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
              <button onClick={gerarPedido} disabled={lP}
                style={{ background: lP ? "#9FA8DA" : "#1A237E", color:"#fff",
                  border:"none", borderRadius:8, padding:"10px 20px",
                  fontSize:13, fontWeight:700, cursor: lP ? "wait" : "pointer",
                  whiteSpace:"nowrap" }}>
                {lP ? "Gerando..." : "Gerar pedido"}
              </button>
            </div>
          </Card>
          {pedido && (
            <Card>
              <div style={{ fontWeight:700, color:"#1A237E", fontSize:14, marginBottom:12 }}>
                Proposta Gerada
              </div>
              <div style={{ fontSize:13, color:"#37474F", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
                {pedido}
              </div>
              <div style={{ marginTop:12, display:"flex", gap:8 }}>
                <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(pedido)}
                  style={{ background:"#E8EAF6", color:"#1A237E", border:"none",
                    borderRadius:8, padding:"8px 16px", fontSize:12, cursor:"pointer", fontWeight:600 }}>
                  Copiar
                </button>
                <button onClick={() => setPedido(null)}
                  style={{ background:"#ECEFF1", color:"#78909C", border:"none",
                    borderRadius:8, padding:"8px 16px", fontSize:12, cursor:"pointer" }}>
                  Limpar
                </button>
              </div>
            </Card>
          )}
        </div>
      )}

      {aba === "chat" && (
        <div style={{ background:"#fff", borderRadius:12, overflow:"hidden",
          boxShadow:"0 2px 8px rgba(0,0,0,0.08)", display:"flex",
          flexDirection:"column", height:500 }}>
          <div style={{ background:"#1A237E", padding:"12px 16px",
            display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#3949AB",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
              AI
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:"#fff" }}>Consultor NR 31</div>
              <div style={{ fontSize:11, color:"#9FA8DA" }}>Especialista EPI Agricola</div>
            </div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:12,
            display:"flex", flexDirection:"column", gap:10, background:"#F5F7FF" }}>
            {hist.map((m, i) => (
              <div key={i} style={{ display:"flex",
                justifyContent: m.de === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth:"85%", padding:"10px 14px",
                  borderRadius: m.de === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background: m.de === "user" ? "#3949AB" : "#fff",
                  color: m.de === "user" ? "#fff" : "#37474F",
                  fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.1)",
                }}>
                  {m.t}
                </div>
              </div>
            ))}
            {lC && (
              <div style={{ display:"flex", gap:4, padding:"10px 14px",
                background:"#fff", borderRadius:"4px 16px 16px 16px", width:70 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:8, height:8, borderRadius:"50%",
                    background:"#9FA8DA", animation:"bounce 1s infinite" }} />
                ))}
              </div>
            )}
            <div ref={chatR} />
          </div>
          <div style={{ padding:"10px 12px", background:"#fff",
            borderTop:"1px solid #E8EAF6", display:"flex", gap:8 }}>
            <input value={msg} onChange={e => setMsg(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) enviar(); }}
              placeholder="Ex: Quais EPIs para aplicacao de defensivos em cana?"
              style={{ flex:1, padding:"10px 14px", borderRadius:24,
                border:"1px solid #C5CAE9", fontSize:13, outline:"none",
                background:"#F5F7FF" }} />
            <button onClick={enviar} disabled={!msg.trim() || lC}
              style={{ width:44, height:44, borderRadius:"50%",
                background: (msg.trim() && !lC) ? "#1A237E" : "#C5CAE9",
                border:"none", cursor: msg.trim() ? "pointer" : "default",
                fontSize:18, color:"#fff" }}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── KIT FISCALIZAÇÃO ──────────────────────────────────────────────────────────

// Sub-componentes de documento — JSX fora de objetos literais
const DocFichas = ({ meus }) => (
  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
    <thead><tr style={{background:"#E8F5E9"}}>
      {["Trabalhador","EPI","Nº CA","Validade CA","Entregue em","Assinatura"].map(h=>(
        <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#1B5E20",fontWeight:700,fontSize:10}}>{h}</th>
      ))}
    </tr></thead>
    <tbody>
      {meus.map((r,i) => {
        const e = EPIS.find(ep => ep.id === r.epiId);
        const d = diasAte(e?.validadeCA);
        return (
          <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#F9F9F9"}}>
            <td style={{padding:"5px 8px",fontWeight:600}}>{r.trabNome}</td>
            <td style={{padding:"5px 8px"}}>{e?.nome}</td>
            <td style={{padding:"5px 8px",color:"#1565C0",fontWeight:700}}>{e?.ca}</td>
            <td style={{padding:"5px 8px",color:d<0?"#C62828":"#1B5E20",fontWeight:600}}>{e?.validadeCA}</td>
            <td style={{padding:"5px 8px"}}>{r.dataEntrega}</td>
            <td style={{padding:"5px 8px",color:"#BDBDBD"}}>_____________________</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const DocCAs = () => (
  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
    <thead><tr style={{background:"#E8F5E9"}}>
      {["Produto","Nº CA","Validade","Dias Restantes","Status"].map(h=>(
        <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#2E7D32",fontWeight:700,fontSize:10}}>{h}</th>
      ))}
    </tr></thead>
    <tbody>
      {EPIS.map((epi,i) => {
        const d = diasAte(epi.validadeCA);
        return (
          <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#F9F9F9"}}>
            <td style={{padding:"5px 8px",fontWeight:600}}>{epi.nome}</td>
            <td style={{padding:"5px 8px",color:"#1565C0",fontWeight:700}}>{epi.ca}</td>
            <td style={{padding:"5px 8px"}}>{epi.validadeCA}</td>
            <td style={{padding:"5px 8px",color:corCA(d),fontWeight:700}}>
              {d < 0 ? `${Math.abs(d)}d vencido` : `${d} dias`}
            </td>
            <td style={{padding:"5px 8px"}}>
              <span style={{background:corCA(d)+"22",color:corCA(d),borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>
                {labelCA(d)}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const DocTrabalhadores = ({ meus }) => (
  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
    <thead><tr style={{background:"#E3F2FD"}}>
      {["Trabalhador","Função","EPI","CA","Entregue em","Usos","Status"].map(h=>(
        <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#1565C0",fontWeight:700,fontSize:10}}>{h}</th>
      ))}
    </tr></thead>
    <tbody>
      {meus.map((r,i) => {
        const e = EPIS.find(ep => ep.id === r.epiId);
        const p = pct(r.usos, e?.vidaUsos);
        return (
          <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#F9F9F9"}}>
            <td style={{padding:"5px 8px",fontWeight:600}}>{r.trabNome}</td>
            <td style={{padding:"5px 8px",color:"#78909C"}}>{r.funcao}</td>
            <td style={{padding:"5px 8px"}}>{e?.nome}</td>
            <td style={{padding:"5px 8px",color:"#1565C0",fontWeight:700}}>{e?.ca}</td>
            <td style={{padding:"5px 8px"}}>{r.dataEntrega}</td>
            <td style={{padding:"5px 8px",textAlign:"center"}}>{r.usos}/{e?.vidaUsos}</td>
            <td style={{padding:"5px 8px"}}>
              <span style={{color:corUso(p),fontWeight:700,fontSize:10}}>
                {p>=90?"Trocar":p>=70?"Atenção":"OK"}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const DocTreinamento = ({ meus, nomeCliente }) => (
  <div>
    <div style={{background:"#F3E5F5",borderRadius:8,padding:12,marginBottom:12,fontSize:11,lineHeight:1.7,color:"#37474F"}}>
      A JR Agro EPI declara que os trabalhadores abaixo de <strong>{nomeCliente}</strong> receberam
      orientação sobre o uso correto dos EPIs conforme NR 31 e NR 6.
    </div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
      <thead><tr style={{background:"#F3E5F5"}}>
        {["Trabalhador","EPI orientado","Data","Responsável JR Agro","Assinatura"].map(h=>(
          <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#6A1B9A",fontWeight:700,fontSize:10}}>{h}</th>
        ))}
      </tr></thead>
      <tbody>
        {meus.map((r,i) => {
          const e = EPIS.find(ep => ep.id === r.epiId);
          return (
            <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#F9F9F9"}}>
              <td style={{padding:"5px 8px",fontWeight:600}}>{r.trabNome}</td>
              <td style={{padding:"5px 8px"}}>{e?.nome}</td>
              <td style={{padding:"5px 8px"}}>{r.dataEntrega}</td>
              <td style={{padding:"5px 8px",color:"#1B5E20",fontWeight:600}}>JR Agro EPI</td>
              <td style={{padding:"5px 8px",color:"#BDBDBD"}}>_____________________</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const PPRA_ROWS = [
  ["Aplicação de defensivos","Agrotóxicos","Químico","Macacão + luvas nitrílicas + respirador + óculos","NR 31 / Lei 7.802"],
  ["Colheita manual","Cortes e UV","Físico","Luvas de raspa + camisa UV + protetor solar","NR 31"],
  ["Operação de máquinas","Ruído / vibração","Físico","Protetor auricular + botina bico de aço","NR 12 / NR 31"],
  ["Trabalho em silo / altura","Poeira / queda","Físico","Máscara PFF2 + cinto paraquedista","NR 35 / NR 31"],
  ["Campo geral (+3h sol)","Radiação UV","Físico","Protetor solar FPS50+ + camisa manga longa","NR 31"],
];

const DocPPRA = () => (
  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
    <thead><tr style={{background:"#FFF3E0"}}>
      {["Atividade","Risco","Tipo","EPI obrigatório","Norma"].map(h=>(
        <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#E65100",fontWeight:700,fontSize:10}}>{h}</th>
      ))}
    </tr></thead>
    <tbody>
      {PPRA_ROWS.map((row,i) => (
        <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#FFF8F0"}}>
          <td style={{padding:"5px 8px",fontWeight:600,color:"#37474F"}}>{row[0]}</td>
          <td style={{padding:"5px 8px",color:"#37474F"}}>{row[1]}</td>
          <td style={{padding:"5px 8px",color:"#78909C"}}>{row[2]}</td>
          <td style={{padding:"5px 8px",color:"#1B5E20",fontWeight:600}}>{row[3]}</td>
          <td style={{padding:"5px 8px",color:"#1565C0",fontSize:10}}>{row[4]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const MOTIVOS = ["Vencimento de CA","Desgaste por uso","Dano físico","Troca preventiva","Upgrade de produto"];

const DocHistorico = ({ meus }) => (
  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
    <thead><tr style={{background:"#ECEFF1"}}>
      {["Data","Trabalhador","EPI","Motivo","CA","Responsável"].map(h=>(
        <th key={h} style={{padding:"5px 8px",textAlign:"left",color:"#37474F",fontWeight:700,fontSize:10}}>{h}</th>
      ))}
    </tr></thead>
    <tbody>
      {meus.slice(0,8).map((r,i) => {
        const e = EPIS.find(ep => ep.id === r.epiId);
        return (
          <tr key={i} style={{borderBottom:"1px solid #EEE",background:i%2===0?"#fff":"#F9F9F9"}}>
            <td style={{padding:"5px 8px"}}>{r.ultimoUso}</td>
            <td style={{padding:"5px 8px",fontWeight:600}}>{r.trabNome}</td>
            <td style={{padding:"5px 8px"}}>{e?.nome}</td>
            <td style={{padding:"5px 8px",color:"#78909C"}}>{MOTIVOS[i % MOTIVOS.length]}</td>
            <td style={{padding:"5px 8px",color:"#1565C0",fontWeight:700}}>{e?.ca}</td>
            <td style={{padding:"5px 8px",color:"#1B5E20",fontWeight:600}}>JR Agro EPI</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const KitFiscalizacao = ({ regs }) => {
  const [cliSel, setCliSel] = useState(1);
  const hoje2 = new Date().toLocaleDateString("pt-BR");
  const cli   = CLIENTES.find(c => c.id === cliSel);
  const meus  = regs.filter(r => r.clienteId === cliSel);
  const venc  = meus.filter(r => diasAte(EPIS.find(e => e.id === r.epiId)?.validadeCA) < 0);
  const st    = venc.length === 0 ? "CONFORME" : "PENDENCIAS";

  const imprimir = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const j = window.open("", "_blank");
    j.document.write(
      "<html><head><title>JR Agro EPI</title>" +
      "<style>body{font-family:Arial,sans-serif;font-size:11px;margin:20px}" +
      "table{width:100%;border-collapse:collapse;margin-top:8px}" +
      "th{background:#1B5E20;color:#fff;padding:5px 8px;font-size:10px;text-align:left}" +
      "td{padding:5px 8px;border-bottom:1px solid #DDD;font-size:10px}" +
      "tr:nth-child(even) td{background:#F5F5F5}" +
      ".footer{margin-top:20px;border-top:1px solid #CCC;padding-top:6px;color:#999;font-size:9px}" +
      "</style></head><body>" +
      el.innerHTML +
      "<div class='footer'>Emitido: " + hoje2 + " | JR Agro EPI - Campinas, SP</div>" +
      "</body></html>"
    );
    j.document.close();
    setTimeout(() => j.print(), 500);
  };

  const DOCS_CONFIG = [
    { id:"df",  bg:"#1B5E20", icon:"📝", titulo:"Fichas de Entrega de EPI",         sub:"NR 6 — por trabalhador" },
    { id:"dc",  bg:"#2E7D32", icon:"✅", titulo:"Relatório de CAs Válidos",          sub:"Certificados de Aprovação" },
    { id:"dt",  bg:"#1565C0", icon:"👷", titulo:"Lista de Trabalhadores",            sub:"EPIs por trabalhador" },
    { id:"dtr", bg:"#6A1B9A", icon:"🎓", titulo:"Comprovante de Treinamento NR 31", sub:"Orientação sobre uso de EPI" },
    { id:"dp",  bg:"#E65100", icon:"📋", titulo:"PPRA Resumido por Atividade",       sub:"NR 9 — riscos e EPIs" },
    { id:"dh",  bg:"#37474F", icon:"🔄", titulo:"Histórico de Substituições",        sub:"Trocas com data e motivo" },
  ];

  const renderDoc = (id) => {
    if (id === "df")  return <DocFichas meus={meus} />;
    if (id === "dc")  return <DocCAs />;
    if (id === "dt")  return <DocTrabalhadores meus={meus} />;
    if (id === "dtr") return <DocTreinamento meus={meus} nomeCliente={cli?.nome} />;
    if (id === "dp")  return <DocPPRA />;
    if (id === "dh")  return <DocHistorico meus={meus} />;
    return null;
  };

  return (
    <div style={{ padding:16, display:"flex", flexDirection:"column", gap:14 }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#B71C1C,#C62828)", borderRadius:14,
        padding:22, color:"#fff", display:"flex", alignItems:"center", gap:16 }}>
        <span style={{ fontSize:48, lineHeight:1 }}>🔎</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:800 }}>Kit de Documentos — Fiscalização NR 31</div>
          <div style={{ fontSize:13, color:"#FFCDD2", marginTop:4 }}>
            Fiscal chegou? Selecione o cliente e imprima ou envie em segundos.
          </div>
        </div>
        <div style={{ background:"#fff", borderRadius:12, padding:"10px 16px", textAlign:"center" }}>
          <div style={{ fontSize:10, color:"#C62828", fontWeight:700 }}>STATUS</div>
          <div style={{ fontSize:16, fontWeight:800, marginTop:4,
            color: st === "CONFORME" ? "#1B5E20" : "#C62828" }}>
            {st === "CONFORME" ? "✅ CONFORME" : "⚠️ PENDÊNCIAS"}
          </div>
          <div style={{ fontSize:10, color:"#78909C", marginTop:2 }}>{hoje2}</div>
        </div>
      </div>

      {/* Controles */}
      <div style={{ background:"#fff", borderRadius:12, padding:16,
        boxShadow:"0 2px 8px rgba(0,0,0,0.08)", display:"flex",
        gap:14, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ fontSize:11, color:"#78909C", fontWeight:600, marginBottom:6 }}>CLIENTE</div>
          <select value={cliSel} onChange={e => setCliSel(Number(e.target.value))}
            style={{ width:"100%", padding:"10px 12px", borderRadius:8,
              border:"2px solid #1B5E20", fontSize:13, color:"#1B5E20",
              fontWeight:700, background:"#E8F5E9", outline:"none" }}>
            {CLIENTES.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => imprimir("kit_fiscal")}
            style={{ padding:"8px 16px", borderRadius:8, fontSize:12, cursor:"pointer",
              background:"#1B5E20", color:"#fff", border:"none", fontWeight:700 }}>
            🖨️ Imprimir tudo
          </button>
          <button onClick={() => {
            const txt = "*JR Agro EPI — Kit Fiscalizacao NR 31*\n" +
              "Cliente: " + (cli?.nome || "") + "\n" +
              "Data: " + hoje2 + "\n" +
              "Status: " + (st === "CONFORME" ? "CONFORME" : "PENDENCIAS") + "\n\n" +
              "Documentos:\n" +
              "- Fichas de entrega de EPI\n" +
              "- Relatorio de CAs validos\n" +
              "- Lista de trabalhadores\n" +
              "- Treinamento NR 31\n" +
              "- PPRA resumido\n" +
              "- Historico de substituicoes";
            window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank");
          }}
            style={{ padding:"8px 16px", borderRadius:8, fontSize:12, cursor:"pointer",
              background:"#25D366", color:"#fff", border:"none", fontWeight:700 }}>
            📱 WhatsApp
          </button>
        </div>
      </div>

      {/* Alerta CA vencido */}
      {venc.length > 0 && (
        <div style={{ background:"#FFEBEE", border:"2px solid #C62828", borderRadius:10,
          padding:14, display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:24 }}>⚠️</span>
          <div>
            <div style={{ fontWeight:700, color:"#C62828", fontSize:13 }}>
              {venc.length} CA(s) vencido(s) — regularizar antes da fiscalização
            </div>
            <div style={{ fontSize:11, color:"#78909C", marginTop:3 }}>
              {venc.map(r => r.trabNome + " — " + (EPIS.find(e => e.id === r.epiId)?.nome || "")).join(" • ")}
            </div>
          </div>
        </div>
      )}

      {/* Documentos */}
      <div id="kit_fiscal">
        {DOCS_CONFIG.map(doc => (
          <div key={doc.id} id={doc.id}
            style={{ background:"#fff", borderRadius:12, marginBottom:12,
              boxShadow:"0 2px 8px rgba(0,0,0,0.08)", overflow:"hidden" }}>
            <div style={{ background:doc.bg, padding:"12px 16px",
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>{doc.icon}</span>
                <div>
                  <div style={{ fontWeight:700, color:"#fff", fontSize:13 }}>{doc.titulo}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>{doc.sub}</div>
                </div>
              </div>
              <button onClick={() => imprimir(doc.id)}
                style={{ background:"#fff", color:doc.bg, border:"none",
                  borderRadius:6, padding:"5px 12px", fontSize:11,
                  cursor:"pointer", fontWeight:700 }}>
                🖨️ Imprimir
              </button>
            </div>
            <div style={{ padding:14, overflowX:"auto" }}>
              {renderDoc(doc.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function Sistema() {
  const [aba, setAba]         = useState("interno");
  const [regs, setRegs]       = useState(() => gerarRegistros());
  const [cliSel, setCliSel]   = useState(null);
  const [cliDemo, setCliDemo] = useState(1);
  const [novos, setNovos]     = useState([]);

  const onRegistro = (dados) => {
    const cli = CLIENTES.find(c=>c.nome===dados.empresa);
    const epi = EPIS.find(e=>e.nome===dados.epi);
    if(!cli||!epi) return;
    const t = cli.trabalhadores[0];
    setRegs(p=>[...p,{id:Date.now(),clienteId:cli.id,trabId:t.id,trabNome:dados.nome,
      funcao:"—",epiId:epi.id,dataEntrega:new Date().toISOString().split("T")[0],
      usos:1,ultimoUso:new Date().toISOString().split("T")[0],status:"ativo"}]);
    setNovos(p=>[...p,dados]);
  };

  const ABAS = [
    {id:"bot",     icon:"💬",label:"Bot WhatsApp"},
    {id:"interno", icon:"📊",label:"Dashboard"},
    {id:"cliente", icon:"👁️", label:"Visão Cliente"},
    {id:"ia",      icon:"🤖",label:"Assistente IA"},
    {id:"fiscal",  icon:"🔎",label:"Kit Fiscalização"},
  ];

  const conteudo = () => {
    if(aba==="bot") return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",height:"100%"}}>
        <div style={{borderRight:"1px solid #EEE",display:"flex",flexDirection:"column"}}>
          <BotWpp onRegistro={onRegistro}/>
        </div>
        <div style={{padding:20,background:"#FAFAFA",overflowY:"auto"}}>
          <div style={{fontWeight:700,color:"#1B5E20",fontSize:15,marginBottom:12}}>📖 Como funciona</div>
          {[["1️⃣","Recebe o link","Enviado por WhatsApp após cada entrega"],["2️⃣","Responde em 1 min","5 perguntas simples, sem instalar nada"],["3️⃣","Registro automático","Sistema atualiza em tempo real"],["4️⃣","JR Agro monitora","Alertas quando CA vence ou EPI precisa de troca"]].map(([n,t,d])=>(
            <div key={n} style={{display:"flex",gap:12,marginBottom:10,background:"#fff",borderRadius:10,padding:12,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <span style={{fontSize:20,minWidth:30}}>{n}</span>
              <div><div style={{fontWeight:700,fontSize:13,color:"#37474F"}}>{t}</div><div style={{fontSize:12,color:"#78909C",marginTop:2}}>{d}</div></div>
            </div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"18px 0 14px"}}>
            <div style={{background:"linear-gradient(135deg,#1B5E20,#2E7D32)",borderRadius:12,padding:14,textAlign:"center",color:"#fff"}}>
              <div style={{fontSize:36,fontWeight:900,color:"#F9A825",lineHeight:1}}>0%</div>
              <div style={{fontSize:11,color:"#A5D6A7",marginTop:4,fontWeight:600}}>Risco de Autuação</div>
              <div style={{fontSize:10,color:"#C8E6C9",marginTop:4}}>Com CA e documentação em dia</div>
            </div>
            <div style={{background:"linear-gradient(135deg,#E65100,#F9A825)",borderRadius:12,padding:14,textAlign:"center",color:"#fff"}}>
              <div style={{fontSize:36,fontWeight:900,color:"#FFF9C4",lineHeight:1}}>-15%</div>
              <div style={{fontSize:11,color:"#FFE0B2",marginTop:4,fontWeight:600}}>Custo com EPI</div>
              <div style={{fontSize:10,color:"#FFF3E0",marginTop:4}}>Vs. compra reativa</div>
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:12,padding:16,border:"2px solid #F9A825"}}>
            <div style={{fontWeight:700,color:"#E65100",fontSize:13,marginBottom:10}}>💡 Simulador de Economia</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{background:"#FFEBEE",borderRadius:8,padding:10,textAlign:"center"}}><div style={{fontSize:10,color:"#C62828",fontWeight:600}}>Sem gestão</div><div style={{fontSize:11,marginTop:4}}>Gasto: <strong>R$ 10.000</strong></div><div style={{fontSize:11,color:"#C62828",marginTop:2}}>+ Multa: <strong>R$ 3k–30k</strong></div></div>
              <div style={{background:"#E8F5E9",borderRadius:8,padding:10,textAlign:"center"}}><div style={{fontSize:10,color:"#1B5E20",fontWeight:600}}>Com JR Agro</div><div style={{fontSize:11,marginTop:4}}>Gasto: <strong>R$ 8.500</strong></div><div style={{fontSize:11,color:"#1B5E20",marginTop:2}}>Multa: <strong>R$ 0</strong></div></div>
            </div>
            <div style={{textAlign:"center",marginTop:10,fontWeight:700,color:"#1B5E20",fontSize:13}}>Economia: R$ 1.500/mês + risco zero</div>
          </div>
        </div>
      </div>
    );

    if(aba==="interno") {
      if(cliSel) return <DetalhesCooperativa cli={cliSel} regs={regs} onVoltar={()=>setCliSel(null)}/>;
      return <Dashboard regs={regs} onClicar={setCliSel}/>;
    }

    if(aba==="cliente") return (
      <div>
        <div style={{padding:"12px 16px",background:"#fff",borderBottom:"1px solid #EEE",
          display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"#78909C",fontWeight:600}}>Simular visão do cliente:</span>
          {CLIENTES.map(c=>(
            <button key={c.id} onClick={()=>setCliDemo(c.id)}
              style={{padding:"4px 12px",borderRadius:20,fontSize:12,cursor:"pointer",
                border:cliDemo===c.id?"2px solid #1B5E20":"1px solid #DDD",
                background:cliDemo===c.id?"#E8F5E9":"#fff",
                color:cliDemo===c.id?"#1B5E20":"#78909C",
                fontWeight:cliDemo===c.id?700:400}}>
              {c.nome}
            </button>
          ))}
        </div>
        <VisaoCliente clienteId={cliDemo} regs={regs}/>
      </div>
    );

    if(aba==="ia")     return <AssistenteIA regs={regs}/>;
    if(aba==="fiscal") return <KitFiscalizacao regs={regs}/>;
  };

  return (
    <div style={{fontFamily:"'Segoe UI',Arial,sans-serif",background:"#F5F5F5",
      minHeight:"100vh",maxWidth:1200,margin:"0 auto"}}>
      {/* Topbar */}
      <div style={{background:"#1B5E20",color:"#fff",padding:"12px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🌱</span>
          <div>
            <div style={{fontWeight:800,fontSize:16}}>JR Agro EPI</div>
            <div style={{fontSize:11,color:"#A5D6A7"}}>Sistema de Gestão de EPI</div>
          </div>
        </div>
        {novos.length>0&&(
          <div style={{background:"#F9A825",color:"#fff",borderRadius:20,
            padding:"4px 12px",fontSize:12,fontWeight:700}}>
            +{novos.length} novo(s)
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{background:"#fff",borderBottom:"2px solid #E8F5E9",
        display:"flex",overflowX:"auto"}}>
        {ABAS.map(a=>(
          <button key={a.id} onClick={()=>{setAba(a.id);if(a.id!=="interno")setCliSel(null);}}
            style={{padding:"12px 18px",border:"none",background:"transparent",cursor:"pointer",
              fontWeight:aba===a.id?700:400,fontSize:13,
              color:aba===a.id?"#1B5E20":"#78909C",
              borderBottom:aba===a.id?"3px solid #1B5E20":"3px solid transparent",
              whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
            {a.icon} {a.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div style={{height:"calc(100vh - 105px)",overflowY:"auto"}}>
        {conteudo()}
      </div>

      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#f1f1f1}
        ::-webkit-scrollbar-thumb{background:#C8E6C9;border-radius:4px}
      `}</style>
    </div>
  );
}
