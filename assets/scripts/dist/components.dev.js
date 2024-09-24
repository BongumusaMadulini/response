"use strict";

function navbar() {
  var html = "\n        <header>\n            <nav class=\"navbar isSteaky\">\n                <div class=\"container d-flex justify-content-between align-items-center\">\n                    <div class=\"row w-100 d-flex\">\n                        <p><i class=\"bi bi-envelope-at\"></i>campussafety@info.co.za</p>\n                        <p class=\"toHide\"><i class=\"bi bi-geo-alt-fill\"></i>Mangosuthu University Of Technology</p>\n                        <p class=\"toHide\"><i class=\"bi bi-telephone\"></i>011 2356 1231</p>\n                    </div>\n                    <div class=\"row bottom-row\">\n                        <div class=\"logo\">\n                            <img src=\"assets/imgs/logo.png\" alt=\"Logo\" height=\"40\">\n                        </div>\n                        <div class=\"link\">\n                            <a onclick=\"goToMainHtml()\">Home</a>\n                        </div>\n                        <div class=\"account\" onclick=\"goToAccHtml()\">\n                            <div class=\"account-icon-container\"><i class=\"bi bi-person\"></i></div>\n                        </div>\n                    </div>\n               </div>\n            </nav>\n        </header>\n    ";
  document.getElementById("navbar").innerHTML += html;
}

function navbarAdmin() {
  var html = "\n        <header>\n            <nav class=\"navbar isSteaky\">\n                <div class=\"container d-flex justify-content-between align-items-center\">\n                    <div class=\"row w-100 d-flex\">\n                        <p><i class=\"bi bi-envelope-at\"></i>campussafety@info.co.za</p>\n                        <p class=\"toHide\"><i class=\"bi bi-geo-alt-fill\"></i>Mangosuthu University Of Technology</p>\n                        <p class=\"toHide\"><i class=\"bi bi-telephone\"></i>011 2356 1231</p>\n                    </div>\n                    <div class=\"row bottom-row\">\n                        <div class=\"logo\">\n                           <img src=\"assets/imgs/logo.png\" alt=\"Logo\" height=\"40\">\n                        </div>\n                        <div class=\"link\">\n                            <a onclick=\"goToAdminHtml()\">Home</a>\n                        </div>\n                        <div class=\"account\" onclick=\"goToAccAdminHtml()\">\n                            <div class=\"account-icon-container\"><i class=\"bi bi-person\"></i></div>\n                        </div>\n                    </div>\n               </div>\n            </nav>\n        </header>\n    ";
  document.getElementById("navbarAdmin").innerHTML += html;
}

function showModalMedical() {
  var existingModal = document.getElementById('medicalModel');

  if (!existingModal) {
    var modal = document.createElement('div');
    modal.id = 'medicalModel';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = "\n    <div class=\"modal-content\">\n        <span class=\"close\" onclick=\"hideMedical()\">&times;</span>\n        <h3>Medical Assistance</h3>\n        <div class=\"img-container\">\n            <img src=\"assets/imgs/medical.png\" alt=\"Medical Logo\" height=\"40\">\n        </div>\n        <form id=\"healthForm\">\n            <div class=\"form-group\">\n                <label for=\"campusName\">Campus Name</label>\n                <input type=\"text\" id=\"campusName\" name=\"campusName\" required>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"healthStatus\">Health Status</label>\n                <input type=\"text\" id=\"healthStatus\" name=\"healthStatus\" required>\n            </div>\n             <div class=\"form-group\">\n        <label for=\"city\">City/Town Name</label>\n        <input type=\"text\" id=\"city\" name=\"city\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"address\">Address</label>\n        <input type=\"text\" id=\"address\" name=\"address\" required>\n    </div>\n            <div class=\"form-group\">\n                <label for=\"location\">Location</label>\n                <input type=\"text\" id=\"location\" name=\"location\" required readonly>\n                <button type=\"button\" onclick=\"getLocation()\">Get My Location</button>\n            </div>\n            <button type=\"button\" onclick=\"handleMadical()\">Submit</button>\n        </form>\n    </div>\n";
    document.body.appendChild(modal);
  } else {
    existingModal.style.display = 'block';
  }
}

