# BrowserFingerPrintingPoc

This project is a straightforward Express application that, upon request, displays the client cipher suites involved in the TLS handshake and insert it in a mongo database.

```bash
cd BrowserFingerPrintingPoc
```
Fist add your authentication URI in the .env file


Then run those commands:
```bash
npm install
```

```bash
node index.js
```

```bash
curl -k https://localhost:443/test
```