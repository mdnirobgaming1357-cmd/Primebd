/**
 * ============================================================
 *  PrimeBD — React Frontend (Blue Premium UI)
 *  Language: Bengali (Bangla)
 *  API: https://www.gajarbotol.site/nirob/api.php
 * ============================================================
 */
import './index.css';
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
//  CONFIG
// ============================================================
const API_URL = "https://gajarbotol.shop/config.php";

// ============================================================
//  3D Twemoji icons
// ============================================================
const ICONS = {
  home: "home", earn: "earn", withdraw: "withdraw", bolt: "bolt", gift: "gift",
  star: "star", fire: "fire", chart: "chart", coin: "coin", check: "check",
  tv: "tv", bell: "bell", share: "share", rocket: "rocket", clock: "clock",
  lock: "lock", trophy: "trophy", target: "target", gem: "gem", doc: "doc",
};

// ============================================================
//  Unique line-icon set (no emoji/twemoji) — inherits color via
//  currentColor so it always matches the surrounding theme.
// ============================================================
const ICON_PATHS = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" /></>,
  earn: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>,
  withdraw: <><path d="M12 3v11" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  gift: <><rect x="3" y="8" width="18" height="13" rx="1.5" /><path d="M3 8h18" /><path d="M12 8v13" /><path d="M12 8c-1-2.5-2.7-4-4.3-4A2.2 2.2 0 0 0 5.5 6.2C5.5 7.7 7 8 9 8Z" /><path d="M12 8c1-2.5 2.7-4 4.3-4A2.2 2.2 0 0 1 18.5 6.2c0 1.5-1.5 1.8-3.5 1.8Z" /></>,
  star: <path d="m12 2 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7Z" />,
  fire: <path d="M12 2s3 3 3 6.5c1 -1 1.5-2.5 1.5-2.5 1.5 2 2.5 4 2.5 6.5A7 7 0 0 1 5 12.5c0-2.5 1-4.2 2-5.5.3 1 1 2 1 2C8 5.5 10 3 12 2Z" />,
  chart: <><path d="M3 3v18h18" /><path d="m7 15 4-6 4 3 5-8" /></>,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M9.2 9.3a2.8 2.2 0 0 1 5.4.2c0 1.6-2.6 2.1-2.6 3.7" /><path d="M12 16.2v.1" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  tv: <><rect x="2" y="7" width="20" height="13" rx="2" /><path d="m17 2-5 5-5-5" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4" /><path d="M15.4 6.5 8.6 10.5" /></>,
  rocket: <><path d="M12 2.5c3 0 6 3.2 6 8 0 2.7-1.3 4.6-2.7 6.1L14 21l-2-2-2 2-1.3-4.4C7.3 15.1 6 13.2 6 10.5c0-4.8 3-8 6-8Z" /><circle cx="12" cy="9.5" r="2" /><path d="M9 18c-1.5 0-3 1-3 3 2 0 3-1.5 3-3Z" /><path d="M15 18c1.5 0 3 1 3 3-2 0-3-1.5-3-3Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  trophy: <><path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" /><path d="M8 5H5v1a3 3 0 0 0 3 3" /><path d="M16 5h3v1a3 3 0 0 1-3 3" /><path d="M12 12v4" /><path d="M8.5 20h7" /><path d="M9 20c0-2 1-2.7 3-2.7s3 .7 3 2.7" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
  gem: <><path d="M6 3h12l4 6-10 12L2 9Z" /><path d="M2 9h20" /><path d="m9 3 3 6-3 12" /><path d="m15 3-3 6 3 12" /></>,
  doc: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" /></>,
};

function Icon({ name, size = 20, className = '', style = {} }) {
  const w = style.width || size;
  const h = style.height || size;
  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {ICON_PATHS[name] || null}
    </svg>
  );
}

