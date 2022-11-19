document.addEventListener('DOMContentLoaded', function () {
    var course_id;
    var courseForm = document.forms.namedItem('deleteCourseForm');
    var btnDeleteCourse = document.getElementById('btn-delete-course');
    //console.log(courseForm);
    // When dialog confirm clicked
    $('#delete-course-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        //var recipient_id = button.data('id');
        //console.log('_ID:', recipient_id);
        course_id = button.data('id');
    });
    // When delete course btn clicked
    btnDeleteCourse.onclick = function () {
        courseForm.action = '/courses/'+course_id+'?_method=DELETE';
        //alert('btn xoa' + course_id);
        courseForm.submit();
    };
});