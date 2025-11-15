import { useEffect, useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { supabase, Lesson } from '../lib/supabase';
import LessonCard from './LessonCard';

export default function LessonCatalog() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedTechnique, setSelectedTechnique] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    filterLessons();
  }, [lessons, searchQuery, selectedLevel, selectedTechnique, selectedCategory]);

  async function fetchLessons() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          teacher:teachers(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterLessons() {
    let filtered = [...lessons];

    if (searchQuery) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter((lesson) => lesson.level === selectedLevel);
    }

    if (selectedTechnique !== 'all') {
      filtered = filtered.filter((lesson) => lesson.technique === selectedTechnique);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((lesson) => lesson.category === selectedCategory);
    }

    setFilteredLessons(filtered);
  }

  const techniques = [...new Set(lessons.map((l) => l.technique))];
  const categories = [...new Set(lessons.map((l) => l.category))];

  if (loading) {
    return (
      <section id="catalog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mb-8" />
            <div className="h-64 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 animate-fadeIn">
          Каталог уроков
        </h2>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск уроков..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-colors duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>Фильтры</span>
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden md:block'} bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-slideDown`}>
            <div className="flex items-center space-x-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Фильтры</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Уровень
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                >
                  <option value="all">Все уровни</option>
                  <option value="beginner">Начинающий</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Техника
                </label>
                <select
                  value={selectedTechnique}
                  onChange={(e) => setSelectedTechnique(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                >
                  <option value="all">Все техники</option>
                  {techniques.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                >
                  <option value="all">Все категории</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Найдено уроков: <span className="font-semibold text-orange-600">{filteredLessons.length}</span>
          </p>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Уроки не найдены. Попробуйте изменить фильтры.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
