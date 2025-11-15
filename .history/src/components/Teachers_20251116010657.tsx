import { useEffect, useState } from 'react';
import { Award, BookOpen } from 'lucide-react';
import { supabase, Teacher } from '../lib/supabase';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="teachers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Наши преподаватели
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Профессиональные художники с многолетним опытом преподавания
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={teacher.avatar_url}
                  alt={teacher.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Посмотреть уроки</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {teacher.name}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">
                    {teacher.specialization}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {teacher.bio}
                </p>

                <button className="mt-4 w-full px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-all duration-300">
                  Узнать больше
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
