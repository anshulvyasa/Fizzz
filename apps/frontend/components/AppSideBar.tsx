"use client";

import { BackEnd_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Input } from "./ui/input";
import { GalleryVerticalEnd, SearchIcon } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  description: string;
  createdAt: string;
};

function useProjects() {
  const { getToken } = useAuth();
  const [projects, setProjects] = React.useState<{ [date: string]: Project[] }>(
    {}
  );

  React.useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await axios.get(`${BackEnd_URL}/project`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        const groupedProjects = response.data.projects.reduce(
          (acc: { [date: string]: Project[] }, project: Project) => {
            const dateKey = new Date(project.createdAt)
              .toISOString()
              .split("T")[0];
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(project);
            return acc;
          },
          {}
        );

        setProjects(groupedProjects);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request was cancelled");
        } else {
          console.log("Error fetching projects:", error);
        }
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, [getToken]);

  return projects;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [searchString, setSearchString] = React.useState("");
  const projects = useProjects();

  return (
    <Sidebar
      {...props}
      className="[&>div]:!bg-transparent backdrop-blur-lg bg-white/30 dark:bg-black/20"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex border-2 justify-between bg-gray-500/10 focus-within:outline-1 focus-within:outline-teal-300/30 rounded-md pr-2 pl-1">
              <Input
                className="w-full p-1 placeholder:text-gray-400 focus-visible:ring-0 text-sm border-none outline-none"
                placeholder="Search projects"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <div className="flex items-center">
                <SearchIcon className="w-5 h-5" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.keys(projects).length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-2 py-4">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar text-teal-400">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <p className="font-semibold text-center text-teal-400">
                    No Projects Found
                  </p>
                </div>
              ) : (
                Object.entries(projects)
                  .sort(
                    ([dateA], [dateB]) => Date.parse(dateB) - Date.parse(dateA)
                  ) // Sort by date
                  .map(([date, projectList]) => {
                    const filteredProjects = projectList
                      .filter((project) =>
                        project.description
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      )
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      );

                    if (filteredProjects.length === 0) return null; // Skip if no matching projects

                    return (
                      <SidebarMenuItem key={date}>
                        <SidebarGroupLabel>
                          {new Date(date).toDateString()}
                        </SidebarGroupLabel>
                        {filteredProjects.map((project) => (
                          <SidebarMenuButton
                            asChild
                            key={project.id}
                            className="my-2 rounded-md"
                          >
                            <Link href={`project/${project.id}`}>
                              <span>
                                {project.description.length > 50
                                  ? `${project.description.substring(0, 50)}...`
                                  : project.description}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        ))}
                        <SidebarSeparator />
                      </SidebarMenuItem>
                    );
                  })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
