import { Router } from "express";
import usersModel from "../dao/models/users.model.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password, name, lastname } = req.body;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      console.log("Soy admin")
      req.session.name = name;
      req.session.lastname = lastname;
      req.session.email = email;
      req.session.admin = true;
      req.session.role = "admin";
      res.status(200).json({
        respuesta: "ok",
        redirectUrl: "/products",
      });
    } else {
      const result = await usersModel.findOne({ email, password });

      if (result === null) {
        res.status(401).json({
          respuesta: "error",
          message: "El email no esta registrado. Por favor dirijase al signup",
        });
      }

      if (result) {
        req.session.name = result.name;
        req.session.lastname = result.lastname;
        req.session.email = email;
        req.session.admin = false;
        req.session.role = "user";
        res.status(200).json({
          respuesta: "ok",
          /* la uso para redirigir a /products */
          redirectUrl: "/products",
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      error: err,
      message: "Algo salio mal al hacer login",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, lastname, age, email, password } = req.body;

    const exist = await usersModel.findOne({ email: email });

    if (exist) {
      return res
        .status(401)
        .json(
          "El email ya se encuentra registrado. Por favor, vaya a sign in y coloque la contraseña"
        );
    }

    const result = await usersModel.create({
      name,
      lastname,
      age,
      email,
      password,
    });

    if (result === null) {
      return res.status(401).json({
        respuesta: "Error al crear usuario.",
      });
    } else {
      /* req.session.user = email;
            req.session.admin = true; */
      res.status(200).json({
        respuesta: "ok. Usuario creado existosamente.",
      });
    }
  } catch (err) {
    res.json({
      error: err,
      message: "Algo salio mal al hacer signup",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.json({
        message: "Sesión cerrada con éxito",
      });
    } else {
      return res.json({
        message: "Error al cerrar sesión",
      });
    }
  });
});

export default router;
