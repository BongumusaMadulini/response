<?php
require_once 'model.php';

class View extends Model
{
    public function userLogin($email, $password)
    {
        return $this->getUserLogin($email, $password);
    }
    public function userRegistration($fullname, $email, $password, $cellNumber)
    {
        return $this->newUsers($fullname, $email, $password, $cellNumber);
    }

    public function updateUserPassword($email)
    {
        return $this->NewUserPassword($email);
    }
    public function getlogedUserDetails($userID)
    {
        return $this->userData($userID);
    }
    public function updateUserDetails($email, $fullname, $cellNumber, $userID)
    {
        $result = $this->UserDetailsUpdate($email, $fullname, $cellNumber, $userID);
        echo json_encode($result);
    }
    public function postMedicalData($campus, $status, $latitude, $longitude, $userID, $city)
    {
        $result = $this->modicalData($campus, $status, $latitude, $longitude, $userID, $city);
        echo json_encode($result);

    }
    public function postsecurityData($campus, $securityType, $latitude, $longitude, $userID, $city)
    {
        $result = $this->securityData($campus, $securityType, $latitude, $longitude, $userID, $city);
        echo json_encode($result);

    }
    public function postFireData($campus, $latitude, $longitude, $userID, $city)
    {
        $result = $this->fireData($campus, $latitude, $longitude, $userID, $city);
        echo json_encode($result);
    }
    public function medicalReports()
    {
        return $this->getMedicalReports();
    }
    public function fireReports()
    {
        return $this->getFireReports();
    }
    public function securityReports()
    {
        return $this->getSecurityReports();
    }
    public function medicalView($id)
    {
        return $this->getMedicalView($id);
    }
    public function medicalViewsos($id)
    {
        return $this->getMedicalViewsos($id);
    }

    public function securityViewsos($id)
    {
        return $this->getSecurityViewsos($id);
    }
    public function securityView($id)
    {
        return $this->getSecurityView($id);
    }
    public function fireView($id)
    {
        return $this->getFireView($id);
    }
    public function fireViewsos($id)
    {
        return $this->getFireViewsos($id);
    }

    public function sosMedical($latitude, $longitude, $userID, $status)
    {
        return $this->sosMedicalPost($latitude, $longitude, $userID, $status);

    }
    public function sosSecurity($latitude, $longitude, $userID, $securityType)
    {
        return $this->sosSecurityPost($latitude, $longitude, $userID, $securityType);

    }
    public function sosFire($latitude, $longitude, $userID)
    {
        return $this->sosFirePost($latitude, $longitude, $userID);

    }
    public function sosAllproducts()
    {
        return $this->getSosAllproducts();
    }
}