function hideMedical() {
  var existingModal = document.getElementById('medicalModel');
  existingModal.style.display = 'none';
}

function showSecurityModel() {
  var existingModal = document.getElementById('securityModel');

  if (!existingModal) {
    var modal = document.createElement('div');
    modal.id = 'securityModel';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = "\n    <div class=\"modal-content\">\n        <span class=\"close\" onclick=\"hideSecurtyMedical()\">&times;</span>\n        <h3>Security Assistance</h3>\n        <div class=\"img-container\">\n            <img src=\"assets/imgs/security.png\" alt=\"Medical Logo\" height=\"40\">\n        </div>\n        <form id=\"healthForm\">\n            <div class=\"form-group\">\n                <label for=\"campusName\">Campus Name</label>\n                <input type=\"text\" id=\"campusName\" name=\"campusName\" required>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"securityType\">Securty Type</label>\n                <input type=\"text\" id=\"securityType\" name=\"securityType\" required>\n            </div>\n            <div class=\"form-group\">\n        <label for=\"city\">City/Town Name</label>\n        <input type=\"text\" id=\"city\" name=\"city\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"address\">Address</label>\n        <input type=\"text\" id=\"address\" name=\"address\" required>\n    </div>\n            <div class=\"form-group\">\n                <label for=\"location\">Location</label>\n                <input type=\"text\" id=\"location\" name=\"location\" required readonly>\n                <button type=\"button\" onclick=\"getLocation()\">Get My Location</button>\n            </div>\n            <button class=\"submit\" type=\"button\" onclick=\"handleSecurity()\">Submit</button>\n        </form>\n    </div>\n";
    document.body.appendChild(modal);
  } else {
    existingModal.style.display = 'block';
  }
}

function hideSecurtyMedical() {
  var existingModal = document.getElementById('securityModel');
  existingModal.style.display = 'none';
}

function showFireModel() {
  var existingModal = document.getElementById('fireModel');

  if (!existingModal) {
    var modal = document.createElement('div');
    modal.id = 'fireModel';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = "\n    <div class=\"modal-content\">\n        <span class=\"close\" onclick=\"hideFireMedical()\">&times;</span>\n        <h3>Fire Assistance</h3>\n        <div class=\"img-container\">\n            <img src=\"assets/imgs/fire.png\" alt=\"Medical Logo\" height=\"40\">\n        </div>\n        <form id=\"healthForm\">\n    <div class=\"form-group\">\n        <label for=\"campusName\">Campus Name</label>\n        <input type=\"text\" id=\"campusName\" name=\"campusName\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"city\">City/Town Name</label>\n        <input type=\"text\" id=\"city\" name=\"city\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"address\">Address</label>\n        <input type=\"text\" id=\"address\" name=\"address\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"location\">Location</label>\n        <input type=\"text\" id=\"location\" name=\"location\" required readonly>\n        <button type=\"button\" onclick=\"getLocation()\">Get My Location</button>\n    </div>\n    <button class=\"submit\" type=\"button\" onclick=\"handleFire()\">Submit</button>\n</form>\n    </div>\n";
    document.body.appendChild(modal);
  } else {
    existingModal.style.display = 'block';
  }
}

function hideFireMedical() {
  var existingModal = document.getElementById('fireModel');
  existingModal.style.display = 'none';
}

