export interface Verse {
  id: string;
  orgId: string;
  bookId: string;
  chapterId: string;
  content: string;
  verseId: string;
  verse: string;
}

export interface BibleData {
  data?: {
    id?: string;
    bookId?: string;
    number?: string;
    content?: string;
    verses?: Verse[];
  };
}
