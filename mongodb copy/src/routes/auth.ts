import { Router } from 'express';
import { getDb } from '../mongo';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const router = Router();
const collection = () => getDb().collection('Pruebatarde');

const SECRET    = process.env.SECRET

type user = {
    _id?: ObjectId,
    email : string,
    password: string
}
type jwtPayload = {
    id: string;
    email:string;
}

router.get('/', async (req, res) => {
    res.send('Ruta de prueba tarde funcionando');
});


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body as {email: string, password: string};
        const users = collection();
        const exists=await users.findOne({email:email});
        if (exists) {
            return res.status(400).json({ message: 'El email ya existe' });
        };
        const  passEncripta = await bcrypt.hash(password, 10);
        await users.insertOne({email: email, password: passEncripta});
        res.status(201).json({ message: 'Usuario registrado correctamente' });

    }catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }

});


export default router;