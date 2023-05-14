import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "./user.model";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Buscamos al usuario por su email en la base de datos
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      // Si el usuario no existe, respondemos con un error 404
      return res.status(404).json({ message: "User not found" });
    }
    // Verificamos si la contraseña es correcta
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      // Si la contraseña no es correcta, respondemos con un error 401
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generamos un token de autenticación utilizando la librería jsonwebtoken
    const token: string = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    // Respondemos con el token de autenticación
    res.json({ token });
  } catch (error) {
    console.error(error);
    // Si ocurre algún error en el servidor, respondemos con un error 500
    res.status(500).json({ message: "Internal server error" });
  }
};

 const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 12);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token: string = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register };
