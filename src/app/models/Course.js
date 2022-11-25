const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

// auto_increment id
const AutoIncrement = require('mongoose-sequence')(mongoose);
// paginate: phân trang
// const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// mySchema
const CourseSchema = new Schema(
    {
        iid: { type: Number}, // thay đổi kiểu _id trong db
        name: { type: String, maxlength: 255, required: true },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        deleted: {type: Boolean, default: false},
        // thay thế = timestamps: true,
        // createAt: { type: Date, default: Date.now },
        // updateAt: { type: Date, default: Date.now },
        // deleteAt: { type: Date, default: Date.now },
    },
    {
        // _id: false, // k tác động bởi Mongodb nữa
        timestamps: true, // createAt - updateAt
    },
);
// add plugin
mongoose.plugin(slug);
// CourseSchema.plugin(AutoIncrement, {inc_field: '_id'}); // default
CourseSchema.plugin(AutoIncrement, {inc_field: 'iid'});
CourseSchema.plugin(mongooseDelete, 
    { 
        deletedAt : true ,  
        overrideMethods: ['all', 'countDocuments']
    });    
const modelCourse = new mongoose.model('Course', CourseSchema);
module.exports = modelCourse;
