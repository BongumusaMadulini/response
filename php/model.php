<?php
require_once 'database.php';

date_default_timezone_set("Africa/Johannesburg");
session_start();
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

class Model extends dbc
{

    public function getUserLogin($email, $password)
    {
        try {
            $auth = $this->getAuth();
            $signInResult = $auth->signInWithEmailAndPassword($email, $password);
            $user = $auth->getUser($signInResult->data()['localId']);
            if ($user) {
                if ($user->emailVerified) {
                    $database = $this->getDatabase();
                    $userData = $database->getReference('users/' . $user->uid)->getValue();
                    if ($userData && isset($userData['usertype'])) {
                        $userType = $userData['usertype'];
                        $_SESSION['userID'] = $user->uid;
                        return ["success" => true, "message" => "Login successful", "user" => [
                            "userID" => $user->uid,
                            "userType" => $userType,
                        ]];
                    } else {
                        return ["success" => false, "message" => "User type not found"];
                    }
                } else {
                    return ["success" => false, "message" => "Email not verified. Please verify your email before logging in."];
                }
            } else {
                // User not found
                return ["success" => false, "message" => "User not found. Please check your email and password."];
            }
        } catch (Kreait\Firebase\Auth\SignIn\FailedToSignIn $e) {
            if ($e->getCode() === 'INVALID_LOGIN_CREDENTIALS') {
                return ["success" => false, "message" => "Invalid email or password"];
            } else {
                error_log("Error in getUserLogin: " . $e->getMessage());
                return ["success" => false, "message" => "Invalid User Logins"];
            }
        } catch (Exception $e) {
            error_log("Error in getUserLogin: " . $e->getMessage());
            return ["success" => false, "message" => "Invalid User Logins"];
        }
    }


    public function NewUserPassword($email)
    {
        try {
            $auth = $this->getAuth();

            $user = $auth->getUserByEmail($email);

            if ($user) {
                $auth->sendPasswordResetLink($email);
                return ['success' => true, 'message' => 'Password reset email sent successfully'];
            } else {
                return ['success' => false, 'message' => 'No user found with that email'];
            }
        } catch (Kreait\Firebase\Exception\Auth\UserNotFound $e) {
            error_log("No user found with email: $email");
            return ['success' => false, 'message' => 'No user found with that email'];
        } catch (Exception $e) {
            error_log("Error in NewUserPassword: " . $e->getMessage());
            return ['success' => false, 'message' => 'Server error. Please try again later.'];
        }
    }

    public function newUsers($fullname, $email, $pass, $cellNumber)
    {
        try {
            $auth = $this->getAuth();

            $existingUser = null;
            try {
                $existingUser = $auth->getUserByEmail($email);
            } catch (\Kreait\Firebase\Exception\Auth\UserNotFound $e) {
            }

            if ($existingUser) {
                return ["success" => false, "message" => "Email is already in use."];
            }

            $userProperties = [
                'email' => $email,
                'emailVerified' => false,
                'password' => $pass,
                'displayName' => $fullname,
                'disabled' => false,
            ];

            $createdUser = $auth->createUser($userProperties);
            $uid = $createdUser->uid;

            $link = $auth->sendEmailVerificationLink($email);

            $reference = $this->getDatabase()->getReference('users');
            $newUserData = [
                'fullname' => $fullname,
                'email' => $email,
                'cellNumber' => $cellNumber,
                'userID' => $uid,
                'usertype' => 'admin',
            ];

            $reference->getChild($uid)->set($newUserData);
            $_SESSION['userID'] = $uid;

            return ["success" => true, "message" => "User successfully registered. Please verify your email."];
        } catch (Exception $e) {
            error_log("Error in newUsers: " . $e->getMessage());
            return ["success" => false, "message" => "Registration Failed."];
        }
    }

    public function UserDetailsUpdate($email, $fullname, $cellNumber, $userID)
    {
        try {
            $auth = $this->getAuth();
            $userProperties = [
                'email' => $email,
                'displayName' => $fullname,
            ];
            $auth->updateUser($userID, $userProperties);

            $reference = $this->getDatabase()->getReference('users/' . $userID);
            $updatedUserData = [
                'fullname' => $fullname,
                'email' => $email,
                'cellNumber' => $cellNumber,
            ];
            $reference->update($updatedUserData);

            return ["success" => true, "message" => "User details successfully updated"];
        } catch (Exception $e) {
            error_log("Error in UserDetailsUpdate: " . $e->getMessage());
            return ["success" => false, "message" => "Update failed due to an exception."];
        }
    }

