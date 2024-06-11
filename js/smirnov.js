$('.select__start').on('click touch', function(){
	$('.new__select-wrapper .select__wrapper').animate({scrollLeft: 0}, 500);
});
$('.select__end').on('click touch', function(){
	
	scrollLeftNow = $('.new__select-wrapper .select__wrapper').scrollLeft() + $('.new__select-wrapper .select__wrapper').width();
	$('.new__select-wrapper .select__wrapper').animate({scrollLeft: scrollLeftNow}, 500);
});

function showNotification(msg) {
  if ($('body .notification-wrapper-note').length > 0)
    return false;

  let note = '<div class="notification-wrapper-note"><i class="fa-solid fa-triangle-exclamation"></i>' + msg + '</div>';
  $('body').append(note);

  setTimeout(function () {
    $('body .notification-wrapper-note').addClass('show');
  }, 100);

  hideNotification();
}

function hideNotification() {
  setTimeout(function () {
    $('body .notification-wrapper-note').removeClass('show');
  }, 2000);

  setTimeout(function () {
    $('body .notification-wrapper-note').remove();
  }, 2500);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookies() {
    let cookieNote = document.getElementById('cookie_note');
    let cookieBtnAccept = cookieNote.querySelector('.cookie_accept');

    // Если куки cookies_policy нет или она просрочена, то показываем уведомление
    if (!getCookie('cookies_policy')) {
        cookieNote.classList.add('show');
    }

    // При клике на кнопку устанавливаем куку cookies_policy на один год
    cookieBtnAccept.addEventListener('click', function () {
        setCookie('cookies_policy', 'true', 365);
        cookieNote.classList.remove('show');
    });
}
checkCookies();

const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en"];
const currentPathName = window.location.pathname;
let currentLang =
	localStorage.getItem("language") || 'en';
let currentTexts = {};

const homeTexts = {
	"title": {
		ru: "Лучший магазин по продаже читов для ваших игр",
		en: "The best store selling cheats for your games",
	},
	"pod_title": {
		ru: "Большой каталог приватных качественных читов, созданных опытными разработчиками, которые сделают вашу игру более продуктивной и комфортной.",
		en: "A large catalog of private high-quality cheats created by experienced developers that will make your game more productive and comfortable.",
	},
	"check_catalog": {
		ru: "Посмотреть каталог",
		en: "Check Catalog",
	},
	"our_cheats": {
		ru: "Наши читы",
		en: "Our Cheats",
	},
	"reg_users": {
		ru: "Зарегистрировано пользователей",
		en: "Registered users",
	},
    "money_back": {
		ru: "Гарантия возврата денег",
		en: "Money Back Guarantee",
	},
    "log_in": {
		ru: "Войти",
		en: "Log In",
	},
    "sign_up": {
		ru: "Зарегистрироваться",
		en: "Sign Up",
	},
    "main": {
		ru: "Главная",
		en: "Main",
	},
    "": {
		ru: "Поддержка",
		en: "",
	},
    "faq": {
		ru: "FAQ",
		en: "FAQ",
	},
    "useragreement": {
		ru: "Политика",
		en: "User agreement",
	},
    "russian": {
		ru: "Русский",
		en: "Russian",
	},
    "english": {
		ru: "Английский",
		en: "English",
	},
	"from": {
		ru: "от",
		en: "from",
	},
	"popular-game": {
		ru: "Популярные игры",
		en: "Popular Games",
	},
	"whytrusted": {
		ru: "Почему нам можно доверять?",
		en: "Why can we be trusted?",
	},
	"whytrusted-desc": {
		ru: "Не рискуйте своими деньгами и временем - выбирайте наше программное обеспечение и наши гарантии позаботятся о вашем успехе!",
		en: "Don't risk your money and time - choose our software and our guarantees will take care of your success!",
	},
	"reliability": {
		ru: "Надежность",
		en: "Reliability",
	},
	"reliability-desc": {
		ru: "Приобретая кредиты у нас, вы можете не беспокоиться о сохранности вашего ПК, так как мы не первый год на рынке и все наши продукты полностью безопасны",
		en: "By purchasing cheats from us, you can not worry about the safety of your PC, since we are not the first year on the market and all our products are completely safe",
	},
	"openness": {
		ru: "Открытось",
		en: "Openness",
	},
	"openness-desc": {
		ru: "Мы всегда открыты для наших клиентов. У нас есть общий чат для клиентов, вы всегда можете спросить покупателей о нас.",
		en: "We are always open to our clients. We have a general chat for customers, you can always ask buyers about us.",
	},
	"sales": {
		ru: "Продажи",
		en: "Sales",
	},
	"sales-desc": {
		ru: "Большое количество постоянных клиентов. Мы не первый год на рынке, и у нас более 25 000 довольных клиентов.",
		en: "A large number of regular customers. We are not the first year on the market and have more than 25,000 satisfied customers.",
	},
	"meta": {
		ru: "Мета",
		en: "Meta",
	},
	"meta-desc": {
		ru: "Наша цель - собрать комьюнити людей, которые будут наслаждаться качественными и безопасными продуктами.",
		en: "Our goal is to get a community of people who will enjoy high-quality and safe products.",
	},
    "main2": {
		ru: "Главная",
		en: "Main",
	},
    "2": {
		ru: "Поддержка",
		en: "",
	},
    "faq2": {
		ru: "FAQ",
		en: "FAQ",
	},
    "useragreement2": {
		ru: "Политика",
		en: "User agreement",
	},
    "russian2": {
		ru: "Русский",
		en: "Russian",
	},
    "english2": {
		ru: "Английский",
		en: "English",
	},
	"log_in2": {
		ru: "Войти",
		en: "Log In",
	},
    "sign_up2": {
		ru: "Зарегистрироваться",
		en: "Sign Up",
	},
	"footer-desc": {
		ru: "Интернет-магазин Evicted - это лучшая коллекция читов в одном месте! Большая база малоизвестных и премиальных сортов, для которых мы предоставляем возможность приобрести со скидкой до 70%.",
		en: "The Evicted online store is the best collection of cheats in one place! A large database of little-known and premium varieties, for which we provide the opportunity to purchase at a discount of up to 70%.",
	},
	"navigation": {
		ru: "Навигация",
		en: "Navigation"
	},
	"3": {
		ru: "Поддержка",
		en: "",
	},
	"garant": {
		ru: "Гарантии",
		en: "Garants",
	},
	"catalog": {
		ru: "Каталог",
		en: "Catalog",
	},
	"information": {
		ru: "Информация",
		en: "Information",
	},
	"suppliers": {
		ru: "Поставщики",
		en: "Suppliers",
	},
	"useragreement3": {
		ru: "Политика конфиденциальности",
		en: "User agreement",
	},
	"discounts": {
		ru: "Скидки",
		en: "Discount",
	},
	"catalog2": {
		ru: "Каталог",
		en: "Catalog",
	},
	"cheatsfor": {
		ru: "Читы для",
		en: "Cheats For",
	},
	"productsinstock": {
		ru: "продуктов на складе",
		en: "products in stock",
	},
	"gameinfo": {
		ru: "Информация об игре",
		en: "Game Info",
	},
	"description": {
		ru: "Описание",
		en: "Description",
	},
	"functional": {
		ru: "Функционал",
		en: "Functional",
	},
	"requirements": {
		ru: "Системные требования",
		en: "System requirements",
	},
	"makingorder": {
		ru: "Сделать заказ",
		en: "Making an order",
	},
	"making-pod": {
		ru: "Выберите тарифный план, который удобен вам для приобретения",
		en: "Choose a tariff plan that is convenient for you to purchase",
	},
	"oferta": {
		ru: "Я ознакомился с условиями оферты",
		en: "I have read the terms of the offers",
	},
	"pre-header": {
		ru: "Большой каталог приватных высококачественных читов, созданных опытными разработчиками, которые сделают вашу игру более продуктивной и комфортной.",
		en: "A large catalog of private high-quality cheats created by experienced developers that will make your game more productive and comfortable.",
	},
	"populargame": {
		ru: "Популярные игры",
		en: "Popular Games"
	},
	"purchase-history": {
		ru: "История покупок",
		en: "Purchase history"
	},
	"purchase-history2": {
		ru: "История покупок",
		en: "Purchase history"
	},
	"bonuses": {
		ru: "Бонусы",
		en: "Bonuses"
	},
	"account-setting": {
		ru: "Настройки аккаунта",
		en: "Account Settings"
	},
	"no-orders": {
		ru: "В истории заказов не найдено",
		en: "No orders found in history"
	},
	"make-an-order": {
		ru: "Оформите заказ на сайте.",
		en: "Make an order on the site."
	},
	"referal-system": {
		ru: "Реферальная система",
		en: "Referal system"
	},
	"referal-link": {
		ru: "Ваша реферальная ссылка",
		en: "Your referal link"
	},
	"referal-bonus": {
		ru: "Реферальный бонус",
		en: "Referral bonus"
	},
	"referal-amount": {
		ru: "Количество рефералов",
		en: "Amount of referrals"
	},
	"referal-earned": {
		ru: "Всего заработано",
		en: "Total earned"
	},
	"referal-purchases": {
		ru: "Общее количество покупок",
		en: "Total purchases"
	},
	"date": {
		ru: "Дата",
		en: "Date"
	},
	"user": {
		ru: "Пользователь",
		en: "User"
	},
	"purchases": {
		ru: "Покупки",
		en: "Purchases"
	},
	"earned": {
		ru: "Заработано",
		en: "Earned"
	},
	"amount": {
		ru: "Количество",
		en: "Amount"
	},
	"account-details": {
		ru: "Данные учетной записи",
		en: "Account details"
	},
	"email-address": {
		ru: "Почта",
		en: "Email Address"
	},
	"nickname": {
		ru: "Никнейм",
		en: "Nickname"
	},
	"current-password": {
		ru: "Текущий пароль",
		en: "Current password"
	},
	"change-password": {
		ru: "Изменить пароль",
		en: "Change password"
	},
	"new-password": {
		ru: "Новый пароль",
		en: "New password"
	},
	"complete-button": {
		ru: "Сохранить",
		en: "Save"
	},
	"paket": {
		ru: "Пакет с компонентами:",
		en: "Package with components:"
	},
	"paket2": {
		ru: "Пакет с компонентами:",
		en: "Package with components:"
	},
	"paket3": {
		ru: "Пакет с компонентами:",
		en: "Package with components:"
	},
	"updatevideo": {
		ru: "Обновление видеодрайвера:",
		en: "Updating the video driver:"
	},
	"updatevideo2": {
		ru: "Обновление видеодрайвера:",
		en: "Updating the video driver:"
	},
	"download": {
		ru: "Скачать",
		en: "Download"
	},
	"download2": {
		ru: "Скачать",
		en: "Download"
	},
	"download3": {
		ru: "Скачать",
		en: "Download"
	},
	"download4": {
		ru: "Скачать",
		en: "Download"
	},
	"download5": {
		ru: "Скачать",
		en: "Download"
	},
	"download6": {
		ru: "Скачать",
		en: "Download"
	},
	"download7": {
		ru: "Скачать",
		en: "Download"
	},
	"download8": {
		ru: "Скачать",
		en: "Download"
	},
	"download9": {
		ru: "Скачать",
		en: "Download"
	},
	"download10": {
		ru: "Скачать",
		en: "Download"
	},
	"download11": {
		ru: "Скачать",
		en: "Download"
	},
	"updatealldrivers": {
		ru: "Обновление всех драйверов:",
		en: "Updating all drivers:"
	},
	"text-faq": {
		ru: "Также, если у вас установлены античиты, вроде FaceIt или ESEA, то их обязательно нужно удалить! Если у вас на компьютере установлен Valorant, то удалите Riot Guard (Этот пункт для всех читов на все игры, кроме Valorant)",
		en: "Also, if you have anti-cheats installed, like FaceIt or ESEA, then you definitely need to remove them! If you have Valorant installed on your computer, then remove Riot Guard (This item is for all cheats for all games except Valorant)"
	},
	"off_secure": {
		ru: "Отключение защиты",
		en: "Disabling protection"
	},
	"secureboot": {
		ru: "Отключение Secure Boot в Bios",
		en: "Disabling Secure Boot in Bios"
	},
	"view": {
		ru: "Смотреть",
		en: "View"
	},
	"view2": {
		ru: "Смотреть",
		en: "View"
	},
	"view3": {
		ru: "Смотреть",
		en: "View"
	},
	"uefibios": {
		ru: "Включить UEFI в BIOS",
		en: "Enable UEFI in BIOS"
	},
	"uchetUAC": {
		ru: "Учетные записи с авто отключением (UAC)",
		en: "Auto-disconnect Accounts (UAC)"
	},
	"windowsdefender": {
		ru: "Управление защитником Windows",
		en: "Managing Windows Defender"
	},
	"windowssmart": {
		ru: "Авто выключение Windows Smart Screen",
		en: "Auto Shutdown of Windows Smart Screen"
	},
	"programs": {
		ru: "Вспомогательные программы",
		en: "Auxiliary programs"
	},
	"ruDesk": {
		ru: "Удаленный доступ RuDesk",
		en: "RuDesk Remote Access"
	},
	"screenshot": {
		ru: "Скриншот вашей проблемы",
		en: "Screenshot of your problem"
	},
	"winrar": {
		ru: "Работа с WinRar архивами",
		en: "Working with WinRAR archives"
	},
	"ifyourproblem": {
		ru: "Если ваша проблема не была решена, то обратитесь в техподдержку!",
		en: "If your problem has not been solved, then contact technical !"
	},
	"tehpod": {
		ru: "Техподдержка",
		en: ""
	},
	"apply": {
		ru: "Обратиться",
		en: "To apply"
	},
	"sposob": {
		ru: "Выберите способ оплаты",
		en: "Choose a payment method"
	},
	"cordis": {
		ru: "Напрямую через Discord",
		en: "Directly via Discord"
	},
	"oplatainfo": {
		ru: "Через сервис oplata.info",
		en: "Through the service oplata.info"
	},
	"gopere": {
		ru: "Перейти",
		en: "Go"
	},
	"gopere2": {
		ru: "Перейти",
		en: "Go"
	},
}

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		// case "/another_page.html":
		// 	currentTexts = anotherTexts;
		// 	break;

		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

function checkProducts() {
	if (currentLang == 'ru') {
		$('.header__menu .mb-change').attr('href', '/politic-ru');
		$('.mobile__menu .mb-change').attr('href', '/politic-ru');
            
		$('.game_price').each(function () {
			var priceText = '<p>от</p>' + $(this).data('price') + '₽';
			$(this).html(priceText);
		});

		var productElements = document.querySelectorAll(".game_products");
		productElements.forEach(function(element) {
			var currentText = element.innerHTML;
			var newText = currentText.replace("products", "продукта");
			element.innerHTML = newText;
		});

		productElements.forEach(function(element) {
			var currentText = element.innerHTML;
			var newText = currentText.replace("product", "продукт");
			element.innerHTML = newText;
		});
	}
	else {
		$('.header__menu .mb-change').attr('href', '/politic');
		$('.mobile__menu .mb-change').attr('href', '/politic');
            
		$('.game_price').each(function () {
			var priceText = '<p>from</p>' + $(this).data('price-dollar') + '$';
			$(this).html(priceText);
		});

		var productElements = document.querySelectorAll(".game_products");
		productElements.forEach(function(element) {
			var currentText = element.innerHTML;
			var newText = currentText.replace("продукта", "products");
			element.innerHTML = newText;
		});

		productElements.forEach(function(element) {
			var currentText = element.innerHTML;
			var newText = currentText.replace("продукт", "product");
			element.innerHTML = newText;
		});
	}
}
checkProducts();

// Изменение языка у текстов
function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
	$('.select .select-sub .sel').removeClass('active');
	checkProducts();
	checkProductsCheat();
	checkChangeLang();
}
changeLang();

