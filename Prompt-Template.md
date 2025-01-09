# Guide de Structuration des Données - Interface Plume

## 🎯 Objectif
Ce guide définit la structure requise pour formater les données juridiques qui seront affichées dans l'interface Plume.

## 📋 Structure Générale

### En-tête (Obligatoire)
```typescript
header: {
    factsummary: string;    // Résumé concis des faits
    legalquestion: string;  // Question juridique formulée
}
```

### Éléments par Section

Chaque élément (jurisprudence, source, doctrine, adage) doit suivre cette structure :

```typescript
{
    id: string;          // Identifiant unique (ex: "juris-1", "src-1")
    type: ContentType;   // "jurisprudence" | "source" | "doctrine" | "adage"
    
    // Données d'affichage dans le tableau de bord (Obligatoire)
    displayData: {
        title: string;           // Titre court et descriptif
        summary: string;         // Résumé en 1-2 phrases
        date?: string;          // Format flexible (ex: "31 janvier 2014" ou "15/03/2021")
        relevanceScore: number; // Score de 0 à 100
        isPrimary?: boolean;    // Pour les jurisprudences principales. La valeur True n'est que pour la jurisprudence ayant le relevanceScore le plus élevé.
        tags: string[];        // Liste de tags (peut être vide)
    },

    // Métadonnées (Optionnel mais recommandé)
    metadata?: {
        link?: string;          // Lien vers la source
        relatedDocs?: Array<{   // Documents similaires
            id: string;
            title: string;
            summary: string;
            date?: string;
            link?: string;
        }>;
    },

    // Contenu détaillé (Obligatoire)
    detailContent: {
        type: ContentType;
        header: {
            title: string;
            date?: string;
            reference?: string;
            relevanceScore: number;
            // Champs spécifiques selon le type
            jurisdiction?: string;    // Pour jurisprudence
            chamber?: string;         // Pour jurisprudence
            dossierNum?: string;      // Pour source
            author?: string;          // Pour doctrine
            publication?: string;     // Pour doctrine
            category?: string;        // Pour adage
        },
        relevanceNote: {
            score: number;
            explanation: string;     // Explication du score de pertinence
        },
        mainContent: {
            summary: string;
            sections: Array<{
                title: string;
                type: "text" | "numbered" | "list";
                content: string | Array<{key: string; value: string}>;
            }>;
        },
        actions: {
            tags: string[];
        }
    }
}
```

## 📝 Règles de Formatage

### 1. Règles Générales
- IDs : Préfixer selon le type ("juris-", "src-", "doc-", "adage-")
- Dates : Format cohérent par section
- Scores : Entre 0 et 100, nombre entier
- Tags : Sans espaces, préfixés de #

### 2. Par Type de Document

#### Jurisprudence
```typescript
{
    id: "juris-[numéro]",
    type: "jurisprudence",
    displayData: {
        title: "[Juridiction], [date], [numéro]",
        summary: "Résumé en une phrase de la décision",
        relevanceScore: number,  // Score élevé (>85) pour les décisions très pertinentes
        isPrimary: boolean      // true pour la jurisprudence principale
    }
}
```

#### Source Interne
```typescript
{
    id: "src-[numéro]",
    type: "source",
    displayData: {
        title: "Dossier #[année]-[numéro]",
        summary: "Description courte du dossier",
        date: "[JJ/MM/AAAA]",
        relevanceScore: number
    }
}
```

#### Doctrine
```typescript
{
    id: "doc-[numéro]",
    type: "doctrine",
    displayData: {
        title: "[Publication], [année]",
        summary: "Résumé de l'article ou de l'ouvrage",
        relevanceScore: number
    }
}
```

#### Adage
```typescript
{
    id: "adage-[numéro]",
    type: "adage",
    displayData: {
        title: "[Titre de l'adage]",
        summary: "Explication concise",
        relevanceScore: number
    }
}
```

## ⚠️ Points d'Attention

### Contenu Obligatoire
1. `id` et `type` pour chaque élément
2. `displayData` avec titre et résumé
3. `relevanceScore` pour le tri
4. `detailContent` structuré

### Bonnes Pratiques
1. Résumés : 1-2 phrases maximum dans displayData
2. Scores de pertinence :
   - 90-100 : Très pertinent
   - 80-89 : Pertinent
   - 70-79 : Moyennement pertinent
   - <70 : Peu pertinent

3. Tags :
   - Utiliser des mots-clés pertinents
   - Format : camelCase ou kebab-case
   - Pas d'espaces ni caractères spéciaux

4. Documents liés :
   - Limiter à 3-5 documents maximum
   - Ordonner par pertinence

### Points Optionnels
1. Dates pour les adages
2. Liens externes
3. Tags initiaux (peuvent être ajoutés par l'utilisateur)
4. Documents liés pour sources internes

## 🔍 Exemple Complet
```typescript
{
    id: "juris-1",
    type: "jurisprudence",
    displayData: {
        title: "Conseil d'État, 31 janvier 2014, n°362444",
        summary: "Le caractère ridicule du nom constitue un motif légitime de changement",
        date: "31 janvier 2014",
        relevanceScore: 95,
        isPrimary: true,
        tags: ["changementNom", "motifLegitime"]
    },
    metadata: {
        link: "https://...",
        relatedDocs: [
            {
                id: "rel-1",
                title: "CE, 12 mars 2012, n°347678",
                summary: "Cas similaire de changement de nom",
                date: "12 mars 2012"
            }
        ]
    },
    detailContent: {
        // [Structure détaillée comme précédemment définie]
    }
}
```
