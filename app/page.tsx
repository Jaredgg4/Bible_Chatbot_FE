"use client";
import { ChevronLeft, ChevronRight, BookOpen, Settings, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BibleData } from '@/types/bible';
import BookGrid from '@/components/bookGrid';
import { User } from '@/types/User';
import LogoutButton from '@/components/logoutButton';
import Scripture from '@/components/scripture';

export default function Home() {
  const [fontSize, setFontSize] = useState(18);
  const [bibleData, setBibleData] = useState<BibleData | null>(null);
  const [book, setBook] = useState('GEN');
  const [chapter, setChapter] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [dropDown, setDropDown] = useState(false);

  const fetchChapter = (bookId: string, chapterNum: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/bibles?book=${bookId}&chapter=${chapterNum}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setBibleData(data.response || data);
        setBook(bookId);
        setChapter(chapterNum);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        console.error('Failed to fetch:', bookId, chapterNum);
      });
  };

  const fetchUser = (userId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('[FETCH USER] API Response:', data);
        const userData = data.user || data.response || data;
        console.log('[FETCH USER] User data:', {
          id: userData?.id,
          username: userData?.username,
          email: userData?.email,
          hasAvatar: !!userData?.avatar,
          avatarPreview: userData?.avatar ? userData.avatar.substring(0, 50) + '...' : 'none'
        });
        setUser(userData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        console.error('Failed to fetch:', userId);
      });
  };

  useEffect(() => {
    fetchChapter(book, chapter);
  }, []);

  useEffect(() => {
  const loadUser = async () => {
    const res = await fetch('/api/auth/session');
    const data = await res.json();
    if (data.user?.id) {
      fetchUser(data.user.id);
    }
  };
  loadUser();
}, []);

  return (
    <div className="">

      <header className="bg-[#2d5016] text-[#f5f3ed] px-4 md:px-8 py-2 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-2 md:gap-4">
            <BookOpen size={24} className="md:w-7 md:h-7 shrink-0" />
            <h1 className="text-lg md:text-2xl font-serif whitespace-nowrap">FaithAI</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="flex items-center gap-2 p-2 hover:bg-[#3d6b20] rounded-lg transition">
              <Settings size={20} className="md:w-6 md:h-6" />
            </button>

            {user ? (
              <button className="flex items-center gap-2 p-2 hover:bg-[#3d6b20] rounded-lg transition" onClick={() => setDropDown(!dropDown)}>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        console.error('[AVATAR] Failed to load avatar image');
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => console.log('[AVATAR] Avatar loaded successfully')}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
              </button>
            ) : (
              <button className="flex items-center gap-2 p-2 hover:bg-[#3d6b20] rounded-lg transition">
                <a href="/signin">Sign In</a>
              </button>
            )}
          </div>

          {dropDown && (
            <div className="absolute right-0 mt-20 w-48 bg-white rounded-lg shadow-lg">
              <LogoutButton />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Scripture/>
        </div>
      </main>

      <footer className="bg-white border-t border-[#2d5016]/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#2d5016]/60">Text Size:</span>
            <button 
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              className="px-3 py-1 bg-[#2d5016] text-[#f5f3ed] rounded hover:bg-[#3d6b20] transition"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="px-3 py-1 bg-[#2d5016] text-[#f5f3ed] rounded hover:bg-[#3d6b20] transition"
            >
              A+
            </button>
          </div>
        </div>
      </footer>

    </div>
    
  );
}