// Вешаем обработчики на каждую кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

// Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ru":
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;

		default:
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

// Проверка языка браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}
console.log("navigator.language asd");

/*==========================
           MODAL WINDOW
==========================*/

let hovModaloff = 0;

function showModal(el) {
	$('.modal-wrapper').addClass('show');
	$('.modal-wrapper ' + el).addClass('show');
	$('header').addClass('show-preview');
	headerBackColorInt = 1;
}

function closeModal() {
	if (!$('.modal-wrapper').hasClass('not-close')) {
		$('.modal-wrapper').removeClass('show');
		$('.modal-wrapper .modal').removeClass('show');
		$('.modal-wrapper .modal.tickets-views .ticket-view').removeClass('show');
		$('header').removeClass('show-preview');
		headerBackColorInt = 0;
	}
}

$('.modal-wrapper').click(function () {
	if (hovModaloff == 0) {
		closeModal();
	}
});

$('.modal-wrapper .close').click(function () {
	closeModal();
});

$(".modal-wrapper .modal").hover(function () {
	hovModaloff = 1;
}, function () {
	hovModaloff = 0;
});

function checkProductsCheat() {
    $('.select .select-sub .sel').click(function () {
        $('.select .select-sub .sel').removeClass('active');
        $(this).addClass('active');

        $('.go-buy .btn.goih .price-in').text($(this).find('.price').data('price') + '₽');

		if (currentLang == 'en') {
			$('.go-buy .btn.goih .price-in').text($(this).find('.price').data('price-dollar') + '$');
		}

        $('.go-buy a.btn').attr('href', $(this).data('link'));
		// $('.go-buy a.btn').attr('href', 'javascript:void(0);');
        $('.go-buy a.btn').data('price-id', $(this).data('id'));
    });

    $('.select .select-sub .sel-wrapper:first-child .sel').addClass('active');
    $('.go-buy a.btn').attr('href', $('.select .select-sub .sel:first-child').data('link'));

	$('.go-buy .btn.goih').click(function () {
        if ($('.modal-wrapper .select-buy').length > 0) {
            $('.modal-wrapper .select-buy .right-block .btn').attr('href', $(this).attr('href'));
            showModal('.select-buy');
        } else {
            window.open($(this).attr('href'));
        }
    });

	$('.select .select-sub .sel-wrapper .sel .price').each(function () {
		var priceText = $(this).data('price') + '₽';
		$(this).html(priceText);
	});
	$('.go-buy .btn.goih .price-in').text($('.select .select-sub .sel-wrapper .sel.active .price').data('price') + '₽');

	$('.time').each(function () {
		var timeText = $(this).text();
		var translatedTimeText = translateTimeToRussia(timeText);
		$(this).text(translatedTimeText);
	});

	if (currentLang == 'en') {
		$('.select .select-sub .sel-wrapper .sel .price').each(function () {
			var priceText = $(this).data('price-dollar') + '$';
			$(this).html(priceText);
		});

		$('.time').each(function () {
			var timeText = $(this).text();
			var translatedTimeText = translateTimeToEnglish(timeText);
			$(this).text(translatedTimeText);
    	});

	$('.go-buy .btn.goih .price-in').text($('.select .select-sub .sel-wrapper .sel.active .price').data('price-dollar') + '$');
	}
}
checkProductsCheat();

