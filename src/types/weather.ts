import { DefinedWeather } from './defined-weathers.ts'

export interface Weather {
  name: DefinedWeather
  background: string
  sound: HTMLAudioElement
  icon: string
}