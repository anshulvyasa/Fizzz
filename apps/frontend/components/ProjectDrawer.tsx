"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useProjects } from "@/hooks/useProject";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { MessageSquareIcon, SearchIcon, Umbrella } from "lucide-react";
import { formatdate } from "@/utils/formatdate";

const WIDTH = 260;

export function ProjectsDrawer() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 1000);

  const projects = useProjects(debouncedSearchString);

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  let delayTime: Timer;

  useEffect(() => {
    //Tracking mouse Pointer
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 40) {
        clearTimeout(delayTime);
        delayTime = setTimeout(() => {
          setIsOpen(true);
        }, 300);
      }

      if (e.clientX > WIDTH) {
        setIsOpen(false);
        clearTimeout(delayTime);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(delayTime);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <SignedIn>
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
        <DrawerContent
          style={{ maxWidth: WIDTH }}
          className="bg-background rounded-r-4xl shadow-lg h-screen flex flex-col"
        >
          <DrawerHeader className="flex flex-col gap-3">
            <div className="px-2 py-1 font-bold text-2xl italic text-white hover:text-neutral-300 transition-colors duration-300 ">
              Fizz
            </div>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              variant="ghost"
              className="w-full bg-blue-500/50 text-blue-600 hover:text-blue-400"
            >
              <MessageSquareIcon /> Start new Project
            </Button>
            <DrawerTitle className="text-sm">Your Projects</DrawerTitle>
            <div className="flex justify-between border rounded-md pr-2 pl-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <input
                className="w-full p-2 text-sm border-none outline-none"
                type="text"
                placeholder="Search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <div className="flex items-center">
                <SearchIcon className="w-4 h-4" />
              </div>
            </div>
          </DrawerHeader>

          {/* Project list  */}

          {Object.keys(projects).length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-y-4 mt-4 w-full">
              <Umbrella size={50} opacity={0.5} />
              <p className="">No Project Found</p>
            </div>
          ) : (
            <div>
              {Object.keys(projects).map((date) => {
                const formatedDate = formatdate(date);
                return (
                  <div key={date} className="mb-4">
                    <h2 className="text-sm font-semibold text-neutral-700 py-1">
                      {formatedDate}
                    </h2>
                    {projects[date].map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          router.push(`/projects/${project.id}`);
                        }}
                        className="p-2 w-full rounded hover:bg-accent cursor-pointer hover:text-accent-foreground text-[12px] text- gap-y-1"
                      >
                        {project.description.length > 34
                          ? `${project.description.substring(0, 32)} ...`
                          : project.description}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          <DrawerFooter className="p-2 bg-neutral-900 rounded-br-4xl shadow-xl">
            <div className="py-2 flex items-center gap-4">
              <UserButton />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {user?.fullName || "User"}
                </span>
                <span className="text-xs text-neutral-400">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SignedIn>
  );
}
