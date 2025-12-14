"use client";
import { ChevronLeft, ChevronRight, BookOpen, Settings, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BibleData } from '@/types/bible';
import BookGrid from '@/components/bookGrid';
import { User } from '@/types/User';
import LogoutButton from '@/components/logoutButton';

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

  const verses = bibleData?.data?.verses || [];
  const chapterContent = bibleData?.data?.content || '';

  const handleBookSelect = (bookId: string) => {
    fetchChapter(bookId, 1); // Start at chapter 1 when selecting a new book
  };

  return (
    <div className="">

      <header className="bg-[#2d5016] text-[#f5f3ed] px-2 py-2 shadow-md ">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5 -ml-40">
            <BookOpen size={28} />
            <h1 className="text-2xl font-serif">FaithAI</h1>
          </div>

          <div className="flex items-center gap-5 -mr-60">
            <BookGrid onBookSelect={handleBookSelect}/>
          </div>

          <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition -mr-40">
            <Settings size={24} />
          </button>

          {user ? (
            <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition -mr-40" onClick={() => setDropDown(!dropDown)}>
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
            <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition -mr-40">
              <a href="/signin">Sign In</a>
            </button>
          )}

          {dropDown && (
            <div className="absolute right-0 mt-20 w-48 bg-white rounded-lg shadow-lg">
              <LogoutButton />
            </div>
          )}
        </div>
      </header>

      <div className="bg-white border-b border-[#2d5016]/10 px-6 py-3">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <button 
                  onClick={() => fetchChapter(book, chapter - 1)}
                  disabled={chapter <= 1}
                  className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Previous</span>
                </button>
                
                <div className="text-center">
                  <h2 className="text-xl font-serif text-[#2d5016] font-semibold">
                    {bibleData?.data?.bookId || book} {bibleData?.data?.number || chapter}
                  </h2>
                </div>
                
                <button 
                  onClick={() => fetchChapter(book, chapter + 1)}
                  className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
      </div>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <article className="space-y-4 text-[#1a1a1a]" style={{ fontSize: `${fontSize}px` }}>
            {verses.length > 0 ? (
              verses.map((verse) => (
                <div key={verse.id} className="flex gap-3">
                  <span className="font-bold text-[#2d5016] min-w-8">{verse.verse}</span>
                  <p className="leading-relaxed">{verse.content}</p>
                </div>
              ))
            ) : chapterContent ? (
              <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
            ) : (
              <p className="text-[#2d5016]/60 text-center">Loading...</p>
            )}
          </article>
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
          
          <div className="text-sm text-[#2d5016]/60">
            {verses.length > 0 ? `${verses.length} verses` : 'Loading...'}
          </div>
        </div>
      </footer>

    </div>
  );
}

