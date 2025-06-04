const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
    firstName: {type: String, required:true},
    lastName:{type:String, required:true},
},{
    toJSON:{virtuals: true},// <-- importante para que se incluyan en JSON
    toObject:{virtuals: true}
})


// 👉 Índice compuesto único
authorSchema.index({ firstName: 1, lastName: 1 }, { unique: true })
/**

🔍 Relación virtual con los libros escritos por el autor.

Esta propiedad no se guarda en la base de datos, pero se puede obtener con .populate("books").

Mongoose conecta Author._id con Book.authorId para crear la relación en tiempo de consulta.

Ideal para relaciones unidireccionales 1:N que escalen bien.
*/
// 🔧 Aquí definimos la propiedad virtual "books"
authorSchema.virtual('books',{
    ref:'Books',             // nombre del modelo al que se refiere
    localField: '_id',       // campo local que se conecta (en Author)
    foreignField: 'authorId' // campo en Book que se conecta (referencia)
})

const Author = model('Author', authorSchema)

module.exports = Author