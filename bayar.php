<?php
// Koneksi ke database (ubah sesuai dengan informasi database Anda)
$host = "localhost"; // Host database
$username = "glacemyi_glace"; // Username database
$password = "Glace12345678"; // Password database
$dbname = "glacemyi_pembayaran"; // Nama database

// Menghubungkan ke database
$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// Ambil data dari formulir HTML
$nama = $_POST['nama'];
$email = $_POST['email'];
$telp = $_POST['telp'];

$metode_pembayaran = "";

if(isset($_POST['metode_pembayaran'])){
    if(is_array($_POST['metode_pembayaran'])){
        $metode_pembayaran = implode(', ', $_POST['metode_pembayaran']);
    } else {
        $metode_pembayaran = $_POST['metode_pembayaran'];
    }
}

// Query untuk menyimpan data ke dalam tabel di database (sesuaikan dengan struktur tabel Anda)
$sql = "INSERT INTO payments (nama, email, telp, metode_pembayaran) VALUES ('$nama', '$email', '$telp', '$metode_pembayaran')";

if (mysqli_query($conn, $sql)) {
    mysqli_close($conn);
    header("Location: paymentsc.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
