$(function () {
  if (localStorage.getItem('username')) {
    $('#username').val(localStorage.getItem('username'));
    document.getElementById('RememberMe').checked = true;
  }
  $('#loginbtn').on('click', async function () {
    var remember = document.getElementById('RememberMe');

    console.log(remember.checked);
    if (remember.checked) {
      localStorage.setItem('username', $('#username').val());
    } else {
      localStorage.removeItem('username');
    }
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
            if (data.user.role == 'admin') {
              window.location.replace('adminIndex.html');
            } else {
              window.location.replace('index.html');
            }
            //document.getElementById('a').innerHTML = info.status;
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
