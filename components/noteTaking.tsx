import { useState, useEffect } from "react"
import { Note } from "@/types/User"
import axios from "axios"

export default function NoteTaking({ onClose }: { onClose?: () => void }) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [userId, setUserId] = useState<string | null>(null)
    const [note, setNote] = useState<Note>({
        id: '',
        title: '',
        content: ''
    })

    useEffect(() => {
        const fetchUserId = async () => {
            const res = await fetch('/api/auth/session')
            const data = await res.json()
            if (data.user?.id) {
                setUserId(data.user.id)
            }
        }
        fetchUserId()
    }, [])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!userId) {
            console.log('User not logged in')
            return
        }
        try {
            const response = await axios.post(`${apiURL}/api/users/${userId}/notes`, {
                title: note.title,
                content: note.content
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            setNote({ id: '', title: '', content: '' })
            onClose?.()
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <div className="fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Notes</h2>
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Note Title"
                            value={note.title}
                            onChange={(e) => setNote({ ...note, title: e.target.value })}
                            className="w-full px-3 py-2 text-lg font-medium text-gray-800 placeholder-gray-400 border-0 border-b border-gray-200 focus:outline-none focus:border-[#2d5016] transition"
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder="Write your notes here..."
                            rows={12}
                            value={note.content}
                            onChange={(e) => setNote({ ...note, content: e.target.value })}
                            className="w-full px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2d5016]/20 focus:border-[#2d5016] transition"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#2d5016] text-white py-2 px-4 rounded-lg hover:bg-[#3d6b20] transition font-medium"
                    >
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    )
}