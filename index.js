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

    <form id="orderForm">
      <label>Your Phone Number</label>
      <input type="text" name="phone" placeholder="Enter your phone number" required>

      <label>Select MTN Bundle</label>
      <select name="mtn_bundle">
        <option value="">--Select MTN Bundle--</option>
        <option value="1GB - 6GHC">1GB → ₵6</option>
        <option value="2GB - 11GHC">2GB → ₵11</option>
        <option value="3GB - 17GHC">3GB → ₵17</option>
        <option value="4GB - 22GHC">4GB → ₵22</option>
      </select>

      <label>Select Vodafone Bundle</label>
      <select name="vodafone_bundle">
        <option value="">--Select Vodafone Bundle--</option>
        <option value="5GB - 25GHC">5GB → ₵25</option>
        <option value="10GB - 50GHC">10GB → ₵50</option>
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

  <script>
    const botToken = "7976271753:AAH_OTE-1gd0eP6i4sMPjcuxAXQq7Ql4htk"; // ⚠ visible in page source!
    const chatId = "8441062430"; // your Telegram chat ID

    document.getElementById("orderForm").addEventListener("submit", function(event){
      event.preventDefault();

      const form = event.target;
      const phone = form.phone.value;
      const mtn = form.mtn_bundle.value || "Not selected";
      const vod = form.vodafone_bundle.value || "Not selected";
      const screenshot = form.screenshot.files[0];

      // send text details first
      const message = `📩 New Bundle Order\n\n📱 Phone: ${phone}\n📡 MTN: ${mtn}\n📡 Vodafone: ${vod}\n`;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });

      // send screenshot (if uploaded)
      if (screenshot) {
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", screenshot);

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: formData
        });
      }

      // confirmation alert
      alert("✅ You will receive your bundle within 5–20 minutes.");
      form.reset();
    });
  </script>
</body>
</html>
