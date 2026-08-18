/* (주)에스디하우스 홈페이지 공통 스크립트
   ─────────────────────────────────────────────
   카카오톡 채널 주소를 여기에 넣으세요.
   카카오톡 채널 관리자센터 → 채널 홈 URL 복사 (예: https://pf.kakao.com/_abcdEF)
   비워두면 카카오톡 버튼이 전화 연결로 대체됩니다. */
var KAKAO_URL = "";

var PHONE = "01071910290";

function openKakao() {
  if (KAKAO_URL && KAKAO_URL.indexOf("http") === 0) {
    window.open(KAKAO_URL, "_blank", "noopener");
  } else {
    window.location.href = "tel:" + PHONE;
  }
  return false;
}

/* 국문 / 영문 전환 — 선택은 브라우저에 저장됩니다 */
function applyLang(lang) {
  var root = document.querySelector("[data-lang]");
  if (root) root.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "ko");
  try { window.localStorage.setItem("sdhaus-lang", lang); } catch (e) {}
}

function toggleLang() {
  var root = document.querySelector("[data-lang]");
  var current = root ? root.getAttribute("data-lang") : "ko";
  applyLang(current === "ko" ? "en" : "ko");
}

/* 모바일 메뉴 */
function toggleMenu() {
  var el = document.getElementById("mobileMenu");
  if (el) el.style.display = el.style.display === "none" ? "grid" : "none";
}

function closeMenu() {
  var el = document.getElementById("mobileMenu");
  if (el) el.style.display = "none";
}

/* 상담 메뉴 */
function toggleChat() {
  var el = document.getElementById("chatPanel");
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

/* 문의 폼 — 기본 메일 앱으로 내용을 담아 엽니다 */
function sendEnquiry(event) {
  event.preventDefault();
  var form = event.target;
  var get = function (name) {
    var el = form.elements[name];
    return el ? el.value : "";
  };
  var topics = {
    sample: "샘플 신청",
    quote: "견적 문의",
    spec: "사양서 요청",
    volume: "대량 납품",
    etc: "문의"
  };
  var topic = topics[get("topic")] || "문의";
  var body = [
    "회사/성함: " + get("name"),
    "연락처: " + get("phone"),
    "문의 유형: " + topic,
    "",
    get("message")
  ].join("\n");
  window.location.href =
    "mailto:sdhaus0609@naver.com?subject=" +
    encodeURIComponent("[홈페이지 문의] " + topic + " - " + get("name")) +
    "&body=" + encodeURIComponent(body);
  return false;
}

/* 초기화 */
(function () {
  try {
    var saved = window.localStorage.getItem("sdhaus-lang");
    if (saved === "en" || saved === "ko") applyLang(saved);
  } catch (e) {}

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("#mobileMenu a") : null;
    if (link) closeMenu();
  });
})();
