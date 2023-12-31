# Адаптер для Sentry и Mattermost

## Какие проблемы решает сервис

- Прямой интеграции Sentry с Mattermost нет
- Интеграция через webhook так же не сработает, так как mattermost не поддерживает формат отправленный Sentry

## Описание сервиса

Проблемы описанные выше, решаются с помощью промежуточного сервиса:

1) Адаптер принимает сообщение(event) из Sentry,
2) Приводит к нужному формату
3) Отправляет сообщение в Mattermost в нужный канал с помощью webhook

## Запуск и разработка

### (Development) Для локальной разработки

1) ```npm install``` - Устанавливаем зависимости
2) ```npm run dev```

Запустится nodemon сервер на указанном порту(PORT) в файле ./src/app.js

-----

### (Production) Для запуска на сервере

1) ```npm install``` - Устанавливаем зависимости
2) ```npm install pm2 -g``` - Устанавливаем глобально Production process manager for Node.js
3) ```npm run start```

Запустится процесс приложения в pm2

- Посмотреть все запущенные процессы можно командой: ```pm2 list```

-----

### Логирование

Логи сохраняются в папке ./logs после старта приложения

1) all.log - файл со всеми логами
2) error.log - файл с логами ошибок
