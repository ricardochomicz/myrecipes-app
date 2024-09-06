# Etapa 1: Construir a aplicação Angular
FROM node:18 AS builder

# Configura o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte do projeto
COPY . .

# Compila a aplicação Angular
RUN npm run build --prod

# Etapa 2: Servir a aplicação Angular
FROM nginx:alpine

# Copia os arquivos de build do estágio anterior para o diretório padrão do Nginx
COPY --from=builder /app/dist/recipes-app /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
