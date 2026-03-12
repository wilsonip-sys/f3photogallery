F3 Photo Gallery 使用說明
=========================

1. 檔案與資料夾結構
--------------------

請確認專案結構如下：

  F3photoGallary/
    index.html
    styles.css
    app.js
    photo/
      (這裡放你的相片檔，例如 img01.jpg, img02.jpg...)

2. 放入你的相片
----------------

- 將所有要展示的圖片檔複製到 `photo` 資料夾內。
- 檔名可以自訂（例如：`party001.jpg`, `trip_paris.png` 等）。

3. 設定 app.js 裡的相片清單
----------------------------

打開 `app.js`，找到最上方的 `photos` 陣列：

  const photos = [
    // 範例（請依實際檔案調整或刪除）：
    // { src: "photo/img01.jpg", title: "相片 1" },
    // { src: "photo/img02.jpg", title: "相片 2" },
  ];

把註解範例改成你實際的檔案，例如：

  const photos = [
    { src: "photo/party001.jpg", title: "派對合照" },
    { src: "photo/party002.jpg", title: "現場花絮" },
    { src: "photo/trip_paris.png", title: "巴黎鐵塔" },
  ];

- `src`：圖片的相對路徑，一律以 `photo/檔名` 方式填寫。
- `title`：可選，會顯示在縮圖下方與 Lightbox 的說明文字。

4. 在本機電腦預覽
------------------

最簡單方式：

- 在檔案總管中，雙擊 `index.html`。
- 用瀏覽器（Chrome / Edge / Firefox 等）開啟後，就能看到相片縮圖。
- 點擊任一縮圖可以打開 Lightbox，並使用左右鍵或畫面上的箭頭切換相片。

註：因為所有圖片路徑都是相對於同一個資料夾，且沒有用到動態讀檔或跨網域存取，所以直接用 `file://` 方式開啟就可以正常使用。

5. 部署到網站（靜態主機）
-------------------------

若要放到網路上，步驟概念如下：

- 將整個 `F3photoGallary` 資料夾上傳到你的主機或空間：
  - GitHub Pages
  - Netlify
  - 一般虛擬主機 (cPanel / FTP 等)
- 確保 `index.html`、`styles.css`、`app.js` 與 `photo/` 的相對位置不變。
- 將網站的根目錄指到有 `index.html` 的那一層。

6. 常見問題
-----------

- 問：畫面載入沒有看到任何縮圖？
  - 請確認：
    - `photo` 資料夾裡是否有檔案。
    - `app.js` 內 `photos` 陣列是否已填入、檔名拼字無誤。
- 問：某幾張圖片顯示失敗（破圖）？
  - 檢查該圖片在 `photo/` 底下的實際檔名與大小寫，必須與 `src` 欄位完全一致。

