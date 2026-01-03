<img width="1920" height="898" alt="image" src="https://github.com/user-attachments/assets/489edaa6-e62b-43c8-b1c9-307b6df68571" />

# EPGMealHub Backend

## Introduction

API RESTful pour la gestion des utilisateurs et des repas.

---

## Authentification

Certaines routes nécessitent un token JWT dans l'en-tête `Authorization` :

```
Authorization: Bearer <votre_token>
```

---

## Routes Repas (`/api/meals`)

### 1. Obtenir tous les repas

- **GET** `/api/meals`

**Réponse :**
```json
[
  {
    "_id": "664b1d...",
    "name": "Pizza",
    "price": 12.5,
    "description": "Pizza 4 fromages",
    "available": true,
    "image": "pizza.jpg",
    "discount": 0
  }
]
```

---

### 2. Créer un repas

- **POST** `/api/meals`
- **Body :**
```json
{
  "name": "Burger",
  "price": 8.5,
  "description": "Burger maison",
  "image": "burger.jpg"
}
```
**Réponse :**
```json
{
  "_id": "664b1e...",
  "name": "Burger",
  "price": 8.5,
  "description": "Burger maison",
  "available": true,
  "image": "burger.jpg",
  "discount": 0
}
```

---

### 3. Supprimer un repas

- **DELETE** `/api/meals/:id`

**Réponse :**
```json
{
  "message": "Repas supprimé"
}
```

---

### 4. Mettre à jour un repas

- **PUT** `/api/meals/:id`
- **Body :**
```json
{
  "name": "Pizza Royale",
  "price": 14
}
```
**Réponse :**
```json
{
  "_id": "664b1d...",
  "name": "Pizza Royale",
  "price": 14,
  "description": "Pizza 4 fromages",
  "available": true,
  "image": "pizza.jpg",
  "discount": 0
}
```

---

### 5. Obtenir un repas par ID

- **GET** `/api/meals/:id`

**Réponse :**
```json
{
  "_id": "664b1d...",
  "name": "Pizza",
  "price": 12.5,
  "description": "Pizza 4 fromages",
  "available": true,
  "image": "pizza.jpg",
  "discount": 0
}
```

---

## Routes Utilisateurs (`/api/users`)

> Les routes utilisateurs nécessitent un token d'admin sauf `/login`.

### 1. Créer un utilisateur (admin)

- **POST** `/api/users/register`
- **Headers :** `Authorization: Bearer <token_admin>`
- **Body :**
```json
{
  "username": "admin2",
  "password": "motdepasse",
  "role": "admin"
}
```
**Réponse :**
```json
{
  "message": "Utilisateur créé",
  "user": {
    "_id": "664b1f...",
    "username": "admin2",
    "role": "admin"
  }
}
```

---

### 2. Connexion utilisateur

- **POST** `/api/users/login`
- **Body :**
```json
{
  "username": "admin2",
  "password": "motdepasse"
}
```
**Réponse :**
```json
{
  "message": "Connexion réussie",
  "token": "<jwt_token>"
}
```

---

### 3. Obtenir tous les utilisateurs (admin)

- **GET** `/api/users/`
- **Headers :** `Authorization: Bearer <token_admin>`

**Réponse :**
```json
[
  {
    "_id": "664b1f...",
    "username": "admin2",
    "role": "admin"
  }
]
```

---

### 4. Obtenir un utilisateur par ID (admin)

- **GET** `/api/users/:id`
- **Headers :** `Authorization: Bearer <token_admin>`

**Réponse :**
```json
{
  "_id": "664b1f...",
  "username": "admin2",
  "role": "admin"
}
```

---

### 5. Modifier un utilisateur (admin)

- **PUT** `/api/users/:id`
- **Headers :** `Authorization: Bearer <token_admin>`
- **Body :**
```json
{
  "username": "admin3",
  "password": "nouveaupass",
  "role": "user"
}
```
**Réponse :**
```json
{
  "_id": "664b1f...",
  "username": "admin3",
  "role": "user"
}
```

---

### 6. Supprimer un utilisateur (admin)

- **DELETE** `/api/users/:id`
- **Headers :** `Authorization: Bearer <token_admin>`

**Réponse :**
```json
{
  "message": "Utilisateur supprimé"
}
```

---

### 7. Vérifier le rôle admin

- **GET** `/api/users/checkadmin`
- **Headers :** `Authorization: Bearer <token_admin>`

**Réponse :**
```json
{
  "message": "Vous êtes un administrateur"
}
```

---

## Configuration

- Créez un fichier `.env` :
  ```
  JWT_SECRET=super_secret_jwt_key
  ```

- Lancez le serveur :
  ```
  npm install
  npm run dev
  ```

---

## Auteur

ouahid SAMRANI

![Use case diagram (1)](https://github.com/user-attachments/assets/c369b428-688e-4f3d-ac2b-f2a4bd1413bd)


