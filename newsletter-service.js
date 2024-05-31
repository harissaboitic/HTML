var NewsletterService = {
    init: function() {
        $('#addNewsletterForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                NewsletterService.add(entity);

            }
        });
        NewsletterService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/locked/newsletter",
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
            $("#newsletter-list").html("");
            var html = "";
            for (let i = data.length-1; i>=0; i--) {
                html += `
                <tr>
                                <th scope="row">`+data[i].id+`</th>
                                <td>`+data[i].email+`</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-danger news-button" onClick="NewsletterService.delete(` + data[i].id + `)"><i class="fas fa-trash"></i></button>
                                  </div>
                                </td>
                              </tr>
                `;
            }
            $("#newsletter-list").html(html);
        }})
    },


    get: function(id) {
        $('.newsletter-button').attr('disabled', true);
        $.get('rest/locked/newsletter/' + id, function(data) {
            $("#id").val(data.id);
            $("#email").val(data.email);
            $('.newsletter-button').attr('disabled', false);
        });
    },

    add: function(news) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/newsletter',
            type: 'POST',
            data: JSON.stringify(news),
            dataType: "json",
            success: function(result) {
                alert("You are now subscribed to out newsletter!");
                $('#addNewsletterForm input[name="email"]').val("");

            }
        });
    },

    delete: function(id) {
        $('.newsletter-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/newsletter/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                $("#newsletter-list").html();
                NewsletterService.list();
            }
        });
    }
}