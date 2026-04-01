# Multi-stage build : sécurité + légèreté
#
# Pourquoi 2 stages ?
# - Stage 1 (builder) : installe TOUTES les dépendances (y compris devDeps) et
#   exécute les tests. Si les tests échouent, le build échoue — impossible de
#   produire une image cassée.
# - Stage 2 (production) : repart de zéro avec une image alpine vierge, copie
#   uniquement le code et les dépendances de production. Les outils de dev
#   (jest, eslint, etc.) et le code source des tests n'entrent jamais dans
#   l'image finale → surface d'attaque réduite, taille minimale.

# ── Stage 1 : builder + tests ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des manifestes en premier pour profiter du cache Docker
COPY package*.json ./
RUN npm ci

# Copie du code source et des tests
COPY . .

# Les tests doivent passer pour que le build continue
RUN npm test

# ── Stage 2 : image de production légère ───────────────────────────────────
FROM node:20-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copie du code applicatif depuis le stage builder (pas les tests)
COPY --from=builder /app/server.js .

# Utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
