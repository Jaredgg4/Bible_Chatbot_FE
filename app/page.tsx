"use client";
import { ChevronLeft, ChevronRight, BookOpen, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BibleData } from '@/types/bible';

export default function Home() {
  const [fontSize, setFontSize] = useState(18);
  const [bibleData, setBibleData] = useState<BibleData | null>(null);
  const [book, setBook] = useState('GEN');
  const [chapter, setChapter] = useState(1);

  const fetchChapter = (bookId: string, chapterNum: number) => {
    fetch(`http://127.0.0.1:5000/api/bibles?book=${bookId}&chapter=${chapterNum}`)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        setBibleData(data.response || data);
        setBook(bookId);
        setChapter(chapterNum);
      })
      .catch(error => console.error('Fetch error:', error));
  };

  useEffect(() => {
    fetchChapter(book, chapter);
  }, []);

  const verses = bibleData?.data?.verses || [];
  const chapterContent = bibleData?.data?.content || '';

  return (
    <div className="">

      <header className="bg-[#2d5016] text-[#f5f3ed] px-2 py-2 shadow-md ">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5 -ml-40">
            <BookOpen size={28} />
            <h1 className="text-2xl font-serif">Holy Bible</h1>
          </div>

          <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition -mr-40">
            <Settings size={24} />
          </button>
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
                  <p className="text-sm text-[#2d5016]/60">{bibleData?.data?.id || 'Loading...'}</p>
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
