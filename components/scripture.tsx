import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import BookGrid from "./bookGrid";

interface ParsedVerse {
  number: string;
  content: string;
}

export default function Scripture() {
    const [book, setBook] = useState('GEN');
    const [chapterNum, setChapterNum] = useState<number>(1);
    const [verses, setVerses] = useState<ParsedVerse[]>([]);
    const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(new Set());

    const parseVersesFromHtml = (html: string): ParsedVerse[] => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const verseSpans = doc.querySelectorAll('span.v[data-number]');
      const parsedVerses: ParsedVerse[] = [];

      verseSpans.forEach((span) => {
        const number = span.getAttribute('data-number') || '';
        let content = '';
        let node = span.nextSibling;
        
        while (node && !(node instanceof Element && node.classList?.contains('v'))) {
          if (node.nodeType === Node.TEXT_NODE) {
            content += node.textContent;
          } else if (node instanceof Element) {
            content += node.textContent;
          }
          node = node.nextSibling;
        }
        
        parsedVerses.push({ number, content: content.trim() });
      });

      return parsedVerses;
    };

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
          console.log('Chapter API Response: ', data)
          const htmlContent = data.response?.data?.content || '';
          const parsedVerses = parseVersesFromHtml(htmlContent);
          console.log('Parsed verses: ', parsedVerses);
          setVerses(parsedVerses);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }

    const toggleHighlight = (verseNum: string) => {
      setHighlightedVerses(prev => {
        const newSet = new Set(prev);
        if (newSet.has(verseNum)) {
          newSet.delete(verseNum);
        } else {
          newSet.add(verseNum);
        }
        return newSet;
      });
    };

  useEffect(() => {
    fetchChapter(book, chapterNum);
  }, []);

  const handleBookSelect = (bookId: string) => {
    fetchChapter(bookId, chapterNum);
    setBook(bookId);
  };
    
    return (
      <div>

        <div className="flex items-center gap-2 md:gap-5 flex-1 justify-center max-w-md">
            <BookGrid onBookSelect={handleBookSelect}/>
         </div>

      <div className="bg-white border-b border-[#2d5016]/10 px-6 py-3">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <button 
                  onClick={() => [fetchChapter(book, chapterNum - 1), setChapterNum(chapterNum - 1)]}
                  disabled={chapterNum <= 1}
                  className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Previous</span>
                </button>
                
                <div className="text-center">
                  <h2 className="text-xl font-serif text-[#2d5016] font-semibold">
                    {book} {chapterNum}
                  </h2>
                </div>
                
                <button 
                  onClick={() => [fetchChapter(book, chapterNum + 1), setChapterNum(chapterNum + 1)]}
                  className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
      </div>


       <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <article className="space-y-4 text-[#1a1a1a]" style={{ fontSize: `18px` }}>
            {verses.length > 0 ? (
              verses.map((verse) => (
                <p
                  key={verse.number}
                  onClick={() => toggleHighlight(verse.number)}
                  className={`leading-relaxed cursor-pointer rounded px-2 py-1 transition-colors ${
                    highlightedVerses.has(verse.number)
                      ? 'bg-yellow-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold text-[#2d5016] mr-2">{verse.number}</span>
                  {verse.content}
                </p>
              ))
            ) : (
              <p className="text-[#2d5016]/60 text-center">Loading...</p>
            )}
          </article>
        </div>
      </main>

      </div>
    )
}