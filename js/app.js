const $ = s => document.querySelector(s);
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const S = { mode: "cards", topics: new Set(TOPICS), deck: [], i: 0, flip: false, known: load("icd201-known", {}), quiz: null, review: "" };
const pool = () => CARDS.filter(c => S.topics.has(c[0]));
const key = c => c[1];

function buildDeck(onlyUnknown) {
  let d = pool(); if (onlyUnknown) d = d.filter(c => !S.known[key(c)]);
  S.deck = d; S.i = 0; S.flip = false;
}

function renderSide() {
  $("#side").innerHTML = `
  <div><h3>Study mode</h3><div class="modes">
    ${[["cards", "Flashcards"], ["quiz", "Quiz maker"], ["review", "Review"]].map(([m, l]) => `<button data-m="${m}" aria-pressed="${S.mode === m}">${l}</button>`).join("")}
  </div></div>
  <div class="topics"><h3>Topics</h3>
    ${TOPICS.map(t => `<label><input type="checkbox" value="${t}" ${S.topics.has(t) ? "checked" : ""}> ${t}</label>`).join("")}
    <div class="row"><button id="all">All</button><button id="none">None</button></div></div>
  <div class="stat">${Object.keys(S.known).length} of ${CARDS.length} cards marked known</div>`;
  document.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { S.mode = b.dataset.m; S.quiz = null; if (S.mode === "cards") buildDeck(); render(); });
  document.querySelectorAll(".topics input").forEach(c => c.onchange = () => { c.checked ? S.topics.add(c.value) : S.topics.delete(c.value); S.quiz = null; if (S.mode === "cards") buildDeck(); render(); });
  $("#all").onclick = () => { S.topics = new Set(TOPICS); S.quiz = null; buildDeck(); render(); };
  $("#none").onclick = () => { S.topics = new Set(); S.quiz = null; buildDeck(); render(); };
}

function cards() {
  const m = $("#main");
  if (!S.deck.length) { m.innerHTML = `<h2>Flashcards</h2><p>No cards here. Pick at least one topic, or <button id="reset">reset known cards</button>.</p>`; const r = $("#reset"); if (r) r.onclick = () => { S.known = {}; save("icd201-known", S.known); buildDeck(); render(); }; return; }
  const c = S.deck[S.i];
  m.innerHTML = `<h2>Flashcards</h2>
  <div class="bar"><i style="width:${(S.i + 1) / S.deck.length * 100}%"></i></div>
  <p class="stat">Card ${S.i + 1} of ${S.deck.length}</p>
  <button class="card ${S.flip ? "back" : ""}" id="card" aria-label="Flip card"><span><small>${c[0]} · ${S.flip ? "Answer" : "Question"}</small>${fmt(S.flip ? c[2] : c[1])}</span></button>
  <div class="row"><button id="prev">Previous</button><button id="flip" class="pri">Flip</button><button id="next">Next</button>
  <button id="known">${S.known[key(c)] ? "Unmark known" : "Mark known"}</button><button id="shuf">Shuffle</button><button id="unk">Study unknown only</button></div>
  <p class="stat">Keys: ←/→ move, space flips.</p>`;
  const go = d => { S.i = (S.i + d + S.deck.length) % S.deck.length; S.flip = false; render(); };
  $("#card").onclick = $("#flip").onclick = () => { S.flip = !S.flip; render(); };
  $("#prev").onclick = () => go(-1); $("#next").onclick = () => go(1);
  $("#known").onclick = () => { S.known[key(c)] ? delete S.known[key(c)] : S.known[key(c)] = 1; save("icd201-known", S.known); render(); };
  $("#shuf").onclick = () => { S.deck = shuffle(S.deck); S.i = 0; S.flip = false; render(); };
  $("#unk").onclick = () => { buildDeck(true); render(); };
}

// Quiz maker: hand-written questions + questions auto-built from flashcards
function makeQuestions(n) {
  const t = [...S.topics], hand = QUIZ.filter(q => S.topics.has(q.t)).map(q => ({ ...q }));
  const auto = pool().map(c => {
    const others = shuffle(CARDS.filter(x => x[2] !== c[2] && (x[0] === c[0] || t.length < 2))).slice(0, 3);
    const opts = shuffle([c[2], ...others.map(x => x[2])]);
    return { t: c[0], q: c[1], o: opts, a: opts.indexOf(c[2]), e: c[2] };
  }).filter(q => q.o.length >= 3);
  return shuffle([...shuffle(hand), ...shuffle(auto)]).slice(0, n);
}

