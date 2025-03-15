import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Thermometer, Droplets, Wind, Plane, AlertTriangle, Activity, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import type { EnvironmentalData, WeatherData, DataPoint } from '../types';
import 'leaflet/dist/leaflet.css';

interface DashboardProps {
  environmentalData: EnvironmentalData;
  weatherData: WeatherData;
  temperatureHistory: DataPoint[];
  humidityHistory: DataPoint[];
  airQualityHistory: DataPoint[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  environmentalData, 
  weatherData,
  temperatureHistory,
  humidityHistory,
  airQualityHistory
}) => {
  const getAirQualityColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    return 'text-red-500';
  };

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return 'İyi';
    if (aqi <= 100) return 'Orta';
    if (aqi <= 150) return 'Hassas';
    return 'Kötü';
  };

  const getTrend = (history: DataPoint[]) => {
    if (history.length < 2) return 0;
    return history[history.length - 1].value - history[history.length - 2].value;
  };

  const renderTrendIndicator = (trend: number) => {
    if (Math.abs(trend) < 0.1) return null;
    if (trend > 0) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const renderMiniGraph = (data: DataPoint[]) => {
    if (data.length < 2) return null;
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const height = 40;

    return (
      <div className="h-[40px] flex items-end space-x-1">
        {values.map((value, i) => {
          const normalizedHeight = ((value - min) / (range || 1)) * height;
          return (
            <div
              key={i}
              className="w-1 bg-white/20 rounded-t"
              style={{ height: `${normalizedHeight}px` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Activity className="h-7 w-7 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Uçak Sensör Verileri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Son Güncelleme: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Thermometer className="text-red-400 h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-300">Sıcaklık</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-white">{environmentalData.temperature.toFixed(1)}°C</p>
                      {renderTrendIndicator(getTrend(temperatureHistory))}
                    </div>
                  </div>
                </div>
              </div>
              {renderMiniGraph(temperatureHistory)}
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Droplets className="text-blue-400 h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-300">Nem</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-white">%{environmentalData.humidity.toFixed(1)}</p>
                      {renderTrendIndicator(getTrend(humidityHistory))}
                    </div>
                  </div>
                </div>
              </div>
              {renderMiniGraph(humidityHistory)}
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-6 w-6 ${getAirQualityColor(environmentalData.airQuality)}`} />
                  <div>
                    <p className="text-sm text-gray-300">Hava Kalitesi</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-white">{environmentalData.airQuality.toFixed(0)} AQI</p>
                      {renderTrendIndicator(getTrend(airQualityHistory))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-sm ${getAirQualityColor(environmentalData.airQuality)}`}>
                  {getAirQualityStatus(environmentalData.airQuality)}
                </span>
              </div>
              {renderMiniGraph(airQualityHistory)}
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-3">
                <Plane className="text-purple-400 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-300">Yükseklik</p>
                  <p className="text-2xl font-bold text-white">{environmentalData.altitude.toFixed(0)}m</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <p>Koordinatlar:</p>
                <p>{environmentalData.latitude.toFixed(4)}°N, {environmentalData.longitude.toFixed(4)}°E</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <Wind className="h-7 w-7 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Hava Durumu</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-3">
                <Thermometer className="text-yellow-400 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-300">Sıcaklık</p>
                  <p className="text-2xl font-bold text-white">{weatherData.temperature.toFixed(1)}°C</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-3">
                <Droplets className="text-cyan-400 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-300">Nem</p>
                  <p className="text-2xl font-bold text-white">%{weatherData.humidity.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-3">
                <Wind className="text-teal-400 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-300">Rüzgar Hızı</p>
                  <p className="text-2xl font-bold text-white">{weatherData.windSpeed.toFixed(1)} km/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Konum Takibi</h2>
        <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
          <MapContainer
            center={[environmentalData.latitude, environmentalData.longitude]}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[environmentalData.latitude, environmentalData.longitude]}>
              <Popup>
                <div className="font-semibold">
                  Uçak Konumu<br />
                  Yükseklik: {environmentalData.altitude}m<br />
                  Sıcaklık: {environmentalData.temperature}°C<br />
                  Hava Kalitesi: {environmentalData.airQuality} AQI<br />
                  Durum: {getAirQualityStatus(environmentalData.airQuality)}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;