    public function userData($userID)
    {
        try {

            $reference = $this->getDatabase()->getReference('users/' . $userID);
            $result = $reference->getValue();

            if ($result) {
                return ['success' => true, 'data' => $result];
            } else {
                return ['success' => false, 'message' => 'No user data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }

    public function modicalData($campus, $status, $latitude, $longitude, $userID, $city)
    {
        try {

            $reference = $this->getDatabase()->getReference('medical');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();

            $medicalData = [
                'campus' => $campus,
                'status' => $status,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'city' => $city,
                'dateTime' => $dateTime,
                'id' => $id,
            ];

            $result = $reference->getChild($id)->set($medicalData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Insertinf data"];
            }

        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }

    public function securityData($campus, $securityType, $latitude, $longitude, $userID, $city)
    {
        try {

            $reference = $this->getDatabase()->getReference('security');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();

            $medicalData = [
                'campus' => $campus,
                'securityType' => $securityType,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'city' => $city,
                'dateTime' => $dateTime,
                'id' => $id,
            ];

            $result = $reference->getChild($id)->set($medicalData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Insertinf data"];
            }

        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }
    public function fireData($campus, $latitude, $longitude, $userID, $city)
    {
        try {
            $reference = $this->getDatabase()->getReference('fire');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();
            $fireData = [
                'id' => $id,
                'campus' => $campus,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'city' => $city,
                'dateTime' => $dateTime,
            ];

            $result = $reference->getChild($id)->set($fireData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Inserting data"];
            }
        } catch (Exception $e) {
            error_log("Error in fireData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to send report.'];
        }
    }

    public function getMedicalReports()
    {
        try {

            $database = $this->getDatabase();
            $reference = $database->getReference('medical');
            $snapshot = $reference->getSnapshot();
            $data = $snapshot->getValue();

            if ($data) {
                return array_values($data);
            } else {
                return ["success" => false, "message" => "No data found."];
            }
        } catch (Exception $e) {
            error_log("Error retrieving medical data: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to retrieve data due to an exception."];
        }
    }

    public function getSecurityReports()
    {
        try {

            $database = $this->getDatabase();
            $reference = $database->getReference('security');
            $snapshot = $reference->getSnapshot();
            $data = $snapshot->getValue();

            if ($data) {
                return array_values($data);
            } else {
                return ["success" => false, "message" => "No data found."];
            }
        } catch (Exception $e) {
            error_log("Error retrieving medical data: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to retrieve data due to an exception."];
        }
    }

    public function getFireReports()
    {
        try {

            $database = $this->getDatabase();
            $reference = $database->getReference('fire');
            $snapshot = $reference->getSnapshot();
            $data = $snapshot->getValue();

            if ($data) {
                return array_values($data);
            } else {
                return ["success" => false, "message" => "No data found."];
            }
        } catch (Exception $e) {
            error_log("Error retrieving medical data: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to retrieve data due to an exception."];
        }
    }

    public function getMedicalView($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('medical/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }
    public function getMedicalViewsos($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosMedical/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }

    public function getFireView($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('fire/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }
    public function getFireViewsos($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosFire/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }

    public function getSecurityView($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('security/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }
    public function getSecurityViewsos($id)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosSecurity/' . $id);
            $result = $reference->getValue();

            if ($result) {
                return [
                    'success' => true,
                    'data' => $result,
                ];

            } else {
                return ['success' => false, 'message' => 'No report data found'];
            }
        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch report data.'];
        }
    }

    public function sosSecurityPost($latitude, $longitude, $userID, $securityType)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosSecurity');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();

            $medicalData = [
                'securityType' => $securityType,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'dateTime' => $dateTime,
                'id' => $id,
            ];

            $result = $reference->getChild($id)->set($medicalData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Insertinf data"];
            }

        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }

    public function sosMedicalPost($latitude, $longitude, $userID, $status)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosMedical');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();

            $medicalData = [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'status' => $status,
                'dateTime' => $dateTime,
                'id' => $id,
            ];

            $result = $reference->getChild($id)->set($medicalData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Insertinf data"];
            }

        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }

    public function sosFirePost($latitude, $longitude, $userID)
    {
        try {

            $reference = $this->getDatabase()->getReference('sosFire');
            $dateTime = date('Y-m-d / H:i');
            $id = $reference->push()->getKey();

            $medicalData = [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'userID' => $userID,
                'dateTime' => $dateTime,
                'id' => $id,
            ];

            $result = $reference->getChild($id)->set($medicalData);
            if ($result) {
                return ["success" => true, "message" => "Report Sent Successfully."];
            } else {
                return ["success" => false, "message" => "Error on Insertinf data"];
            }

        } catch (Exception $e) {
            error_log("Error in userData: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch user data.'];
        }
    }

    public function getSosAllproducts()
    {
        $tables = ['sosMedical', 'sosFire', 'sosSecurity'];
        $allResults = [];

        foreach ($tables as $table) {
            try {
                $database = $this->getDatabase();
                $reference = $database->getReference($table);
                $snapshot = $reference->getSnapshot();
                $items = $snapshot->getValue();

                // Log raw items before filtering
                error_log("Raw data for $table: " . print_r($items, true));

                if ($items) {
                    // If you have any filtering logic, ensure it’s correct
                    $filteredItems = array_filter($items, function ($item) {
                        // Your filtering logic here, if any
                        return true; // Returning true to skip filtering for now
                    });

                    $allResults[$table] = array_values($filteredItems);
                } else {
                    $allResults[$table] = [];
                }
            } catch (Exception $e) {
                error_log("Error accessing table $table: " . $e->getMessage());
                $allResults[$table] = [];
            }
        }

        return $allResults;
    }

}