function checkChangeLang() {
	if(currentLang == 'en') {
		var fieldNameElement = document.querySelector('.dropbtn');
		fieldNameElement.innerHTML = "English";

		var fieldNameElement2 = document.querySelector('.mobile-lang');
		fieldNameElement2.innerHTML = "English";

		var searchelement = document.querySelector('.searchBtn');
		searchelement.innerHTML = "Search...";

		var searchelement2 = document.querySelector('.mobile-search');
		searchelement2.innerHTML = "Search...";

		$('#isearch').attr('placeholder','Enter the search text');
	}
	else {
		var fieldNameElement = document.querySelector('.dropbtn');
		fieldNameElement.innerHTML = "Русский";

		var fieldNameElement2 = document.querySelector('.mobile-lang');
		fieldNameElement2.innerHTML = "Русский";

		var searchelement = document.querySelector('.searchBtn');
		searchelement.innerHTML = "Поиск...";

		var searchelement2 = document.querySelector('.mobile-search');
		searchelement2.innerHTML = "Поиск...";

		$('#isearch').attr('placeholder','Введите текст для поиска');
	}
}
checkChangeLang();

function translateTimeToEnglish(timeText) {
    // Заменяем "дней" на "days"
    var translatedText = timeText.replace(/дней/g, "days");
    
    // Заменяем "день" на "day"
    translatedText = translatedText.replace(/день/g, "day");

	translatedText = translatedText.replace(/Навсегда/g, "Forever");
    
    // Возвращаем переведенный текст
    return translatedText;
}

