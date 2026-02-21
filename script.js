const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const orderForm = document.getElementById("orderForm");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

function openModal(html) {
  modalBody.innerHTML = html;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

modal.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});
closeModalBtn.addEventListener("click", closeModal);

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(orderForm);
  const name = data.get("name");
  const area = data.get("area");
  const set = data.get("set");
  const contact = data.get("contact");
  const note = data.get("note");

  const html = `
    <p><strong>お名前：</strong>${escapeHtml(name)}</p>
    <p><strong>受け取り希望エリア：</strong>${escapeHtml(area)}</p>
    <p><strong>希望：</strong>${escapeHtml(set)}</p>
    <p><strong>連絡先：</strong>${escapeHtml(contact)}</p>
    <p><strong>備考：</strong>${escapeHtml(note || "（なし）")}</p>
    <hr style="border:0;border-top:1px solid rgba(34,51,43,.85);margin:12px 0;" />
    <p>※これはデモ表示です。実運用はLINE/Googleフォーム/予約システムに合わせて送信処理を追加できます。</p>
  `;
  openModal(html);
});

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ちょい演出：在庫テキスト（デモ）
const stockText = document.getElementById("stockText");
const hints = ["数量限定", "午前の収穫分あり", "詰め合わせが確実", "本日分は早めに"];
stockText.textContent = hints[Math.floor(Math.random() * hints.length)];
