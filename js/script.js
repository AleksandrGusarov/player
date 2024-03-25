const dataMusic = [
  {
    id: '1',
    artist: 'Red Hot Chili Peppers',
    track: 'Dark Necessities',
    poster: 'img/track-img/RHCP.jpg',
    mp3: 'audio/Red Hot Chili Peppers - Dark Necessities.mp3',
  },
  {
    id: '2',
    artist: 'Green Day',
    track: 'Take Back',
    poster: 'img/track-img/GreenDay.jpg',
    mp3: 'audio/Green Day - Take Back.mp3',
  },
  {
    id: '3',
    artist: 'The Doors',
    track: 'People Are Strange',
    poster: 'img/track-img/TheDoors.jpg',
    mp3: 'audio/The Doors - People Are Strange.mp3',
  },
  {
    id: '4',
    artist: 'Gorillaz',
    track: 'Humility',
    poster: 'img/track-img/Gorillaz2.jpg',
    mp3: 'audio/Gorillaz - Humility.mp3',
  },
  {
    id: '5',
    artist: 'Gorillaz',
    track: 'Feel Good Inc',
    poster: 'img/track-img/Gorillaz1.webp',
    mp3: 'audio/Gorillaz - Feel Good Inc.mp3',
  },
  {
    id: '6',
    artist: 'The Neighbourhood',
    track: 'Stargazing',
    poster: 'img/track-img/the neighbourhood stargazing.jpg',
    mp3: 'audio/The Neighbourhood - Stargazing.mp3',
  },
  {
    id: '7',
    artist: 'Arctic Monkeys',
    track: "505",
    poster: 'img/track-img/Favourite_Worst_Nightmare.jpg',
    mp3: "audio/Arctic Monkeys - 505.mp3",
  },
  {
    id: '8',
    artist: 'Nirvana',
    track: 'Pennyroyal Tea',
    poster: 'img/track-img/In-Utero-Nirvana.jpg',
    mp3: 'audio/Nirvana - Pennyroyal Tea.mp3',
  },
  {
    id: '9',
    artist: 'Северный флот',
    track: 'Поднимая Знамя',
    poster: 'img/track-img/Northern-Fleet.jpg',
    mp3: 'audio/Северный флот - Поднимая Знамя.mp3',
  },
  {
    id: '10',
    artist: 'Casey Edwards',
    track: 'Bury The Light',
    poster: 'img/track-img/Burry the light.jpg',
    mp3: 'audio/Casey Edwards - Bury The Light.mp3',
  },
  {
    id: '11',
    artist: 'Black Caviar & Blackway',
    track: 'What"s Up Danger',
    poster: 'img/track-img/Danger.jpg',
    mp3: 'audio/Black Caviar & Blackway - What"s Up Danger.mp3',
  },
  {
    id: '12',
    artist: 'Grandson',
    track: 'Something to Hide',
    poster: 'img/track-img/Grandson1.jpg',
    mp3: 'audio/Grandson - Something to Hide.mp3',
  },
];

let playlist = [];

const favoriteList = localStorage.getItem('favorite')
  ? JSON.parse(localStorage.getItem('favorite'))
  : []

const audio = new Audio();
const headerLogo = document.querySelector('.header__logo');
const favoriteBtn = document.querySelector('.header__favorite-btn');
const tracksCard = document.getElementsByClassName('track');
const catalogContainer = document.querySelector('.catalog__container');
const player = document.querySelector('.player');
const trackTitle = document.querySelector('.track-info__title');
const trackArtist = document.querySelector('.track-info__artist');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');
const prevBtn = document.querySelector('.player__controller-prev');
const nextBtn = document.querySelector('.player__controller-next');
const likeBtn = document.querySelector('.player__controller-like');
const muteBtn = document.querySelector('.player__controller-mute');
const playerProgressInput = document.querySelector('.player__progress-input');


const playerTimePassed = document.querySelector('.player__time-passed'); 
const playerTimeTotal = document.querySelector('.player__time-total');

//-=------------------
const playerVolumeInput = document.querySelector('.player__volume-input');

const updateVolumeInputStyle = () => {
  const volume = audio.volume;
  const fillPercentage = volume * 100;
  const backgroundColor = `linear-gradient(to right, #06a53a ${fillPercentage}%, #fff ${fillPercentage}%)`;
  playerVolumeInput.style.background = backgroundColor;
}

audio.addEventListener('volumechange', updateVolumeInputStyle);

//-=------------------


const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add')
catalogAddBtn.innerHTML = `
  <span>Увидеть все</span>
  <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.589996 10.59L5.17 6L0.589996 1.41L2 0L8 6L2 12L0.589996 10.59Z"/>
  </svg>
`;



const pausePlayer = () => {
  const trackActive = document.querySelector('.track_active');

  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    trackActive.classList.remove('track_pause');
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play');
    trackActive.classList.add('track_pause');
  }
}