function translateTimeToRussia(timeText) {
    var translatedText = timeText.replace(/days/g, "дней");
    translatedText = translatedText.replace(/day/g, "день");
	translatedText = translatedText.replace(/Forever/g, "Навсегда");
    return translatedText;
}

function checkProfile2() {
	$('.profile-buttons .profile-button').click(function () {
		$('.profile-buttons .profile-button').removeClass('active');
		$(this).addClass('active');

		const targetId = $(this).data('target');

		// Скрыть все контент-боксы
		$('.profile-content .profile__content-box__content').hide();

		// Отобразить контент-бокс, соответствующий активной кнопке
		$('#' + targetId).show();

		// Обновить заголовок
		const titleText = $(this).find('p').text();
		$('.profile-title').text(titleText);
	});

	// Активировать первую кнопку и связанный с ней контент при загрузке страницы
	$('.profile-buttons .profile-button:first-child').addClass('active');
	$('.profile-content .profile__content-box__content:first-child').show();
}
checkProfile2();

function stopInterval(timer) {
	clearInterval(timer);
}

/*==========================
          CAROUSEL PRODUCT
    ==========================*/

if ($(' .carousel .screens .item[data-id="0"]').find('img').length > 0) {
	$(' .carousel .main-screen img').attr('src', $(' .carousel .screens .item[data-id="0"] img').attr('src'));
} else {
	$(' .carousel .main-screen img').hide();
	$(' .carousel .main-screen iframe').show();
	$(' .carousel .main-screen iframe').attr('src', $(this).find('.video-figure').data('src'));
}
$(' .carousel .screens .item[data-id="0"]').addClass('active');

