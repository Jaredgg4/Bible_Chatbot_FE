"use client"
import { BookOpen, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
}

export default function Signup() {

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
    })
    const [avatar, setAvatar] = useState<File>();

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await axios.get(`${apiURL}/api/users`)
                setUsers(response.data.reverse())
                console.log(users)
            } catch(error){
                console.log(error)
            }     
        }
        fetchUsers();
    }, [])

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('username', newUser.username);
            formData.append('email', newUser.email);
            formData.append('password', newUser.password);
            if (avatar) {
                formData.append('avatar', avatar);
            }
            
            const response = await axios.post(`${apiURL}/api/users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setUsers([response.data, ...users])
            setNewUser({ id: "", username: '', email: '', password: '', avatar: ''})
            setAvatar(undefined)
        } catch(error){
            console.log(error)
        }
    }



    return (
        <div className="bg-gray-50">
            <header className="bg-[#2d5016] text-[#f5f3ed] px-2 py-2 shadow-md ">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5 -ml-40">
            <BookOpen size={28} />
            <h1 className="text-2xl font-serif">FaithAI</h1>
          </div>

          <button className="p-2 hover:bg-[#3d6b20] rounded-lg transition -mr-40">
            <Settings size={24} />
          </button>
        </div>
      </header>

        <div className="min-h-screen flex items-center justify-center">
            <section className="rounded-md bg-white">
                <div className="flex items-center justify-center ">
                    <div className="xl:mx-auto shadow-md xl:w-full xl:max-w-sm 2xl:max-w-md max-w-md w-full space-y-8 p-8">
                        <div className="mb-2"></div>
                        <h2 className="text-center text-2xl font-bold text-gray-900">
                            Sign up to create account
                        </h2>
                        <form className="mt-8 space-y-6" onSubmit={createUser}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="User Name"
                                            type="text"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            name="user_name"
                                            value={newUser.username}
                                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Email"
                                            type="email"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            name="email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            name="password"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {/* Profile Picture */}
                                    <div className="flex items-center justify-between mt-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Profile Picture
                                        </label>
                                    </div>
                                    <div className="file-input relative w-full group">
                                        <div
                                            className="relative z-40 file-input cursor-pointer group-hover:translate-x-8 group-hover:shadow-2xl group-hover:-translate-y-8 transition-all duration-500 bg-blue-600 flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
                                        >
                                            <input
                                                className="file-input absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                onChange={(e) => setAvatar(e.target.files?.[0])}
                                                name="avatar"
                                            />
                                            <svg
                                                className="h-6 w-6 text-white/60"
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                height="24"
                                                width="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                                <path d="M7 9l5 -5l5 5"></path>
                                                <path d="M12 4l0 12"></path>
                                            </svg>
                                        </div>
                                        <div
                                            className="absolute border opacity-0 group-hover:opacity-80 transition-all duration-300 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
                                        ></div>
                                    </div>
                                <div>
                                </div>
                                <div>
                                    <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                    <div className="text-center text-sm mt-4">
                                        <span className="text-gray-600">Already have an account? </span>
                                        <a href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                                            Sign In
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
}