// ============================================================
//  GLOBAL CSS — Ocean Blue Premium Design
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --bg: #0e1030;
    --bg2: #171a4d;
    --surface: rgba(255,255,255,0.055);
    --surface2: rgba(255,255,255,0.09);
    --surface3: rgba(255,255,255,0.14);
    --text: #f3f4ff;
    --text-dim: #9aa0d4;
    --text-mid: #c7cbf2;
    --border: rgba(255,255,255,0.10);
    --border2: rgba(255,255,255,0.20);
    --primary: #7c6cff;
    --primary2: #a78bfa;
    --primary3: #c4b5fd;
    --gold: #ec4899;
    --gold2: #db2777;
    --green: #34d399;
    --warning: #fbbf24;
    --danger: #fb7185;
    --grad-a: #5b5bff;
    --grad-b: #8b5cf6;
    --grad-c: #ec4899;
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 12px;
    --glow-violet: 0 10px 40px rgba(124,108,255,0.30);
    --glow-violet-strong: 0 16px 56px rgba(124,108,255,0.40);
    --shadow-card: 0 8px 28px rgba(3,4,20,0.35);
  }

  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  html { background: var(--bg); }
  body {
    background:
      radial-gradient(900px 500px at 12% -8%, rgba(124,108,255,0.35) 0%, transparent 60%),
      radial-gradient(800px 600px at 100% 15%, rgba(236,72,153,0.22) 0%, transparent 55%),
      radial-gradient(1000px 700px at 50% 120%, rgba(56,189,248,0.18) 0%, transparent 55%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
    background-attachment: fixed;
    color:var(--text); font-family:'Inter',sans-serif; overflow-x:hidden;
  }
  #root { max-width:480px; margin:0 auto; min-height:100vh; padding-bottom:100px; position:relative; }

  /* ===================== LOADER — Brand White ===================== */
  .loader-overlay {
    position:fixed; inset:0; background:linear-gradient(180deg,#0e1030,#171a4d); z-index:9999;
    display:flex; flex-direction:column;
    justify-content:center; align-items:center;
    transition:opacity 0.6s ease, transform 0.6s ease;
  }
  .loader-bg-glow {
    position:absolute; inset:0;
    background: radial-gradient(ellipse at center, rgba(124,108,255,0.10) 0%, transparent 62%);
    animation: pulseGlowViolet 2.6s ease-in-out infinite alternate;
  }
  @keyframes pulseGlowViolet {
    0% { opacity:0.5; transform:scale(0.85); }
    100% { opacity:1; transform:scale(1.2); }
  }
  .loader-logo-container {
    position:relative; z-index:2; width:150px; height:150px;
    display:flex; align-items:center; justify-content:center;
  }
  .loader-ring {
    position:absolute; border-radius:50%;
    border:1.5px solid rgba(124,108,255,0.18);
  }
  .loader-ring.r1 { width:150px; height:150px; animation:loaderRingSpin 4s linear infinite; border-top-color:var(--primary); }
  .loader-ring.r2 { width:112px; height:112px; animation:loaderRingSpin 3s linear infinite reverse; border-right-color:var(--gold); }
  @keyframes loaderRingSpin {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  .loader-logo {
    width:64px; height:64px; position:relative; z-index:2;
    border-radius:20px;
    background:linear-gradient(135deg, var(--grad-a), var(--grad-b));
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 14px 40px rgba(124,108,255,0.34);
    animation: logoFloat 2.2s ease-in-out infinite;
  }
  .loader-logo svg {
    width:38px; height:38px; object-fit:contain; filter:brightness(0) invert(1);
  }
  @keyframes logoFloat {
    0%,100% { transform:translateY(0) scale(1); }
    50% { transform:translateY(-6px) scale(1.05); }
  }
  .loader-brand-name {
    position:relative; z-index:2; margin-top:34px;
    font-size:1.4rem; font-weight:900; letter-spacing:-0.5px;
    color:var(--text);
  }
  .loader-brand-sub {
    position:relative; z-index:2; margin-top:7px;
    font-size:0.78rem; font-weight:600; letter-spacing:2.5px;
    text-transform:uppercase; color:var(--text-dim);
  }
  .loader-dots {
    position:relative; z-index:2; margin-top:26px;
    display:flex; gap:8px;
  }
  .loader-dots span {
    width:8px; height:8px; border-radius:50%;
    background:var(--primary);
    animation:loaderDot 1.3s ease-in-out infinite;
  }
  .loader-dots span:nth-child(2) { background:var(--gold); animation-delay:0.18s; }
  .loader-dots span:nth-child(3) { background:var(--grad-c); animation-delay:0.36s; }
  @keyframes loaderDot {
    0%,100% { opacity:0.25; transform:scale(0.7); }
    50% { opacity:1; transform:scale(1.15); }
  }

  /* ===================== TOAST ===================== */
  .toast {
    position:fixed; top:-100px; left:50%; transform:translateX(-50%);
    background:var(--surface); color:var(--text);
    box-shadow:0 8px 32px rgba(11,31,58,0.20), 0 0 0 1px var(--border2);
    border-radius:100px; padding:13px 24px;
    font-size:0.88rem; font-weight:700;
    display:flex; align-items:center; gap:10px;
    z-index:10000; transition:top 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    max-width:88%; white-space:nowrap; pointer-events:none;
    font-family:'Inter',sans-serif;
    border-left:4px solid var(--primary);
  }
  .toast.show { top:20px; }
  .toast-icon { width:18px; height:18px; flex-shrink:0; }

  /* ===================== SUCCESS MODAL ===================== */
  .modal-overlay {
    position:fixed; inset:0; z-index:300;
    background:rgba(11,31,58,0.50);
    backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center;
    animation:fadeUp 0.25s ease both;
  }
  .modal-card {
    width:calc(100% - 44px); max-width:380px;
    background:linear-gradient(170deg, #1c1f52 0%, #221a4f 55%, #16143a 100%);
    border:1px solid rgba(124,108,255,0.22);
    border-radius:26px; padding:30px 24px 24px;
    position:relative; overflow:hidden; text-align:center;
    box-shadow:0 30px 80px rgba(11,31,58,0.24), var(--glow-violet);
    animation:modalPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes modalPop {
    from { opacity:0; transform:scale(0.7) translateY(40px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  .modal-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--gold));
  }
  .modal-glow {
    position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse at 50% 0%, rgba(124,108,255,0.14) 0%, transparent 55%);
  }
  .modal-icon {
    width:72px; height:72px; margin:0 auto 16px; border-radius:50%;
    background:rgba(52,211,153,0.14); border:1px solid rgba(52,211,153,0.35);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 30px rgba(52,211,153,0.22);
    position:relative; z-index:1; color:var(--green);
  }
  .modal-icon svg { width:36px; height:36px; }
  .modal-card h3 {
    font-size:1.5rem; font-weight:900; letter-spacing:-0.5px; color:var(--text);
    position:relative; z-index:1;
  }
  .modal-sub {
    font-size:0.82rem; color:var(--text-mid); margin-top:6px;
    position:relative; z-index:1;
  }
  .modal-details {
    margin:20px 0 14px; background:var(--surface2);
    border:1px solid var(--border); border-radius:16px;
    padding:6px 16px; position:relative; z-index:1;
  }
  .modal-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:11px 0; border-bottom:1px solid var(--border);
  }
  .modal-row:last-child { border-bottom:none; }
  .modal-row span { font-size:0.78rem; color:var(--text-dim); font-weight:500; }
  .modal-row strong {
    font-size:0.86rem; color:var(--text); font-weight:700;
    font-variant-numeric:tabular-nums; max-width:60%; text-align:right;
    word-break:break-all;
  }
  .modal-row strong.status-txt { color:var(--warning); }
  .modal-note {
    font-size:0.74rem; color:var(--text-dim); line-height:1.7;
    margin-bottom:18px; position:relative; z-index:1;
  }
  .btn-modal-close {
    width:100%; padding:15px; border:none; border-radius:14px;
    background:linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; font-size:0.95rem; font-weight:800; cursor:pointer;
    position:relative; z-index:1;
    transition:0.2s; box-shadow:0 6px 24px rgba(124,108,255,0.4);
  }
  .btn-modal-close:active { transform:scale(0.97); opacity:0.9; }

  /* ===================== TOP NAV ===================== */
  .top-nav {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 18px 14px; position:sticky; top:0; z-index:50;
    background: linear-gradient(to bottom, var(--bg) 60%, transparent);
  }  .user-pill { display:flex; align-items:center; gap:12px; }
  .user-avatar { position:relative; }
  .user-avatar img {
    width:44px; height:44px; border-radius:50%;
    border:2px solid var(--primary); object-fit:cover;
    box-shadow:0 0 0 3px rgba(124,108,255,0.22), 0 0 30px rgba(124,108,255,0.16);
  }
  .avatar-status {
    position:absolute; bottom:1px; right:1px; width:12px; height:12px;
    background:var(--green); border-radius:50%; border:2px solid var(--bg);
    animation:statusPulse 2s ease-in-out infinite;
  }
  @keyframes statusPulse {
    0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)}
    50%{box-shadow:0 0 0 4px rgba(34,197,94,0)}
  }
  .user-info h3 { font-size:0.95rem; font-weight:700; }
  .user-info p { font-size:0.7rem; color:var(--text-dim); margin-top:1px; }
  .notif-btn {
    width:40px; height:40px; background:var(--surface2); border:1px solid var(--border2);
    border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:0.2s; position:relative;
  }
  .notif-btn svg { width:18px; height:18px; }
  .notif-dot {
    position:absolute; top:7px; right:7px; width:7px; height:7px;
    background:var(--danger); border-radius:50%; border:2px solid var(--bg);
  }
  .notif-btn:active { transform:scale(0.92); }

  /* ===================== PAGES ===================== */
  .page { display:none; padding:0 16px; }
  .page.active {
    display:block;
    animation:pageSlideIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes pageSlideIn {
    from { opacity:0; transform:translateY(24px) scale(0.96); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  /* ===================== SECTION HEADING ===================== */
  .sec-head {
    font-size:0.9rem; font-weight:700; margin:24px 0 14px;
    display:flex; align-items:center; gap:8px; color:var(--text);
    text-transform:uppercase; letter-spacing:0.5px;
  }
  .sec-head svg { width:18px; height:18px; }

  /* ===================== UNIFIED STATS CARD ===================== */
  .stats-card {
    background:linear-gradient(165deg, rgba(124,108,255,0.16), rgba(255,255,255,0.03));
    border:1px solid var(--border); border-radius:var(--radius-lg);
    padding:6px 4px; margin-bottom:18px; position:relative; overflow:hidden;
    box-shadow:var(--shadow-card);
    animation: statsCardIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .stats-card::before {
    content:''; position:absolute; top:-40%; right:-20%; width:60%; height:120%;
    background:radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 65%);
    pointer-events:none;
  }
  @keyframes statsCardIn {
    from { opacity:0; transform:translateY(18px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  .stats-row { display:flex; align-items:center; gap:14px; padding:14px 16px; position:relative; z-index:1; }
  .stats-row + .stats-row { border-top:1px solid var(--border); }
  .stats-icon-chip {
    width:42px; height:42px; border-radius:13px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
  }
  .stats-icon-chip svg { width:22px; height:22px; }
  .stats-icon-chip.i-blue   { background:rgba(124,108,255,0.20); color:var(--primary2); }
  .stats-icon-chip.i-pink   { background:rgba(236,72,153,0.20); color:var(--gold); }
  .stats-icon-chip.i-green  { background:rgba(52,211,153,0.20); color:var(--green); }
  .stats-icon-chip.i-amber  { background:rgba(251,191,36,0.20); color:var(--warning); }
  .stats-row-label { flex:1; min-width:0; }
  .stats-row-label p { font-size:0.76rem; color:var(--text-dim); font-weight:600; margin-bottom:2px; }
  .stats-row-label h4 { font-size:1.15rem; font-weight:800; letter-spacing:-0.3px; color:var(--text); font-variant-numeric:tabular-nums; }

  /* ===================== REFERRAL CARD ===================== */
  .ref-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius-lg); padding:20px 18px;
    margin-bottom:18px; position:relative; overflow:hidden;
  }
  .ref-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2.5px;
    background: linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c));
  }
  .ref-top { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
  .ref-icon {
    width:44px; height:44px; border-radius:14px;
    background:rgba(124,108,255,0.16); border:1px solid rgba(124,108,255,0.24);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .ref-icon svg { width:24px; height:24px; }
  .ref-title h4 { font-size:0.95rem; font-weight:700; }
  .ref-badge {
    display:inline-flex; align-items:center; gap:4px;
    background:rgba(236,72,153,0.14); border:1px solid rgba(236,72,153,0.30);
    color:var(--gold2); padding:3px 10px; border-radius:20px;
    font-size:0.7rem; font-weight:700; margin-top:4px;
    animation:badgePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both 0.3s;
  }
  @keyframes badgePop { from{transform:scale(0)} to{transform:scale(1)} }
  .ref-badge svg { width:12px; height:12px; }
  .ref-label { font-size:0.68rem; color:var(--text-dim); font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; }
  .ref-input-row {
    display:flex; background:var(--surface2); border:1px solid var(--border2);
    border-radius:var(--radius-sm); padding:5px 5px 5px 14px; margin-bottom:12px; align-items:center;
  }
  .ref-inp { flex:1; background:transparent; border:none; color:var(--text-mid); font-size:0.8rem; font-weight:500; outline:none; min-width:0; }
  .btn-copy {
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; border:none; padding:9px 15px; border-radius:9px;
    font-size:0.8rem; font-weight:600; cursor:pointer;
    display:flex; align-items:center; gap:6px; transition:0.2s; flex-shrink:0;
    box-shadow:0 3px 12px rgba(124,108,255,0.28);
  }
  .btn-copy svg { width:14px; height:14px; filter:brightness(10); }
  .btn-copy:active { transform:scale(0.93); opacity:0.85; }
  .btn-copy:disabled { opacity:0.6; cursor:not-allowed; }
  .btn-share {
    width:100%; padding:14px; border:none; border-radius:var(--radius-sm);
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; font-size:0.92rem; font-weight:700; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:0.2s; box-shadow:0 4px 20px rgba(124,108,255,0.38);
  }
  .btn-share svg { width:18px; height:18px; filter:brightness(10); }
  .btn-share:active { transform:scale(0.97); opacity:0.9; }
  .btn-share:disabled { opacity:0.6; cursor:not-allowed; }

  /* ===================== ADS ===================== */
  .ad-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .ad-box {
    background:linear-gradient(160deg, rgba(124,108,255,0.10), rgba(255,255,255,0.04)); border:1px solid var(--border);
    border-radius:var(--radius-md); padding:18px 14px; text-align:center;
    transition:transform 0.2s, border-color 0.2s;
    animation:fadeUp 0.5s ease both;
  }
  .ad-box:active { transform:scale(0.97); }
  .ad-icon {
    width:48px; height:48px; border-radius:14px;
    background:rgba(124,108,255,0.12); border:1px solid rgba(124,108,255,0.18);
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 12px;
  }
  .ad-icon svg { width:26px; height:26px; }
  .ad-box h4 { font-size:0.88rem; font-weight:600; margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .ad-reward { font-size:0.72rem; font-weight:700; color:var(--green); margin-bottom:8px; }
  .ad-counter {
    font-size:0.7rem; background:var(--surface2); border:1px solid var(--border);
    color:var(--text-dim); padding:3px 10px; border-radius:20px;
    display:inline-block; margin-bottom:14px; font-weight:500;
  }
  .ad-btn {
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; border:none; padding:10px 0; width:100%;
    border-radius:10px; font-size:0.83rem; font-weight:600; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:6px;
    transition:0.2s; box-shadow:0 3px 12px rgba(124,108,255,0.24);
  }
  .ad-btn svg { width:14px; height:14px; filter:brightness(10); }
  .ad-btn:active:not(:disabled) { transform:scale(0.96); opacity:0.85; }
  .ad-btn:disabled {
    background:var(--surface2); color:var(--text-dim); cursor:not-allowed;
    border:1px solid var(--border); box-shadow:none;
  }
  .ad-progress {
    width:100%; height:5px; margin-top:10px;
    background:rgba(124,108,255,0.08); border-radius:10px; overflow:hidden;
    border:1px solid rgba(124,108,255,0.15);
  }
  .ad-progress-fill {
    height:100%; border-radius:10px;
    background:linear-gradient(90deg, var(--grad-b), var(--gold));
    transition:width 1s linear;
    box-shadow:0 0 10px rgba(236,72,153,0.4);
  }

  /* ===================== TASKS ===================== */
  .task-list { display:flex; flex-direction:column; gap:12px; }
  .task-item {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius-lg); padding:18px 20px;
    display:flex; align-items:center; justify-content:space-between;
    transition:transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    animation:fadeUp 0.5s ease both;
    box-shadow:var(--shadow-card);
  }
  .task-item:active { transform:scale(0.99); }
  .task-left { display:flex; align-items:center; gap:16px; }
  .task-thumb {
    width:58px; height:58px; border-radius:16px;
    object-fit:cover; background:var(--surface2); flex-shrink:0;
  }
  .task-info h4 { font-size:1rem; font-weight:700; color:var(--text); margin-bottom:5px; }
  .task-reward { font-size:0.84rem; font-weight:800; color:var(--green); }
  .btn-task {
    padding:11px 18px; border-radius:12px; font-size:0.86rem;
    font-weight:700; cursor:pointer; border:none; transition:0.2s;
    white-space:nowrap;
  }
  .btn-task-start {
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; box-shadow:0 3px 14px rgba(124,108,255,0.28);
  }
  .btn-task-start:disabled { opacity:0.6; cursor:not-allowed; }
  .btn-task-wait { background:var(--surface2); color:var(--text-dim); cursor:not-allowed; border:1px solid var(--border); }
  .btn-task-claim {
    background: linear-gradient(135deg, var(--gold2), var(--gold));
    color:#fff; animation:claimPulse 1.2s ease-in-out infinite;
    box-shadow:0 3px 14px rgba(236,72,153,0.35);
  }
  .btn-task-claim:disabled { opacity:0.6; cursor:not-allowed; animation:none; }
  @keyframes claimPulse {
    0%,100%{box-shadow:0 3px 14px rgba(236,72,153,0.3)}
    50%{box-shadow:0 4px 22px rgba(236,72,153,0.6)}
  }

  /* ===================== MISSIONS ===================== */
  .mission-list { display:flex; flex-direction:column; gap:12px; }
  .mission-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius-md); padding:16px;
    animation:fadeUp 0.5s ease both; position:relative; overflow:hidden;
  }
  .mission-card.done { border-color:rgba(236,72,153,0.35); }
  .mission-top { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .mission-icon {
    width:42px; height:42px; border-radius:13px; flex-shrink:0;
    background:rgba(236,72,153,0.14); border:1px solid rgba(236,72,153,0.24);
    display:flex; align-items:center; justify-content:center;
  }
  .mission-icon svg { width:22px; height:22px; }
  .mission-info h4 { font-size:0.9rem; font-weight:700; margin-bottom:3px; }
  .mission-info p { font-size:0.72rem; color:var(--text-dim); }
  .mission-progress-bar {
    width:100%; height:7px; background:rgba(124,108,255,0.08);
    border-radius:10px; overflow:hidden; margin-bottom:10px;
    border:1px solid var(--border2);
  }
  .mission-progress-fill {
    height:100%; border-radius:10px;
    background:linear-gradient(90deg, var(--grad-a), var(--grad-c));
    transition:width 0.4s ease;
  }
  .mission-bottom { display:flex; justify-content:space-between; align-items:center; }
  .mission-count { font-size:0.72rem; color:var(--text-mid); font-weight:600; }
  .btn-mission-claim {
    padding:8px 16px; border-radius:10px; font-size:0.78rem; font-weight:700;
    border:none; cursor:pointer; transition:0.2s;
    background:linear-gradient(135deg, var(--gold2), var(--gold));
    color:#fff; box-shadow:0 3px 12px rgba(236,72,153,0.3);
  }
  .btn-mission-claim:disabled { opacity:0.55; cursor:not-allowed; box-shadow:none; }
  .mission-claimed-badge {
    font-size:0.72rem; font-weight:700; color:var(--green);
    display:flex; align-items:center; gap:5px;
  }
  .mission-claimed-badge svg { width:14px; height:14px; }

  /* ===================== METHOD SELECTOR ===================== */
  .method-selector-wrap { margin-bottom:16px; }
  .method-label {
    font-size:0.68rem; color:var(--text-dim); font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; display:block;
  }
  .method-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .method-card {
    background:var(--surface); border:2px solid var(--border);
    border-radius:var(--radius-md); padding:16px 12px; text-align:center;
    cursor:pointer; transition:0.2s; position:relative;
    animation:fadeUp 0.5s ease both;
  }
  .method-card:hover {
    border-color:rgba(124,108,255,0.3);
    transform:translateY(-2px);
    box-shadow:0 4px 16px rgba(124,108,255,0.12);
  }
  .method-card.active {
    background:rgba(124,108,255,0.10);
    border-color:var(--primary);
    box-shadow:0 0 30px rgba(124,108,255,0.30);
  }
  .method-card:active { transform:scale(0.97); }
  .method-card h5 { font-size:0.88rem; font-weight:700; color:var(--text); margin-bottom:6px; }
  .method-card p { font-size:0.7rem; color:var(--text-dim); }
  .method-check {
    position:absolute; top:8px; right:8px; width:18px; height:18px;
    background:var(--primary); border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    opacity:0; transition:0.2s; transform:scale(0);
  }
  .method-card.active .method-check { opacity:1; transform:scale(1); }
  .method-check::after { content:'✓'; color:#fff; font-size:12px; font-weight:800; }

  /* ===================== WITHDRAW ===================== */
  .info-banner {
    background:rgba(124,108,255,0.07); border:1px solid rgba(124,108,255,0.20);
    border-radius:var(--radius-sm); padding:14px 16px;
    display:flex; align-items:flex-start; gap:12px; margin-bottom:16px;
  }
  .info-banner svg { width:18px; height:18px; flex-shrink:0; margin-top:1px; }
  .info-banner p { font-size:0.8rem; color:var(--text-mid); line-height:1.65; }
  .info-banner p strong { color:var(--text); }
  .input-wrap { position:relative; margin-bottom:12px; }
  .input-icon { position:absolute; top:50%; transform:translateY(-50%); left:15px; width:16px; height:16px; pointer-events:none; }
  .form-inp {
    width:100%; padding:15px 15px 15px 44px;
    background:var(--surface); border:1px solid var(--border2);
    border-radius:var(--radius-sm); color:var(--text); font-size:0.93rem;
    font-weight:500; outline:none; transition:0.2s;
  }
  .form-inp:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(124,108,255,0.14); }
  .form-inp::placeholder { color:var(--text-dim); opacity:0.8; }
  .btn-submit {
    width:100%; padding:16px; border:none; border-radius:var(--radius-sm);
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; font-size:0.97rem; font-weight:700; cursor:pointer;
    margin-top:6px; display:flex; align-items:center; justify-content:center; gap:8px;
    transition:0.2s; box-shadow:0 4px 20px rgba(124,108,255,0.32);
  }
  .btn-submit:active:not(:disabled) { transform:scale(0.98); opacity:0.9; }
  .btn-submit:disabled { background:var(--surface2); box-shadow:none; cursor:not-allowed; color:var(--text-dim); }
  .btn-submit svg { width:18px; height:18px; filter:brightness(10); }

  /* ===================== HISTORY ===================== */
  .hist-wrap {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius-md); overflow:hidden;
  }
  .hist-item {
    display:flex; justify-content:space-between; align-items:center;
    padding:14px 16px; border-bottom:1px solid var(--border);
    animation:fadeUp 0.4s ease both;
  }
  .hist-item:last-child { border-bottom:none; }
  .hist-left { display:flex; align-items:center; gap:13px; }
  .hist-icon {
    width:40px; height:40px; border-radius:12px;
    background:var(--surface2); display:flex; align-items:center; justify-content:center;
  }
  .hist-icon svg { width:20px; height:20px; }
  .hist-info h4 { font-size:0.88rem; font-weight:600; }
  .hist-info small { font-size:0.7rem; color:var(--text-dim); }
  .hist-right { text-align:right; }
  .hist-amt { font-size:0.92rem; font-weight:700; display:block; margin-bottom:4px; }
  .hist-badge { font-size:0.62rem; padding:2px 8px; border-radius:6px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; }
  .status-pending  { background:rgba(245,158,11,0.12); color:var(--warning); }
  .status-completed{ background:rgba(34,197,94,0.12); color:var(--green); }
  .status-rejected { background:rgba(239,68,68,0.12); color:var(--danger); }

  /* ===================== BOTTOM NAV ===================== */
  .bottom-nav {
    position:fixed; bottom:16px; left:50%; transform:translateX(-50%);
    width:calc(100% - 30px); max-width:420px;
    background:rgba(23,26,77,0.75); border:1px solid var(--border2); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    padding:6px 6px; border-radius:100px; display:flex; justify-content:space-around;
    z-index:100; box-shadow:0 12px 48px rgba(11,31,58,0.18);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  }
  .nav-item {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    width:64px; height:56px; cursor:pointer; transition:0.25s; gap:3px;
    border-radius:50px; position:relative;
  }
  .nav-item .nav-img {
    width:24px; height:24px; color:var(--text-dim); transition:0.25s;
  }
  .nav-item span { font-size:0.56rem; font-weight:600; color:var(--text-dim); opacity:0; transition:0.2s; }
  .nav-item.active { background:rgba(124,108,255,0.16); }
  .nav-item.active .nav-img { color:var(--primary2); transform:scale(1.12); }
  .nav-item.active span { opacity:1; color:var(--primary2); }
  .nav-item:active { transform:scale(0.92); }
  .nav-dot {
    width:4px; height:4px; background:var(--primary2); border-radius:50%;
    position:absolute; bottom:5px; display:none;
    animation:dotPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes dotPop { from{transform:scale(0)} to{transform:scale(1)} }
  .nav-item.active .nav-dot { display:block; }

  /* ===================== EMPTY STATE ===================== */
  .empty-state { text-align:center; padding:32px 10px; color:var(--text-dim); font-size:0.86rem; }
  .empty-state svg { width:40px; height:40px; opacity:0.25; display:block; margin:0 auto 12px; }

  /* ===================== SCROLLBAR ===================== */
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:var(--border2); border-radius:4px; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ===================== HEADER BALANCE ===================== */
  .header-balance {
    margin-left:auto; margin-right:10px;
    display:flex; align-items:center; gap:7px;
    background:linear-gradient(135deg, rgba(124,108,255,0.20), rgba(236,72,153,0.18));
    border:1px solid rgba(124,108,255,0.32);
    padding:8px 13px; border-radius:100px;
    box-shadow:0 2px 10px rgba(124,108,255,0.18);
    color:var(--gold);
  }
  .header-balance svg { width:16px; height:16px; }
  .header-balance strong {
    font-size:0.83rem; font-weight:800; color:var(--text);
    font-variant-numeric:tabular-nums; white-space:nowrap;
  }

  /* ===================== REFER VIDEO ===================== */
  .video-block {
    margin-top:18px; padding-top:16px;
    border-top:1px dashed var(--border2);
    animation:fadeUp 0.5s ease both;
  }
  .video-head {
    display:flex; align-items:center; gap:8px;
    font-size:0.82rem; font-weight:700; color:var(--text);
    margin-bottom:12px;
  }
  .video-head svg { width:18px; height:18px; }
  .video-frame {
    width:100%; aspect-ratio:16/9; border-radius:var(--radius-sm);
    overflow:hidden; background:rgba(255,255,255,0.05);
    border:1px solid var(--border);
    box-shadow:var(--shadow-card);
  }
  .video-frame iframe { width:100%; height:100%; border:none; display:block; }

  /* ===================== SPIN WHEEL ===================== */
  .spin-card {
    background:linear-gradient(180deg, rgba(124,108,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
    border:1px solid var(--border2);
    border-radius:var(--radius-lg); padding:22px 18px 24px;
    margin-bottom:18px; position:relative; overflow:hidden;
    box-shadow:var(--shadow-card);
    animation:fadeUp 0.6s ease both;
  }
  .spin-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--gold));
  }
  .spin-head {
    display:flex; align-items:center; gap:12px; margin-bottom:18px;
  }
  .spin-head-icon {
    width:44px; height:44px; border-radius:14px;
    background:linear-gradient(135deg, rgba(124,108,255,0.14), rgba(236,72,153,0.16));
    border:1px solid rgba(124,108,255,0.22);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .spin-head-icon svg { width:24px; height:24px; }
  .spin-head h4 { font-size:1rem; font-weight:800; color:var(--text); }
  .spin-head p { font-size:0.72rem; color:var(--text-dim); margin-top:3px; }

  .spin-wheel-wrap {
    position:relative; width:250px; height:250px; margin:0 auto 16px;
  }
  .spin-pointer {
    position:absolute; top:-8px; left:50%; transform:translateX(-50%);
    width:0; height:0; z-index:5;
    border-left:11px solid transparent; border-right:11px solid transparent;
    border-top:22px solid var(--text);
    filter:drop-shadow(0 2px 4px rgba(11,31,58,0.25));
  }
  .spin-wheel {
    width:100%; height:100%; display:block;
    border-radius:50%;
    filter:drop-shadow(0 10px 30px rgba(11,31,58,0.18));
  }

  .spin-info-row {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:14px;
  }
  .spin-free-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 12px; border-radius:20px;
    font-size:0.76rem; font-weight:700;
  }
  .spin-free-badge.has {
    background:rgba(22,163,74,0.1); border:1px solid rgba(22,163,74,0.25);
    color:var(--green);
  }
  .spin-free-badge.none {
    background:rgba(236,72,153,0.1); border:1px solid rgba(236,72,153,0.28);
    color:var(--gold2);
  }
  .spin-free-badge svg { width:14px; height:14px; }
  .spin-used { font-size:0.72rem; color:var(--text-dim); font-weight:600; }

  .spin-btn {
    width:100%; padding:15px; border:none; border-radius:var(--radius-sm);
    background:linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; font-size:1rem; font-weight:800; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:0.2s; box-shadow:0 6px 24px rgba(124,108,255,0.32);
  }
  .spin-btn svg { width:18px; height:18px; filter:brightness(0) invert(1); }
  .spin-btn:active:not(:disabled) { transform:scale(0.97); opacity:0.92; }
  .spin-btn:disabled {
    background:var(--surface3); color:var(--text-dim); cursor:not-allowed;
    box-shadow:none; opacity:0.8;
  }
  .spin-btn:disabled svg { filter:none; }
  .spin-note {
    margin-top:12px; text-align:center; font-size:0.73rem;
    color:var(--text-dim); font-weight:500;
  }
  .spin-result-amount {
    margin:16px auto 6px; font-size:2.2rem; font-weight:900;
    background:linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--gold));
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
    font-variant-numeric:tabular-nums;
  }

  /* ===================== LIVE WITHDRAW FEED ===================== */
  .live-wrap {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius-md); padding:16px;
    margin-bottom:4px; animation:fadeUp 0.5s ease both;
  }
  .live-head {
    display:flex; align-items:center; gap:9px;
    font-size:0.82rem; font-weight:800; color:var(--text);
    margin-bottom:14px; text-transform:uppercase; letter-spacing:0.5px;
  }
  .live-pulse {
    width:9px; height:9px; border-radius:50%; background:var(--green);
    animation:livePulse 1.6s ease-in-out infinite;
  }
  @keyframes livePulse {
    0%,100% { box-shadow:0 0 0 0 rgba(22,163,74,0.4); }
    50% { box-shadow:0 0 0 5px rgba(22,163,74,0); }
  }
  .live-list { display:flex; flex-direction:column; gap:10px; }
  .live-item {
    display:flex; align-items:center; gap:11px;
    background:var(--surface2); border:1px solid var(--border);
    border-radius:var(--radius-sm); padding:10px 12px;
    animation:fadeUp 0.4s ease both;
  }
  .live-avatar {
    width:38px; height:38px; border-radius:50%; flex-shrink:0;
    background:linear-gradient(135deg, var(--grad-a), var(--grad-b));
    color:#fff; font-weight:800; font-size:0.95rem;
    display:flex; align-items:center; justify-content:center;
  }
  .live-info { flex:1; min-width:0; }
  .live-info h5 { font-size:0.88rem; font-weight:700; color:var(--text); }
  .live-info small { font-size:0.68rem; color:var(--text-dim); }
  .live-amount {
    font-size:0.86rem; font-weight:800; color:var(--green);
    white-space:nowrap; font-variant-numeric:tabular-nums;
  }
