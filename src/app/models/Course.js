const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

// mySchema
const CourseSchema = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        // createAt: { type: Date, default: Date.now },
        // updateAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // createAt - updateAt
    },
);

module.exports = new mongoose.model('Course', CourseSchema);