let carouselProductPageTimer = null,
	timerProductPageOff = 0,
	hovCarouseloff = 0,
	countScreens = $(' .carousel .screens .item').length;

carouselProductPage(' .carousel .screens .item.active');

function carouselProductPage(el) {
	$(el).addClass('active');

	let widthNow = $(' .carousel .main-screen span').width(),
		id = $(el).data('id'),
		block = ' .carousel .main-screen';

	if (countScreens > 1) {
		carouselProductPageTimer = setInterval(function () {
			if (timerProductPageOff == 0) {
				widthNow++;
				widthNow = widthNow - 0.2;
				$(block + ' span').css("width", widthNow + "%");

				if ($(block + ' span').width() > 435) {

					widthNow = $(block + ' span').css("width", "0%");

					$(' .carousel .screens .item[data-id="' + id + '"]').removeClass('active');

					id++;
					widthNow = $(block + ' span').width();

					$(block + ' img').hide();
					$(block + ' iframe').hide();

					if ($(' .carousel .screens .item[data-id="' + id + '"]').length == 0) {
						id = 0;
						widthNow = $(block + ' span').width();
						$(' .carousel .screens .item[data-id="0"]').addClass('active');
						$(block + ' img').attr('src', $(' .carousel .screens .item[data-id="0"] img').attr('src'));
						$(' .carousel .main-screen .count b').text('1');
					}



					$(' .carousel .screens .item[data-id="' + id + '"]').addClass('active');
					if ($(' .carousel .screens .item.active').find('.video-figure').length == 0) {
						$(block + ' img').show();
						$(block + ' img').attr('src', $(' .carousel .screens .item.active img').attr('src'));
					} else {
						stopInterval(carouselProductPageTimer);
						$(block + ' iframe').show();
						$(block + ' iframe').attr('src', $(' .carousel .screens .item.active .video-figure').data('src'));
					}

					$(' .carousel .main-screen .count b').text(id + 1);
				}
			}
		}, 50);
	}
}

