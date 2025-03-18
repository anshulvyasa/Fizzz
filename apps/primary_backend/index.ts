import { prismaClient } from "@repo/db/client";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.use(cors());

app.post("/project", authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;
    //getting  a name for project
    const description = prompt.substring(0, 100);

    //creating Project
    const project = await prismaClient.project.create({
      data: {
        description,
        userId,
      },
    });

    res.status(200).json({
      data: {
        projectId: project.id,
        message: "Project created successfully",
      },
    });
  } catch (error) {
    console.log("Error in creating project ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/projects", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const projects = await prismaClient.project.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json({
      data: {
        projects,
      },
    });
  } catch (error) {
    console.log("Error in getting projects ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(5000, () => {
  console.log(`Server is Listening at Port 5000 `);
});
