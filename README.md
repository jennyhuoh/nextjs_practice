This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 前端架構圖

這項作品使用next.js以及chakra-ui開發，
前端邏輯架構圖如下：

![未命名](https://user-images.githubusercontent.com/39110160/161484834-955169e0-25cf-42be-b20a-4d2f37caf017.png)

## Deploy至線上環境

作品已推上vercel:(https://nextjs-practice-sand.vercel.app/users/jennyhuoh/repos)

## 例外狀況之應變

1. 搜尋user時，若無該user，在api/index.js中會產生alert並重新reload頁面。
2. 顯示項目尚未載入完成時，顯示spinner，提升使用感受，增加使用者耐心。
3. repository列表頁面下滑後又下出現置頂按鈕，避免該user的repository過多而造成使用上的不便。
4. 在api/index.js中分別針對不同的錯誤回報console.log出對應的文字，方便開發者管理錯誤狀況。
5. 將context變數改動的actions獨立至actions/index.js，方便開發者統一管理全域變數。
