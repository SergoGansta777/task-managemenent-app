# Информационная платформа сетевого представления Task-менеджера

## Описание проекта

Веб-приложение предназначено для управления личными задачами и предоставляет пользователям удобные инструменты для организации,
планирования и отслеживания выполнения задач. 

Основные функции приложения включают создание, редактирование, удаление и 
перемещение задач между статусами с помощью Kanban-доски с функцией drag-and-drop и табличного представления задач с сортировкой и фильтрацией. 

<img src="https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/594983b3-97d4-46c7-b266-4c60708cb69b" width=45%>
<img src="https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/205e910d-0728-4343-aa95-6520387fea5f" width=45%>

Приложение также поддерживает регистрацию и аутентификацию пользователей с использованием JWT. 

<img src="https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/74a2479a-15e6-433e-a785-bbbf444fa6f8" width=45%>
<img src="https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/3696586c-56e1-4bc8-91fd-d607d16313ba" width=45%>

## Демонстрация работы

![Untitled Project](https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/a20a6968-1406-4ccb-b51f-780261e65ce8)

## Используемые технологии

### Backend

- PostgreSQL - объектно-реляционная система управления базами данных.
- Rust - язык программирования для системного программирования.
- Axum - асинхронный веб-фреймворк для Rust.
- Tower - набор библиотек для создания надежных и масштабируемых сервисов.
- Tokio - асинхронный runtime для языка Rust.

### Frontend
- JavaScript / TypeScript - языки программирования для веб-разработки.
- React - библиотека для построения пользовательских интерфейсов.
- Axios - HTTP клиент для браузера и Node.js.
- React Query - библиотека для управления серверным состоянием в React.
- React Hook Form - библиотека для управления формами в React.
- React Router DOM - библиотека для маршрутизации в React.
- React Table - библиотека для создания таблиц в React.
- Dnd-kit - библиотека для реализации drag-and-drop интерфейсов в React.
- Zod - библиотека для валидации и парсинга данных.
- Radix - набор низкоуровневых и доступных компонентов UI для React.
- Shadcn - набор высокоуровневых компонентов UI для React.

### Стилизация

- TailwindCSS - утилитарный CSS-фреймворк для создания адаптивного и современного дизайна.

## Структура приложения

Логическая структура системы управления задачами (Task-менеджера) представлена несколькими ключевыми компонентами: клиентская часть, серверная часть,
промежуточное ПО (middlewares), база данных и инфраструктура Docker для контейнеризации.

<img src="https://github.com/SergoGansta777/task-managemenent-app/assets/98104790/8eb9d593-c91e-472f-b72b-61f8e06ed890">

Клиентская часть отвечает за взаимодействие с пользователем, предоставляя интерфейсы Kanban-доски и табличного представления задач. 
Серверная часть обрабатывает бизнес-логику и управление данными, включая создание, чтение, обновление и удаление задач и пользователей через API, посылая HTTP-запросы.

Мигратор обеспечивает инициализацию и миграцию базы данных, поддерживая её актуальность и целостность. 

Промежуточное ПО включает аутентификацию и управление сеансами, обработку кросс-доменных запросов, сжатие данных и логирование запросов для повышения производительности и упрощения мониторинга.

База данных PostgreSQL хранит данные пользователей и задач. Серверная часть взаимодействует с ней для выполнения CRUD-операций через протокол TCP. 

Все компоненты контейнеризованы для обеспечения изоляции и консистентности среды выполнения, а Docker Compose оркестрирует контейнеры, используя внутренние сети и порты. Это упрощает управление, развертывание и масштабирование приложения.

## Выполнение приложения

Для запуска и эксплуатации приложения необходимо выполнить следующие действия:
1.	Запуск Docker-контейнеров: необходимо установить и запустить Docker на хостовой машине. Перейти в каталог проекта и выполнить команду "docker-compose up" для запуска все необходимый контейнеров;
2.	Доступ к приложению: в веб-браузере перейти по адресу хостовой машины с портом 5173, при запуске локально адрес имеет вид http://localhost:5173;
3.	Регистрация и аутентификация: на главной странице приложения можно зарегистрироваться, введя имя пользователя, email и пароль.  После успешной регистрации необходимо выполнить вход в систему;
4.	Управление задачами: после входа в систему доступен интерфейс управления задачами, где можно создавать новые задачи, редактировать существующие, изменять их статус с помощью Kanban-доски или таблицы;
5.	Завершение работы: для завершения работы с приложением необходимо закрыть вкладку в браузере. Для остановки всех контейнеров достаточно выполнить команду "docker-compose down".

