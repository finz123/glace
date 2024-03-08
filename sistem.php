<?php
// Database connection setup (change the credentials to match your database)
$connect = mysqli_connect("localhost", "root", "", "ecalg");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate the user credentials against the database
    $query = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($connect, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user_data = mysqli_fetch_assoc($result);
        if (($password == $user_data["password"])) {
            // Password matches, set session variables to track the logged-in user and their role
            header("Location: index.html");
            exit();}
        } else {
            echo "Invalid password";
        }
    } else {
        echo "Invalid username";
    }

?>