import { WeatherData } from '../types'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'your-api-key-here'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        icon: data.weather[0].icon
      }
    } catch (error) {
      console.error('Error fetching weather:', error)
      return null
    }
  },

  async getWeatherByLocation(location: string): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        icon: data.weather[0].icon
      }
    } catch (error) {
      console.error('Error fetching weather by location:', error)
      return null
    }
  },

  async getCurrentLocation(): Promise<{ lat: number; lon: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser')
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  },

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  },

  getWeatherRecommendation(weather: WeatherData): string {
    const { temperature, condition } = weather
    
    if (temperature < 10) {
      return 'Bundle up! Perfect for warm layers, coats, and boots.'
    } else if (temperature < 20) {
      return 'Transition weather. Light layers and a jacket would work well.'
    } else {
      return 'Warm day! Light, breathable fabrics are perfect.'
    }
  },

  isRainy(condition: string): boolean {
    return ['Rain', 'Drizzle', 'Thunderstorm'].includes(condition)
  },

  isWindy(windSpeed: number): boolean {
    return windSpeed > 15 // km/h
  },

  isCold(temperature: number): boolean {
    return temperature < 10
  },

  isWarm(temperature: number): boolean {
    return temperature > 20
  }
}
