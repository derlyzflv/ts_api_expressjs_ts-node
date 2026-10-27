import express from 'express';
import type { Request, Response } from 'express';
import nodeQuerystring = require('node:querystring');

const app = express();
app.use(express.json());

interface Vehiculos {
    id: number, placa: string, modelo: string, kilometraje: number,
    estado: 'activo' | 'mantenimiento'
}

let vehiculos: Vehiculos[] = [
  {
    id: 1,
    placa: 'ABC-123',
    modelo: 'Toyota Corolla',
    kilometraje: 45000,
    estado: 'activo',
  },
  {
    id: 2,
    placa: 'DEF-456',
    modelo: 'Hyundai Accent',
    kilometraje: 62000,
    estado: 'mantenimiento',
  },
  {
    id: 3,
    placa: 'GHI-789',
    modelo: 'Kia Rio',
    kilometraje: 38000,
    estado: 'activo',
  },
  {
    id: 4,
    placa: 'JKL-012',
    modelo: 'Nissan Versa',
    kilometraje: 75000,
    estado: 'activo',
  },
  {
    id: 5,
    placa: 'MNO-345',
    modelo: 'Chevrolet Spark',
    kilometraje: 91000,
    estado: 'mantenimiento',
  },
  {
    id: 6,
    placa: 'PQR-678',
    modelo: 'Toyota Yaris',
    kilometraje: 27000,
    estado: 'activo',
  },
  {
    id: 7,
    placa: 'STU-901',
    modelo: 'Mazda 3',
    kilometraje: 54000,
    estado: 'activo',
  },
  {
    id: 8,
    placa: 'VWX-234',
    modelo: 'Hyundai Tucson',
    kilometraje: 83000,
    estado: 'mantenimiento',
  },
  {
    id: 9,
    placa: 'YZA-567',
    modelo: 'Kia Sportage',
    kilometraje: 41000,
    estado: 'activo',
  },
  {
    id: 10,
    placa: 'BCD-890',
    modelo: 'Nissan Sentra',
    kilometraje: 68000,
    estado: 'activo',
  },
];

let nextId : number = 11;

app.get('/api/vehiculos', (req: Request, res: Response) => {
    if(vehiculos.length === 0){
        res.status(401).send({error: 'No existen vehiculos'});
        return;
    }
    res.status(200).send({data: vehiculos});
});
app.get('/api/vehiculos/:id', (req: Request, res: Response) => {
    const vehiculo = vehiculos.find(v => v.id === Number(req.params.id))
    if (!vehiculo) {
        res.status(404).send({error: 'Vehiculo no encontrado'});
    }
    res.status(200).send({data: vehiculo});
});
app.post('/api/vehiculos', (req: Request, res: Response) => {
    const {placa, modelo, kilometraje, estado} = req.body;
    const nuevo : Vehiculos = {
        id: nextId++,
        placa: placa,
        modelo: modelo,
        kilometraje: kilometraje,
        estado: estado
    };
    vehiculos.push(nuevo);
    res.status(201).json({data: nuevo})
});
app.put('/api/vehiculos/:id', (req: Request, res: Response) => {
    const indice = vehiculos.findIndex(v => v.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).send({error: 'Vehiculo no encontrado'});
        return;
    }
    vehiculos[indice] = {
        id: vehiculos[indice]?.id,
        placa: req.body.placa,
        modelo: req.body.modelo,
        kilometraje: req.body.kilometraje,
        estado: req.body.estado
    }
    res.status(200).send({data: vehiculos[indice]});
});
//vehiculos[indice] = {...vehiculos[indice], ...req.body, id: vehiculos[indice]?.id};
app.delete('/api/vehiculos/:id', (req: Request, res: Response) => {
    const indice : number = vehiculos.findIndex( v => v.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).send({error: 'Vehiculo no encontrado'});
        return;
    }
    const vehiculo = vehiculos[indice];
    vehiculos.splice(indice, 1);
    res.status(200).json(vehiculo);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});