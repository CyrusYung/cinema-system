$(document).ready(function () {
  var profiletemp = [];
  $.ajax({
    url: '/auth/admin',
    method: 'GET',
    success: function (response) {
      console.log(response);
      console.log('success');
    },
    error: function (error) {
      alert('Unauthorized');
      console.log(error);
      if (error.message == 'Unauthorized') {
        window.open('/login.html', '_self');
      } else {
        window.open('/index.html', '_self');
      }
    },
  });
  $.ajax({
    url: '/user/manage',
    method: 'GET',
    success: function (response) {
      profiletemp.push(response.user.profile);
      //console.log(response);
      //document.getElementById('Usericon').src = './uploads/' + response.user.icon.data.filename;
      response.user.profile.forEach((ele, i) => {
        $('tbody').append(
          '<tr><th scope="row"><img src="./uploads/' +
            ele.obj.img.data.filename +
            '" style="height: 50px"  />' +
            '</th><td>' +
            ele.username +
            '</td><td>' +
            ele.obj.nickname +
            '</td><td>' +
            ele.obj.gender +
            '</td><td>' +
            ele.obj.email +
            '</td><td>' +
            ele.obj.birth +
            '</td><td>' +
            '<button class="btn btn-success" style="height: 40px; margin-right: 10px" id="en' +
            i +
            `">enable</button>
                    <button class="btn btn-warning" style="height: 40px; margin-right: 10px" id="dis` +
            i +
            `">disable</button>
                    <button class="btn btn-danger" style="height: 40px; margin-right: 10px" id="del` +
            i +
            '">delete</button>' +
            '</td></tr>'
        );

        response.user.profile.forEach((ele, i) => {
          const form_Datat = new FormData();
          const form_Dataf = new FormData();
          const form_Data = new FormData();
          form_Datat.append('username', ele.username);
          form_Datat.append('enabled', true);
          form_Dataf.append('username', ele.username);
          form_Dataf.append('enabled', false);
          form_Data.append('username', ele.username);

          $('#en' + i).on('click', function () {
            $.ajax({
              url: '/user/status',
              method: 'POST',
              data: form_Datat,
              async: false,
              contentType: false,
              processData: false,
              success: function (response) {
                console.log(response);
                console.log('success');
              },
              error: function (error) {
                console.log(error);
              },
            });
          });
          $('#dis' + i).on('click', function () {
            $.ajax({
              url: '/user/status',
              method: 'POST',
              data: form_Dataf,
              async: false,
              contentType: false,
              processData: false,
              success: function (response) {
                console.log(response);
                console.log('success');
              },
              error: function (error) {
                console.log(error);
              },
            });
          });
          $('#del' + i).on('click', function () {
            $.ajax({
              url: '/user/delete',
              method: 'POST',
              data: form_Data,
              async: false,
              contentType: false,
              processData: false,
              success: function (response) {
                console.log(response);
                window.location.replace('AccountManagement.html');
              },
              error: function (error) {
                console.log(error);
              },
            });
          });
        });
      });
      //console.log('success');
    },
    error: function (error) {},
  });
  //console.log(profiletemp[0]);

  /*profiletemp[0].forEach((ele, i) => {
    $('#en' + i).on('click', function () {
      $.ajax({
        url: '/user/status',
        method: 'POST',
        data: form_Data,
        async: false,
        contentType: false,
        processData: false,
        success: function (response) {
          console.log(response);
          console.log('success');
        },
        error: function (error) {
          alert('Unauthorized');
          console.log(error);
          if (error.message == 'Unauthorized') {
            window.open('/login.html', '_self');
          } else {
            window.open('/index.html', '_self');
          }
        },
      });
    });
    $('#dis' + i).on('click', function () {});
    $('#del' + i).on('click', function () {});
  });*/
});
