/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from 'react'
import { TodoProvider } from '@/Context/Todo'
import InputTodo from '@/components/InputTodo';
import Todo from '@/components/Todo';
import { SidebarDrawer } from '@/components/SidebarDrawer';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Loader } from '@/components/Chat_ai';

const Page = () => {

  const router = useRouter();

  const {status, data} = useSession();

  const [todos, setTodos] = useState<{ id: number; todo: string; complete: boolean; }[]>([]);
  const addTodo = async (todo : string) => {
    setTodos(prev => [
      {
        id: Date.now(),
        todo: todo,
        complete: false,
      },
      ...prev
    ])
    await axios.post("/api/todos", {todos: todos})
  }

  const deleteTodo = async (id: number) => {
    setTodos(prev => prev.filter(thisTodo => thisTodo.id !== id))
    await axios.post("/api/todos", {todos: todos})
  }
  const updateTodo = async (todo : string, id : number) => {
    setTodos(prev => prev.map(thisTodo => thisTodo.id === id ? {...thisTodo, todo : todo} : thisTodo));
    await axios.post("/api/todos", {todos: todos})
  }
  const toggleComplete = async (id : number) => {
    setTodos(prev => prev.map(thisTodo => thisTodo.id === id ? {...thisTodo, complete: !thisTodo.complete} : thisTodo));
    await axios.post("/api/todos", {todos: todos})
  }

	useEffect(() => {
    const fetchTodos = async () => {
      axios.get("/api/todos").then(res => {
        const localTodos = res.data
        if (localTodos && localTodos.length > 0) setTodos(localTodos);
      });
    }
    fetchTodos();
	},[])

	// useEffect(() => {
  //   const setData = async () => {
  //     axios.post("/api/todos", {todos: todos})
  //   }
  //   setData();
  //   // axios.post("/api/todos", {todos: todos}).then(res => {});
	// },[todos])

  if (status == "loading") {
    return (<div className="flex justify-center items-center h-screen w-screen">
        <Loader size={'16'}/>
    </div>
  )
}

  if (status != "authenticated") {
      router.push("/sign-in");
  }

  return (
    <div>
      <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
        <SidebarDrawer urll='to-do'/>
        <div className="h-lvh w-lvw dark:bg-[#555555] flex justify-center pt-16 overflow-hidden absolute -z-10">
          <div className="w-1/2 px-10 mt-12 border border-zinc-900 h-3/4 p-6 rounded-lg overflow-auto">
            <p className='text-center md:text-5xl font-semibold mb-10 dark:text-white sm:text-3xl'>Manage Your Todos</p>
            <InputTodo/>
            <div className="flex flex-col gap-5">
              {todos.map(thisTodo => (
                <Todo key={thisTodo.id} todo={thisTodo}/>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </div>
  )
}

export default Page
