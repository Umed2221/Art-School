import { ArrowRight, Sparkles, Users, Award } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInLeft">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Более 10,000 учеников уже с нами</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Научитесь рисовать
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                с нуля до профи
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Профессиональные уроки от практикующих художников. Учитесь в своем темпе,
              получайте обратную связь и создавайте шедевры.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Начать обучение</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-orange-300">
                Посмотреть уроки
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Учеников</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Уроков</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Рейтинг</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fadeInRight">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl animate-float">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Сертификат</div>
                  <div className="text-lg font-bold text-gray-900">После завершения</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl animate-float animation-delay-2000">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Активных</div>
                  <div className="text-lg font-bold text-gray-900">2,450+ сейчас</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
