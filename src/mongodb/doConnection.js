import mongoose from 'mongoose';

export const doConnection = async (connection) => {
    try {
        const doConnection = await mongoose.connect(connection);
        
        console.log('Conectado a mongoDB de manera exitosa.')
        
    } catch (err) {
        console.log('Se ha producido un error:', err);
    }
}