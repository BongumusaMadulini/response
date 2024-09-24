"use strict";

function getLocation() {
  var city = document.getElementById('city').value;
  var address = document.getElementById('address').value;
  var query = "".concat(address, ", ").concat(city);
  var geocodingUrl = "https://nominatim.openstreetmap.org/search?q=".concat(encodeURIComponent(query), "&format=json&limit=1");
  fetch(geocodingUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data && data.length > 0) {
      var _location = data[0];
      var latitude = _location.lat;
      var longitude = _location.lon;
      var locationInput = document.getElementById('location');
      locationInput.value = "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude);
    } else {
      console.error("Geocoding failed: No results found");
      alert("Unable to retrieve location. Please check the address and city name.");
    }
  })["catch"](function (error) {
    console.error("Error fetching geocode:", error);
    alert("Unable to retrieve location. Please try again later.");
  });
}

function handleMadical() {
  var model = document.getElementById('medicalModel');

  if (model) {
    var campus = model.querySelector('#campusName').value;
    var status = model.querySelector('#healthStatus').value;
    var location = model.querySelector('#location').value;
    var city = model.querySelector('#city').value;
    var locationParts = location.split(',');
    var latitude = locationParts[0] ? locationParts[0].replace('Latitude: ', '').trim() : 'Not Available';
    var longitude = locationParts[1] ? locationParts[1].replace('Longitude: ', '').trim() : 'Not Available';
    postMedicalData(campus, status, latitude, longitude, city);
  }
}

function postMedicalData(campus, status, latitude, longitude, city) {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'postMedicalData',
      campus: campus,
      longitude: longitude,
      latitude: latitude,
      userID: userID,
      city: city,
      status: status
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        hideMedical();
        showMessageModel();
        location.reload();
      } else {
        alert(response.message);
        hideMedical();
        location.reload();
      }
    },
    error: function error(xhr, status, _error) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function handleSecurity() {
  var model = document.getElementById('securityModel');

  if (model) {
    var campus = model.querySelector('#campusName').value;
    var securityType = model.querySelector('#securityType').value;
    var location = model.querySelector('#location').value;
    var city = model.querySelector('#city').value;
    var locationParts = location.split(',');
    var latitude = locationParts[0] ? locationParts[0].replace('Latitude: ', '').trim() : 'Not Available';
    var longitude = locationParts[1] ? locationParts[1].replace('Longitude: ', '').trim() : 'Not Available';
    postSecurityData(campus, securityType, latitude, longitude, city);
  }
}

function postSecurityData(campus, securityType, latitude, longitude, city) {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'postsecurityData',
      campus: campus,
      longitude: longitude,
      latitude: latitude,
      userID: userID,
      city: city,
      securityType: securityType
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        showMessageModel();
        showMessageModel();
        location.reload();
      } else {
        alert(response.message);
        hideSecurtyMedical();
        location.reload();
      }
    },
    error: function error(xhr, status, _error2) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function handleFire() {
  var model = document.getElementById('fireModel');

  if (model) {
    var campus = model.querySelector('#campusName').value;
    var location = model.querySelector('#location').value;
    var city = model.querySelector('#city').value;
    var locationParts = location.split(',');
    var latitude = locationParts[0] ? locationParts[0].replace('Latitude: ', '').trim() : 'Not Available';
    var longitude = locationParts[1] ? locationParts[1].replace('Longitude: ', '').trim() : 'Not Available';
    postFireData(campus, latitude, longitude, city);
  }
}

function postFireData(campus, latitude, longitude, city) {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'postFireData',
      campus: campus,
      longitude: longitude,
      latitude: latitude,
      city: city,
      userID: userID
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        hideFireMedical();
        showMessageModel();
        location.reload();
      } else {
        alert(response.message);
        hideFireMedical();
        location.reload();
      }
    },
    error: function error(xhr, status, _error3) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function showLoader() {
  document.getElementById('loader-overlay').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader-overlay').style.display = 'none';
}

function handleSignIn() {
  var email = document.getElementById('email').value.toLowerCase().trim();
  var password = document.getElementById('password').value.trim();

  if (email === '') {
    alert('Email is required');
    return;
  }

  if (password === '') {
    alert('Password is required');
    return;
  }

  login(email, password);
}

