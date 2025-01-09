# Plume - Assistant Juridique Intelligent 🪶

## Description 📝
Plume est un système d'IA en trois étapes conçu pour accompagner les juristes dans leurs recherches juridiques complexes. Il combine une interface intuitive avec différents LLMs pour analyser et organiser l'information juridique de manière intelligente et adaptée à leur processus de recherche.

### Architecture du système 🏗️

#### Étape 1: Dialogue initial et clarification 💬
- Interface de chat entre l'utilisateur et LLM1
- Clarification et détermination des faits juridiques
- Génération et validation du résumé des faits
- Formulation et validation de la question de droit
- Transformation en requête pour le modèle d'embedding

#### Étape 2: Interface d'analyse multi-dashboard 🖥️
##### Dashboard Principes (Phase actuelle) 📊
- Interface visuelle en trois colonnes :
  - Sources internes (dossiers du cabinet)
  - Jurisprudences pertinentes
  - Doctrine et adages
- Système de gestion avec bibliothèque/corbeille
- Chat intégré avec LLM1 pour l'assistance continue
- Fonctionnalités de validation et de tri
- Métadonnées et système de tags
- Classification par pertinence
- Liens vers les documents sources

##### Dashboard Normes (En développement) ⚖️
- Traitement automatisé par LLM3 (fine-tuné)
- Hiérarchisation selon Kelsen
- Distinction règles impératives/supplétives
- Syllogisme juridique automatisé
- Système de validation utilisateur
- Présentation hiérarchique des normes

#### Étape 3: Analyse finale et synthèse 📋
- Combinaison des analyses normatives et principielles
- Génération de rapport structuré
- Recommandations juridiques
- Synthèse des éléments validés

## État du Projet 🚀
- Phase actuelle : Développement du dashboard Principes (Étape 2)
- Dernière mise à jour : 09 janvier 2024
- Version : 0.1.0

### Progression
#### Réalisé ✓
- Structure initiale du projet
- Configuration React/Vite
- Configuration TailwindCSS
- Architecture des composants React (Dashboard Principes)
- Structure de données initiale
- Interface visuelle de base

#### En cours 🔄
- Intégration du LLM1
- Configuration du système de chat
- Système de gestion bibliothèque/corbeille
- Interaction avec les documents

#### À venir 🎯
- Développement du dashboard Normes
- Intégration du LLM3
- Backend Python
- Tests d'intégration
- Déploiement initial

## Structure du Projet 🗂️
```
legal-assistant-dashboard/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/        # Composants React
│   │   │   ├── Chat/         # Interface de chat
│   │   │   ├── Dashboard/    # Interface principale
│   │   │   │   └── Sections/ # Sections du dashboard
│   │   │   ├── Library/      # Gestion bibliothèque
│   │   │   └── Common/       # Composants partagés
│   │   ├── context/          # Gestion d'état global
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── services/         # Services et API
│   │   └── data/             # Données statiques/types
├── server/                    # Backend (à venir)
│   ├── llm/                  # Gestion des LLMs
│   └── api/                  # Routes API
├── README.md                 # Documentation principale
├── CHANGELOG.md              # Journal des modifications
└── .gitignore               # Fichiers ignorés
```

## Spécifications Techniques 🛠️

### Frontend 🎨
- React 19 avec TypeScript
- Vite pour le bundling
- TailwindCSS pour le styling
- Lucide React pour les icônes
- État global avec Context API
- Composants modulaires et réutilisables

### Backend (planifié) ⚙️
- Python pour le serveur
- FastAPI pour l'API REST
- Modèles LLM :
  - LLM1 : Modèle Llama pour l'interaction générale
  - LLM3 : Version fine-tunée pour le traitement des normes

## Prérequis 📋
- Node.js (v20.18.0 recommandé)
- Python 3.x
- Git
- macOS, Linux, ou Windows

## Installation 💻

### Frontend ⚡
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd legal-assistant-dashboard

# Installation des dépendances frontend
cd client
npm install

# Lancer le serveur de développement
npm run dev
```

Le serveur de développement sera accessible sur http://localhost:5173

### Backend (à venir) 🔧
Instructions de configuration du backend en développement.

## Fonctionnalités Principales du Dashboard Principes 🎯

### Visualisation 👁️
- Interface à trois colonnes pour différentes sources
- Système de cartes pour chaque élément juridique
- Indicateurs de pertinence visuels
- Affichage hiérarchique des informations

### Interaction 🤝
- Système de validation/rejet des éléments
- Marquage des éléments intéressants
- Gestion bibliothèque/corbeille
- Chat intégré avec LLM1
- Navigation entre documents liés

### Gestion des données 📊
- Classification automatique
- Système de tags
- Métadonnées de pertinence
- Historique des interactions
- Sauvegarde des sélections

## Guide de Contribution 🤝
Instructions à venir

## Licence 📜
À définir

## Contact 📬
Instructions de contact à venir