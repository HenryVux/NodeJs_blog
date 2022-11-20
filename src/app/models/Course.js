const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// mySchema
const CourseSchema = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        // thay thế = timestamps: true,
        // createAt: { type: Date, default: Date.now },
        // updateAt: { type: Date, default: Date.now },
        // deleteAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // createAt - updateAt
    },
);
// add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, 
    { 
        deletedAt : true ,  
        overrideMethods: 'all',
    });

module.exports = new mongoose.model('Course', CourseSchema);