$(' .carousel .screens .item').click(function () {
	stopInterval(carouselProductPageTimer);
	$(' .carousel .screens .item').removeClass('active');
	$(' .carousel .main-screen span').css('width', "0%");
	$(' .carousel .main-screen .count b').text($(this).data('id') + 1);

	$(' .carousel .main-screen iframe').hide();
	$(' .carousel .main-screen img').hide();

	if ($(this).find('.video-figure').length == 0) {
		$(' .carousel .main-screen img').attr('src', $(this).find('img').attr('src'));
		$(' .carousel .main-screen img').show();
		carouselProductPage(' .carousel .screens .item[data-id="' + $(this).data('id') + '"]');
	} else {
		$(' .carousel .main-screen iframe').attr('src', $(this).find('.video-figure').data('src'));
		$(' .carousel .main-screen iframe').show();
		$(this).addClass('active');
	}
});

$(' .carousel .main-screen').click(function () {
	stopInterval(carouselProductPageTimer);
	$(' .carousel .main-screen span').css('width', "0%");
	$(' .carousel .preview').addClass('show');
	$(' .carousel .preview img').attr('src', $(' .carousel .main-screen img').attr('src'));
	$('header').addClass('show-preview');
	headerBackColorInt = 1;
	$('footer').css('z-index', '-1');
});

$(' .carousel .preview').click(function () {
	if (hovCarouseloff == 0) {
		$(' .carousel .preview').removeClass('show');
		carouselProductPage(' .carousel .screens .item.active');
		$('header').removeClass('show-preview');
		$('footer').css('z-index', '12');
		headerBackColorInt = 0;
	}
});

$(' .carousel .preview .close').click(function () {
	$(' .carousel .preview').removeClass('show');
	carouselProductPage(' .carousel .screens .item.active');
	$('header').removeClass('show-preview');
	$('footer').css('z-index', '12');
	headerBackColorInt = 0;
});

$(" .carousel .main-screen").hover(function () {
	timerProductPageOff = 1;
}, function () {
	timerProductPageOff = 0;
});

$(" .carousel .preview .container").hover(function () {
	hovCarouseloff = 1;
}, function () {
	hovCarouseloff = 0;
});

