import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

// Leer los datos del archivo db.json
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API de Deportes");
});

// Mostrar todos los deportes
app.get("/Deportes", (req, res) => {
    const data = readData();
    res.json(data.Deportes);
});

// Mostrar un deporte por ID
app.get("/Deportes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const deporte = data.Deportes.find(
        (deporte) => deporte.id === id
    );

    res.json(deporte);
});

// Agregar un nuevo deporte
app.post("/Deportes", (req, res) => {
    const data = readData();
    const body = req.body;

    const newDeporte = {
        id: data.Deportes.length + 1,
        ...body
    };

    data.Deportes.push(newDeporte);
    writeData(data);

    res.json(newDeporte);
});

// Actualizar un deporte
app.put("/Deportes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const deporteIndex = data.Deportes.findIndex(
        (deporte) => deporte.id === id
    );

    data.Deportes[deporteIndex] = {
        ...data.Deportes[deporteIndex],
        ...body
    };

    writeData(data);

    res.json({
        message: "Deporte actualizado con éxito"
    });
});

// Eliminar un deporte
app.delete("/Deportes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const deporteIndex = data.Deportes.findIndex(
        (deporte) => deporte.id === id
    );

    data.Deportes.splice(deporteIndex, 1);
    writeData(data);

    res.json({
        message: "Deporte eliminado con éxito"
    });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});