`;

// ============================================================
//  Telegram WebApp
// ============================================================
const tg = window.Telegram?.WebApp || {
    ready: () => {},
    expand: () => {},
    setHeaderColor: () => {},
    setBackgroundColor: () => {},
    initData: '',
    initDataUnsafe: { user: { id: 'Dev', first_name: 'User', photo_url: '' }, start_param: null },
    HapticFeedback: { impactOccurred: () => {}, notificationOccurred: () => {} },
    openLink: (u) => window.open(u, '_blank'),
    openTelegramLink: (u) => window.open(u, '_blank'),
};

tg.ready();
tg.expand();
tg.setHeaderColor?.('#eaf2fd');
tg.setBackgroundColor?.('#eaf2fd');

const INIT_DATA = tg.initData || '';

// ============================================================
//  API helper
// ============================================================
async function apiCall(action, method = 'GET', body = null) {
    try {
        let url = `${API_URL}?action=${action}`;
        if (method === 'GET') {
            if (INIT_DATA && action !== 'getConfig') url += `&initData=${encodeURIComponent(INIT_DATA)}`;
            if (body) Object.keys(body).forEach(k => (url += `&${k}=${encodeURIComponent(body[k])}`));
        }
        const opts = { method, cache: 'no-store' };
        if (method !== 'GET') {
            opts.headers = { 'Content-Type': 'application/json' };
            opts.body = JSON.stringify({ initData: INIT_DATA, ...(body || {}) });
        }
        const res = await fetch(url, opts);
        const data = await res.json();
        if (res.status === 401) {
            showToastGlobal('error', 'সেশন শেষ হয়েছে। অ্যাপ পুনরায় চালু করুন।');
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

// ============================================================
//  Loader — Brand White (no progress bar)
// ============================================================
function Loader({ hiding }) {
    return (
        <div className="loader-overlay" style={hiding ? { opacity: 0, transform: 'scale(1.05)' } : {}}>
            <div className="loader-bg-glow" />
            <div className="loader-logo-container">
                <div className="loader-ring r1" />
                <div className="loader-ring r2" />
                <div className="loader-logo">
                    <Icon name="coin" />
                </div>
            </div>
            <div className="loader-brand-name">PrimeBD</div>
            <div className="loader-brand-sub">প্রাইম বিডি</div>
            <div className="loader-dots">
                <span /><span /><span />
            </div>
        </div>
    );
}

// ============================================================
//  Toast
// ============================================================
const TOAST_ICONS = {
    success: ICONS.check,
    error:   ICONS.bell,
    warning: ICONS.bolt,
};

function Toast({ type, msg, show }) {
    return (
        <div className={`toast ${show ? 'show' : ''}`}>
            <Icon name={TOAST_ICONS[type] || ICONS.bell} className="toast-icon" />
            <span>{msg}</span>
        </div>
    );
}

// ============================================================
//  Video embed helper
// ============================================================
function getVideoEmbedUrl(type, url) {
    if (!url || !type) return null;
    const t = String(type).toLowerCase();

    if (t === 'youtube') {
        const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
        if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
        return null;
    }
    if (t === 'telegram') {
        const m = String(url).match(/t\.me\/([a-zA-Z0-9_]+)\/(\d+)/);
        if (m) return `https://t.me/${m[1]}/${m[2]}?embed=1&mode=tme`;
        return null;
    }
    return null;
}

