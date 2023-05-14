import sunnyBg from './images/summer-bg.jpg'
import rainyBg from './images/rainy-bg.jpg'
import snowyBg from './images/winter-bg.jpg'

import sunnySound from './sounds/summer.mp3'
import rainySound from './sounds/rain.mp3'
import snowySound from './sounds/winter.mp3'

import sunnyIcon from './icons/sun.svg'
import rainyIcon from './icons/cloud-rain.svg'
import snowyIcon from './icons/cloud-snow.svg'

import pauseIcon from './icons/pause.svg'

interface Files {
  [k: string]: string
}

interface WeatherFiles {
  sunny: string
  rainy: string
  snowy: string
}

export const weatherBackgrounds: WeatherFiles = {
  sunny: sunnyBg,
  rainy: rainyBg,
  snowy: snowyBg,
}

export const weatherSounds: WeatherFiles = {
  sunny: sunnySound,
  rainy: rainySound,
  snowy: snowySound,
}

export const weatherIcons: WeatherFiles = {
  sunny: sunnyIcon,
  rainy: rainyIcon,
  snowy: snowyIcon,
}

export const icons: Files = {
  pause: pauseIcon,
}

