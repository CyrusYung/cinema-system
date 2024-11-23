$(function () {
  $('#loginbtn').on('click', async function () {
    //console.log($('#username').val() == '' || $('#username').val() == '');
    if ($('#username').val() == '' || $('#password').val() == '') {
      alert('Username and password cannot be empty');
    } else {
      const formData = new FormData();
      try {
        formData.append('username', $('#username').val());
        formData.append('password', $('#password').val());
        await $.ajax({
          type: 'POST',
          url: ' /auth/login',
          data: $('#loginForm').serialize(),
          async: false,
          success: async function (data) {
            //console.log(data.status);

            alert('Logged as `' + $('#username').val() + '` (' + data.user.role + ')');
            //document.getElementById('a').innerHTML = info.status;
            window.location.replace('index.html');
          },
          error: async function (data) {
            console.log(JSON.stringify(data));
            console.log(data.responseJSON.status);
            alert(data.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
