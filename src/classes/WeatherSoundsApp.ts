import { Weather } from '../types/weather.ts'
import { DefinedWeather } from '../types/defined-weathers.ts'
import { icons, weatherBackgrounds, weatherIcons, weatherSounds } from '../assets/files.ts'

export class WeatherSoundsApp {
  private readonly $root: HTMLElement
  private weathers: Weather[] = [
    {
      name: 'sunny',
      background: weatherBackgrounds.sunny,
      sound: new Audio(weatherSounds.sunny),
      icon: weatherIcons.sunny,
    },
    {
      name: 'rainy',
      background: weatherBackgrounds.rainy,
      sound: new Audio(weatherSounds.rainy),
      icon: weatherIcons.rainy,
    },
    {
      name: 'snowy',
      background: weatherBackgrounds.snowy,
      sound: new Audio(weatherSounds.snowy),
      icon: weatherIcons.snowy,
    },
  ]
  private selectedWeather: Weather | null = null

  constructor(selector: string) {
    this.$root = <HTMLElement>document.querySelector(selector)
    this.weathers = this.weathers.map(weather => {
      weather.sound.loop = true
      return weather
    })
    this.setVolume = this.setVolume.bind(this)
    this.clickOnWeather = this.clickOnWeather.bind(this)
  }

  private _volume: number = 50

  get volume() {
    return this._volume / 100
  }

  set volume(value) {
    this._volume = value
  }

  private get selectedWeatherBlock(): HTMLElement {
    return <HTMLElement>this.$root.querySelector(`[data-weather="${this.selectedWeather?.name}"]`)
  }

  private get template() {
    return `<div class="weather-sounds-content">
        <h1>Weather sounds</h1>
        <div class="weather-sounds">
            ${this.weathers.map(toWeatherBlock).join('')}
        </div>
        <div class="control-panel">
            <input type="range" name="volume" id="volume" value="${this._volume}" />
        </div>    
     </div>`
  }

  toggleWeatherSound() {
    if (this.selectedWeather === null) return
    this.selectedWeatherBlock.classList.remove('active')
    if (this.selectedWeather.sound.paused) {
      this.selectedWeather.sound.play()
      this.selectedWeatherBlock.classList.add('active')
    } else {
      this.selectedWeatherBlock.classList.remove('active')
      this.selectedWeather.sound.pause()
    }
  }

  setVolume(event: Event) {
    const volumeInput = <HTMLInputElement>event.target
    const value = volumeInput.value
    this.volume = +value
    if (this.selectedWeather !== null) {
      this.selectedWeather.sound.volume = this.volume
    }
  }

  clickOnWeather(event: MouseEvent) {
    const target = <HTMLElement>event.target
    const weatherBlock = <HTMLElement>target.closest('[data-weather]')
    if (!weatherBlock) return
    const weather = <DefinedWeather>weatherBlock.dataset.weather
    if (this.selectedWeather?.name === weather) {
      this.toggleWeatherSound()
    } else {
      this.setWeather(weather)
    }
  }

  init() {
    this.$root.classList.add('weather-sounds-app')
    this.render()
    this.$root.addEventListener('click', this.clickOnWeather)
    this.$root.addEventListener('change', this.setVolume)
  }

  destroy() {
    this.$root.removeEventListener('click', this.clickOnWeather)
    this.$root.removeEventListener('change', this.setVolume)
  }

  private render() {
    this.$root.innerHTML = this.template
  }

  private setWeather(weather: DefinedWeather) {
    if (this.selectedWeather !== null) {
      this.selectedWeather.sound.pause()
      this.selectedWeatherBlock?.classList.remove('active')
    }

    this.selectedWeather = <Weather>this.weathers.find(w => w.name === weather)
    setBackground(this.$root, this.selectedWeather.background)
    this.selectedWeatherBlock.classList.add('active')
    this.selectedWeather.sound.volume = this.volume
    this.selectedWeather.sound.play()
  }
}

function toWeatherBlock(weather: Weather) {
  return `
    <div 
      class="weather-sound-item" 
      style="background-image: url('${weather.background}')"
      data-weather="${weather.name}">
      <img data-weather-icon src="${weather.icon}" alt="weather-${weather.name}" />
      <img data-weather-pause src="${icons.pause}" alt="weather-${weather.name}-pause" />
    </div>`
}

function setBackground(element: HTMLElement, backgroundURL: string): void {
  element.style.backgroundImage = `URL("${backgroundURL}")`
}