// ============================================================
//  Home Page
// ============================================================
function HomePage({ appState, onCopy, onShare, onSpinDone }) {
    const u   = appState.user;
    const cfg = appState.config;
    const sym = cfg.currencySymbol || 'টাকা';
    const botUsername = cfg.botUsername || 'YourBotUsername';
    const userId = u.id || '';
    const refLink = `https://t.me/${botUsername}/app?startapp=${userId}`;
    const refBonus = cfg.referralBonus || 0;
    const totalAdViews = Object.values(u.dailyAds || {}).reduce((s, c) => s + c, 0);

    const videoCfg = cfg.referVideo || {};
    const videoEmbedUrl = getVideoEmbedUrl(videoCfg.type, videoCfg.url);
    const spinCfg = cfg.spinConfig || {};

    return (
        <div className="page active">
            <div className="stats-card" style={{ marginTop: 4 }}>
                <div className="stats-row">
                    <div className="stats-icon-chip i-blue"><Icon name="tv" /></div>
                    <div className="stats-row-label">
                        <p>বিজ্ঞাপন দেখা</p>
                        <h4>{totalAdViews}</h4>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stats-icon-chip i-pink"><Icon name="share" /></div>
                    <div className="stats-row-label">
                        <p>মোট রেফারেল</p>
                        <h4>{u.referrals || 0}</h4>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stats-icon-chip i-green"><Icon name="check" /></div>
                    <div className="stats-row-label">
                        <p>টাস্ক সম্পন্ন</p>
                        <h4>{u.completedTaskCount || 0}</h4>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stats-icon-chip i-amber"><Icon name="coin" /></div>
                    <div className="stats-row-label">
                        <p>মোট আয়</p>
                        <h4>{(u.totalEarned || 0).toFixed(2)} {sym}</h4>
                    </div>
                </div>
            </div>

            <div className="ref-card">
                <div className="ref-top">
                    <div className="ref-icon">
                        <Icon name="rocket" />
                    </div>
                    <div className="ref-title">
                        <h4>বন্ধুদের আমন্ত্রণ জানান</h4>
                        <div className="ref-badge">
                            <Icon name="gift" />
                            প্রতি রেফারেলে {refBonus} {sym} উপার্জন!
                        </div>
                    </div>
                </div>
                <div className="ref-label">আপনার রেফারেল লিংক</div>
                <div className="ref-input-row">
                    <input className="ref-inp" readOnly value={refLink} onChange={() => {}} />
                    <button className="btn-copy" onClick={() => onCopy(refLink)}>
                        <Icon name="share" /> কপি
                    </button>
                </div>
                <button className="btn-share" onClick={() => onShare(refLink)}>
                    <Icon name="rocket" /> টেলিগ্রামে শেয়ার করুন
                </button>

                {videoCfg.enabled && videoEmbedUrl && (
                    <div className="video-block">
                        <div className="video-head">
                            <Icon name="tv" />
                            <span>{videoCfg.title || 'ভিডিও দেখুন'}</span>
                        </div>
                        <div className="video-frame">
                            <iframe
                                src={videoEmbedUrl}
                                title={videoCfg.title || 'ভিডিও'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>

            {spinCfg.enabled !== false && (
                <SpinWheel appState={appState} onSpinDone={onSpinDone} />
            )}
        </div>
    );
}

// ============================================================
//  Earn Page
// ============================================================
function EarnPage({ appState, onAdDone, onTaskBegin }) {
    const cfg   = appState.config;
    const u     = appState.user;
    const sym   = cfg.currencySymbol || 'টাকা';
    const now   = Date.now();
    const slots = cfg.adSlots || [];
    const limit = cfg.dailyAdLimit || 10;
    const today = new Date().toISOString().slice(0, 10);
    const tasks = cfg.webTasks || {};
    const pendingTasks = [], completedTasks = [];

    Object.keys(tasks).forEach(k => {
        const t = tasks[k];
        const h = (u.taskHistory && u.taskHistory[k]) || {};
        if (t.type === 'onetime' && h.ts) return;
        let isDone = false;
        if (t.type === 'daily' && h.ts && (now - h.ts) < 86400000) isDone = true;
        if (isDone) completedTasks.push({ k, t, h });
        else pendingTasks.push({ k, t, h });
    });

    return (
        <div className="page active">
            <div className="sec-head">
                <Icon name="tv" /> বিজ্ঞাপন দেখুন ও আয় করুন
            </div>
            {slots.length === 0 ? (
                <div className="empty-state">
                    <Icon name="tv" />
                    বর্তমানে কোনো বিজ্ঞাপন উপলব্ধ নেই।
                </div>
            ) : (
                <div className="ad-grid">
                    {slots.map((s, i) => (
                        <AdBox
                            key={s.id} slot={s} index={i} sym={sym}
                            done={u.lastActive === today ? (u.dailyAds?.[s.id] || 0) : 0}
                            limit={limit} onAdDone={onAdDone}
                        />
                    ))}
                </div>
            )}
            <div className="sec-head" style={{ marginTop: 28 }}>
                <Icon name="check" /> বিশেষ টাস্ক
            </div>
            {pendingTasks.length === 0 && completedTasks.length === 0 ? (
                <div className="empty-state">
                    <Icon name="chart" />
                    কোনো টাস্ক উপলব্ধ নেই।
                </div>
            ) : (
                <div className="task-list">
                    {[...pendingTasks, ...completedTasks].map(({ k, t, h }) => (
                        <TaskItem key={k} id={k} task={t} history={h} sym={sym} now={now} onBegin={onTaskBegin} />
                    ))}
                </div>
            )}
            <div style={{ height: 10 }} />
        </div>
    );
}

const AD_STATE_KEY = '__primebd_adstates';

function readAdStates() {
    try { return JSON.parse(localStorage.getItem(AD_STATE_KEY)) || {}; } catch { return {}; }
}
function writeAdStates(states) {
    try { localStorage.setItem(AD_STATE_KEY, JSON.stringify(states)); } catch {}
}
function setAdState(slotId, data) {
    const st = readAdStates();
    st[slotId] = data;
    writeAdStates(st);
}
function clearAdState(slotId) {
    const st = readAdStates();
    delete st[slotId];
    writeAdStates(st);
}

function AdBox({ slot, index, done, limit, onAdDone, sym }) {
    const WATCH_SECONDS    = slot.watchSeconds   || (index === 0 ? 17 : index === 1 ? 30 : 17);
    const COOLDOWN_SECONDS = slot.cooldownSeconds || (index === 0 ? 7  : index === 1 ? 10 : 7);

    const [phase, setPhase] = useState('idle');
    const [countdown, setCountdown] = useState(0);
    const timerRef = useRef(null);
    const lockRef = useRef(false);
    const phaseRef = useRef('idle');
    const adOpenRef = useRef(false);
    const adFailedRef = useRef(false);

    function updatePhase(p) {
        phaseRef.current = p;
        setPhase(p);
    }

    function clearTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    useEffect(() => {
        const st = readAdStates()[slot.id];
        if (st && st.cooldownEnd) {
            if (st.cooldownEnd > Date.now()) {
                updatePhase('cooldown');
                startCountdown(st.cooldownEnd - Date.now(), () => {
                    clearAdState(slot.id);
                    resetToIdle();
                });
            } else {
                clearAdState(slot.id);
            }
        }
        return () => clearTimer();
    }, [slot.id]);

    function startCountdown(totalMs, onDone) {
        const endAt = Date.now() + totalMs;
        clearTimer();
        const tick = () => {
            const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
            setCountdown(remaining);
            if (remaining <= 0) {
                clearTimer();
                onDone();
            } else {
                timerRef.current = setTimeout(tick, 250);
            }
        };
        tick();
    }

    function resetToIdle() {
        clearTimer();
        clearAdState(slot.id);
        updatePhase('idle');
        setCountdown(0);
        lockRef.current = false;
        adOpenRef.current = false;
        adFailedRef.current = false;
    }

    function waitFor(fn, timeoutMs) {
        return new Promise(resolve => {
            const start = Date.now();
            const check = () => {
                if (fn()) return resolve(true);
                if (Date.now() - start >= timeoutMs) return resolve(false);
                setTimeout(check, 200);
            };
            check();
        });
    }

    async function ensureAdLoaded() {
        if (slot.network === 'monetag') {
            await waitFor(() => window[`show_${slot.id}`], 10000);
            return !!window[`show_${slot.id}`];
        }
        if (slot.network === 'adsgram') {
            await waitFor(() => window.Adsgram, 10000);
            return !!window.Adsgram;
        }
        return false;
    }

    function openAd() {
        return new Promise(resolve => {
            if (slot.network === 'monetag' && window[`show_${slot.id}`]) {
                adOpenRef.current = true;
                adFailedRef.current = false;
                try { window[`show_${slot.id}`](); } catch {}
                resolve(true);
                return;
            }
            if (slot.network === 'adsgram' && window.Adsgram) {
                if (!window.__adsgramControllers) window.__adsgramControllers = {};
                if (!window.__adsgramControllers[slot.id]) {
                    window.__adsgramControllers[slot.id] = window.Adsgram.init({ blockId: slot.id });
                }
                adOpenRef.current = true;
                adFailedRef.current = false;
                window.__adsgramControllers[slot.id].show()
                    .then(() => { adOpenRef.current = false; })
                    .catch(() => {
                        adOpenRef.current = false;
                        adFailedRef.current = true;
                        if (phaseRef.current === 'watching') {
                            showToastGlobal('error', 'বিজ্ঞাপন সম্পূর্ণ হয়নি। আবার চেষ্টা করুন।');
                            resetToIdle();
                        }
                    });
                resolve(true);
                return;
            }
            resolve(false);
        });
    }

    async function triggerAd() {
        if (lockRef.current || done >= limit) return;
        lockRef.current = true;
        try { tg.HapticFeedback.impactOccurred('light'); } catch {}

        updatePhase('loading');
        setCountdown(0);

        const loaded = await ensureAdLoaded();
        if (!loaded) {
            showToastGlobal('error', 'বিজ্ঞাপন লোড হচ্ছে না। আবার চেষ্টা করুন।');
            resetToIdle();
            return;
        }

        const opened = await openAd();
        if (!opened) {
            showToastGlobal('error', 'বিজ্ঞাপন দেখানো যাচ্ছে না। আবার চেষ্টা করুন।');
            resetToIdle();
            return;
        }

        updatePhase('watching');
        startCountdown(WATCH_SECONDS * 1000, () => {
            waitFor(() => !adOpenRef.current || adFailedRef.current, 30000).then(() => {
                if (adFailedRef.current) {
                    showToastGlobal('error', 'বিজ্ঞাপন সম্পূর্ণ হয়নি। আবার চেষ্টা করুন।');
                    resetToIdle();
                    return;
                }
                completeWatch();
            });
        });
    }

    async function completeWatch() {
        try {
            await onAdDone(slot.id);
            try { tg.HapticFeedback.notificationOccurred('success'); } catch {}
        } catch { /* ignore */ }

        updatePhase('cooldown');
        setAdState(slot.id, { cooldownEnd: Date.now() + COOLDOWN_SECONDS * 1000 });
        startCountdown(COOLDOWN_SECONDS * 1000, () => {
            clearAdState(slot.id);
            resetToIdle();
        });
    }

    const total = phase === 'watching' ? WATCH_SECONDS : phase === 'cooldown' ? COOLDOWN_SECONDS : 0;
    const progress = total > 0 ? Math.min(100, Math.round(((total - countdown) / total) * 100)) : 0;

    return (
        <div className="ad-box" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="ad-icon">
                <Icon name="tv" />
            </div>
            <h4>{slot.title || `বিজ্ঞাপন ${index + 1}`}</h4>
            {slot.reward > 0 && <div className="ad-reward">+{slot.reward} {sym || 'টাকা'}</div>}
            <div className="ad-counter">{done}/{limit}</div>
            <button className="ad-btn" onClick={triggerAd} disabled={phase !== 'idle' || done >= limit}>
                {phase === 'loading' ? (
                    <><Icon name="rocket" /> লোড হচ্ছে...</>
                ) : phase === 'watching' ? (
                    <><Icon name="clock" /> বোনাস পেতে {countdown}সে</>
                ) : phase === 'cooldown' ? (
                    <><Icon name="lock" /> {countdown}সে পর আবার দেখুন</>
                ) : done >= limit ? (
                    <><Icon name="lock" /> সম্পন্ন</>
                ) : (
                    <><Icon name="bolt" /> দেখুন</>
                )}
            </button>
            {(phase === 'watching' || phase === 'cooldown') && (
                <div className="ad-progress">
                    <div className="ad-progress-fill" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    );
}

function TaskItem({ id, task, history, sym, now, onBegin }) {
    const [state, setState] = useState('idle');
    const [countdown, setCountdown] = useState(5);
    const timerRef = useRef(null);
    const lockRef = useRef(false);

    const isDailyDone = task.type === 'daily' && history.ts && (now - history.ts) < 86400000;
    const left = isDailyDone ? (86400000 - (now - history.ts)) : 0;
    const hrs  = Math.floor(left / 3600000);
    const mins = Math.floor((left % 3600000) / 60000);

    function handleStart() {
        if (lockRef.current) return;
        lockRef.current = true;
        tg.openLink(task.url);
        tg.HapticFeedback.impactOccurred('medium');
        setState('waiting');
        let sec = 5;
        setCountdown(sec);
        timerRef.current = setInterval(() => {
            sec--;
            setCountdown(sec);
            if (sec <= 0) {
                clearInterval(timerRef.current);
                setState('claim');
                lockRef.current = false;
            }
        }, 1000);
    }

    async function handleClaim() {
        if (lockRef.current) return;
        lockRef.current = true;
        setState('claiming');
        const ok = await onBegin(id, task);
        lockRef.current = false;
        if (!ok) setState('claim');
    }

    useEffect(() => () => clearInterval(timerRef.current), []);

    const thumbSrc = task.imageUrl || task.iconUrl || null;

    return (
        <div className="task-item" style={{ opacity: isDailyDone ? 0.5 : 1 }}>
            <div className="task-left">
                {thumbSrc ? (
                    <img src={thumbSrc} className="task-thumb" alt={task.name} />
                ) : (
                    <div className="task-thumb" style={{
                        display:'flex', alignItems:'center', justifyContent:'center',
                        background:'var(--surface2)'
                    }}>
                        <Icon name="doc" style={{ width: 26, height: 26 }} />
                    </div>
                )}
                <div className="task-info">
                    <h4>{task.name}</h4>
                    <div className="task-reward">+{task.reward} {sym}</div>
                </div>
            </div>
            {isDailyDone ? (
                <button className="btn-task btn-task-wait" disabled>
                    <Icon name="clock" style={{width:12,height:12}} /> {hrs}ঘ {mins}মি
                </button>
            ) : state === 'claiming' ? (
                <button className="btn-task btn-task-wait" disabled>প্রসেসিং...</button>
            ) : state === 'idle' ? (
                <button className="btn-task btn-task-start" onClick={handleStart} disabled={lockRef.current}>শুরু</button>
            ) : state === 'waiting' ? (
                <button className="btn-task btn-task-wait" disabled>{countdown}সে</button>
            ) : (
                <button className="btn-task btn-task-claim" onClick={handleClaim} disabled={lockRef.current}>দাবি!</button>
            )}
        </div>
    );
}

function MissionPage({ appState, onClaimMission }) {
    const cfg = appState.config;
    const u   = appState.user;
    const sym = cfg.currencySymbol || 'টাকা';
    const missions = cfg.missions || {};
    const claimed = u.claimedMissions || {};
    const refs = u.referrals || 0;
    const ids = Object.keys(missions);
    const [claimingId, setClaimingId] = useState(null);

    async function handleClaim(id) {
        if (claimingId) return; // একসাথে একাধিক মিশন ক্লেইম রোধ করা হচ্ছে
        setClaimingId(id);
        try {
            await onClaimMission(id);
        } finally {
            setClaimingId(null);
        }
    }

    return (
        <div className="page active">
            <div className="sec-head">
                <Icon name="trophy" /> মিশন ও বোনাস
            </div>
            {ids.length === 0 ? (
                <div className="empty-state">
                    <Icon name="target" />
                    বর্তমানে কোনো মিশন উপলব্ধ নেই।
                </div>
            ) : (
                <div className="mission-list">
                    {ids.map(id => {
                        const m = missions[id];
                        const required = m.requiredReferrals || 0;
                        const isClaimed = !!claimed[id];
                        const isEligible = refs >= required && !isClaimed;
                        const pct = required > 0 ? Math.min(100, Math.round((refs / required) * 100)) : 100;
                        return (
                            <div className={`mission-card ${isClaimed ? 'done' : ''}`} key={id}>
                                <div className="mission-top">
                                    <div className="mission-icon">
                                        <Icon name="target" />
                                    </div>
                                    <div className="mission-info">
                                        <h4>{m.title || 'মিশন'}</h4>
                                        <p>{required} জন রেফার করলে +{m.bonus} {sym} বোনাস</p>
                                    </div>
                                </div>
                                <div className="mission-progress-bar">
                                    <div className="mission-progress-fill" style={{ width: `${pct}%` }} />
                                </div>
                                <div className="mission-bottom">
                                    <span className="mission-count">{Math.min(refs, required)}/{required} রেফারেল</span>
                                    {isClaimed ? (
                                        <span className="mission-claimed-badge">
                                            <Icon name="check" /> সংগ্রহ করা হয়েছে
                                        </span>
                                    ) : (
                                        <button
                                            className="btn-mission-claim"
                                            disabled={!isEligible || claimingId !== null}
                                            onClick={() => handleClaim(id)}
                                        >
                                            {claimingId === id ? 'প্রসেসিং...' : 'বোনাস নিন'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div style={{ height: 10 }} />
        </div>
    );
}

function SpinWheel({ appState, onSpinDone }) {
    const cfg     = appState.config;
    const spinCfg = cfg.spinConfig || {};
    const sym     = cfg.currencySymbol || 'টাকা';

    const rewards   = (Array.isArray(spinCfg.rewards) && spinCfg.rewards.length >= 2)
        ? spinCfg.rewards.map(Number) : [1, 2, 5, 10, 20, 50, 100, 500];
    const freeCount   = parseInt(spinCfg.freeCount || 5, 10);
    const freeSpinsUsed = appState.user.freeSpinsUsed || 0;
    const freeLeft    = Math.max(0, freeCount - freeSpinsUsed);
    const adNetwork   = spinCfg.adNetwork || 'adsgram';
    const adId        = spinCfg.adId || '';
    const watchSeconds  = parseInt(spinCfg.watchSeconds || 8, 10);
    const spinDuration  = Math.max(1500, parseInt(spinCfg.spinDurationMs || 4200, 10));

    const n          = rewards.length;
    const segAngle   = 360 / n;
    const palette    = ['#7c6cff', '#ec4899', '#38bdf8', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#818cf8'];

    const [rotation, setRotation] = useState(0);
    const [phase, setPhase] = useState('idle');
    const [result, setResult] = useState(null);
    const lockRef     = useRef(false);
    const adOpenRef   = useRef(false);
    const adFailedRef = useRef(false);

    const wedges = rewards.map((v, i) => {
        const start = i * segAngle;
        const end   = start + segAngle;
        const rad   = Math.PI / 180;
        const x1 = 50 + 50 * Math.cos(start * rad);
        const y1 = 50 + 50 * Math.sin(start * rad);
        const x2 = 50 + 50 * Math.cos(end * rad);
        const y2 = 50 + 50 * Math.sin(end * rad);
        const large = segAngle > 180 ? 1 : 0;
        return {
            value: v,
            color: palette[i % palette.length],
            path: `M50 50 L${x1.toFixed(2)} ${y1.toFixed(2)} A50 50 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
            labelAngle: start + segAngle / 2,
        };
    });

    function waitFor(fn, timeoutMs) {
        return new Promise(resolve => {
            const start = Date.now();
            const check = () => {
                if (fn()) return resolve(true);
                if (Date.now() - start >= timeoutMs) return resolve(false);
                setTimeout(check, 200);
            };
            check();
        });
    }

    async function ensureAdLoaded() {
        if (adNetwork === 'monetag') {
            if (!document.querySelector(`script[data-zone="${adId}"]`)) {
                const sc = document.createElement('script');
                sc.src = '//libtl.com/sdk.js';
                sc.dataset.zone = adId;
                sc.dataset.sdk  = `show_${adId}`;
                document.body.appendChild(sc);
            }
            await waitFor(() => window[`show_${adId}`], 10000);
            return !!window[`show_${adId}`];
        }
        if (adNetwork === 'adsgram') {
            if (!window.__adsgramSdkLoaded) {
                window.__adsgramSdkLoaded = true;
                const sc = document.createElement('script');
                sc.src = 'https://sad.adsgram.ai/js/sad.min.js';
                document.body.appendChild(sc);
            }
            await waitFor(() => window.Adsgram, 10000);
            return !!window.Adsgram;
        }
        return false;
    }

    async function openAd() {
        if (adNetwork === 'monetag' && window[`show_${adId}`]) {
            adOpenRef.current = true;
            adFailedRef.current = false;
            try { window[`show_${adId}`](); } catch {}
            return 'opened';
        }
        if (adNetwork === 'adsgram' && window.Adsgram) {
            if (!window.__spinAdsgramController) {
                window.__spinAdsgramController = window.Adsgram.init({ blockId: adId });
            }
            adOpenRef.current = true;
            adFailedRef.current = false;
            try {
                await window.__spinAdsgramController.show();
                adOpenRef.current = false;
                return 'done';
            } catch {
                adOpenRef.current = false;
                adFailedRef.current = true;
                return 'failed';
            }
        }
        return 'missing';
    }

    function computeTargetRotation(current, segIndex) {
        const targetMod = ((360 - (segIndex * segAngle + segAngle / 2)) % 360 + 360) % 360;
        const mod = ((targetMod - (current % 360)) % 360 + 360) % 360;
        return current + 360 * 5 + mod;
    }

    async function doSpin() {
        try { tg.HapticFeedback.impactOccurred('medium'); } catch {}

        const res = await onSpinDone();
        let segIndex, reward, newBalance;
        if (res && !res.error) {
            segIndex  = Math.max(0, Math.min(n - 1, Math.round(Number(res.segmentIndex) || 0)));
            reward    = Number(res.reward) || rewards[segIndex] || 0;
            newBalance = res.newBalance;
        } else {
            segIndex  = Math.floor(Math.random() * n);
            reward    = rewards[segIndex];
            newBalance = (appState.user.balance || 0) + reward;
        }

        setPhase('spinning');
        setResult(null);
        setRotation(computeTargetRotation(rotation, segIndex));

        setTimeout(() => {
            setResult({ reward, newBalance });
            setPhase('idle');
            lockRef.current = false;
            try { tg.HapticFeedback.notificationOccurred('success'); } catch {}
        }, spinDuration);
    }

    async function handleSpin() {
        if (lockRef.current || phase !== 'idle') return;
        lockRef.current = true;

        if (freeLeft > 0) {
            await doSpin();
            return;
        }

        if (!adId) {
            showToastGlobal('warning', 'স্পিন আনলক করতে বিজ্ঞাপন কনফিগার করা নেই।');
            lockRef.current = false;
            return;
        }

        setPhase('loading');
        const loaded = await ensureAdLoaded();
        if (!loaded) {
            showToastGlobal('error', 'বিজ্ঞাপন লোড হচ্ছে না। আবার চেষ্টা করুন।');
            lockRef.current = false;
            setPhase('idle');
            return;
        }

        const opened = await openAd();
        if (opened === 'failed') {
            showToastGlobal('error', 'বিজ্ঞাপন সম্পূর্ণ হয়নি। আবার চেষ্টা করুন।');
            lockRef.current = false;
            setPhase('idle');
            return;
        }
        if (opened === 'missing') {
            showToastGlobal('error', 'বিজ্ঞাপন দেখানো যাচ্ছে না। আবার চেষ্টা করুন।');
            lockRef.current = false;
            setPhase('idle');
            return;
        }

        setPhase('watching');
        if (adNetwork === 'monetag') {
            await new Promise(r => setTimeout(r, watchSeconds * 1000));
        }

        await doSpin();
    }

    return (
        <div className="spin-card">
            <div className="spin-head">
                <div className="spin-head-icon">
                    <Icon name="gem" />
                </div>
                <div>
                    <h4>{spinCfg.title || 'ভাগ্যের চাকা'}</h4>
                    <p>প্রতিদিন স্পিন করুন, বোনাস জিতুন!</p>
                </div>
            </div>

            <div className="spin-wheel-wrap">
                <div className="spin-pointer" />
                <svg
                    className="spin-wheel"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: phase === 'spinning'
                            ? `transform ${spinDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`
                            : 'none',
                    }}
                >
                    <circle cx="50" cy="50" r="50" fill="#ffffff" />
                    {wedges.map((w, i) => (
                        <path key={i} d={w.path} fill={w.color} stroke="#ffffff" strokeWidth="1.2" />
                    ))}
                    {wedges.map((w, i) => {
                        const rad = w.labelAngle * Math.PI / 180;
                        const tx = 50 + 33 * Math.cos(rad);
                        const ty = 50 + 33 * Math.sin(rad);
                        return (
                            <text
                                key={`t${i}`}
                                x={tx}
                                y={ty}
                                transform={`rotate(${w.labelAngle + 90} ${tx} ${ty})`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#ffffff"
                                fontWeight="800"
                                fontSize="7.5"
                            >
                                {w.value}
                            </text>
                        );
                    })}
                    <circle cx="50" cy="50" r="9" fill="#ffffff" stroke="#7c6cff" strokeWidth="1.5" />
                </svg>
            </div>

            <div className="spin-info-row">
                <div className={`spin-free-badge ${freeLeft > 0 ? 'has' : 'none'}`}>
                    <Icon name="gift" />
                    {freeLeft > 0 ? `${freeLeft} টা ফ্রি স্পিন` : 'ফ্রি স্পিন শেষ'}
                </div>
                <div className="spin-used">ব্যবহৃত: {freeSpinsUsed}/{freeCount}</div>
            </div>

            <button className="spin-btn" onClick={handleSpin} disabled={phase !== 'idle'}>
                {phase === 'loading' ? (
                    <><Icon name="rocket" /> বিজ্ঞাপন লোড হচ্ছে...</>
                ) : phase === 'watching' ? (
                    <><Icon name="clock" /> বিজ্ঞাপন চলছে...</>
                ) : phase === 'spinning' ? (
                    <><Icon name="clock" /> স্পিন হচ্ছে...</>
                ) : (
                    <><Icon name="gem" /> স্পিন করুন</>
                )}
            </button>
            <div className="spin-note">
                {freeLeft > 0
                    ? <>প্রথম {freeCount} টি স্পিন ফ্রি — স্পিন করলেই পুরস্কার ব্যালেন্সে যোগ হবে</>
                    : <>বিজ্ঞাপন দেখে স্পিন আনলক করুন</>}
            </div>

            {result && (
                <div className="modal-overlay spin-result-overlay" onClick={() => setResult(null)}>
                    <div className="modal-card">
                        <div className="modal-glow" />
                        <div className="modal-icon">
                            <Icon name="gift" />
                        </div>
                        <h3>অভিনন্দন!</h3>
                        <p className="modal-sub">আপনি জিতেছেন</p>
                        <div className="spin-result-amount">+{result.reward} {sym}</div>
                        <p className="modal-note">পুরস্কার আপনার ব্যালেন্সে যোগ করা হয়েছে। আবারও স্পিন করুন!</p>
                        <button className="btn-modal-close" onClick={() => setResult(null)}>ঠিক আছে</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const FALLBACK_LIVE_NAMES = [
    'রাকিব', 'সুমাইয়া', 'ইমরান', 'নুসরাত', 'তানভীর', 'ফারহানা',
    'সাকিব', 'মেহজাবিন', 'রবিউল', 'আয়েশা', 'জুনায়েদ', 'সাবরিনা',
    'আরিফ', 'মিম', 'রাফি', 'তাসনিম', 'সজীব', 'নাদিয়া',
];

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function LiveWithdrawFeed({ appState }) {
    const cfg = appState.config;
    const sym = cfg.currencySymbol || 'টাকা';
    const lw  = cfg.liveWithdrawal || {};
    const visibleCount = Math.max(1, parseInt(lw.visibleCount || 2, 10));
    const refreshSeconds = Math.max(3, parseInt(lw.refreshSeconds || 6, 10));

    const [feed, setFeed] = useState([]);
    const [items, setItems] = useState([]);
    const feedRef = useRef([]);
    const itemsRef = useRef([]);
    const cursorRef = useRef(0);
    const lastShownRef = useRef(null);

    const loadFeed = useCallback(async () => {
        let names = [];
        try {
            const res = await apiCall('getLiveWithdrawals');
            if (res && Array.isArray(res) && res.length) {
                names = res.filter(r => r && r.name && r.amount != null).map(r => ({
                    name: r.name,
                    amount: r.amount,
                }));
            } else if (res && Array.isArray(res.users) && res.users.length) {
                names = res.users.filter(r => r && r.name && r.amount != null).map(r => ({
                    name: r.name,
                    amount: r.amount,
                }));
            }
        } catch { /* fallback below */ }
        if (!names.length) {
            names = FALLBACK_LIVE_NAMES.map(n => ({
                name: n,
                amount: (Math.random() * 90 + 10).toFixed(0),
            }));
        }
        names = shuffleArray(names);
        feedRef.current = names;
        cursorRef.current = 0;
        lastShownRef.current = null;
        setFeed(names);
        advance();
    }, []); // eslint-disable-line

    const advance = useCallback(() => {
        const list = feedRef.current;
        if (!list || !list.length) return;
        if (lastShownRef.current !== null && cursorRef.current % list.length === 0) {
            list.splice(0, 1);
        }
        const next = [];
        for (let k = 0; k < visibleCount; k++) {
            const entry = list[(cursorRef.current + k) % list.length];
            if (entry) next.push({ ...entry, timeAgo: Math.floor(Math.random() * 55) + 5 });
        }
        lastShownRef.current = next[next.length - 1]?.name || null;
        cursorRef.current = (cursorRef.current + visibleCount) % list.length;
        setItems(next);
    }, [visibleCount]);

    useEffect(() => {
        loadFeed();
        const id = setInterval(advance, refreshSeconds * 1000);
        return () => clearInterval(id);
    }, [loadFeed, advance, refreshSeconds]);

    if (lw.enabled === false || feed.length === 0) return null;

    return (
        <div className="live-wrap">
            <div className="live-head">
                <span className="live-pulse" />
                <span>{lw.title || 'সদ্য উত্তোলন করেছেন'}</span>
            </div>
            <div className="live-list">
                {items.map((it, idx) => (
                    <div className="live-item" key={idx}>
                        <div className="live-avatar">
                            {it.name.charAt(0)}
                        </div>
                        <div className="live-info">
                            <h5>{it.name}</h5>
                            <small>{it.timeAgo} মিনিট আগে উত্তোলন করেছে</small>
                        </div>
                        <div className="live-amount">
                            +{it.amount} {sym}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function WithdrawPage({ appState, onWithdraw }) {
    const cfg    = appState.config;
    const u      = appState.user;
    const sym    = cfg.currencySymbol || 'টাকা';
    const methods = cfg.withdrawMethods || [];
    const minRef  = cfg.minWithdrawReferrals || 0;

    const [method,     setMethod]     = useState(methods.length > 0 ? methods[0].name : '');
    const [account,    setAccount]    = useState('');
    const [amount,     setAmount]     = useState('');
    const [processing, setProcessing] = useState(false);
    const lockRef = useRef(false);

    const selectedMethod = methods.find(m => m.name === method) || methods[0];
    const sysMin = parseFloat(selectedMethod?.min || 10);

    const statusMap = { pending:'অপেক্ষমান', completed:'সম্পন্ন', rejected:'বাতিল' };
    const histIcons = {
        completed: ICONS.check,
        rejected:  ICONS.bell,
        pending:   ICONS.clock,
    };
    const histColors = {
        completed: 'var(--green)',
        rejected:  'var(--danger)',
        pending:   'var(--warning)',
    };

    async function handleSubmit() {
        if (processing || lockRef.current) return;
        if (!lockRef.current) {
            lockRef.current = true;
            if (u.referrals < minRef) {
                showToastGlobal('warning', `উত্তোলনের জন্য ন্যূনতম ${minRef} রেফারেল প্রয়োজন।`);
                tg.HapticFeedback.notificationOccurred('warning');
                lockRef.current = false;
                return;
            }
            const reqAmt = parseFloat(amount);
            if (!account || account.trim().length < 3) {
                showToastGlobal('error', 'একটি বৈধ অ্যাকাউন্ট নম্বর দিন.');
                lockRef.current = false;
                return;
            }
            if (!reqAmt || isNaN(reqAmt) || reqAmt < sysMin) {
                showToastGlobal('error', `ন্যূনতম উত্তোলন ${sysMin} ${sym}।`);
                tg.HapticFeedback.notificationOccurred('error');
                lockRef.current = false;
                return;
            }
            if (reqAmt > u.balance) {
                showToastGlobal('error', 'পর্যাপ্ত ব্যালেন্স নেই।');
                tg.HapticFeedback.notificationOccurred('error');
                lockRef.current = false;
                return;
            }
            setProcessing(true);
            const ok = await onWithdraw({ userId: u.id, userName: u.firstName, amount: reqAmt, method: method || selectedMethod?.name, account: account.trim() });
            setProcessing(false);
            lockRef.current = false;
            if (ok) { setAmount(''); setAccount(''); }
        }
    }

    return (
        <div className="page active">
            <div className="sec-head">
                <Icon name="withdraw" /> উত্তোলন
            </div>
            <div className="info-banner">
                <Icon name="bolt" />
                <div>
                    <p>
                        <strong>ন্যূনতম:</strong> {sysMin} {sym} &nbsp;|&nbsp;
                        <strong>ন্যূনতম রেফারেল:</strong> {minRef}
                    </p>
                </div>
            </div>

            {methods.length > 0 && (
                <div className="method-selector-wrap">
                    <span className="method-label">পেমেন্ট পদ্ধতি নির্বাচন করুন</span>
                    <div className="method-grid">
                        {methods.map(m => (
                            <div
                                key={m.name}
                                className={`method-card ${method === m.name ? 'active' : ''}`}
                                onClick={() => setMethod(m.name)}
                            >
                                <h5>{m.name}</h5>
                                <p>ন্যূনতম {m.min}</p>
                                <div className="method-check" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="input-wrap">
                <Icon name="share" className="input-icon" />
                <input className="form-inp" placeholder="অ্যাকাউন্ট নম্বর / ট্যাগ" value={account} onChange={e => setAccount(e.target.value)} />
            </div>
            <div className="input-wrap">
                <Icon name="coin" className="input-icon" />
                <input className="form-inp" type="number" placeholder="উত্তোলনের পরিমাণ" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <button className="btn-submit" onClick={handleSubmit} disabled={processing || lockRef.current}>
                {processing
                    ? <><Icon name="clock" /> প্রক্রিয়াকরণ...</>
                    : <><Icon name="withdraw" /> উত্তোলন অনুরোধ</>
                }
            </button>

            <div className="sec-head" style={{ marginTop: 34 }}>
                <Icon name="chart" /> সাম্প্রতিক লেনদেন
            </div>
            <div className="hist-wrap">
                {(!appState.history || appState.history.length === 0) ? (
                    <div className="empty-state">
                        <Icon name="chart" />
                        এখনো কোনো লেনদেন নেই।
                    </div>
                ) : appState.history.map((d, idx) => {
                    const sl = d.status?.toLowerCase() || 'pending';
                    const dt = new Date(d.timestamp);
                    return (
                        <div className="hist-item" key={idx}>
                            <div className="hist-left">
                                <div className="hist-icon">
                                    <Icon name={histIcons[sl] || ICONS.coin} style={{ filter: `drop-shadow(0 0 4px ${histColors[sl]||'transparent'})` }} />
                                </div>
                                <div className="hist-info">
                                    <h4>{d.method}</h4>
                                    <small>
                                        {dt.toLocaleDateString('bn-BD')} &middot; {dt.toLocaleTimeString('bn-BD', { hour:'2-digit', minute:'2-digit' })}
                                    </small>
                                </div>
                            </div>
                            <div className="hist-right">
                                <span className="hist-amt">{d.amount} {sym}</span>
                                <span className={`hist-badge status-${sl}`}>{statusMap[sl] || sl}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ height: 18 }} />

            <LiveWithdrawFeed appState={appState} />
            <div style={{ height: 10 }} />
        </div>
    );
}

let showToastGlobal = () => {};

export default function App() {
    const tgUser = tg.initDataUnsafe?.user || { id: 'Dev', first_name: 'User', photo_url: '' };

    const [loaderHide, setLoaderHide] = useState(false);
    const [appReady,   setAppReady]   = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [toast,      setToast]      = useState({ show: false, type: 'success', msg: '' });
    const [withdrawModal, setWithdrawModal] = useState(null);
    const [appState,   setAppState]   = useState({
        user: {
            id: tgUser.id,
            firstName: tgUser.first_name,
            photoUrl: tgUser.photo_url || '',
            balance: 0, totalEarned: 0, referrals: 0,
            dailyAds: {}, taskHistory: {}, claimedMissions: {}, completedTaskCount: 0,
            freeSpinsUsed: 0,
            lastActive: '',
        },
        config: {},
        history: [],
    });

    const toastTimer = useRef(null);
    const withdrawLock = useRef(false);
    const copyLock = useRef(false);
    const shareLock = useRef(false);

    const showToast = useCallback((type, msg) => {
        setToast({ show: true, type, msg });
        try { tg.HapticFeedback.impactOccurred('light'); } catch {}
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(p => ({ ...p, show: false })), 3200);
    }, []);

    useEffect(() => { showToastGlobal = showToast; }, [showToast]);

    function saveLocal(state) {
        try { localStorage.setItem(`app_${state.user.id}`, JSON.stringify(state)); } catch {}
    }

    useEffect(() => {
        const cached = localStorage.getItem(`app_${tgUser.id}`);
        if (cached) {
            try { setAppState(JSON.parse(cached)); } catch {}
        }

        (async () => {
            try {
                const config = await apiCall('getConfig');

                const user = await apiCall('login', 'POST', {
                    id:        tgUser.id,
                    firstName: tgUser.first_name,
                    photoUrl:  tgUser.photo_url || '',
                    refId:     tg.initDataUnsafe?.start_param || '',
                });

                const hist = await apiCall('getHistory', 'POST', { id: tgUser.id });

                setAppState(prev => {
                    const next = {
                        user: {
                            ...prev.user,
                            ...(user || {}),
                            dailyAds:        user?.dailyAds        || prev.user.dailyAds        || {},
                            taskHistory:     user?.taskHistory     || prev.user.taskHistory     || {},
                            claimedMissions: user?.claimedMissions || prev.user.claimedMissions || {},
                            freeSpinsUsed:   user?.freeSpinsUsed   ?? prev.user.freeSpinsUsed   ?? 0,
                        },
                        config:  config || prev.config,
                        history: hist   || prev.history,
                    };
                    saveLocal(next);
                    return next;
                });

                if (config?.adSlots) loadAdScripts(config.adSlots);

                setTimeout(() => {
                    setLoaderHide(true);
                    setTimeout(() => setAppReady(true), 500);
                }, 400);

            } catch {
                setTimeout(() => {
                    setLoaderHide(true);
                    setTimeout(() => {
                        setAppReady(true);
                        showToast('error', 'সংযোগ ব্যর্থ হয়েছে। অফলাইনে চলছে।');
                    }, 500);
                }, 400);
            }
        })();

        return () => {};
    }, []); // eslint-disable-line

    useEffect(() => {
        if (!appReady) return;

        const refreshConfig = async () => {
            const freshConfig = await apiCall('getConfig');
            if (!freshConfig) return;
            setAppState(prev => {
                const next = { ...prev, config: freshConfig };
                saveLocal(next);
                return next;
            });
            if (freshConfig.adSlots) loadAdScripts(freshConfig.adSlots);
        };

        const pollId = setInterval(refreshConfig, 15000);

        const handleVisible = () => {
            if (document.visibilityState === 'visible') refreshConfig();
        };
        document.addEventListener('visibilitychange', handleVisible);
        window.addEventListener('focus', refreshConfig);

        return () => {
            clearInterval(pollId);
            document.removeEventListener('visibilitychange', handleVisible);
            window.removeEventListener('focus', refreshConfig);
        };
    }, [appReady]);

    function loadAdScripts(adSlots) {
        adSlots.forEach(s => {
            if (s.network === 'monetag' && !document.querySelector(`script[data-zone="${s.id}"]`)) {
                const sc = document.createElement('script');
                sc.src = '//libtl.com/sdk.js';
                sc.dataset.zone = s.id;
                sc.dataset.sdk  = `show_${s.id}`;
                document.body.appendChild(sc);
            }
            if (s.network === 'adsgram' && !window.__adsgramSdkLoaded) {
                window.__adsgramSdkLoaded = true;
                const sc = document.createElement('script');
                sc.src = 'https://sad.adsgram.ai/js/sad.min.js';
                document.body.appendChild(sc);
            }
        });
    }

    const adLock = useRef(false);
    async function handleAdDone(slotId) {
        if (adLock.current) return;
        adLock.current = true;
        const today = new Date().toISOString().slice(0, 10);
        const res = await apiCall('claimAdReward', 'POST', { slotId });
        adLock.current = false;
        if (!res || res.error) {
            showToast('error', res?.error || 'পুরস্কার দাবি ব্যর্থ হয়েছে।');
            return;
        }
        const rwrd = res.reward;
        setAppState(prev => {
            const dailyAds = { ...(prev.user.dailyAds || {}) };
            if (prev.user.lastActive !== today) Object.keys(dailyAds).forEach(k => delete dailyAds[k]);
            dailyAds[slotId] = (dailyAds[slotId] || 0) + 1;
            const next = {
                ...prev,
                user: {
                    ...prev.user,
                    balance: res.newBalance,
                    totalEarned: (prev.user.totalEarned || 0) + rwrd,
                    dailyAds,
                    lastActive: today,
                },
            };
            saveLocal(next);
            return next;
        });
        showToast('success', `🎉 অভিনন্দন! +${rwrd} ${appState.config.currencySymbol || 'টাকা'} যোগ হয়েছে`);
    }

    const taskLock = useRef(false);
    async function handleTaskBegin(id) {
        if (taskLock.current) return false;
        taskLock.current = true;
        const res = await apiCall('claimTaskReward', 'POST', { taskId: id });
        taskLock.current = false;
        if (!res || res.error) {
            showToast('error', res?.error || 'পুরস্কার দাবি ব্যর্থ হয়েছে।');
            return false;
        }
        const rwrd = res.reward;
        setAppState(prev => {
            const next = {
                ...prev,
                user: {
                    ...prev.user,
                    balance: res.newBalance,
                    totalEarned: (prev.user.totalEarned || 0) + rwrd,
                    taskHistory: { ...(prev.user.taskHistory || {}), [id]: { ts: Date.now() } },
                    completedTaskCount: (prev.user.completedTaskCount || 0) + 1,
                },
            };
            saveLocal(next);
            return next;
        });
        showToast('success', `🎯 টাস্ক সম্পন্ন! +${rwrd} ${appState.config.currencySymbol || 'টাকা'} যোগ হয়েছে`);
        tg.HapticFeedback.notificationOccurred('success');
        return true;
    }

    const missionLock = useRef(false);
    async function handleClaimMission(missionId) {
        if (missionLock.current) return;
        missionLock.current = true;
        const res = await apiCall('claimMission', 'POST', { missionId });
        missionLock.current = false;
        if (!res || res.error) {
            showToast('error', res?.error || 'মিশন দাবি ব্যর্থ হয়েছে।');
            return;
        }
        const bonus = res.bonus;
        setAppState(prev => {
            const next = {
                ...prev,
                user: {
                    ...prev.user,
                    balance: res.newBalance,
                    totalEarned: (prev.user.totalEarned || 0) + bonus,
                    claimedMissions: { ...(prev.user.claimedMissions || {}), [missionId]: Date.now() },
                },
            };
            saveLocal(next);
            return next;
        });
        showToast('success', `🏆 মিশন সম্পন্ন! +${bonus} ${appState.config.currencySymbol || 'টাকা'} বোনাস`);
        tg.HapticFeedback.notificationOccurred('success');
    }

    const spinLock = useRef(false);
    async function handleSpinReward() {
        if (spinLock.current) return null;
        spinLock.current = true;
        try {
            const res = await apiCall('claimSpinReward', 'POST', {});
            if (res && !res.error) {
                const reward = Number(res.reward) || 0;
                setAppState(prev => {
                    const next = {
                        ...prev,
                        user: {
                            ...prev.user,
                            balance: res.newBalance ?? prev.user.balance,
                            totalEarned: (prev.user.totalEarned || 0) + reward,
                            freeSpinsUsed: res.freeSpinsUsed ?? (prev.user.freeSpinsUsed || 0),
                        },
                    };
                    saveLocal(next);
                    return next;
                });
                return res;
            }
            if (res && res.error) {
                showToast('error', res.error);
                return { error: res.error };
            }
            const cfg    = appState.config.spinConfig || {};
            const rewards = (Array.isArray(cfg.rewards) && cfg.rewards.length >= 2) ? cfg.rewards.map(Number) : [1, 2, 5, 10, 20, 50, 100, 500];
            const segIndex = Math.floor(Math.random() * rewards.length);
            const reward   = rewards[segIndex];
            setAppState(prev => {
                const next = {
                    ...prev,
                    user: {
                        ...prev.user,
                        balance: (prev.user.balance || 0) + reward,
                        totalEarned: (prev.user.totalEarned || 0) + reward,
                        freeSpinsUsed: (prev.user.freeSpinsUsed || 0) + 1,
                    },
                };
                saveLocal(next);
                return next;
            });
            return { reward, segmentIndex: segIndex, demo: true };
        } finally {
            spinLock.current = false;
        }
    }

    async function handleWithdraw(payload) {
        if (withdrawLock.current) return false;
        withdrawLock.current = true;
        const rData = await apiCall('withdraw', 'POST', payload);
        withdrawLock.current = false;
        if (rData?.success) {
            setAppState(prev => {
                const next = { ...prev, user: { ...prev.user, balance: prev.user.balance - payload.amount } };
                saveLocal(next);
                return next;
            });
            const updtHist = await apiCall('getHistory', 'POST', { id: appState.user.id });
            if (updtHist) {
                setAppState(prev => { const n = { ...prev, history: updtHist }; saveLocal(n); return n; });
            }
            setWithdrawModal({
                amount: payload.amount,
                method: payload.method,
                account: payload.account,
                balance: Math.max(0, (appState.user.balance || 0) - payload.amount),
            });
            showToast('success', '✅ উত্তোলন অনুরোধ জমা দেওয়া হয়েছে!');
            tg.HapticFeedback.notificationOccurred('success');
            return true;
        } else {
            showToast('error', rData?.message || 'সার্ভার ত্রুটি। আবার চেষ্টা করুন।');
            return false;
        }
    }

    function handleCopy(link) {
        if (copyLock.current) return; // দ্রুত একাধিকবার ট্যাপ করলে বারবার টোস্ট/কপি রোধ করা হচ্ছে
        copyLock.current = true;
        setTimeout(() => { copyLock.current = false; }, 800);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(link).then(() => showToast('success', 'লিংক কপি করা হয়েছে!'));
        } else {
            const tmp = document.createElement('input');
            tmp.value = link;
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            showToast('success', 'লিংক কপি করা হয়েছে!');
        }
        tg.HapticFeedback.notificationOccurred('success');
    }

    function handleShare(link) {
        if (shareLock.current) return; // একাধিকবার শেয়ার উইন্ডো খোলা রোধ করা হচ্ছে
        shareLock.current = true;
        setTimeout(() => { shareLock.current = false; }, 1200);
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('PrimeBD-তে যোগ দিন এবং এখনই আয় শুরু করুন!')}`);
    }

    function openSupport() {
        if (appState.config.supportLink) tg.openLink(appState.config.supportLink);
        else showToast('warning', 'সাপোর্ট লিংক কনফিগার করা নেই।');
    }

    function handleNav(page) {
        if (page === activePage) return;
        setActivePage(page);
        try { tg.HapticFeedback.impactOccurred('light'); } catch {}

        if (page === 'withdraw') {
            apiCall('getHistory', 'POST', { id: appState.user.id }).then(data => {
                if (data) {
                    setAppState(prev => { const n = { ...prev, history: data }; saveLocal(n); return n; });
                }
            });
        }
    }

    c
