import { Menu, X, Palette, Search, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
              Художественная Школа
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium"
            >
              Главная
            </button>
            <a href="#catalog" className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium">
              Уроки
            </a>
            <a href="#teachers" className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium">
              Преподаватели
            </a>
            <a href="#materials" className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium">
              Материалы
            </a>
            <button
              onClick={() => navigate('/premium')}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium"
            >
              Премиум
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выход</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                >
                  Войти
                </button>
                <button
                  onClick={() => navigate('/premium')}
                  className="px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                >
                  Начать обучение
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slideDown">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-left"
            >
              Главная
            </button>
            <a href="#catalog" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Уроки
            </a>
            <a href="#teachers" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Преподаватели
            </a>
            <a href="#materials" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Материалы
            </a>
            <button
              onClick={() => {
                navigate('/premium');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-left"
            >
              Премиум
            </button>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <p className="text-sm text-gray-700">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Выход</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors text-left"
                  >
                    Войти
                  </button>
                  <button
                    onClick={() => {
                      navigate('/premium');
                      setIsMenuOpen(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-colors shadow-md font-medium"
                  >
                    Начать обучение
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