function showSefetyModel() {
  var existingModal = document.getElementById('sefetyModel');

  if (!existingModal) {
    var modal = document.createElement('div');
    modal.id = 'sefetyModel';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = "\n            <div class=\"safety-modal-content\">\n                <span class=\"close\" onclick=\"hideSefetyModel()\">&times;</span>\n                \n                <div class=\"container book\">\n                    <div class=\"row page\">\n                        <div class=\"col-lg-6 left-page\">\n                            <h3>Safety Measures</h3>\n                            <h4>Fire Safety</h4>\n                            <ul class=\"left-page-list\">\n                                <li>Exit the building immediately using the nearest exit.</li>\n                                <li>If trained, use a fire extinguisher to put out small fires.</li>\n                                <li>Avoid elevators and use stairs during a fire evacuation.</li>\n                                <li>Call emergency services once you are safe.</li>\n                            </ul>\n                            <h4>First Aid</h4>\n                            <ul class=\"left-page-list\">\n                                <li>Apply pressure to stop bleeding.</li>\n                                <li>Use a clean cloth or bandage to cover wounds.</li>\n                                <li>Keep the injured person calm and comfortable.</li>\n                                <li>Seek medical attention immediately.</li>\n                            </ul>\n                        </div>\n                        <div class=\"col-lg-6 right-page\">\n                            <h3>Emergency Steps</h3>\n                            <h4>Security Measures</h4>\n                            <ul class=\"right-page-list\">\n                                <li>Report stolen items to security or local authorities immediately.</li>\n                                <li>Secure your belongings and avoid leaving valuables unattended.</li>\n                                <li>Be vigilant and aware of your surroundings at all times.</li>\n                                <li>Keep emergency contact numbers readily available.</li>\n                            </ul>\n                            <h4>General Safety Tips</h4>\n                            <ul class=\"right-page-list\">\n                                <li>Always have a first aid kit accessible.</li>\n                                <li>Participate in safety drills to be prepared for emergencies.</li>\n                                <li>Know the location of exits and safety equipment in your building.</li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
    document.body.appendChild(modal);
  } else {
    existingModal.style.display = 'block';
  }
}

function hideSefetyModel() {
  var existingModal = document.getElementById('sefetyModel');
  existingModal.style.display = 'none';
}

function medicalDisplay(id, userId, campus, DateTime, status, city) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"medicalView.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Medical Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                        <p>Campus: <span>").concat(campus, "</span></p>\n                        <p>City: <span>").concat(city, "</span></p>\n                        <p>Status: <span>").concat(status, "</span></p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function securityDisplay(id, userId, campus, DateTime, securityType, city) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"securityView.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Security Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                        <p>Campus: <span>").concat(campus, "</span></p>\n                         <p>City: <span>").concat(city, "</span></p>\n                        <p>Security Type: <span>").concat(securityType, "</span></p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function fireDisplay(id, userId, campus, DateTime, city) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"fireViewsos.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Fire Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                        <p>Campus: <span>").concat(campus, "</span></p>\n                         <p>City: <span>").concat(city, "</span></p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function sosMedicalDisplay(id, userId, DateTime, status) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"medicalViewsos.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Medical Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                        <p>Status: <span>").concat(status, "</span></p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function sosSecurityDisplay(id, userId, DateTime, securityType) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"securityViewsos.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Security Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                        <p>Security Type: <span>").concat(securityType, "</span></p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function sosFireDisplay(id, userId, DateTime) {
  var html = "\n        <div class=\"col-md-12\">\n            <a href=\"fireViewsos.html?itemID=".concat(id, "&userID=").concat(userId, "\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <i class=\"bi bi-bell-fill\"></i>\n                        <p>Fire Assistant Report</p>\n                        <p class=\"dateTime\">").concat(DateTime, "</p>\n                    </div>\n                    <div class=\"card-body\">\n                    </div>\n                </div>\n            </a>\n        </div>\n    ");
  return html;
}

function showMessageModel() {
  var existingModal = document.getElementById('messageModel');

  if (!existingModal) {
    var modal = document.createElement('div');
    modal.id = 'messageModel';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = "\n         <section class=\"successful-message-section\">\n\n     \n        <div class=\"modal-content\">\n            <span class=\"close\" onclick=\"hidemessageModel()\">&times;</span>\n                <h2>Report Received</h2>\n                <i class=\"bi bi-check2-circle\"></i>\n                <p class=\"successMessage\">Your report has been successfully received. Help is on its way!</p>\n        <button class=\"btnSuccess\" type=\"button\" onclick=\"hidemessageModel()\">oky</button>\n        </div>\n           </section>\n        ";
    document.body.appendChild(modal);
  } else {
    existingModal.style.display = 'block';
  }
}

function hidemessageModel() {
  var modal = document.getElementById('messageModel');

  if (modal) {
    modal.style.display = 'none';
  }
}
//# sourceMappingURL=components.dev.js.map
