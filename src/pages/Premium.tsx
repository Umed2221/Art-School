import { Check, Star, Zap, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Premium() {
  const plans = [
    {
      name: 'Базовый',
      price: 'Бесплатно',
      description: 'Для начинающих',
      color: 'from-blue-600 to-blue-700',
      features: [
        'Доступ к избранным урокам',
        'Просмотр HD видео',
        'Комментарии',
        'Базовые фильтры',
      ],
      cta: 'Начать',
    },
    {
      name: 'Премиум',
      price: '299₽',
      priceDesc: '/месяц',
      description: 'Все уроки и возможности',
      color: 'from-orange-600 to-amber-600',
      badge: 'Популярный',
      features: [
        'Все уроки без ограничений',
        'Видео 4K качество',
        'Скачивание материалов',
        'Оффлайн просмотр',
        'Обратная связь от учителей',
        'Сертификаты',
        'Приоритет в поддержке',
      ],
      cta: 'Подписаться',
      highlighted: true,
    },
    {
      name: 'Профессиональный',
      price: '699₽',
      priceDesc: '/месяц',
      description: 'Продвинутые инструменты',
      color: 'from-purple-600 to-pink-600',
      features: [
        'Все из Премиум',
        'Индивидуальные уроки',
        'Портфолио на платформе',
        'Монетизация контента',
        'Экспорт сертификатов',
        'VIP поддержка 24/7',
        'Доступ к закрытому сообществу',
      ],
      cta: 'Выбрать',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Выберите идеальный план
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Получите доступ к тысячам уроков от профессиональных художников
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-500 animate-fadeInUp ${
                plan.highlighted
                  ? 'md:scale-105 bg-gradient-to-br ' + plan.color + ' shadow-2xl text-white'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 ${!plan.highlighted && 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${!plan.highlighted && 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  {plan.priceDesc && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.priceDesc}
                    </span>
                  )}
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-lg font-semibold mb-8 transform hover:scale-105 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-orange-600 hover:bg-gray-50'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-white' : 'text-orange-600'
                      }`} />
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Качественный контент</h3>
              <p className="text-gray-600">Все уроки созданы профессиональными художниками</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Постоянное обновление</h3>
              <p className="text-gray-600">Новые уроки добавляются каждую неделю</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Сертификаты</h3>
              <p className="text-gray-600">Получайте признанные сертификаты</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-left">
              <h4 className="font-bold text-gray-900 mb-2">Можно ли отменить подписку?</h4>
              <p className="text-gray-600 text-sm">Да, вы можете отменить подписку в любое время без штрафных санкций.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-left">
              <h4 className="font-bold text-gray-900 mb-2">Есть ли пробный период?</h4>
              <p className="text-gray-600 text-sm">Да, 7 дней бесплатного доступа ко всем премиум функциям.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-left">
              <h4 className="font-bold text-gray-900 mb-2">Какие методы оплаты?</h4>
              <p className="text-gray-600 text-sm">Карты, электронные кошельки, переводы банка и криптовалюта.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-left">
              <h4 className="font-bold text-gray-900 mb-2">Возврат гарантирован?</h4>
              <p className="text-gray-600 text-sm">100% возврат денег за первые 30 дней, если не满довлены.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
