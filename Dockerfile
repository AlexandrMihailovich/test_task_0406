# Используем официальный образ Node.js с Alpine (легковесный)
FROM node:18-alpine

# Устанавливаем зависимости для работы с Next.js и отладки
RUN apk add --no-cache git

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
# RUN npm install

# Копируем исходный код
COPY . .

# Открываем порты: 
# - 3000 для Next.js
# - 9229 для отладчика Node.js
EXPOSE 5173 9229

# Запуск приложения с отладкой
CMD ["npm", "run", "dev"]