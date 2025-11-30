# =========================
# FRONTEND BUILD STAGE
# =========================

FROM node:20 AS frontend-build

WORKDIR /frontend

COPY Front-end/package*.json ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY Front-end/ .

RUN npm run build



# =========================
# BACKEND BUILD STAGE
# =========================

FROM node:20 AS backend-build

WORKDIR /app

COPY Backend/package*.json ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY Backend/ .



# =========================
# FINAL RUNNING IMAGE 
# =========================

FROM node:20-slim

WORKDIR /app

# Install only production dependencies here for smaller size
COPY Backend/package*.json ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install --production

# Copy backend source code and build artifacts from backend-build stage
COPY --from=backend-build /app .

# Copy built frontend files from frontend-build stage
COPY --from=frontend-build /frontend/dist ./public

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
