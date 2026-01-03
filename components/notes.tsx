

import { useState } from "react";
import NoteTaking from "./noteTaking";

export default function Notes(){

    const [showNotes, setShowNotes] = useState(false);
    return(
        <>
        <button onClick={() => setShowNotes(!showNotes)} className="flex items-center gap-2 text-[#f5f3ed] px-2 py-1 ml-10 rounded-lg border-2 border-[#2d5016] shadow-lg hover:bg-[#2d5016] hover:text-[#f5f3ed] transition">
            <h1 className="text-black text-xs">Notes</h1>
        </button>
        {showNotes && <NoteTaking onClose={() => setShowNotes(false)} />}
        </>
    )
}