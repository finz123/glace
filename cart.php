<?php
// Replace these with your actual database credentials
$host = 'localhost';
$dbname = 'glacemyi_shopingcart';
$username = 'glacemyi_glace';
$password = 'Glace12345678';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// ...
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if cart data is submitted
    if (isset($_POST['cart_items']) && !empty($_POST['cart_items'])) {
        $cartItems = json_decode($_POST['cart_items'], true);

        // Loop through the cart items and insert/update them into the database
        foreach ($cartItems as $item) {
            $itemName = $item['item_name'];
            $itemPrice = $item['item_price'];
            $itemQuantity = $item['item_quantity']; // This should be added in the JavaScript part

            // Check if the item already exists in the cart_items table
            $stmt = $conn->prepare("SELECT id FROM cart_items WHERE item_name = :item_name");
            $stmt->bindParam(':item_name', $itemName);
            $stmt->execute();
            $existingItem = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingItem) {
                // If the item exists, update its quantity
                $itemId = $existingItem['id'];
                $stmt = $conn->prepare("UPDATE cart_items SET item_price = :item_price, quantity = :quantity WHERE id = :id");
                $stmt->bindParam(':item_price', $itemPrice);
                $stmt->bindParam(':quantity', $itemQuantity);
                $stmt->bindParam(':id', $itemId);
                $stmt->execute();
            } else {
                // If the item doesn't exist, insert it into the cart_items table
                $stmt = $conn->prepare("INSERT INTO cart_items (item_name, item_price, quantity) VALUES (:item_name, :item_price, :quantity)");
                $stmt->bindParam(':item_name', $itemName);
                $stmt->bindParam(':item_price', $itemPrice);
                $stmt->bindParam(':quantity', $itemQuantity);
                $stmt->execute();
            }
        }

       
    }
}
// ...

