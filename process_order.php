<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = $_POST['firstName'];
    $lastName  = $_POST['lastName'];
    $address   = $_POST['address'];
    $city      = $_POST['city'];
    $county    = $_POST['county'];
    $phone     = $_POST['phone'];
    $email     = $_POST['email'];
    $notes     = $_POST['notes'];
    $orderData = json_decode($_POST['orderData'], true);
    $orderTotal = $_POST['orderTotal'];
    $paymentMethod = $_POST['paymentMethod'];

    $to = "anne@globalautotechs.com"; // 👉 replace with your email
    $subject = "New Order from $firstName $lastName";
    
    $message = "📦 New Order Details\n\n";
    $message .= "Name: $firstName $lastName\n";
    $message .= "Address: $address, $city, $county\n";
    $message .= "Phone: $phone\n";
    $message .= "Email: $email\n";
    $message .= "Payment Method: $paymentMethod\n\n";
    $message .= "Order Notes: $notes\n\n";
    $message .= "Products:\n";

    foreach ($orderData as $item) {
        $message .= "- {$item['name']} x {$item['quantity']} (Ksh " . ($item['price'] * $item['quantity']) . ")\n";
    }

    $message .= "\nTotal: Ksh $orderTotal\n";

    $headers = "From: anne@globalautotechs.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
