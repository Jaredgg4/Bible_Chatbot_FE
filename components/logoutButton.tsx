import { logout } from "@/lib/actions/auth";

export default function LogoutButton() {
    return (
        <div className="p-2 hover:bg-[#3d6b20] rounded-lg transition">
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}