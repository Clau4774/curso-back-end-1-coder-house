import mongoose from 'mongoose';

export const doConnection = async () => {
    try {
        const doConnection = await mongoose.connect('mongodb+srv://clau4774:coder123@backend1-coderhouse.85jhfhr.mongodb.net/?appName=backEnd1-CoderHouse');
        
        console.log('Conectado a mongoDB de manera exitosa.')
        
    } catch (err) {
        console.log('Se ha producido un error:', err);
    }
}