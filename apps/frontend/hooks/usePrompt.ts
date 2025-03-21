import { BackEnd_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

interface Prompt {
  id: string;
  content: string;
  type: "USER" | "SYSETEM";
  createdAt: string;
  actions: Action[];
}

interface Action {
  id: string;
  content: string;
  createdAt: string;
}

export function usePrompt(projectId: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    async function getPrompts() {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${BackEnd_URL}/prompts/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPrompts(response.data.prompts);
      } catch (error) {
        console.error("Error fetching Prompts", error);
      }
    }
    getPrompts();
    let interval = setInterval(getPrompts, 1000);
    return () => clearInterval(interval);
  }, [projectId, getToken]);

  return {
    prompts,
  };
}
