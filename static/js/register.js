$(function () {
  $('#registerbtn').on('click', async function () {
    var Namecheck = true;
    var Pwcheck = true;
    var GenderCheck = true;
    var emailCheck = true;
    var birthCheck = true;
    var nicknameCheck = true;

    if (!($('#username').val() && $('#password').val())) {
      alert('Username and password cannot be empty');
      Namecheck = false;
    } else if ($('#password').val() != $('#Repassword').val()) {
      alert('Password mismatch!');
      Pwcheck = false;
    } else if (!$('#email').val()) {
      alert('Email cannot be empty.');
      emailCheck = false;
    } else if (!$('input[name=gender]:checked').val()) {
      alert('Please Select a Gender.');
      GenderCheck = false;
    } else if (!$('#nickname').val()) {
      alert('Please input your nickname.');
      nicknameCheck = false;
    } else if (!$('#birth').val()) {
      alert('Please choose your date of birth.');
      birthCheck = false;
    }
    /*else if (!($('.form-select').val() == 'user' || $('.form-select').val() == 'student')) {
      alert('Please select your role.');
      RePwcheck = false;
    }*/
    const form_Data = new FormData();

    //const hash = await bcrypt.hash($('#password').val(), 10);

    form_Data.append('username', $('#username').val());
    form_Data.append('password', $('#password').val());
    form_Data.append('Repassword', $('#Repassword').val());
    form_Data.append('nickname', $('#nickname').val());
    form_Data.append('email', $('#email').val());
    form_Data.append('gender', $('input[name="gender"]:checked').val());
    form_Data.append('birth', $('#birth').val());
    form_Data.append('image', $('#image').prop('files')[0]);

    if (Namecheck && Pwcheck && emailCheck && GenderCheck && birthCheck && nicknameCheck) {
      try {
        $.ajax({
          type: 'POST',
          url: ' /auth/register',

          data: form_Data,
          async: false,
          contentType: false,
          processData: false,
          success: async function (data) {
            console.log(data);
            alert('Welcome, ' + data.user.username + '!\n' + 'You can login with your account now!');
            window.location.replace('login.html');
          },
          error: async function (err) {
            console.log(err);
            alert(err.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
