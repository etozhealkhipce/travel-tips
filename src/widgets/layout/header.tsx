"use client";

import { useState, useEffect } from "react";
import { useUnit } from "effector-react";
import { Search, Menu, User, LogOut } from "lucide-react";
import { $$authModel } from "@/shared/store/user";
import { LangSwitcher } from "~/entities/lang-switcher";
import { cn } from "@/shared/lib/utils";

export const LayoutHeader = () => {
  const [isAuthorized, logout] = useUnit([
    $$authModel.$isAuthorized,
    $$authModel.logout,
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-all duration-300",
          scrolled ? "shadow-sm border-b border-gray-200" : "border-b border-transparent"
        )}
      >
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Travel Tips style - Sky blue color */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0 no-underline hover:opacity-100">
              <svg 
                viewBox="0 0 32 32" 
                className="h-8 w-8 text-sky-500"
                fill="currentColor"
              >
                <path d="M16 1C7.716 1 1 7.716 1 16s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 28C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13z"/>
                <path d="M16 8c-2.5 0-4.5 1.5-5.5 3.5C9.5 13.5 9 16 9 18c0 3 2 6 7 9 5-3 7-6 7-9 0-2-.5-4.5-1.5-6.5C20.5 9.5 18.5 8 16 8zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
              <span className="hidden md:block text-sky-500 text-xl font-bold tracking-tight">
                TravelTips
              </span>
            </a>

            {/* Center: Search for places */}
            <div className="hidden md:flex flex-1 justify-center px-8">
              <div 
                className={cn(
                  "flex items-center bg-white border rounded-full shadow-sm transition-all duration-300",
                  searchFocused 
                    ? "border-gray-400 shadow-md" 
                    : "border-gray-300 hover:shadow-md"
                )}
              >
                <button 
                  type="button"
                  className="px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Город или страна
                </button>
                <div className="w-px h-6 bg-gray-300" />
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Куда хотите поехать?"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full px-4 py-3 text-sm bg-transparent outline-none placeholder:text-gray-500"
                  />
                </div>
                <button 
                  type="button"
                  className="m-1.5 p-2.5 bg-sky-500 hover:bg-sky-600 rounded-full transition-colors"
                >
                  <Search className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Mobile search button */}
            <button
              type="button"
              className="md:hidden flex items-center gap-3 flex-1 mx-4 pl-4 pr-3 py-2.5 rounded-full
                         border border-gray-300 shadow-sm hover:shadow-md transition-all"
            >
              <Search className="h-5 w-5 text-gray-800 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-sm font-semibold text-gray-800 leading-tight">
                  Поиск мест
                </div>
                <div className="text-xs text-gray-500">
                  Город или страна
                </div>
              </div>
            </button>

            {/* Right: User Menu */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="hidden md:block">
                <LangSwitcher />
              </div>

              {/* User Menu Button - Compact Airbnb style */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={cn(
                    "flex items-center gap-2",
                    "pl-3 pr-1.5 py-1.5 rounded-full",
                    "border border-gray-300",
                    "hover:shadow-md transition-all duration-200",
                    "cursor-pointer bg-white"
                  )}
                >
                  <Menu className="h-4 w-4 text-gray-600" />
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-scale-in">
                      {!isAuthorized ? (
                        <>
                          <a
                            href="/login"
                            className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 no-underline hover:opacity-100"
                          >
                            Войти
                          </a>
                          <a
                            href="/login"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 no-underline hover:opacity-100"
                          >
                            Зарегистрироваться
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href="/map"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 no-underline hover:opacity-100"
                          >
                            Избранные места
                          </a>
                          <a
                            href="/map"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 no-underline hover:opacity-100"
                          >
                            Мои маршруты
                          </a>
                        </>
                      )}
                      <div className="border-t border-gray-100 my-1" />
                      <a
                        href="/map"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 no-underline hover:opacity-100"
                      >
                        Карта мест
                      </a>

                      <a
                        href="/map"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 no-underline hover:opacity-100"
                      >
                        Помощь
                      </a>
                      <div className="md:hidden border-t border-gray-100 my-1">
                        <div className="px-4 py-2">
                          <LangSwitcher />
                        </div>
                      </div>
                      {isAuthorized && (
                        <>
                          <div className="border-t border-gray-100 my-1" />
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Выйти
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
