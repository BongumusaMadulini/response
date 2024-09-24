<?php
require __DIR__ . '/../vendor/autoload.php';

use Kreait\Firebase\Auth;
use Kreait\Firebase\Factory;

class DBC
{
    private $database;
    private $auth;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(__DIR__ . '/responseapp-d5141-firebase-adminsdk-61jom-915b65a66a.json')
            ->withDatabaseUri('https://responseapp-d5141-default-rtdb.firebaseio.com');

        $this->database = $factory->createDatabase();
        $this->auth = $factory->createAuth();
    }

    public function getDatabase()
    {
        return $this->database;
    }

    public function getAuth()
    {
        return $this->auth;
    }
}