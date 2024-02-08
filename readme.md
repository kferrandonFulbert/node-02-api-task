# API TASK

``` npm

npm install express mariadb

```

## Créer une api avec node

Attention Il faut créer un middleware qui parse le corps des requetes en JSON

``` javascript

// Middleware 
app.use(express.json());

```

Renvoyer le resultat de la requetes en json

``` javascript

res.json(rows);

```
