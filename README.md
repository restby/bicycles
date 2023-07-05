О проекте

Лендинг интернет-магазина по продаже велосипедов.
Общие технические требования

    Стандарты вёрстки: HTML, CSS, прогрессивное улучшение.
    Сетка: определена в макете.
    Раскладка блоков на странице: флексы и гриды.
    Адаптивность сетки: мобильная, планшетная и десктопная версии. Desktop First. На всех промежуточных разрешениях используется резиновая вёрстка.
    Адаптивность графики: ретинизация.
    Графика не предоставляется и её необходимо вырезать самостоятельно. Правила работы с Figmа тут — https://htmlacademy.ru/blog/useful/figma
    Используемая методология: БЭМ.
    Используемые фреймворки: нет.
    Используемый препроцессор: Sass (SCSS).
    Нестандартные шрифты подключены локально. Скачать можно с Google Fonts — https://fonts.google.com/
    Кроссбраузерность: Chrome, Firefox, Safari
    JavaScript: минимальная реализация, модальные окна, переключения и так далее.

Пояснения по макету

    Необходимо выполнить верстку одной страницы с адаптивностью. Десктопная, планшетная и мобильная версии.

    Брейкпоинты:
        мобильная версия — 320px — 767px;
        планшетная версия — 768px — 1023px;
        десктопная версия — от 1024px и выше.

    От минимальной ширины контента до 1024px необходимо использовать резину, например, уменьшать отступы, расстояния между элементами, пропорционально менять размеры карточек и контента.

    При клике по пунктам меню, страница плавно прокручивает к соответствующему разделу.

    Форма должна иметь валидацию. В поле телефонного номера нельзя вводить буквы. При попытке отправить буквы выдает ошибку. Использование маски по желанию.

    Блок с видео. Можно вставить при помощи картинки. Кнопка Play должна быть кликабельна.

    Меню в мобильной и планшетной версии реализуется с применением JavaScript.

    Мобильное меню полностью перекрывает HTML-страницу. HTML-страница под меню не взаимодействует с пользователем.

    Скрипт открытия и закрытия меню должен работать так:
        При клике на гамбургер меню открывается. Появляется кнопка-закрытие, убирается кнопка-гамбургер;
        При клике на закрытие меню закрывается, убирается кнопка-закрытие, появляется гамбургер.

    Меню должны быть работоспособным при отключенном JavaScript, не перекрывает собой элементы страницы

    При реализации без JavaScript:
        Меню должно быть открыто по умолчанию и находиться в потоке (то есть не перекрывать остальной контент);
        Кнопки, которые работают на JS, должны быть скрыты;
        В комментариях HTML-файлов должны быть указаны классы (или класс), которые переключают состояния меню и внешний вид кнопки.
