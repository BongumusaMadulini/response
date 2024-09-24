function navbar() {
    var html = `
        <header>
            <nav class="navbar isSteaky">
                <div class="container d-flex justify-content-between align-items-center">
                    <div class="row w-100 d-flex">
                        <p><i class="bi bi-envelope-at"></i>campussafety@info.co.za</p>
                        <p class="toHide"><i class="bi bi-geo-alt-fill"></i>Mangosuthu University Of Technology</p>
                        <p class="toHide"><i class="bi bi-telephone"></i>011 2356 1231</p>
                    </div>
                    <div class="row bottom-row">
                        <div class="logo">
                            <img src="assets/imgs/logo.png" alt="Logo" height="40">
                        </div>
                        <div class="link">
                            <a onclick="goToMainHtml()">Home</a>
                        </div>
                        <div class="account" onclick="goToAccHtml()">
                            <div class="account-icon-container"><i class="bi bi-person"></i></div>
                        </div>
                    </div>
               </div>
            </nav>
        </header>
    `;
    document.getElementById("navbar").innerHTML += html;
}

function navbarAdmin() {
    var html = `
        <header>
            <nav class="navbar isSteaky">
                <div class="container d-flex justify-content-between align-items-center">
                    <div class="row w-100 d-flex">
                        <p><i class="bi bi-envelope-at"></i>campussafety@info.co.za</p>
                        <p class="toHide"><i class="bi bi-geo-alt-fill"></i>Mangosuthu University Of Technology</p>
                        <p class="toHide"><i class="bi bi-telephone"></i>011 2356 1231</p>
                    </div>
                    <div class="row bottom-row">
                        <div class="logo">
                           <img src="assets/imgs/logo.png" alt="Logo" height="40">
                        </div>
                        <div class="link">
                            <a onclick="goToAdminHtml()">Home</a>
                        </div>
                        <div class="account" onclick="goToAccAdminHtml()">
                            <div class="account-icon-container"><i class="bi bi-person"></i></div>
                        </div>
                    </div>
               </div>
            </nav>
        </header>
    `;
    document.getElementById("navbarAdmin").innerHTML += html;
}