function login(email, password) {
  showLoader();
  console.log('Attempting login with email:', email, 'and password:', password);
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'login',
      email: email,
      password: password
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var userID = response.user.userID;
        var userType = response.user.userType;

        if (userType === 'admin') {
          window.location.href = 'admin.html?userID=' + userID;
        } else if (userType === 'user') {
          window.location.href = 'main.html?userID=' + userID;
        }
      } else {
        alert('Login failed: ' + response.message);
      }
    },
    error: function error(xhr, status, _error4) {
      console.log('An error occurred: ' + _error4);
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function handleRegister() {
  var email = document.getElementById('email').value.toLowerCase().trim();
  var password = document.getElementById('password').value.trim();
  var password2 = document.getElementById('confirmPassword').value.trim();
  var fullname = document.getElementById('fullName').value;
  var cellNumber = document.getElementById('cellNumber').value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  var phoneRegex = /^0[6-8][0-9]{8}$/;

  if (!phoneRegex.test(cellNumber)) {
    alert('Please enter a valid South African phone number');
    return;
  }

  if (password !== password2) {
    alert('Password Dont Match');
    return;
  }

  if (fullname === '') {
    alert('Fullname is required');
    return;
  }

  var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    alert('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    return;
  }

  registerUsers(fullname, email, password, cellNumber);
}

function registerUsers(fullname, email, password, cellNumber) {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'registerUser',
      email: email,
      password: password,
      fullname: fullname,
      cellNumber: cellNumber
    },
    success: function success(response) {
      hideLoader();
      console.log('the error :' + response);

      if (response.success) {
        alert(response.message);
        window.location.href = 'index.html';
      } else {
        alert(response.message);
      }
    },
    error: function error(xhr, status, _error5) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function handleUpdatePassword() {
  var emailInput = document.getElementById('email');
  var email = emailInput.value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    console.log('password: ' + email);
    alert('Please enter a valid email address');
    return;
  }

  updatePassword(email);
}

function updatePassword(email) {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'updatePassword',
      email: email
    },
    success: function success(response) {
      hideLoader();
      console.log(response);

      if (response.success) {
        alert(response.message);
        window.location.href = 'index.html';
      } else {
        alert(response.message);
      }
    },
    error: function error(xhr, status, _error6) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function changeReadonly() {
  var allInputs = document.querySelectorAll('input, textarea');
  btnUpdate = document.getElementById('update');
  fullname = document.getElementById('fullname');
  hiddenInputs = document.getElementById('hiddenInputs');
  allInputs.forEach(function (input) {
    input.readOnly = !input.readOnly;

    if (!input.readOnly) {
      input.style.borderBottom = "1px solid black";
      input.style.color = "#000";
      btnUpdate.style.display = "block";
      fullname.style.display = "none";
      hiddenInputs.style.display = "block";
    } else {
      input.style.borderBottom = "none";
      btnUpdate.style.display = "none";
      fullname.style.display = "block";
      input.style.color = "#3c3838";
      hiddenInputs.style.display = "none";
      getUserData();
    }
  });
}

function goToAccHtml() {
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  window.location.href = 'account.html?userID=' + userID;
}

function goToMainHtml() {
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  window.location.href = 'main.html?userID=' + userID;
}

function goToAccAdminHtml() {
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  window.location.href = 'adminAccount.html?userID=' + userID;
}

function goToAdminHtml() {
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  window.location.href = 'admin.html?userID=' + userID;
}

function getUserData() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      userID: userID,
      "function": 'getUserData'
    },
    success: function success(response) {
      hideLoader();

      if (response && response.success !== false) {
        populateModalFields(response);
      } else {
        console.error('Failed to get user data');
      }
    },
    error: function error(xhr, status, _error7) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function populateModalFields(response) {
  var data = response.data;
  document.querySelector('#email').value = data.email || '';
  document.querySelector('#fullname').value = data.fullname || '';
  document.querySelector('#cellNumber').value = data.cellNumber || '';
}

