# BrowserFingerPrintingPoc

The docker compose contain two services. There is an apache reverse proxy that forward requests to a simple express api.

To start the app:

```bash
cd BrowserFingerPrintingPoc
```

```bash
docker compose up -d --build
```

Try to query:

```bash
curl https://localhost:443/test
```
