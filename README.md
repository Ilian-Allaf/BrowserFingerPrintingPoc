# BrowserFingerPrintingPoc

This project is a straightforward Express application that, upon request, displays the client cipher suites involved in the TLS handshake.

```bash
node index.js
```

```bash
curl -k https://localhost:443/api/hello
```

curl -X POST http://localhost:443/send-cipher-suites