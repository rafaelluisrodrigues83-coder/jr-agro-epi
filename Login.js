import React, { useState } from 'react';

const SENHA = "jragro2025";

export default function Login({ onLogin }) {
  const [input, setInput]   = useState("");
  const [erro, setErro]     = useState(false);
  const [show, setShow]     = useState(false);

  const tentar = () => {
    if (input === SENHA) {
      onLogin();
    } else {
      setErro(true);
      setInput("");
      setTimeout(() => setErro(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg,#1B5E20 0%,#2E7D32 50%,#388E3C 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "40px 36px",
        width: "100%", maxWidth: 380, boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}>
        {/* Logo */}
        <div style={{ fontSize: 48, marginBottom: 8 }}>🌱</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#1B5E20", letterSpacing: "-0.5px" }}>
          JR Agro EPI
        </div>
        <div style={{ fontSize: 13, color: "#78909C", marginTop: 4, marginBottom: 32 }}>
          Sistema de Gestão de EPI Agrícola
        </div>

        {/* Campo de senha */}
        <div style={{ textAlign: "left", marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#37474F", display: "block", marginBottom: 6 }}>
            Senha de acesso
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && tentar()}
              placeholder="Digite a senha"
              style={{
                width: "100%", padding: "12px 44px 12px 14px",
                borderRadius: 10, fontSize: 15, outline: "none",
                border: erro ? "2px solid #C62828" : "2px solid #E0E0E0",
                transition: "border 0.2s",
                background: erro ? "#FFEBEE" : "#fff",
              }}
              autoFocus
            />
            <button
              onClick={() => setShow(s => !s)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#78909C",
              }}>
              {show ? "🙈" : "👁️"}
            </button>
          </div>
          {erro && (
            <div style={{ color: "#C62828", fontSize: 12, marginTop: 6, fontWeight: 600 }}>
              Senha incorreta. Tente novamente.
            </div>
          )}
        </div>

        <button
          onClick={tentar}
          style={{
            width: "100%", padding: "13px", borderRadius: 10,
            background: "#1B5E20", color: "#fff", border: "none",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = "#2E7D32"}
          onMouseLeave={e => e.target.style.background = "#1B5E20"}
        >
          Entrar
        </button>

        <div style={{ marginTop: 24, fontSize: 11, color: "#BDBDBD" }}>
          Acesso restrito — JR Agro EPI © 2025
        </div>
      </div>
    </div>
  );
}
