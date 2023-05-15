import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
const secretKey = process.env.JWT_SECRET as string;

app.use(cors());
app.use(express.json());

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    try {
      const decodedToken: any = jwt.verify(bearerToken, secretKey);
      req.body.user = decodedToken.user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "Token no provisto" });
  }
};

app.get("/tasks", verifyToken, async (req, res) => {
  try {
    const response = await axios.get("http://task:3000", {
      headers: { Authorization: `Bearer ${req.body.user}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});

app.post("/tasks", verifyToken, async (req, res) => {
  try {
    const response = await axios.post("http://task:3000", req.body, {
      headers: { Authorization: `Bearer ${req.body.user}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
});

app.get("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(
      `http://task:3000/${req.params.id}`,
      { headers: { Authorization: `Bearer ${req.body.user}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tarea" });
  }
});

app.put("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const response = await axios.put(
      `http://task:3000/${req.params.id}`,
      req.body,
      { headers: { Authorization: `Bearer ${req.body.user}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
});

app.put("/tasks/complete/:id", verifyToken, async (req, res) => {
  try {
    const response = await axios.put(
      `http://task:3000/complete/${req.params.id}`,
      req.body,
      { headers: { Authorization: `Bearer ${req.body.user}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al completar tarea" });
  }
});

app.delete("/tasks/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    
    const response = await axios.delete(
      `http://task:3000/${req.params.id}`,
      { headers: { Authorization: `Bearer ${req.body.user}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
});

app.listen(PORT, () =>
  console.log(`Gateway escuchando en http://localhost:${PORT}`)
);