function quiz() {
  const m = $("#main"), Q = S.quiz;
  if (!Q) {
    m.innerHTML = `<h2>Quiz maker</h2><p>Build a quiz from the topics ticked on the left.</p>
    <div class="row"><label>Questions <select id="n">${[5, 10, 15, 20, 30].map(n => `<option>${n}</option>`).join("")}</select></label><button id="go" class="pri">Make quiz</button></div>`;
    $("#go").onclick = () => { const qs = makeQuestions(+$("#n").value); if (!qs.length) { alert("Select at least one topic."); return; } S.quiz = { qs, i: 0, score: 0, picked: null, missed: [] }; render(); };
    return;
  }
  if (Q.i >= Q.qs.length) {
    m.innerHTML = `<h2>Score: ${Q.score} / ${Q.qs.length}</h2><p>${Math.round(Q.score / Q.qs.length * 100)}%</p>
    ${Q.missed.length ? `<h3>Review these</h3>` + Q.missed.map(q => `<div class="fb"><b>${fmt(q.q)}</b><br>${fmt(q.o[q.a])}</div>`).join("") : "<p>Perfect run.</p>"}
    <div class="row"><button id="again" class="pri">New quiz</button></div>`;
    $("#again").onclick = () => { S.quiz = null; render(); }; return;
  }
  const q = Q.qs[Q.i], done = Q.picked !== null;
  m.innerHTML = `<h2>Quiz maker</h2><div class="bar"><i style="width:${Q.i / Q.qs.length * 100}%"></i></div>
  <p class="stat">Question ${Q.i + 1} of ${Q.qs.length} · ${q.t}</p><h3>${fmt(q.q)}</h3>
  ${q.o.map((o, k) => `<button class="opt ${done ? (k === q.a ? "right" : k === Q.picked ? "wrong" : "") : ""}" data-k="${k}" ${done ? "disabled" : ""}>${fmt(o)}</button>`).join("")}
  ${done ? `<div class="fb">${Q.picked === q.a ? "Correct. " : "Not quite. "}${fmt(q.e)}</div><button id="nx" class="pri">${Q.i + 1 === Q.qs.length ? "See score" : "Next question"}</button>` : ""}`;
  document.querySelectorAll(".opt").forEach(b => b.onclick = () => { Q.picked = +b.dataset.k; if (Q.picked === q.a) Q.score++; else Q.missed.push(q); render(); });
  if (done) $("#nx").onclick = () => { Q.i++; Q.picked = null; render(); };
}

function review() {
  const f = S.review.toLowerCase();
  const secs = OVERVIEW.filter(([t, , b]) => S.topics.has(t) && (!f || (t + b.join(" ")).toLowerCase().includes(f)));
  $("#main").innerHTML = `<h2>Review</h2><div class="row"><input type="search" id="q" placeholder="Search notes" value="${esc(S.review)}"></div>
  ${secs.map(([t, h, b]) => `<section class="sec"><h3>${h}</h3><ul>${b.map(x => `<li>${fmt(x)}</li>`).join("")}</ul></section>`).join("") || "<p>No notes match. Try another topic or search.</p>"}`;
  const q = $("#q"); q.oninput = () => { S.review = q.value; const p = q.selectionStart; review(); const n = $("#q"); n.focus(); n.setSelectionRange(p, p); };
}

function render() { renderSide(); ({ cards, quiz, review }[S.mode])(); }
document.addEventListener("keydown", e => {
  if (S.mode !== "cards" || !S.deck.length || /INPUT|SELECT/.test(e.target.tagName)) return;
  if (e.key === "ArrowRight") { S.i = (S.i + 1) % S.deck.length; S.flip = false; render(); }
  if (e.key === "ArrowLeft") { S.i = (S.i - 1 + S.deck.length) % S.deck.length; S.flip = false; render(); }
  if (e.key === " ") { e.preventDefault(); S.flip = !S.flip; render(); }
});
buildDeck(); render();
