import React from 'react';
import { X, Github, Linkedin, Mail } from 'lucide-react';

interface TeamSectionProps {
  onClose: () => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({ onClose }) => {
  const teamMembers = [
    {
      name: 'Bahattin',
      role: 'Danışman',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'bahattin@example.com'
    },
    {
      name: 'Ömer',
      role: 'Yazılım ve Düzen',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'omer@example.com'
    },
    {
      name: 'Yiğit',
      role: 'Tasarım ve Düzen',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'yigit@example.com'
    },
    {
      name: 'Alperen',
      role: 'Ses ve Müzik',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'alperen@example.com'
    },
    {
      name: 'Eymen',
      role: 'Yazılım ve Düzen',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'eymen@example.com'
    },
    {
      name: 'Bilal',
      role: 'Yazılım ve Düzen',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'bilal@example.com'
    },
    {
      name: 'Zeynep',
      role: 'Yazılım ve Düzen',
      image: '',
      github: '#',
      linkedin: '#',
      email: 'zeynep@example.com'
    },
    {
      name: 'okbi',
      role: 'Yazılım ve yapay zeka',
      image: '',
      github: 'm',
      linkedin: '#',
      email: 'muhammedalokbi207@gamil.com'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 max-w-6xl w-full mx-4 border border-white/10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Takım Üyeleri</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={member.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-blue-500/50"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <a
                  href={member.github}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={member.linkedin}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;