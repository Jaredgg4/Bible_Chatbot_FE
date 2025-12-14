import { useEffect, useState } from "react";
import { bookResponse } from "../types/bible";

export default function BookGrid({ onBookSelect }: { onBookSelect: (bookId: string) => void }) {
    const [books, setBooks] = useState<bookResponse>();
    const [drop, setDrop] = useState(false);

    const fetchBibles = () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        fetch(`${apiUrl}/api/books`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                setBooks(data.response || data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });   
    }

    useEffect(() => {
        fetchBibles();
    }, []);

    const book = books?.data;
    console.log(book);
    
    return (
        <div>
            <button className="font-serif" onClick={() => setDrop(!drop)}>Books</button>

            {drop && (
                <div className="absolute columns-3 border-2 border-[#2d5016] rounded-b-3xl bg-white">
                    {books?.data?.map((book) => (
                        <p 
                key={book.id} 
                className="text-black p-2.5 hover:bg-[#2d5016] hover:text-[#f5f3ed] transition cursor-pointer"
                onClick={() => {
                onBookSelect(book.id || book.abbreviation || '');
                setDrop(false); // Close dropdown after selection
                }}
            >
                {book.name}
            </p>
                    ))}
                </div>
            )}
        </div>
    );
}