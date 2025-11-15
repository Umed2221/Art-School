import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, Lesson } from '../lib/supabase';
import { ArrowLeft, Clock, Star, Users, Download, BookmarkPlus, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) fetchLesson();
  }, [id]);

  async function fetchLesson() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          teacher:teachers(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setLesson(data);

      if (data) {
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('lesson_id', id);
        setComments(commentsData || []);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          lesson_id: id,
          user_id: '00000000-0000-0000-0000-000000000000',
          content: newComment,
        });

      if (error) throw error;
      setNewComment('');
      await fetchLesson();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Урок не найден</h1>
            <a href="/" className="text-orange-600 hover:text-orange-700 font-medium">
              Вернуться на главную
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/" className="inline-flex items-center space-x-2 text-gray-700 hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </a>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative bg-gray-900 aspect-video overflow-hidden">
            {lesson.video_url ? (
              <iframe
                src={lesson.video_url.replace('watch?v=', 'embed/')}
                title={lesson.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <img
                src={lesson.thumbnail_url}
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="inline-flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-700">{lesson.duration} минут</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                    <span className="text-sm text-yellow-700">{lesson.rating}/5</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">{lesson.views} просмотров</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="p-3 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
                  <BookmarkPlus className="w-6 h-6" />
                </button>
                <button className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
              {lesson.teacher && (
                <>
                  <img
                    src={lesson.teacher.avatar_url}
                    alt={lesson.teacher.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{lesson.teacher.name}</h3>
                    <p className="text-sm text-gray-600">{lesson.teacher.specialization}</p>
                  </div>
                </>
              )}
            </div>

            <p className="text-lg text-gray-700 mb-8">{lesson.description}</p>

            {lesson.materials.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Download className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Необходимые материалы</h2>
                </div>
                <ul className="space-y-2">
                  {lesson.materials.map((material, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg mb-8 border border-orange-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Оцените этот урок</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="transform hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${userRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Комментарии ({comments.length})</h2>

              <div className="bg-orange-50 p-6 rounded-lg mb-6 border border-orange-200">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Напишите ваш комментарий..."
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                  rows={3}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-3 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Отправить комментарий
                </button>
              </div>

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-600">Комментариев нет. Будьте первым!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
