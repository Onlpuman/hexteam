Cервис сокращения ссылок. 
React, React-Bootstrup, React Router, Axois.

Основной функционал сервиса - получение по произвольной ссылке (например https://docs.docker.com/engine/reference/commandline/attach/) короткой ссылки (http://79.143.31.216/s/7ASMU), реализующей перенаправление пользователя на исходную страницу. Это может быть удобно для отправки в SMS или Twitter, где размер сообщения ограничен. 
Помимо этого, пользователь может просматривать количество переходов по короткой ссылке. Эта информация будет недоступна остальным пользователям.
В итоге пользователь может зарегистрироваться на сайте, авторизоваться, создать произвольное количество сокращенных ссылок и просматривать количество переходов по каждой из них.
Система хранит всю информацию (о пользователях, сокращенных ссылках, количествах переходов), а также генерирует сокращенные ссылки на backend. Также на backend'е работает пагинация и сортировка по столбцам.

![](https://user-images.githubusercontent.com/94569843/195476785-23863d2f-103b-4b7f-98bf-5da99e3f63ee.png)

![](https://user-images.githubusercontent.com/94569843/195476788-d04adfa2-5bf4-405f-bfc9-1c12f150d37e.png)
