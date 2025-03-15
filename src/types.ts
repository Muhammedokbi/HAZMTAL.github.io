export interface EnvironmentalData {
  temperature: number;
  humidity: number;
  airQuality: number;
  altitude: number;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
}

export interface DataPoint {
  value: number;
  timestamp: number;
}