"use client"
import { BookOpen, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export default function Signup() {

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: '',
        username: '',
        email: '',
        password: ''
    })

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
            const response = await axios.post(`${apiURL}/api/users`, newUser)
            setUsers([response.data, ...users])
            setNewUser({ id: "", username: '', email: '', password: ''})
        } catch(error){
            console.log(error)
        }
    }



    return (
        <div>
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

        <div className="">
            <section className="rounded-md p-2 bg-white">
                <div className="flex items-center justify-center my-3">
                    <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2"></div>
                        <h2 className="text-2xl font-bold leading-tight">
                            Sign up to create account
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account? Sign In
                        </p>
                        <form className="mt-5" onSubmit={createUser}>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="User Name"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="user_name"
                                            value={newUser.username}
                                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Email"
                                            type="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="password"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                </div>
                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

        <div>
            {users.map((users) => (
                <div key={users.id}>
                    <p>{users.username}</p>
                    <p>{users.email}</p>
                    <p>{users.password}</p>
                </div>
            ))}
        </div>
    </div>
    )
}