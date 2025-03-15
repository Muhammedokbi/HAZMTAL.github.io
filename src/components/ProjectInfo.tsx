import React from 'react';
import { X, Plane, Award, Target, Cpu } from 'lucide-react';

interface ProjectInfoProps {
  onClose: () => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4 border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Proje Hakkında</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Amaç</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Teknofest 2024 kapsamında geliştirilen bu proje, Zonguldak şehir merkezinde hava kalitesi ölçümü ve çevre izleme sistemini gerçekleştirmeyi amaçlamaktadır. İnsansız hava araçları kullanarak atmosferdeki hava kalitesini, sıcaklık değişimlerini ve nem oranlarını gerçek zamanlı olarak takip ediyoruz.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="h-6 w-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">Teknoloji</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-white font-medium">Donanım</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Özel tasarım İHA platformu</li>
                  <li>Hava kalitesi sensörleri (PM2.5, CO2, VOC)</li>
                  <li>GPS modülü</li>
                  <li>Telemetri sistemi</li>
                  <li>Yüksek hassasiyetli sıcaklık ve nem sensörleri</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-medium">Yazılım</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>React ile gerçek zamanlı veri görselleştirme</li>
                  <li>Yapay zeka destekli veri analizi</li>
                  <li>Otonom uçuş kontrolü</li>
                  <li>Bulut tabanlı veri depolama ve işleme</li>
                  <li>Mobil uygulama entegrasyonu</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">Hedefler</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                <p>Zonguldak şehir merkezinde detaylı hava kalitesi haritası oluşturmak</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                <p>Endüstriyel bölgelerdeki hava kirliliğini sürekli izlemek</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                <p>Toplanan verileri halka açık bir platform üzerinden paylaşmak</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                <p>Teknofest 2024'te başarılı bir sunum gerçekleştirmek</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;