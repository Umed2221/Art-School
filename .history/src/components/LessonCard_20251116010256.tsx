import { Clock, Star, Eye, BookmarkPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../lib/supabase';

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const navigate = useNavigate();
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Начинающий';
      case 'intermediate':
        return 'Средний';
      case 'advanced':
        return 'Продвинутый';
      default:
        return level;
    }
  };

  return (
    <div
      onClick={() => navigate(`/lesson/${lesson.id}`)}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={lesson.thumbnail_url}
          alt={lesson.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
         onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Music+Lesson')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-orange-600 hover:text-white">
          <BookmarkPlus className="w-5 h-5" />
        </button>

        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(lesson.level)}`}>
          {getLevelText(lesson.level)}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center space-x-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{lesson.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{lesson.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
            {lesson.technique}
          </span>
          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration} мин</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
          {lesson.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {lesson.description}
        </p>

        {lesson.teacher && (
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
            <img
              src={lesson.teacher.avatar_url}
              alt={lesson.teacher.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-100"onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Music+Lesson')}
            />
            <span className="text-sm text-gray-700 font-medium">{lesson.teacher.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
