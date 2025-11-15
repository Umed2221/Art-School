import { Palette, Paintbrush, Pen, Tablet } from 'lucide-react';

export default function Materials() {
  const materials = [
    {
      icon: Pen,
      title: 'Карандаши и бумага',
      description: 'Выбор правильных карандашей и бумаги для академического рисунка. Твердость грифеля, текстура бумаги и их влияние на результат.',
      color: 'from-gray-600 to-gray-800',
    },
    {
      icon: Paintbrush,
      title: 'Акварельные краски',
      description: 'Все о выборе акварели: студенческая vs профессиональная, кюветы и тюбики, лучшие бренды и палитры для начинающих.',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      icon: Palette,
      title: 'Масляные краски',
      description: 'Основы работы с маслом: выбор красок, холстов, кистей и растворителей. Техники смешивания и нанесения.',
      color: 'from-amber-600 to-orange-700',
    },
    {
      icon: Tablet,
      title: 'Цифровое рисование',
      description: 'Графические планшеты, стилусы и программное обеспечение. Сравнение популярных моделей и настройка рабочего пространства.',
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section id="materials" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Материалы и советы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Полезные гайды по выбору художественных материалов для вашего творчества
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 bg-gradient-to-br ${material.color} p-4 rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {material.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {material.description}
                      </p>
                      <button className="text-orange-600 font-medium hover:text-orange-700 flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300">
                        <span>Читать далее</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`h-1 bg-gradient-to-r ${material.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 md:p-12 text-white shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Скачайте полный гид по материалам
              </h3>
              <p className="text-orange-50 leading-relaxed mb-6">
                Подробное руководство с рекомендациями по выбору материалов для каждой техники рисования.
                Включает списки покупок для начинающих и продвинутых художников.
              </p>
              <button className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Скачать PDF
              </button>
            </div>

            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Art Materials"
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
