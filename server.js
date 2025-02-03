const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Load SSL Certificate and Key
const options = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "iirsprivkey2023.key")),  // Replace with your key file path
  cert: fs.readFileSync(path.join(__dirname, "ssl", "iirsgovinmay24.pem")) // Replace with your cert file path
};

// Serve Vue static files (Assumes Vue is built using `npm run build`)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start HTTPS server
const PORT = 443; // Default HTTPS port
https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ Server running on https://localhost:${PORT}`);
});

const http = require("http");

// Redirect HTTP to HTTPS (using port 8080 instead of 80)
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(8085, () => {
  console.log("🔄 HTTP requests redirected to HTTPS on port 8080");
});
