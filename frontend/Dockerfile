# Image nginx:alpine choisie pour sa légèreté (~25 MB) et sa sécurité
# (surface d'attaque minimale par rapport à nginx:latest basé sur Debian)
FROM nginx:alpine

# Copie de la page HTML statique
COPY index.html /usr/share/nginx/html/index.html

# Remplacement de la configuration Nginx par défaut
# proxy_pass vers le backend pour /api/* et /health
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
