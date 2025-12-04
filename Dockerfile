# 1단계: 빌드 환경 (Builder Stage)
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app
# pnpm 사용을 위한 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./
# pnpm 전역 설치 및 의존성 설치
RUN npm install -g pnpm && pnpm install --frozen-lockfile
# 전체 소스 코드 복사
COPY . .
# NestJS 애플리케이션 빌드 (결과는 /app/dist에 저장됨)
RUN pnpm run build

# 2단계: 운영 환경 (Production Stage)
FROM node:20-alpine AS production

# Cloud Run 포트 요구 사항 (8080)
ENV PORT 8080 
EXPOSE 8080 

WORKDIR /app
# 운영에 필요한 파일들만 복사
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
# 운영 모드 의존성만 다시 설치하여 이미지 크기를 최소화합니다.
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile
# 빌드된 NestJS JavaScript 파일 복사
COPY --from=builder /app/dist /app/dist

# NestJS 앱 실행 명령
CMD ["node", "dist/main"]

# # Stage 1: 빌드 환경 (Vite 빌드 후 NestJS 빌드 과정에 pnpm이 사용된다고 가정)
# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY package*.json ./
# # NestJS도 pnpm을 사용한다고 가정하고 설치
# RUN npm install -g pnpm && pnpm install --frozen-lockfile
# COPY . .
# # NestJS 프로젝트 빌드
# RUN pnpm run build 

# # Stage 2: 실행 환경 (더 가벼운 이미지 사용)
# FROM node:20-slim AS runner

# WORKDIR /app
# # 빌드 결과와 프로덕션 모듈만 복사
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist

# # NestJS 서버 포트 (기본 3000)
# EXPOSE 3000

# # 서버 실행 명령
# CMD ["node", "dist/main"]