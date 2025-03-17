import { prismaClient } from "@repo/db/client";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.post("/project", async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId;
  //getting  a name for project
  const description = prompt.substring(0, 100);

  //craeting Project
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
});

app.get("/projects", async (req, res) => {
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
});

app.listen(5000, () => {
  console.log(`Server is Listening at Port 5000 `);
});
