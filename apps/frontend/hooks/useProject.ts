import { useCallback, useEffect, useId, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BackEnd_URL } from "@/config";
import axios from "axios";
import { formatdate } from "@/utils/formatdate";

type Project = {
  id: string;
  description: string;
  createdAt: string;
};

export function useProjects(debouncedString: string) {
  const { getToken } = useAuth();
  const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});

  const fetchProjects = useCallback(async () => {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await axios.get(`${BackEnd_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredProjects = debouncedString
        ? response.data.projects.filter((project: Project) =>
            project.description
              .toLowerCase()
              .includes(debouncedString.toLowerCase())
          )
        : response.data.projects;

      const projectByDate = filteredProjects.reduce(
        (acc: { [date: string]: Project[] }, project: Project) => {
          const date = formatdate(project.createdAt);

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(project);
          return acc;
        },
        {}
      );

      setProjects(projectByDate);
    } catch (error) {
      console.error("failed to Fetch Projecs ", error);
    }
  }, [debouncedString, getToken]);

  useEffect(() => {
    fetchProjects();
  }, [debouncedString]);

  return projects;
}
