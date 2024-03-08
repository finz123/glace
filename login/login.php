<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $users = array(
        array('email' => 'user1@example.com', 'password' => 'password1'),
        array('email' => 'user2@example.com', 'password' => 'password2')
      );
      
    // Validate the form data (you can add more validation as per your requirements)
    if (empty($email) || empty($password)) {
        echo "Please fill in all the fields.";
    } else {
        // Database credentials
        $dbHost = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "ecalg";

        // Create a MySQLi object and establish a connection
        $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

        // Check the connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Query to check if the user exists in the database
        $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            // Successful login
            echo "Login successful! Welcome, " . $email . ".";
            // You can redirect the user to a dashboard or another page here
        } else {
            // Invalid credentials
            echo "Invalid email or password. Please try again.";
        }

        // Close the connection
        $conn->close();
    }
}
?>