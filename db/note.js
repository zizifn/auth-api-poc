const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: Date,
    important: Boolean
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const MongoNote = mongoose.model('Note', noteSchema);

module.exports = {
    MongoNote
}


// export { Note as MongoNote };

// const note = new Note({
//     content: 'HTML is Easyddfff',
//     date: new Date(),
//     important: false,
// })
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })