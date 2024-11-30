$(document).ready(function () {
  $.ajax({
    url: '/auth/nav',
    method: 'GET',
    success: function (response) {
      //console.log(response);

      document.getElementById('Usericon').src = './uploads/' + response.user.icon.data.filename;

      //console.log('success');
    },
    error: function (error) {},
  });
  $.ajax({
    url: '/user/profile',
    method: 'GET',
    success: function (response) {
      console.log(response);
      $('#username').val(response.user.profile.username);
      $('#nickname').val(response.user.profile.obj.nickname);
      $('#email').val(response.user.profile.obj.email);
      $('#birth').val(response.user.profile.obj.birth);
      $('#' + response.user.profile.obj.gender).prop('checked', true);

      //console.log('success');
    },
    error: function (error) {},
  });
  //enable Icon edit
  $('#IconEdit').on('click', function () {
    if (document.getElementById('image').disabled) {
      document.getElementById('image').disabled = false;
      $('#Iconfield').removeClass('d-none');
      document.getElementById('fileConfirm').disabled = false;
      $('#fileConfirm').removeClass('d-none');
      $('#IconEdit').addClass('d-none');
      document.getElementById('IconEdit').disabled = true;
    }
  });
  //confirm file upload
  $('#fileConfirm').on('click', function () {
    if (document.getElementById('image').files.length == 0) {
      alert('no files selected');
    } else {
      document.getElementById('image').disabled = true;

      document.getElementById('fileConfirm').disabled = true;
      $('#fileConfirm').addClass('d-none');
      $('#IconEdit').removeClass('d-none');
      document.getElementById('IconEdit').disabled = false;
      const form_Data = new FormData();
      form_Data.append('image', $('#image').prop('files')[0]);
      try {
        $.ajax({
          type: 'POST',
          url: ' /user/icon',
          data: form_Data,
          async: false,
          contentType: false,
          processData: false,
          success: async function (data) {
            console.log(data);
            window.location.replace('./profile.html');
          },
          error: async function (err) {
            console.log(err);

            //alert(err.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
  //enable profile edit and confirm
  $('#ProfileEdit').on('click', function () {
    if (
      document.getElementById('username').disabled &&
      document.getElementById('nickname').disabled &&
      document.getElementById('email').disabled &&
      document.getElementById('male').disabled &&
      document.getElementById('female').disabled &&
      document.getElementById('birth').disabled
    ) {
      document.getElementById('username').disabled = false;
      document.getElementById('nickname').disabled = false;
      document.getElementById('email').disabled = false;
      document.getElementById('male').disabled = false;
      document.getElementById('female').disabled = false;
      document.getElementById('birth').disabled = false;
      document.getElementById('2').src = './tick.png';
      document.getElementById('Profiletext').textContent = 'Confirm';
    } else {
      console.log($('input[name=gender]:checked').val());
      var Namecheck = true;

      var GenderCheck = true;
      var emailCheck = true;
      var birthCheck = true;
      var nicknameCheck = true;

      if (!$('#username').val()) {
        alert('Username cannot be empty');
        Namecheck = false;
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
      const form_Data = new FormData();

      form_Data.append('username', $('#username').val());
      form_Data.append('nickname', $('#nickname').val());
      form_Data.append('email', $('#email').val());
      form_Data.append('gender', $('input[name="gender"]:checked').val());
      form_Data.append('birth', $('#birth').val());

      if (Namecheck && emailCheck && GenderCheck && birthCheck && nicknameCheck) {
        try {
          $.ajax({
            type: 'POST',
            url: ' /user/update',

            data: form_Data,
            async: false,
            contentType: false,
            processData: false,
            success: async function (data) {
              console.log(data);
              window.location.replace('./profile.html');
            },
            error: async function (err) {
              console.log(err);
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });

  //enable Password edit
  $('#PwEdit').on('click', function () {
    if (document.getElementById('password').disabled) {
      document.getElementById('password').disabled = false;
      document.getElementById('Repassword').disabled = false;
      $('#Pwfield').removeClass('d-none');
      $('#RePwfield').removeClass('d-none');
      document.getElementById('3').src = './tick.png';
      document.getElementById('Pwtext').textContent = 'Confirm';
    } else {
      var Pwcheck = true;

      if ($('#password').val() != $('#Repassword').val()) {
        alert('Password mismatch!');
        Pwcheck = false;
      }

      const form_Data = new FormData();

      //const hash = await bcrypt.hash($('#password').val(), 10);

      form_Data.append('password', $('#password').val());
      form_Data.append('Repassword', $('#Repassword').val());

      if (Pwcheck) {
        try {
          $.ajax({
            type: 'POST',
            url: '/user/pw',

            data: form_Data,
            async: false,
            contentType: false,
            processData: false,
            success: async function (data) {
              console.log(data);
              window.location.replace('./profile.html');
            },
            error: async function (err) {
              console.log(err);
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
});
