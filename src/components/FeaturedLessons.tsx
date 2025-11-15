import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase, Lesson } from '../lib/supabase';
import LessonCard from './LessonCard';

export default function FeaturedLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedLessons();
  }, []);

  async function fetchFeaturedLessons() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          teacher:teachers(*)
        `)
        .order('views', { ascending: false })
        .limit(6);

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Популярные уроки
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Начните свой творческий путь с самых популярных и высоко оцененных уроков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <LessonCard lesson={lesson} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#catalog"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Посмотреть все уроки</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
