var ReportsServiceIndex = {
    init: function() {

        $('#addReportsForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                ReportsServiceIndex.add(entity);

            }
        });

    },

    add: function(reports) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/reports',
            type: 'POST',
            data: JSON.stringify(reports),
            dataType: "json",
            success: function(result) {
                setTimeout(function(){
                    $('#addReportsModal').hide();
                    $('.modal-backdrop').remove();                    
                    $('#addReportsModal input[name="first_name"]').val("");
                    $('#addReportsModal textarea[name="description"]').val("");
                    $('#addReportsModal input[name="last_name"]').val("");
                    $('#addReportsModal input[name="date_of_birth"]').val("");
                    $('#addReportsModal input[name="city"]').val("");
                    $('#addReportsModal input[name="country"]').val("");
                    $('#addReportsModal input[name="phone"]').val("");
                    $('#addReportsModal input[name="email"]').val("");
                    $('#addReportsModal input[name="zip"]').val("");
                    $('#addReportsModal input[name="category"]').val("");
                    $('#addReportsModal input[name="date"]').val("");
                    $('#addReportsModal input[name="date"]').val("");
                }, 500); // delay for 500ms
            }
        });
    }
}