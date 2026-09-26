# 1. Utiliser l'image officielle Nginx basée sur Alpine (légère)
FROM nginx:alpine

# 2. Copier les fichiers du projet web dans le dossier par défaut servi par Nginx
COPY . /usr/share/nginx/html

# 3. Exposer le port 80 pour accéder au serveur web
EXPOSE 80

# 4. Lancer Nginx au premier plan (comportement par défaut de l'image)
CMD ["nginx", "-g", "daemon off;"]