const playMusic = (event) => {
  event.preventDefault();
	const trackActive = event.currentTarget;

  if (trackActive.classList.contains('track_active')){
    pausePlayer();
    return
  }

  let i = 0;
  const id = trackActive.dataset.idTrack;

  const index = favoriteList.indexOf(id)
    if (index !== -1) {
      likeBtn.classList.add('player__icon_like_active')
    } else {
      likeBtn.classList.remove('player__icon_like_active')
    }

  const track = playlist.find((item, index) => {
    i = index;
    return id  === item.id;
  });
	audio.src = track.mp3;
	trackTitle.textContent = track.track;
	trackArtist.textContent = track.artist;
	audio.play();

	pauseBtn.classList.remove('player__icon_play');
	player.classList.add('player_active');

  const prevTrack = i === 0 ? playlist.length - 1 : i - 1;
  const nextTrack = i + 1 === playlist.length ? 0 : i + 1;
  prevBtn.dataset.idTrack = playlist[prevTrack].id;
  nextBtn.dataset.idTrack = playlist[nextTrack].id;
  likeBtn.dataset.idTrack = id;


	for (let i = 0; i < tracksCard.length; i++) {
    if (id === tracksCard[i].dataset.idTrack) {
      tracksCard[i].classList.add('track_active');
    } else {
      tracksCard[i].classList.remove('track_active');
    }
	}
	
};

const addHandlerTrack = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
  }
}

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
	audio.src = '';
	player.classList.remove('player_active');
  document.querySelector('.track_active').classList.remove('track_active');
});

const createCard = (data) => {
	const card = document.createElement('a');
  card.href = '#';
	card.classList.add('catalog__item', 'track');
	card.dataset.idTrack = data.id;

	card.innerHTML =  `
    <div class="track__img-wrap">
      <img class="track__poster" src="${data.poster}" alt="${data.artist} ${data.track}" width="180" height="180">
    </div>

    <div class="track__info track-info ">
      <p class="track-info__title">${data.track}</p>
      <p class="track-info__artist">${data.artist}</p>
    </div>
	`;

  return card
};

const renderCatalog = (dataList) => {
  playlist = [...dataList];
	catalogContainer.textContent = '';
	const listCards = dataList.map(createCard);
	catalogContainer.append(...listCards);
  addHandlerTrack();
};

const checkCount = (i = 1) => {
  tracksCard[0]
  if (catalogContainer.clientHeight > tracksCard[0].clientHeight *3) {
    tracksCard[tracksCard.length - i].style.display = 'none';
    checkCount(i + 1);
  } else if (i !== 1) {
    catalogContainer.append(catalogAddBtn);
  }
};

const updateTime = () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * playerProgressInput.max;
  playerProgressInput.value = progress ? progress : 0;

  const minutesPassed = Math.floor(currentTime / 60) || '0';
  const secondsPassed = Math.floor(currentTime % 60) || '0';

  const minutesDuration = Math.floor(duration / 60) || '0';
  const secondsDuration = Math.floor(duration % 60) || '0';

  playerTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`;
  playerTimeTotal.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`;



  const fillPercentage = (currentTime / duration) * 100;
  playerProgressInput.style.backgroundImage = `linear-gradient(to right, #06a53a ${fillPercentage}%, #fff ${fillPercentage}%)`;

}

const init = () => {
  audio.volume = localStorage.getItem('volume') || 1;
  playerVolumeInput.valuer = audio.volume * 100;

	renderCatalog(dataMusic);
  checkCount();

  catalogAddBtn.addEventListener('click', () => {
    [...tracksCard].forEach((trackCard) => {
      trackCard.style.display = '';
      catalogAddBtn.remove();
    });
  });

  nextBtn.addEventListener('click', playMusic);
  prevBtn.addEventListener('click', playMusic);

  audio.addEventListener('ended', () => {
    nextBtn.dispatchEvent(new Event('click', {bubbles: true}));
  })

  audio.addEventListener('timeupdate', updateTime);

  playerProgressInput.addEventListener('change', () => {
    const progress = playerProgressInput.value;
    audio.currentTime = (progress / playerProgressInput.max) * audio.duration;
  });

  favoriteBtn.addEventListener('click', () => {
    const data = dataMusic.filter((item) => favoriteList.includes(item.id))
    renderCatalog(data);
    checkCount();
  });

  headerLogo.addEventListener('click', () => {
    renderCatalog(dataMusic);
    checkCount();
  });

  likeBtn.addEventListener('click', () => {
    const index = favoriteList.indexOf(likeBtn.dataset.idTrack)
    if (index === -1) {
      favoriteList.push(likeBtn.dataset.idTrack);
      likeBtn.classList.add('player__icon_like_active')
    } else {
      favoriteList.splice(index, 1);
      likeBtn.classList.remove('player__icon_like_active')
    }

    localStorage.setItem('favorite', JSON.stringify(favoriteList))
  });

  playerVolumeInput.addEventListener('input', () => {
    const value = playerVolumeInput.value;
    audio.volume = value / 100;
  })

  muteBtn.addEventListener('click', () => {
    if (audio.volume) {
      localStorage.setItem('volume', audio.volume);
      audio.volume = 0;
      muteBtn.classList.add('player__icon_mute-off');
      playerVolumeInput.value = 0;
    } else {
      audio.volume = localStorage.getItem('volume');
      muteBtn.classList.remove('player__icon_mute-off');
      playerVolumeInput.value = audio.volume * 100;
    }
  })

	updateVolumeInputStyle();

};

init();