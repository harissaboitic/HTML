var AdminService = {
    init: function(){
      var token = localStorage.getItem("token");
      if (token){
        window.location.replace("admin.html");
      }

      $('#loginForm').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          AdminService.login(entity);
        }
      });
    },
    
    login: function(entity){
      $.ajax({
        url: 'rest/login',
        type: 'POST',
        data: JSON.stringify(entity),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
          localStorage.removeItem("token");
          localStorage.setItem("token", result.token);
          window.location.replace("admin.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.responseJSON.message);
          toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toastr-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    },
  
    logout: function(){
      localStorage.clear();
      window.location.replace("login.html");
    }
  }