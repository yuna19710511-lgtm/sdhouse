# 에스디하우스 홈페이지 — 올리는 방법

**폴더가 하나도 없습니다.** 이 안의 파일을 전부 올리기만 하면 사이트가 됩니다.

## GitHub에 올리기

파일이 108개라서 **두 번에 나눠** 올려야 합니다. (GitHub은 한 번에 100개까지)

**1차**
1. 저장소에서 `Add file` → `Upload files`
2. 압축 푼 폴더를 열고 `Ctrl+A`로 전체 선택
3. `img-g-` 로 시작하는 파일들만 빼고 끌어다 놓기
   (또는 그냥 절반 정도만 선택해서 올리세요 — 순서는 상관없습니다)
4. 아래 `Commit changes`

**2차**
5. 다시 `Add file` → `Upload files`
6. 남은 파일 전부 끌어다 놓기
7. `Commit changes`

**설정**
8. `Settings` → `Pages` → Branch `main` / `/(root)` → `Save`
9. 2분 뒤 새로고침하면 주소가 나옵니다

파일 목록 맨 위에 `index.html`이 보이면 제대로 된 것입니다.

## 카카오톡 채널 주소 (선택)

`site.js` 파일 6번째 줄:

```js
var KAKAO_URL = "";
```

카카오톡 채널 관리자센터의 채널 홈 URL을 따옴표 안에 넣으세요. 비워두면 카톡 버튼이 전화 연결로 대체됩니다.

## 페이지 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 메인 |
| `company.html` | 회사소개 · 연혁 · 오시는 길 |
| `products.html` | 제품 6종 상세 |
| `projects.html` | 납품실적 |
| `gallery.html` | 시공사진 47장 |
| `quality.html` | 시험성적서 · 시공 기준 |
| `contact.html` | 문의 · 자료 다운로드 |

`img-` 로 시작하는 파일은 사진, `sdhaus-` 로 시작하는 파일은 다운로드용 PDF입니다. `site.css`와 `site.js`는 반드시 함께 올라가야 합니다.

## 아직 확인이 필요한 것

- 연혁 2023년 항목과 사업자 정보
- 시공사진 설명 (사진을 보고 추정해 작성했습니다)
- `sdhaus-ldw-stile.pdf`가 8.8MB로 큽니다
- DODEN LVT 카탈로그는 파일을 받지 못해 메일 요청으로 처리했습니다
