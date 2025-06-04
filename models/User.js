const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true, trim: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    
    // Relación con libros cargados por este usuario (si vende libros)
    /**
    🔗 Relación explícita con libros subidos por el usuario.

    Este array guarda los ObjectId de los libros que el usuario cargó al sistema.

    Permite acceder rápidamente a los libros asociados mediante .populate("uploadedBooks").

    Se guarda físicamente en la colección de usuarios (documento User).

    ⚠️ Puede crecer en tamaño si el usuario sube muchos libros.
    */
    uploadedBooks: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }]
})

const User = model('User', userSchema)

module.exports = { User }