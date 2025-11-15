import { useEffect, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, Lesson } from '../lib/supabase';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchLessons();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  async function searchLessons() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          teacher:teachers(*)
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start pt-20">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
          <div className="flex items-center border-b border-gray-200 p-4">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск уроков, техник, категорий..."
              className="flex-1 ml-4 text-lg outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="p-8 text-center text-gray-600">
                <div className="animate-spin inline-block w-6 h-6 border-3 border-orange-200 border-t-orange-600 rounded-full" />
              </div>
            )}

            {!loading && results.length === 0 && query && (
              <div className="p-8 text-center text-gray-600">
                <p>Уроки не найдены по запросу "{query}"</p>
              </div>
            )}

            {!loading && results.length === 0 && !query && (
              <div className="p-8 text-center text-gray-600">
                <p>Начните печатать для поиска уроков</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="divide-y divide-gray-200">
                {results.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      navigate(`/lesson/${lesson.id}`);
                      onClose();
                    }}
                    className="w-full text-left p-4 hover:bg-orange-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {lesson.technique}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {lesson.duration} мин
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors ml-4" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
