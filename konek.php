<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $Name = $_POST["Name"];
    $Phone = $_POST["PhoneNumber"];
    $Email = $_POST["Email"];
    $Message = $_POST["Message"];

    $host = 'localhost';
    $database = 'glacemyi_ecalg';
    $username = 'glacemyi_glace';
    $password = 'Glace12345678';

    try {
        // Create a new PDO instance
        $pdo = new PDO("mysql:host=$host; dbname=$database", $username, $password);

        // Set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare the SQL statement
        $stmt = $pdo->prepare("INSERT INTO contact (Name, PhoneNumber, Email, Message) VALUES (:Name, :PhoneNumber, :Email, :Message)");

        // Bind parameters to the prepared statement
        $stmt->bindParam(':Name', $Name, PDO::PARAM_STR);
        $stmt->bindParam(':PhoneNumber', $Phone, PDO::PARAM_STR);
        $stmt->bindParam(':Email', $Email, PDO::PARAM_STR);
        $stmt->bindParam(':Message', $Message, PDO::PARAM_STR);

        // Execute the prepared statement
        $stmt->execute();

        // Close the database connection
        $pdo = null;

        

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
    header("Location: index.html");
    exit();
}
?>

<?php

?>

