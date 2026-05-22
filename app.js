/* ========================= */
/* RESET */
/* ========================= */

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

/* ========================= */
/* BODY */
/* ========================= */

body{
  background:#07141f;
  color:#ffffff;
  font-family:Arial,sans-serif;
  padding:8px;
}

/* ========================= */
/* TOPO */
/* ========================= */

.topo{
  text-align:center;
  margin-bottom:8px;
}

.topo p{
  color:#f5d27a;
  font-size:18px;
  font-weight:700;
}

/* ========================= */
/* GRID */
/* ========================= */

.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  margin-top:8px;
}

/* ========================= */
/* CARD */
/* ========================= */

.card{
  background:#0d1f2d;
  border-radius:12px;
  padding:10px;
  border:1px solid #173041;
}

/* ========================= */
/* LINHAS */
/* ========================= */

.linha2{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
}

/* ========================= */
/* TITULOS */
/* ========================= */

.tituloCard{
  font-size:13px;
  font-weight:700;
  margin-bottom:8px;
  color:#f5d27a;
}

/* ========================= */
/* CAMPOS */
/* ========================= */

.campo{
  margin-bottom:8px;
}

.campo label{
  display:block;
  font-size:10px;
  margin-bottom:3px;
  color:#8da5b8;
}

.campo input,
.campo select{
  width:100%;
  height:42px;
  background:#132838;
  border:none;
  border-radius:8px;
  color:#fff;
  padding:8px;
  font-size:14px;
}

/* ========================= */
/* RESULTADO */
/* ========================= */

.resultado{
  background:#132838;
  border-radius:8px;
  padding:8px;
  margin-bottom:8px;
}

.resultado span{
  display:block;
  font-size:10px;
  color:#8da5b8;
  margin-bottom:2px;
}

.resultado strong{
  font-size:17px;
  color:#ffffff;
}

/* ========================= */
/* COMISSAO */
/* ========================= */

.comissao{
  margin-top:10px;
  background:#0d1f2d;
  border:1px solid #f5d27a;
  border-radius:12px;
  padding:12px;
  text-align:center;
}

.comissao span{
  display:block;
  font-size:11px;
  color:#f5d27a;
}

.comissao strong{
  font-size:24px;
  color:#ffffff;
}

/* ========================= */
/* BOTOES */
/* ========================= */

.botaoCompartilhar,
.acoes button{
  width:100%;
  height:42px;
  border:none;
  border-radius:8px;
  background:#c89b3c;
  color:#07141f;
  font-weight:700;
  margin-top:6px;
}

/* ========================= */
/* HISTORICO */
/* ========================= */

.historico{
  margin-top:10px;
}

.historico h3{
  color:#f5d27a;
  margin-bottom:8px;
  font-size:14px;
}

.itemHistorico{
  background:#0d1f2d;
  border-radius:10px;
  padding:10px;
  margin-bottom:8px;
  border:1px solid #173041;
}

/* ========================= */
/* MOBILE */
/* ========================= */

@media(max-width:900px){

  .grid{
    grid-template-columns:1fr 1fr;
    gap:6px;
  }

  .linha2{
    gap:6px;
  }

  .campo input,
  .campo select{
    height:44px;
    font-size:13px;
  }

  .resultado strong{
    font-size:15px;
  }

}
