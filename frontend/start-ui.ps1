docker run --rm -it `
-p 5173:5173 `
-v "${PWD}:/app" `
-w /app `
node:24 `
npm run dev -- --host 0.0.0.0