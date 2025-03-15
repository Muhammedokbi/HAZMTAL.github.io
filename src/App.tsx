import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane, Users, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TeamSection from './components/TeamSection.tsx';
import ProjectInfo from './components/ProjectInfo.tsx';
import type { EnvironmentalData, WeatherData, DataPoint } from './types';

function App() {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    temperature: 25,
    humidity: 60,
    airQuality: 45,
    altitude: 1500,
    latitude: 41.4535,
    longitude: 31.7894
  });

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 23,
    humidity: 65,
    description: "Açık",
    windSpeed: 12
  });

  const [showTeam, setShowTeam] = useState(false);
  const [showProject, setShowProject] = useState(false);

  const [temperatureHistory, setTemperatureHistory] = useState<DataPoint[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<DataPoint[]>([]);
  const [airQualityHistory, setAirQualityHistory] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Date.now();
      const newTemp = environmentalData.temperature + (Math.random() - 0.5);
      const newHumidity = Math.max(0, Math.min(100, environmentalData.humidity + (Math.random() - 0.5) * 2));
      const newAirQuality = Math.max(0, Math.min(500, environmentalData.airQuality + (Math.random() - 0.5) * 5));
      
      setEnvironmentalData(prev => ({
        ...prev,
        temperature: newTemp,
        humidity: newHumidity,
        airQuality: newAirQuality,
        altitude: Math.max(0, prev.altitude + (Math.random() - 0.5) * 10),
      }));

      setTemperatureHistory(prev => [...prev.slice(-29), { value: newTemp, timestamp }]);
      setHumidityHistory(prev => [...prev.slice(-29), { value: newHumidity, timestamp }]);
      setAirQualityHistory(prev => [...prev.slice(-29), { value: newAirQuality, timestamp }]);
    }, 3000);

    return () => clearInterval(interval);
  }, [environmentalData]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setWeatherData(prev => ({
          ...prev,
          temperature: prev.temperature + (Math.random() - 0.5),
          humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 2)),
          windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5)),
        }));
      } catch (error) {
        console.error('Hava durumu verileri alınamadı:', error);
      }
    };

    const interval = setInterval(fetchWeatherData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6 shadow-xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50">
              Teknofest Çevre İzleme Sistemi
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTeam(true)}
              className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <Users className="h-5 w-5" />
              <span>Takım</span>
            </button>
            <button
              onClick={() => setShowProject(true)}
              className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <FileText className="h-5 w-5" />
              <span>Proje</span>
            </button>
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/80">Canlı İzleme</span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4">
        <Dashboard
          environmentalData={environmentalData}
          weatherData={weatherData}
          temperatureHistory={temperatureHistory}
          humidityHistory={humidityHistory}
          airQualityHistory={airQualityHistory}
        />
      </main>

      {showTeam && <TeamSection onClose={() => setShowTeam(false)} />}
      {showProject && <ProjectInfo onClose={() => setShowProject(false)} />}
    </div>
  );
}

export default App;