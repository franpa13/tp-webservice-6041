export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  timezone: string;
  admin1?: string;
}

export interface GeoResponse {
  results: GeoLocation[];
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  is_day: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
  current_units: Record<string, string>;
}
