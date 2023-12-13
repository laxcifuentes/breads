// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// bread schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'http://placehold.it/.png' },
    baker: {
        type: Schema.Types.ObjectId,
        ref: 'Baker'
    }
})

// helper method: instance
breadSchema.methods.getBakedBy = function () {
    return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}

// model and export 
const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread
