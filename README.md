# Mesto (on React)
### [Ссылка на проект](https://art-frich.github.io/react-mesto-auth/) - осторожно, после обновления странички оно перестанет работать и нужно заново пройти по ссылке... (нюансы работы react, index.html и pages-environment)
### О чем?

Проект служит для отработки работы с React, для чего был произведён рефакторинг проекта [Mesto](https://github.com/Art-Frich/mesto)
### Готовый функционал

* Создать аккаунт
* Войти в аккаунт
* Сохранение токена для автоматического входа в аккаунт
* Выйти из аккаунта и тем самым удалить токен
* Открытие изображения полноразмерно по клику.
* Добавить\удалить карточку
* Изменить аватар
* Изменить личные данные
* Лайкнуть карточку
* Защищенный роут от неавторизированных пользователей
* Авто-перенаправление пользователей в некоторых случаях
### Что используется?

* React: hooks, функциональный подход, useState, useEffect, routing, navigation.
* Бэм методология по Nested;
* flex для большинства выравниваний;
* grid для сетки с местами;
* код отрабатывающий в случае переполнения текстового блока;
* плавность интерактивных элементов;
* кастомный alt для изображений;
* адаптивная верстка;
* код разделён на модули;
* webpack сборщик (под капотом у React);
* работа с api-сервера ч\з fetch синтаксис;


### Надо бы починить
* gh-pages по руководству https://github.com/rafgraph/spa-github-pages в связке с https://create-react-app.dev/docs/deployment/