function handleUpdateUser() {
  var email = document.getElementById('email').value.toLowerCase().trim();
  var fullname = document.getElementById('fullname').value;
  var cellNumber = document.getElementById('cellNumber').value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  var phoneRegex = /^0[6-8][0-9]{8}$/;

  if (!phoneRegex.test(cellNumber)) {
    alert('Please enter a valid South African phone number');
    return;
  }

  if (fullname === '') {
    alert('Fullname is required');
    return;
  }

  updateUserDetails(email, fullname, cellNumber);
}

function updateUserDetails(email, fullname, cellNumber) {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'updateUser',
      email: email,
      fullname: fullname,
      cellNumber: cellNumber,
      userID: userID
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        alert(response.message);
        location.reload();
      } else {
        alert(response.message);
      }
    },
    error: function error(xhr, status, _error8) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function getMedicalReports() {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'medicalReports'
    },
    success: function success(response) {
      hideLoader();
      console.log('response data:', response);

      if (response) {
        var dataHtml = '';
        response.forEach(function (data) {
          dataHtml += medicalDisplay(data.id, data.userID, data.campus, data.dateTime, data.status, data.city);
        });
        $('#reports').html(dataHtml);
      } else {
        $('#reports').html('No data found');
      }
    },
    error: function error(xhr, status, _error9) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function getFireReports() {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'fireReports'
    },
    success: function success(response) {
      hideLoader();
      console.log('response data:', response);

      if (response) {
        var dataHtml = '';
        response.forEach(function (data) {
          dataHtml += fireDisplay(data.id, data.userID, data.campus, data.dateTime, data.city);
        });
        $('#reports').html(dataHtml);
      } else {
        $('#reports').html('No data found');
      }
    },
    error: function error(xhr, status, _error10) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function getSecurityReports() {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'securityReports'
    },
    success: function success(response) {
      hideLoader();
      console.log('response data:', response);

      if (response) {
        var dataHtml = '';
        response.forEach(function (data) {
          dataHtml += securityDisplay(data.id, data.userID, data.campus, data.dateTime, data.securityType, data.city);
        });
        $('#reports').html(dataHtml);
      } else {
        $('#reports').html('No data found');
      }
    },
    error: function error(xhr, status, _error11) {
      console.error('Error response:', xhr.responseText);
      hideLoader();
    }
  });
}

function medicalView() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'medicalView',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#status').text(data.status);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        var place = data.city;
        updateMapIframe(latitude, longitude, place);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error12) {
      hideLoader();
      console.log('An Error: ' + _error12);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function medicalViewsos() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'medicalViewsos',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#status').text(data.status);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        var place = data.city;
        updateMapIframe(latitude, longitude, place);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error13) {
      hideLoader();
      console.log('An Error: ' + _error13);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function securityView() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'securityView',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#status').text(data.securityType);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        var place = data.city;
        updateMapIframe(latitude, longitude, place);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error14) {
      hideLoader();
      console.log('An Error: ' + _error14);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function securityViewsos() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'securityViewsos',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#status').text(data.securityType);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        var place = data.city;
        updateMapIframe(latitude, longitude, place);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error15) {
      hideLoader();
      console.log('An Error: ' + _error15);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function fireView() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'fireView',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        updateMapIframe(latitude, longitude);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error16) {
      hideLoader();
      console.log('An Error: ' + _error16);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function fireViewsos() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var itemId = urlParams.get('itemID');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'php/controller.php',
    data: {
      "function": 'fireViewsos',
      itemId: itemId
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#campus').text(data.campus);
        $('#date').text(data.dateTime);
        var latitude = data.latitude;
        var longitude = data.longitude;
        updateMapIframe(latitude, longitude);
      } else {
        alert('Error \n' + response.message);
      }
    },
    error: function error(xhr, _error17) {
      hideLoader();
      console.log('An Error: ' + _error17);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function updateMapIframe(latitude, longitude) {
  var mapUrl = "https://www.google.com/maps?q=".concat(latitude, ",").concat(longitude, "&hl=es;z=14&output=embed");
  document.getElementById('mapIframe').src = mapUrl;
}

function medicalViewUserData() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      userID: userID,
      "function": 'getUserData'
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var data = response.data;
        $('#fullname').text(data.fullname);
        $('#cellNumber').text(data.cellNumber);
        $('#email').text(data.email);
      } else {
        alert(response.message);
      }
    },
    error: function error(xhr, _error18) {
      hideLoader();
      console.log('An Error: ' + _error18);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}

