"use client";
import  { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ACui/navbar-menu";
import { signOut } from "next-auth/react";
import { Dock, List, Lock, LogIn, LogOutIcon, PlusSquare, Settings, SparkleIcon, UserIcon, UserPlus } from "lucide-react";
import { IconBrandTeams, IconBrandWikipedia } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { MdEventAvailable } from "react-icons/md";

const Navbar = () => {
  // const [userDet,setUserDet]=useState("not authorised");
  const {status, data} = useSession();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(()=>{
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);

  const [active, setActive] = useState<string | null>(null);
  if(windowSize.width<600)
    {return<div className="fixed top-0 inset-x-0 w-screen bg-zinc-300 h-32 z-30"></div>}
    return (
        <div className="fixed top-6 inset-x-0 max-w-md mx-auto z-50">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Features">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/chat-ai"><div className="flex flex-row space-x-2"><SparkleIcon className="h-5 w-4"/><h1>AI</h1></div></HoveredLink>
              <HoveredLink href="/docsnote"><div className="flex flex-row space-x-2"><Dock className="h-5 w-4"/> <h1>Docs</h1></div></HoveredLink>
              <HoveredLink href="/calendar"><div className="flex flex-row space-x-2"><MdEventAvailable className="h-5 w-4"/> <h1>Calendar</h1></div></HoveredLink>
              <HoveredLink href="/to-do"><div className="flex flex-row space-x-2"><List className="h-5 w-4"/> <h1>Todo</h1></div></HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Workflows">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/docsnote"><div className="flex flex-row space-x-2"><PlusSquare className="h-5 w-4"/> <h1>New DocsNote</h1></div></HoveredLink>
              <HoveredLink href="/workspace"><div className="flex flex-row space-x-2"><IconBrandTeams className="h-5 w-4"/> <h1>New Workspace</h1></div></HoveredLink>
            </div>
          </MenuItem>
          {
          status==="authenticated" ? 
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/profile"><div className="flex flex-row space-x-2"><UserIcon className="h-5 w-4"/> <h1>My Account</h1></div></HoveredLink>
              <HoveredLink href="/settings"><div className="flex flex-row space-x-2"><Settings className="h-5 w-4"/> <h1>Setting</h1></div></HoveredLink>
              <HoveredLink href="/reset-password"><div className="flex flex-row space-x-2"><Lock className="h-5 w-4"/> <h1>Change Password</h1></div></HoveredLink>
            </div>
          </MenuItem>
          :
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/sign-in"><div className="flex flex-row space-x-2"><LogIn className="h-5 w-4"/> <h1>Login</h1></div></HoveredLink>
              <HoveredLink href="/sign-up"><div className="flex flex-row space-x-2"><UserPlus className="h-5 w-4"/> <h1>SignUp</h1></div></HoveredLink>
            </div>
          </MenuItem>
          }
        </Menu>
      </div>
    )
  }
  
  export default Navbar
  