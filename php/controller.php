<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once 'view.php';
$data = new View();

if (isset($_POST['function'])) {
    $fun = $_POST['function'];

    if ($fun == 'login') {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $response = $data->userLogin($email, $password);
        echo json_encode($response);
    }
    if ($fun == 'registerUser') {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $fullname = $_POST['fullname'];
        $cellNumber = $_POST['cellNumber'];

        $response = $data->userRegistration($fullname, $email, $password, $cellNumber);
        echo json_encode($response);

    }

    if ($fun == 'updatePassword') {
        $email = $_POST['email'];
        $response = $data->updateUserPassword($email);
        echo json_encode($response);

    }
    if ($fun == 'getUserData') {
        $userID = $_POST['userID'];
        $response = $data->getlogedUserDetails($userID);
        echo json_encode($response);

    }
    if ($fun == 'updateUser') {

        $email = $_POST['email'];
        $fullname = $_POST['fullname'];
        $cellNumber = $_POST['cellNumber'];
        $userID = $_POST['userID'];
        $data->updateUserDetails($email, $fullname, $cellNumber, $userID);
    }
    if ($fun == 'postMedicalData') {
        $campus = $_POST['campus'];
        $status = $_POST['status'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];
        $city = $_POST['city'];
        $data->postMedicalData($campus, $status, $latitude, $longitude, $userID, $city);
    }
    if ($fun == 'postsecurityData') {
        $campus = $_POST['campus'];
        $securityType = $_POST['securityType'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];
        $city = $_POST['city'];

        $data->postsecurityData($campus, $securityType, $latitude, $longitude, $userID, $city);
    }
    if ($fun == 'postFireData') {
        $campus = $_POST['campus'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];
        $city = $_POST['city'];

        $data->postFireData($campus, $latitude, $longitude, $userID, $city);
    }
    if ($fun == 'medicalReports') {
        $response = $data->medicalReports();
        echo json_encode($response);
    }
    if ($fun == 'securityReports') {
        $response = $data->securityReports();
        echo json_encode($response);
    }
    if ($fun == 'fireReports') {
        $response = $data->fireReports();
        echo json_encode($response);
    }
    if ($fun == 'medicalView') {
        $id = $_POST['itemId'];
        $response = $data->medicalView($id);
        echo json_encode($response);
    }
    if ($fun == 'medicalViewsos') {
        $id = $_POST['itemId'];
        $response = $data->medicalViewsos($id);
        echo json_encode($response);
    }

    if ($fun == 'securityViewsos') {
        $id = $_POST['itemId'];
        $response = $data->securityViewsos($id);
        echo json_encode($response);
    }
    if ($fun == 'fireViewsos') {
        $id = $_POST['itemId'];
        $response = $data->fireViewsos($id);
        echo json_encode($response);
    }

    if ($fun == 'securityView') {
        $id = $_POST['itemId'];
        $response = $data->securityView($id);
        echo json_encode($response);
    }
    if ($fun == 'fireView') {
        $id = $_POST['itemId'];
        $response = $data->fireView($id);
        echo json_encode($response);
    }

    if ($fun == 'sosMedical') {
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];
        $status = "Argent";

        $response = $data->sosMedical($latitude, $longitude, $userID, $status);
        echo json_encode($response);

    }
    if ($fun == 'sosFire') {
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];

        $response = $data->sosFire($latitude, $longitude, $userID);
        echo json_encode($response);

    }

    if ($fun == 'sosSecurity') {
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $userID = $_POST['userID'];
        $securityType = "Argent";

        $response = $data->sosSecurity($latitude, $longitude, $userID, $securityType);
        echo json_encode($response);

    }
    if ($fun == 'sosAllproducts') {
        $response = $data->sosAllproducts();
        if (!empty($response)) {
            echo json_encode(['success' => true, 'data' => $response]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found.']);
        }

    }

}
