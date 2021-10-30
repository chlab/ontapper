# Ontapper

Alternative taplist for http://ontapbern.ch

This is a project to play around with Svelte, Tailwind, Firebase and Azure Static Web Apps.

It's deployed at https://kind-sky-0e327e803.azurestaticapps.net/

## Development

```
$ npm start
```

Open dev server at https://localhost:4280/

### HTTPS

Service workers require the app to be served over https. There is an ssl cert and key for development in dev/. To install as a trusted cert on your system, install [mkcert](https://github.com/FiloSottile/mkcert) and run:

```
$ mkcert -install
$ mkcert -key-file dev/key.pem -cert-file dev/cert.pem localhost 127.0.0.1
```