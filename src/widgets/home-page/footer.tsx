"use client";

import { Globe } from "lucide-react";

const FOOTER_SECTIONS = [
  {
    title: "О TravelTips",
    links: [
      "Как это работает",
      "О нас",
      "Блог путешественников",
      "Новости",
      "Карьера",
      "Инвесторы",
    ],
  },
  {
    title: "Исследуйте",
    links: [
      "Популярные направления",
      "Скрытые жемчужины",
      "Маршруты для путешествий",
      "Советы путешественникам",
      "Локальные гиды",
      "Впечатления",
    ],
  },
  {
    title: "Сообщество",
    links: [
      "Стать гидом",
      "Отзывы",
      "Форум путешественников",
      "Помощь сообществу",
      "Экологичный туризм",
    ],
  },
  {
    title: "Поддержка",
    links: [
      "Центр помощи",
      "Безопасность путешествий",
      "Проблемы с местом",
      "Сообщить о проблеме",
      "Условия использования",
      "Конфиденциальность",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${index}`}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:underline no-underline hover:opacity-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Copyright and Links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <span>© 2026 TravelTips, Inc.</span>
              <span className="hidden sm:inline">·</span>
              <a href="#" className="hover:underline no-underline hover:opacity-100">Конфиденциальность</a>
              <span className="hidden sm:inline">·</span>
              <a href="#" className="hover:underline no-underline hover:opacity-100">Условия</a>
              <span className="hidden sm:inline">·</span>
              <a href="#" className="hover:underline no-underline hover:opacity-100">Карта сайта</a>
            </div>

            {/* Right: Just Globe icon */}
            <div className="flex items-center gap-6">
              <button 
                type="button"
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
