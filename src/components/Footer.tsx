import { Palette, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-2 rounded-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Художественная Школа</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Обучаем искусству рисования с 2015 года. Более 10 000 выпускников по всему миру.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Обучение</h3>
            <ul className="space-y-2">
              <li>
                <a href="#catalog" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Каталог уроков
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Курсы и подписки
                </a>
              </li>
              <li>
                <a href="#teachers" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Наши преподаватели
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Сертификаты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Ресурсы</h3>
            <ul className="space-y-2">
              <li>
                <a href="#materials" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Материалы и советы
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  Сообщество
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>info@artschool.ru</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Москва, ул. Художников, д. 10</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Художественная Школа. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