function sosMedical() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $.ajax({
        type: 'POST',
        url: "php/controller.php",
        dataType: 'json',
        data: {
          userID: userID,
          latitude: latitude,
          longitude: longitude,
          "function": 'sosMedical'
        },
        success: function success(response) {
          hideLoader();

          if (response.success) {
            showMessageModel();
          } else {
            alert(response.message);
          }
        },
        error: function error(xhr, _error19) {
          hideLoader();
          console.log('An Error: ' + _error19);
          console.error('Response Error: ' + xhr.responseText);
        }
      });
    }, function (error) {
      hideLoader();
      console.error('Geolocation error: ' + error.message);
      alert('Unable to retrieve your location. Please try again.');
    });
  } else {
    hideLoader();
    alert('Geolocation is not supported by your browser.');
  }
}

function sosFire() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $.ajax({
        type: 'POST',
        url: "php/controller.php",
        dataType: 'json',
        data: {
          userID: userID,
          latitude: latitude,
          longitude: longitude,
          "function": 'sosFire'
        },
        success: function success(response) {
          hideLoader();

          if (response.success) {
            showMessageModel();
          } else {
            alert(response.message);
          }
        },
        error: function error(xhr, _error20) {
          hideLoader();
          console.log('An Error: ' + _error20);
          console.error('Response Error: ' + xhr.responseText);
        }
      });
    }, function (error) {
      hideLoader();
      console.error('Geolocation error: ' + error.message);
      alert('Unable to retrieve your location. Please try again.');
    });
  } else {
    hideLoader();
    alert('Geolocation is not supported by your browser.');
  }
}

function sosSecuriry() {
  showLoader();
  var urlParams = new URLSearchParams(window.location.search);
  var userID = urlParams.get('userID');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $.ajax({
        type: 'POST',
        url: "php/controller.php",
        dataType: 'json',
        data: {
          userID: userID,
          latitude: latitude,
          longitude: longitude,
          "function": 'sosSecurity'
        },
        success: function success(response) {
          hideLoader();

          if (response.success) {
            showMessageModel();
          } else {
            alert(response.message);
          }
        },
        error: function error(xhr, _error21) {
          hideLoader();
          console.log('An Error: ' + _error21);
          console.error('Response Error: ' + xhr.responseText);
        }
      });
    }, function (error) {
      hideLoader();
      console.error('Geolocation error: ' + error.message);
      alert('Unable to retrieve your location. Please try again.');
    });
  } else {
    hideLoader();
    alert('Geolocation is not supported by your browser.');
  }
}

function getAllSOSReports() {
  showLoader();
  $.ajax({
    type: 'POST',
    url: "php/controller.php",
    dataType: 'json',
    data: {
      "function": 'sosAllproducts'
    },
    success: function success(response) {
      hideLoader();

      if (response.success) {
        var postHtml = '';
        var data = response.data;

        if (data.sosMedical && Array.isArray(data.sosMedical)) {
          data.sosMedical.forEach(function (item) {
            postHtml += sosMedicalDisplay(item.id, item.userID, item.dateTime, item.status);
          });
        }

        if (data.sosFire && Array.isArray(data.sosFire)) {
          data.sosFire.forEach(function (item) {
            postHtml += sosFireDisplay(item.id, item.userID, item.dateTime);
          });
        }

        if (data.sosSecurity && Array.isArray(data.sosSecurity)) {
          data.sosSecurity.forEach(function (item) {
            postHtml += sosSecurityDisplay(item.id, item.userID, item.dateTime, item.securityType);
          });
        }

        if (postHtml) {
          $('#reports').append(postHtml);
        } else {
          alert('No reports to display.');
        }
      } else {
        alert(response.message || 'Failed to load reports.');
      }
    },
    error: function error(xhr, _error22) {
      hideLoader();
      console.log('An Error: ' + _error22);
      console.error('Response Error: ' + xhr.responseText);
    }
  });
}
//# sourceMappingURL=main.dev.js.map
