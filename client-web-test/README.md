This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy (Không cần chạy local)

Nếu bạn không muốn chạy local mà vẫn muốn truy cập được ứng dụng, có các cách sau:

### Option 1: Deploy lên Vercel (Dễ nhất - Khuyến nghị) ⭐

**Miễn phí, tự động deploy, không cần config gì:**

1. **Push code lên GitHub** (nếu chưa có):
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy trên Vercel**:
   - Vào [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub
   - Click "New Project"
   - Import repository của bạn
   - Click "Deploy" (Vercel tự động detect Next.js)

3. **Xong!** Bạn sẽ có URL dạng: `https://your-app.vercel.app`

**Ưu điểm:**
- ✅ Miễn phí
- ✅ Tự động deploy khi push code
- ✅ HTTPS tự động
- ✅ CDN global
- ✅ Không cần server/VPS

### Option 2: Deploy lên VPS/Server + Cloudflare Tunnel

Nếu bạn có VPS hoặc server và muốn dùng Cloudflare Tunnel:

1. **Deploy code lên server**:
```bash
# Trên server
git clone <your-repo-url>
cd client-web-test
npm install
npm run build
npm start  # Chạy trên port 3000
```

2. **Cài Cloudflared trên server**:
```bash
# Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# hoặc macOS
brew install cloudflared
```

3. **Tạo Quick Tunnel** (terminal trên server):
```bash
cloudflared tunnel --url http://localhost:3000
```

4. **Hoặc Named Tunnel** (ổn định hơn):
```bash
# Đăng nhập
cloudflared tunnel login

# Tạo tunnel
cloudflared tunnel create my-app

# Tạo config
mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml << EOF
tunnel: <TUNNEL_ID>
credentials-file: /home/user/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: your-app.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
EOF

# Chạy tunnel (có thể dùng systemd để auto-start)
cloudflared tunnel run my-app
```

### Option 3: Deploy lên Railway/Render/Fly.io

**Railway** (railway.app):
```bash
# Cài Railway CLI
npm i -g @railway/cli

# Login và deploy
railway login
railway init
railway up
```

**Render** (render.com):
- Connect GitHub repo
- Chọn "Web Service"
- Build command: `npm install && npm run build`
- Start command: `npm start`

**Fly.io** (fly.io):
```bash
# Cài flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

## Host tạm với Cloudflare Tunnel (Local)

Bạn có thể sử dụng Cloudflare Tunnel để expose ứng dụng Next.js của bạn ra internet một cách nhanh chóng và miễn phí.

### Cách 1: Quick Tunnel (Nhanh nhất - không cần đăng ký)

1. **Cài đặt Cloudflared** (nếu chưa có):
```bash
# macOS
brew install cloudflared

# hoặc download từ: https://github.com/cloudflare/cloudflared/releases
```

2. **Chạy ứng dụng Next.js**:
```bash
npm run dev
# Ứng dụng sẽ chạy trên http://localhost:4000
```

3. **Tạo tunnel và expose port** (trong terminal khác):
```bash
cloudflared tunnel --url http://localhost:4000
```

Cloudflared sẽ tạo một URL tạm thời dạng: `https://xxxx-xxxx-xxxx.trycloudflare.com` và bạn có thể truy cập ứng dụng qua URL này.

**⚠️ Troubleshooting:**

Nếu bạn thấy các dòng ERR/INF trong terminal, đừng lo lắng:

- `ERR Cannot determine default origin certificate path`: Đây chỉ là warning cho Named Tunnel, **KHÔNG ảnh hưởng** Quick Tunnel. Bạn có thể bỏ qua.
- `INF Cannot determine default configuration path`: Chỉ là thông tin, không phải lỗi.

**Kiểm tra xem tunnel có hoạt động:**

1. **Đảm bảo Next.js đang chạy** (terminal khác):
```bash
npm run dev
# Phải thấy: "Ready on http://localhost:4000"
```

2. **Kiểm tra URL tunnel**:
   - Copy URL từ terminal (dạng `https://xxxx-xxxx-xxxx.trycloudflare.com`)
   - Mở trình duyệt và truy cập URL đó
   - Nếu thấy trang Next.js → Thành công! ✅
   - Nếu thấy "502 Bad Gateway" → Next.js chưa chạy hoặc sai port

3. **Nếu không truy cập được**:
```bash
# Kiểm tra port 4000 có đang được sử dụng không
lsof -i :4000

# Hoặc thử đổi port trong package.json và chạy lại
# "dev": "next dev -p 3000"
```

### Cách 2: Named Tunnel (Ổn định hơn - cần đăng ký Cloudflare)

1. **Đăng nhập Cloudflare**:
```bash
cloudflared tunnel login
```

2. **Tạo tunnel**:
```bash
cloudflared tunnel create my-tunnel
```

3. **Tạo file config** (`~/.cloudflared/config.yml`):
```yaml
tunnel: <TUNNEL_ID>
credentials-file: /Users/ai/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: your-app.yourdomain.com
    service: http://localhost:4000
  - service: http_status:404
```

4. **Chạy tunnel**:
```bash
# Chạy ứng dụng Next.js trước
npm run dev

# Sau đó chạy tunnel (terminal khác)
cloudflared tunnel run my-tunnel
```

5. **Route DNS** (trong Cloudflare Dashboard):
   - Vào DNS settings của domain
   - Thêm CNAME record: `your-app` -> `<TUNNEL_ID>.cfargotunnel.com`

### Lưu ý:
- **Quick Tunnel**: URL sẽ thay đổi mỗi lần chạy lại, phù hợp cho test tạm thời
- **Named Tunnel**: URL cố định, phù hợp cho demo/staging lâu dài hơn
- Port mặc định của dev server là **4000** (theo config trong package.json)
- Để chạy production mode: `npm run build && npm start` (sẽ chạy trên port 3000)
