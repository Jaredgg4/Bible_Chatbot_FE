

"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Settings } from 'lucide-react';

export default function BibleReader() {
  const [fontSize, setFontSize] = useState(18);
  
  return (
    <div className="min-h-screen min-w-screen bg-[#f5f3ed] flex flex-col">
      {/* Header */}
      <header className="bg-[#2d5016] text-[#f5f3ed] px-6 py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={28} />
            <h1 className="text-2xl font-serif">Holy Bible</h1>
          </div>
          <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition">
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Chapter Navigation */}
      <div className="bg-white border-b border-[#2d5016]/10 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition">
            <ChevronLeft size={20} />
            <span className="font-medium">John 2</span>
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-serif text-[#2d5016] font-semibold">John 3</h2>
            <p className="text-sm text-[#2d5016]/60">New Testament</p>
          </div>
          
          <button className="flex items-center gap-2 text-[#2d5016] hover:text-[#3d6b20] transition">
            <span className="font-medium">John 4</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <article className="space-y-6 text-[#1a1a1a]" style={{ fontSize: `${fontSize}px` }}>
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">1</span>
              Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council.
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">2</span>
              He came to Jesus at night and said, &quot;Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">3</span>
              Jesus replied, &quot;Very truly I tell you, no one can see the kingdom of God unless they are born again.&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">4</span>
              &quot;How can someone be born when they are old?&quot; Nicodemus asked. &quot;Surely they cannot enter a second time into their mother&apos;s womb to be born!&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">5</span>
              Jesus answered, &quot;Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">6</span>
              &quot;Flesh gives birth to flesh, but the Spirit gives birth to spirit.&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">7</span>
              &quot;You should not be surprised at my saying, &apos;You must be born again.&apos;&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">8</span>
              &quot;The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit.&quot;
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">9</span>
              &quot;How can this be?&quot; Nicodemus asked.
            </p>
            
            <p className="leading-relaxed">
              <span className="font-semibold text-[#2d5016] mr-2">10</span>
              &quot;You are Israel&apos;s teacher,&quot; said Jesus, &quot;and do you not understand these things?&quot;
            </p>
          </article>
        </div>
      </main>

      {/* Footer Controls */}
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
            Verse 1 of 36
          </div>
        </div>
      </footer>
    </div>
  );
}