function showModalMedical() {

    var existingModal = document.getElementById('medicalModel');
    if (!existingModal) {
        var modal = document.createElement('div');
        modal.id = 'medicalModel';
        modal.className = 'modal';
        modal.style.display = 'block';

        modal.innerHTML = `
    <div class="modal-content">
        <span class="close" onclick="hideMedical()">&times;</span>
        <h3>Medical Assistance</h3>
        <div class="img-container">
            <img src="assets/imgs/medical.png" alt="Medical Logo" height="40">
        </div>
        <form id="healthForm">
            <div class="form-group">
                <label for="campusName">Campus Name</label>
                <input type="text" id="campusName" name="campusName" required>
            </div>
            <div class="form-group">
                <label for="healthStatus">Health Status</label>
                <input type="text" id="healthStatus" name="healthStatus" required>
            </div>
             <div class="form-group">
        <label for="city">City/Town Name</label>
        <input type="text" id="city" name="city" required>
    </div>
    <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
    </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" name="location" required readonly>
                <button type="button" onclick="getLocation()">Get My Location</button>
            </div>
            <button type="button" onclick="handleMadical()">Submit</button>
        </form>
    </div>
`;


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

        modal.innerHTML = `
    <div class="modal-content">
        <span class="close" onclick="hideSecurtyMedical()">&times;</span>
        <h3>Security Assistance</h3>
        <div class="img-container">
            <img src="assets/imgs/security.png" alt="Medical Logo" height="40">
        </div>
        <form id="healthForm">
            <div class="form-group">
                <label for="campusName">Campus Name</label>
                <input type="text" id="campusName" name="campusName" required>
            </div>
            <div class="form-group">
                <label for="securityType">Securty Type</label>
                <input type="text" id="securityType" name="securityType" required>
            </div>
            <div class="form-group">
        <label for="city">City/Town Name</label>
        <input type="text" id="city" name="city" required>
    </div>
    <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
    </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" name="location" required readonly>
                <button type="button" onclick="getLocation()">Get My Location</button>
            </div>
            <button class="submit" type="button" onclick="handleSecurity()">Submit</button>
        </form>
    </div>
`;


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

        modal.innerHTML = `
    <div class="modal-content">
        <span class="close" onclick="hideFireMedical()">&times;</span>
        <h3>Fire Assistance</h3>
        <div class="img-container">
            <img src="assets/imgs/fire.png" alt="Medical Logo" height="40">
        </div>
        <form id="healthForm">
    <div class="form-group">
        <label for="campusName">Campus Name</label>
        <input type="text" id="campusName" name="campusName" required>
    </div>
    <div class="form-group">
        <label for="city">City/Town Name</label>
        <input type="text" id="city" name="city" required>
    </div>
    <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
    </div>
    <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" name="location" required readonly>
        <button type="button" onclick="getLocation()">Get My Location</button>
    </div>
    <button class="submit" type="button" onclick="handleFire()">Submit</button>
</form>
    </div>
`;


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

        modal.innerHTML = `
            <div class="safety-modal-content">
                <span class="close" onclick="hideSefetyModel()">&times;</span>
                
                <div class="container book">
                    <div class="row page">
                        <div class="col-lg-6 left-page">
                            <h3>Safety Measures</h3>
                            <h4>Fire Safety</h4>
                            <ul class="left-page-list">
                                <li>Exit the building immediately using the nearest exit.</li>
                                <li>If trained, use a fire extinguisher to put out small fires.</li>
                                <li>Avoid elevators and use stairs during a fire evacuation.</li>
                                <li>Call emergency services once you are safe.</li>
                            </ul>
                            <h4>First Aid</h4>
                            <ul class="left-page-list">
                                <li>Apply pressure to stop bleeding.</li>
                                <li>Use a clean cloth or bandage to cover wounds.</li>
                                <li>Keep the injured person calm and comfortable.</li>
                                <li>Seek medical attention immediately.</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 right-page">
                            <h3>Emergency Steps</h3>
                            <h4>Security Measures</h4>
                            <ul class="right-page-list">
                                <li>Report stolen items to security or local authorities immediately.</li>
                                <li>Secure your belongings and avoid leaving valuables unattended.</li>
                                <li>Be vigilant and aware of your surroundings at all times.</li>
                                <li>Keep emergency contact numbers readily available.</li>
                            </ul>
                            <h4>General Safety Tips</h4>
                            <ul class="right-page-list">
                                <li>Always have a first aid kit accessible.</li>
                                <li>Participate in safety drills to be prepared for emergencies.</li>
                                <li>Know the location of exits and safety equipment in your building.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
    var html = `
        <div class="col-md-12">
            <a href="medicalView.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Medical Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                        <p>Campus: <span>${campus}</span></p>
                        <p>City: <span>${city}</span></p>
                        <p>Status: <span>${status}</span></p>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function securityDisplay(id, userId, campus, DateTime, securityType, city) {
    var html = `
        <div class="col-md-12">
            <a href="securityView.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Security Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                        <p>Campus: <span>${campus}</span></p>
                         <p>City: <span>${city}</span></p>
                        <p>Security Type: <span>${securityType}</span></p>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}
function fireDisplay(id, userId, campus, DateTime, city) {
    var html = `
        <div class="col-md-12">
            <a href="fireViewsos.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Fire Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                        <p>Campus: <span>${campus}</span></p>
                         <p>City: <span>${city}</span></p>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function sosMedicalDisplay(id, userId, DateTime, status) {
    var html = `
        <div class="col-md-12">
            <a href="medicalViewsos.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Medical Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                        <p>Status: <span>${status}</span></p>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function sosSecurityDisplay(id, userId, DateTime, securityType) {
    var html = `
        <div class="col-md-12">
            <a href="securityViewsos.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Security Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                        <p>Security Type: <span>${securityType}</span></p>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function sosFireDisplay(id, userId, DateTime) {
    var html = `
        <div class="col-md-12">
            <a href="fireViewsos.html?itemID=${id}&userID=${userId}">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-bell-fill"></i>
                        <p>Fire Assistant Report</p>
                        <p class="dateTime">${DateTime}</p>
                    </div>
                    <div class="card-body">
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function showMessageModel() {
    var existingModal = document.getElementById('messageModel');
    if (!existingModal) {
        var modal = document.createElement('div');
        modal.id = 'messageModel';
        modal.className = 'modal';
        modal.style.display = 'block';

        modal.innerHTML = `
         <section class="successful-message-section">

     
        <div class="modal-content">
            <span class="close" onclick="hidemessageModel()">&times;</span>
                <h2>Report Received</h2>
                <i class="bi bi-check2-circle"></i>
                <p class="successMessage">Your report has been successfully received. Help is on its way!</p>
        <button class="btnSuccess" type="button" onclick="hidemessageModel()">oky</button>
        </div>
           </section>
        `;

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
