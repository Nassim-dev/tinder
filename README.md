# IppssiAffinity (Clone Tinder)

## Description du projet

IppssiAffinity est un clone de Tinder développé dans le cadre d'un projet IPSSI. Cette application de rencontre s'inspire des fonctionnalités clés de Tinder tout en intégrant des éléments spécifiques à l'IPSSI.

## Fonctionnalités principales

- Authentification des utilisateurs
- Création et gestion de profils
- Système de swipe (like/dislike) pour les correspondances potentielles
- Chat en temps réel
- Notifications
- Téléchargement de photos et de vidéos
- Algorithme de correspondance (matching Elo) côté backend

## Structure du projet

### Backend - _Mohamed_

- Node.js avec Express.js
- TypeScript
- Base de données : PostgreSQL avec Prisma ou TypeORM
- Redis pour le caching et la gestion des sessions
- Authentification : JWT, OAuth 2.0 avec Passport.js
- Communication en temps réel : [Socket.io](http://Socket.io)
- Stockage de fichiers : AWS S3 ou Cloudinary
- Containerisation : Docker

### Frontend - _Nicolas_

- Développement de l'interface utilisateur
- Implémentation des fonctionnalités de swipe
- Intégration du chat et des notifications
- Design inspiré des couleurs de l'IPSSI

### Algorithmes et Modèles - _Nassim_

- Implémentation de l'algorithme de matching Elo
- Optimisation des correspondances basée sur :
- L'espace géographique (10 km)
- Les préférences physiques
- Développement de modèles pour la détection de contenu inapproprié

## Installation et configuration

Instructions détaillées pour l'installation et la configuration du projet à venir.

## Licence

Ce projet est développé dans le cadre d'un cursus éducatif à l'IPSSI. Tous droits réservés.
