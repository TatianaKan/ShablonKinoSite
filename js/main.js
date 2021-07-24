// new Swiper('.swiper-container', {
// 	loop: true,
// 	navigation: {
// 		nextEl: '.arrow',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 20
// 		},
// 		541: {
// 			slidesPerView: 2,
// 			spaceBetween: 40
// 		}
// 	}
// });

// const menuButton = document.querySelector('.menu-button');
// const menu = document.querySelector('.header');
// menuButton.addEventListener('click', function () {
// 	menuButton.classList.toggle('menu-button-active');
// 	menu.classList.toggle('header-active');
// })
const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute]
		}
	}

	return element;
}

const createHeader = ({ title, header: { logo, menu, social } }) => {
	const header = getElement('header');//sozdaet element header
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Logotip ' + title
		}
		);

		wrapper.append(logoElem);
	}

	if (menu) {
		///DZ
		const menuWrapper = getElement('nav', ['menu-list']);///создание тега нав
		const allMenu = menu.map(item => {
			const menuLink = getElement('a', ['menu-link'], {
				href: item.link,
			});
			menuLink.textContent = item.title;
			menuWrapper.append(menuLink);
			return menuLink;
		});

		menuWrapper.append(...allMenu);
		wrapper.append(menuWrapper);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		})
		container.append(menuBtn)
	};

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.img,
				alt: item.title
			}));

			socialLink.href = item.link;
			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);

	return header;
};

const createMain = ({
	title,
	main: { genre, rating, description, trailer, slider } }) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{ textContent: genre }
		);
		content.append(genreSpan)
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
		textContent: title
	}));

	if (description) {
		const descriptionElem = getElement('p',
			['main-description', 'animated', 'fadeInRight'],
			{
				textContent: description
			})
		content.append(descriptionElem)
	}

	if (trailer) {
		const youtubeLink = getElement('a',
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер'
			});

		const youtubeImageLink = getElement('a', ['play', 'youtube-modal'],
			{
				href: trailer,
				ariaaLabel: 'Смотреть трейлер'
			});

		const iconPlay = getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: 'Смотреть трейлер',
			ariaHidden: true,
		})
		content.append(youtubeLink);
		youtubeImageLink.append(iconPlay);
		wrapper.append(youtubeImageLink);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map(item => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle + '' : '')).trim()
			})
			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
				${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
				${item.title ? `<p class="card-title">${item.title}</p>` : ''}
			`;
				card.append(cardDescription);
			}

			swiperSlide.append(card);
			console.log(swiperSlide);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);
		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}
	return main;
};

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null, {
			relt: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type)
		})
		document.head.append(favicon)
	}

	document.title = options.title;
	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}
};

movieConstructor('.app', {
	title: 'Чернобыль',
	background: 'Chernobyl/background.jpg',
	fontColor: 'affffff',
	backgroundColor: '#839E8F',
	subColor: '#9D2929',
	favicon: 'Chernobyl/favicon.jpg',
	header: {
		logo: 'Chernobyl/logo.jpg',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				img: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				img: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				img: 'witcher/social/facebook.svg'
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#'
			},
			{
				title: 'Трейлер',
				link: '#'
			},
			{
				title: 'Отзывы',
				link: '#'
			}
		]
	},
	main: {
		genre: '2019, Драма',
		rating: '9',
		description: 'Хроника одной из самых страшных техногенных катастроф в истории. Мини-сериал воссоздает события сразу после аварии на Чернобыльской АЭС, рассказывая о жертвах, принесенных ради спасения от неизмеримой трагедии. Британский актер Джаред Харрис («Безумцы», «Корона») предстает в роли советского физика-ядерщика, который одним из первых осознал масштабы катастрофы. Стеллан Скарсгард («Девушка с татуировкой дракона», «Меланхолия») сыграл замглаву совета министров СССР Бориса Щербину, назначенного Кремлем руководить правительственной комиссией по ликвидации последствий аварии. Номинантка на «Оскар» Эмили Уотсон («Рассекая волны») исполнила роль вымышленного ученого-физика Уланы Хомюк, решившей раскрыть истинную причину аварии. Сценарий для проекта, опираясь на материалы архивов, написал Крейг Мазин («Белоснежка и Охотник 2»). Поставил сериал шведский режиссер Йохан Ренк, работавший над хитами «Во все тяжкие» и «Викинги».',
		trailer: 'https://www.youtube.com/watch?v=RhoSilOtDF8',
		slider: [
			{
				img: 'Chernobyl/serii/seria-1.jpg',
				title: '',
				subtitle: 'Серия №1'
			},
			{
				img: 'Chernobyl/serii/seria-2.jpg',
				title: 'Пожалуйста, сохраняйте спокойствие',
				subtitle: 'Серия №2'
			},
			{
				img: 'Chernobyl/serii/seria-3.jpg',
				title: 'Да разверзнется земля!',
				subtitle: 'Серия №3'
			},
			{
				img: 'Chernobyl/serii/seria-4.jpg',
				title: 'Счастье всего человечестваы',
				subtitle: 'Серия №4'
			},
			{
				img: 'Chernobyl/serii/seria-5.png',
				title: 'Вечная память',
				subtitle: 'Серия №5'
			},

		],
	},
});