function checkSearch() {
	$(".searchBtn").on("click touch",(function(){$("#searchmodal").modal({fadeDuration:100}),setTimeout((function(){$(".blurInput").focus()}),200)}))

	const searchInput = document.querySelector('.iSearch');

	function displayOptions() {
		console.log('this.value >> ', this.value);

		var myLang = $(this).data('lang');
		lang = '';
		if (currentLang == 'ru') {
			lang = 'ru';
		}
		else {
			lang = 'en';
		}
		var e = $(this),
			t = e.val();
		$(".iSearchResults").remove(),
			t.length > 2 &&
				$.post(
					"/functions/isearch",
					{ query: t },
					function (t) {
						console.log(t.item);
						var r = "";
						var rI = "";
						var rC = "";
						var countC = 0;
						var countI = 0;
						if(lang == 'ru'){
							priceText = 'Цена от:';
							productsText = 'Товаров:';
							priceSymbol = '₽';
						}
						else {
							priceText = 'Price from:';
							productsText = 'Products:';
							priceSymbol = '$';
						}
						if(t.item){
							if(t.item.length > 0){
								var countI = t.item.length;
								$.each(t.item, function (e, tt) {
									rI += '<a href="'+tt.link+'"><div class="table"><div class="row">';
									rI += '<div class="d-flex">';

										rI += '<div class="d-flex">';
											rI += '<div class="img">';
												rI += '<img src="'+tt.image+'">';
											rI += "</div>";
											rI += "<div>";
												rI += '<div class="itemtitle">'+tt.name+'</div>';
												rI += '<div class="d-flex catblock">';
													rI += '<img src="'+tt.caticon+'">';
													rI += '<span class="cattitle">'+tt.catname+'</span>';
												rI += '</div>';
											rI += "</div>";
										rI += "</div>";
										if(tt.undetected == '1'){
											rI += '<div class="undetected_modal"><div class="undetected__circle"></div><p class="undetected__text">Undetected</p></div>';
										}
										else {
											rI += '<div class="update_modal"><div class="update__circle"></div><p class="update__text">On update</p></div>';
										}

										if (lang == 'ru') {
											priceLang = tt.price;
										}
										else {
											priceLang = tt.priceDollar;
										}

										rI += '<div class="catprice"><span>'+priceText+'</span><b>'+priceLang+priceSymbol+'</b></div>';

									rI += "</div>";
									rI += "</div></div></a>";
									return rI;
								});
							}
						}

						if(t.cat){
							if(t.cat.length > 0){
								var countC = t.cat.length;
								$.each(t.cat, function (e, tc) {
									rC += '<a href="'+tc.link+'"><div class="table"><div class="row">'
									//
									rC += '<div class="d-flex">';
									rC += '<div class="d-flex"><img src="'+tc.caticon+'" class="catimage"><span class="itemtitle">'+tc.name+'</span></div>';
									rC += '<div class="catitems">'+productsText+' '+tc.count+'</div>';

									if (lang == 'ru') {
										priceLang = tc.price;
									}
									else {
										priceLang = tc.priceDollar;
									}

									rC += '<div class="catprice"><span>'+priceText+'</span><b>'+priceLang+priceSymbol+'</b></div>';
									rC += '</div>';
									//
									rC += "</div></div></a>"
									return rC;
								});
							}
						}
						rCF = '';
						rIF = '';
						console.log(lang);
						if(lang == 'ru'){
							gamesText = 'Игры';
							iteText = 'Товары';
							resText = 'Результатов:';
							searchText = 'По запросу ничего не найдено';
						}
						else {
							gamesText = 'Games';
							iteText = 'Products';
							resText = 'Results:';
							searchText = 'No results found';
						}
						if(rC.length > 0){
							rCF = '<div class="results cat">' +
									'<div class="d-flex searchHead">' +
										'<div class="title">'+gamesText+'</div>'+
										'<div class="count">'+resText+' '+t.cat.length+'</div>'+
									'</div>'+
									'<div class="group">'+
										'<div class="group-items">'+
											'<div class="result">' +
												rC +
											'</div>'+
										'</div>'+
										'<div class="clearfix"></div>'+
									'</div>'+
								'</div>';
						}
						if(rI.length > 0){
							rIF = '<div class="results items">' +
									'<div class="d-flex searchHead">' +
										'<div class="title">'+iteText+'</div>'+
										'<div class="count">'+resText+' '+t.item.length+'</div>'+
									'</div>'+
									'<div class="group">'+
										'<div class="group-items">'+
											'<div class="result">' +
												rI +
											'</div>'+
										'</div>'+
										'<div class="clearfix"></div>'+
									'</div>'+
								'</div>';
						}

						rF = rCF + rIF,
							"" == rF && (rF = "<div class='noResults'>"+searchText+"</div>"),
							e.closest(".iSearchBlock")
							.append(
								'<div class="iSearchResults" style="position: absolute; left: 0; top: 45px; width: 100%; display: block;">'+rF+'</div>'
							);

					},
					"json"
				);
	}

	searchInput.addEventListener('input', displayOptions);
	// searchInput.addEventListener('keyup', displayOptions);
}
checkSearch();

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}

