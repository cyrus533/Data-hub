<?php
// ================= PHP SECTION =================

// Telegram Bot details
$botToken = "7976271753:AAH_OTE-1gd0eP6i4sMPjcuxAXQq7Ql4htk";
$chatId   = "8441062430"; // your Telegram chat id

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone     = $_POST['phone'] ?? '';
    $mtnBundle = $_POST['mtn_bundle'] ?? '';
    $vodBundle = $_POST['vodafone_bundle'] ?? '';

    // Upload screenshot if provided
    $screenshot = "";
    if (isset($_FILES['screenshot']) && $_FILES['screenshot']['error'] === 0) {
        $uploadDir = __DIR__ . "/uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = time() . "_" . basename($_FILES['screenshot']['name']);
        $targetFile = $uploadDir . $fileName;
        if (move_uploaded_file($_FILES['screenshot']['tmp_name'], $targetFile)) {
            $screenshot = $fileName;
        }
    }

    // Build Telegram message
    $message = "📩 New Bundle Order\n\n".
               "📱 Phone: $phone\n".
               "📡 MTN Bundle: $mtnBundle\n".
               "📡 Vodafone Bundle: $vodBundle\n".
               "🖼 Screenshot: " . ($screenshot ? $screenshot : "No file uploaded");

    // Send to Telegram
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text'    => $message,
        'parse_mode' => 'HTML'
    ];
    $options = [
        "http" => [
            "method"  => "POST",
            "header"  => "Content-Type:application/x-www-form-urlencoded\r\n",
            "content" => http_build_query($data)
        ]
    ];
    file_get_contents($url, false, stream_context_create($options));

    // Send confirmation to user
    echo "<script>alert('✅ You will receive your bundle within 5–20 minutes.'); window.location.href='index.php';</script>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyrus Data Hub</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: url('https://i.ibb.co/xSnW7gz/data-bg.jpg') no-repeat center center fixed;
      background-size: cover;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 420px;
      margin: 60px auto;
      background: rgba(0, 0, 0, 0.75);
      padding: 20px;
      border-radius: 12px;
      color: white;
      box-shadow: 0px 4px 15px rgba(0,0,0,0.6);
    }
    h1 {
      text-align: center;
      margin-bottom: 10px;
      color: #ff9800;
    }
    label {
      font-weight: bold;
      margin-top: 10px;
      display: block;
    }
    input, select {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border-radius: 6px;
      border: none;
    }
    input[type="file"] {
      background: #fff;
      color: #000;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #ff9800;
      border: none;
      color: #fff;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 12px;
    }
    button:hover {
      background: #e68900;
    }
    .info-box {
      background: rgba(255, 255, 255, 0.1);
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .footer {
      text-align: center;
      margin-top: 15px;
    }
    .footer a {
      color: #4CAF50;
      font-weight: bold;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Cyrus Data Hub</h1>

    <div class="info-box">
      <p>📌 <b>Payment Instructions:</b><br>
      Send money to: <b>0502376541 (Vodafone)</b><br>
      ✅ Vodafone users: send directly<br>
      ⚠ MTN users: select <b>Other Networks</b> when sending</p>
    </div>

    <form id="orderForm" action="" method="POST" enctype="multipart/form-data">
      <label>Your Phone Number</label>
      <input type="text" name="phone" placeholder="Enter your phone number" required>

      <label>Select MTN Bundle</label>
      <select name="mtn_bundle">
        <option value="">--Select MTN Bundle--</option>
        <option value="1GB - 6GHC">1GB → ₵6</option>
        <option value="2GB - 11GHC">2GB → ₵11</option>
        <option value="3GB - 17GHC">3GB → ₵17</option>
        <option value="4GB - 22GHC">4GB → ₵22</option>
        <option value="5GB - 26GHC">5GB → ₵26</option>
        <option value="6GB - 31GHC">6GB → ₵31</option>
        <option value="7GB - 35GHC">7GB → ₵35</option>
        <option value="8GB - 45GHC">8GB → ₵45</option>
        <option value="9GB - 50GHC">9GB → ₵50</option>
        <option value="10GB - 50GHC">10GB → ₵50</option>
        <option value="15GB - 67GHC">15GB → ₵67</option>
        <option value="20GB - 86GHC">20GB → ₵86</option>
        <option value="25GB - 135GHC">25GB → ₵135</option>
        <option value="30GB - 145GHC">30GB → ₵145</option>
        <option value="40GB - 165GHC">40GB → ₵165</option>
      </select>

      <label>Select Vodafone Bundle</label>
      <select name="vodafone_bundle">
        <option value="">--Select Vodafone Bundle--</option>
        <option value="5GB - 25GHC">5GB → ₵25</option>
        <option value="10GB - 50GHC">10GB → ₵50</option>
        <option value="15GB - 68GHC">15GB → ₵68</option>
        <option value="20GB - 85GHC">20GB → ₵85</option>
        <option value="30GB - 125GHC">30GB → ₵125</option>
        <option value="40GB - 147GHC">40GB → ₵147</option>
        <option value="50GB - 220GHC">50GB → ₵220</option>
      </select>

      <label>Upload Payment Screenshot</label>
      <input type="file" name="screenshot" accept="image/*" required>

      <button type="submit">Submit Order</button>
    </form>

    <div class="footer">
      📞 <a href="https://wa.me/233502376541" target="_blank">Customer Care: 0502376541</a><br>
      ⏰ Working Days: Monday – Saturday
    </div>
  </div>
</body>
</html>
