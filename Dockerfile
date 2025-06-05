# Используем официальный Playwright образ
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходники и билдим
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