function checkReg() {
	$('.register-button').click(async (event) => {
		if($('#email').val() == '') {
			$('#email').focus()
			return;
		}
		if($('#password').val() == '') {
			$('#password').focus()
			return;
		}

		if(!isEmailValid($('#email').val())) {

			if (currentLang == 'ru') {
				showNotification('Некорректный формат электронной почтой');
			}
			else {
				showNotification('Incorrect email format');
			}
			return;
		}

		$.ajax({
			url: '/functions/registeraccount',
			method: 'POST',
			dataType: 'JSON',
			data: {
				email: $('#email').val(),
				password: $('#password').val()
			},
			success: (function (data) {
				if (data.error == 'none') {
					location.href = '/profile'
				}
				if (data.error == 'alreadyReg') {
					if (currentLang == 'ru') {
						showNotification('Такой аккаунт уже зарегистрирован');
					}
					else {
						showNotification('Such an account has already been registered');
					}
				}
				else {
					showNotification(data.error);
				}
			})
		})
	})
}
checkReg();

function checkLog() {
	$('.login-button').click(async (event) => {
    if($('#email').val() == '') {
      $('#email').focus()
      return;
    }
    if($('#password').val() == '') {
      $('#password').focus()
      return;
    }

	if(!isEmailValid($('#email').val())) {

		if (currentLang == 'ru') {
			showNotification('Некорректный формат электронной почтой');
		}
		else {
			showNotification('Incorrect email format');
		}
		return;
	}

    $.ajax({
      url: '/functions/loginaccount',
      method: 'POST',
      dataType: 'JSON',
      data: {
          email: $('#email').val(),
          password: $('#password').val()
      },
      success: (function (data) {
          if (data.error == 'none') {
              location.href = '/profile'
		  }
		  if(data.error == 'incorrectPass') {
			if (currentLang == 'ru') {
				showNotification('Неверный пароль');
			}
			else {
				showNotification('Incorrect Password');
			}
		  }
		  if(data.error == "NoAccountReg") {
			if (currentLang == 'ru') {
				showNotification('Данный аккаунт не зарегистрирован');
			}
			else {
				showNotification('This account is not registered');
			}
		  }
          else {
              showNotification(data.error);
		  }
      })
    })
  })
}
checkLog();

function checkProfile() {
	$('.button_out').click(async (event) => {
    $.ajax({
      url: '/functions/accountout',
      method: 'GET',
      dataType: 'JSON',
      success: (function (data) {
          if (data.error == 'none')
              location.href = '/login'
          else
              showNotification(data.error);
      })
    })
  })
  $('.profile-complete-button').click(async (event) => {
    if($('#email').val() == '') {
      $('#email').focus()
      return;
    }
    let passwd = 'None';

    if($('#pwwdnew').val() != '') {
		passwd = $('#pwwdnew').val();
    //   if($('#pwwdnew').val() != $('#pwwdnow').val()) {
	// 	if (currentLang == 'ru') {
	// 		showNotification('Пароли не совпадают');
	// 	}
	// 	else {
	// 		showNotification('Incorrect passwords');
	// 	}
    //     return;
    //   }
    //   else {
    //     passwd = $('#pwwdnew').val();
    //   }
    }
    else {
      passwd = 'None';
    }

    if(!isEmailValid($('#email').val())) {
		if (currentLang == 'ru') {
			showNotification('Некорректный формат электронной почтой');
		}
		else {
			showNotification('Incorrect email format');
		}
      	return;
    }

    $.ajax({
      url: '/functions/changesettings',
      method: 'POST',
      dataType: 'JSON',
      data: {
          email: $('#email').val(),
          password: passwd,
          nickname: $('#nickname').val(),
          id_acc: $('#id_acc').val(),
		  current: $('#pwwdnow').val()
      },
      success: (function (data) {
          if (data.error == 'none') {
			  if (currentLang == "ru") {
				  showNotification("Настройки сохранены");
			  }
			  else {
				  showNotification("Settings saved");
			  }
			  setTimeout(() => {  location.href = '/profile' }, 3000);
          }
		  if(data.error == 'incorpass') {
			if (currentLang == "ru") {
				  showNotification("Неправильный действующий пароль");
			  }
			  else {
				  showNotification("Incorrect current password");
			  }
		  }
          else {
              showNotification(data.error);
          }
      })
    });
  })
}
checkProfile();