// initialState.ts
import { DashboardData } from '../types';

export const initialState: DashboardData = {
  header: {
    factsummary: "Une fille, âgée de 21 ans prénommée Sarah, de nationalité Française, a \"CROCHE\" pour nom de famille. Elle souhaite changer de nom de famille.",
    legalquestion: "Une personne majeure de nationalité française, dont l'association entre le prénom et le nom de famille a un caractère ridicule, peut-elle procéder au changement de son nom de famille ?"
  },

  jurisprudences: [
    {
      id: "juris-1",
      type: "jurisprudence",
      displayData: {
        title: "Conseil d'État, 31 janvier 2014, n°362444",
        summary: "Le caractère ridicule d'un nom patronymique constitue un motif légitime de changement de nom, particulièrement lorsqu'il est source de moqueries continues.",
        date: "31 janvier 2014",
        relevanceScore: 95,
        isPrimary: true,
        tags: []
      },
      detailContent: {
        type: "jurisprudence",
        header: {
          title: "Conseil d'État, 31 janvier 2014, n°362444",
          jurisdiction: "Conseil d'État",
          date: "31 janvier 2014",
          reference: "n°362444",
          relevanceScore: 95
        },
        relevanceNote: {
          score: 95,
          explanation: "Jurisprudence directement applicable traitant du caractère ridicule comme motif légitime de changement de nom"
        },
        mainContent: {
          summary: "Le caractère ridicule d'un nom patronymique constitue un motif légitime de changement de nom.",
          sections: [
            {
              title: "Exposé des faits",
              content: "Le requérant a demandé au tribunal administratif de Paris d'annuler la décision du garde des sceaux rejetant sa demande de changement de nom fondée sur le caractère ridicule de son patronyme.",
              type: "text"
            },
            {
              title: "Motifs principaux",
              content: [
                {
                  key: "1. Intérêt légitime",
                  value: "Le caractère ridicule du nom constitue un intérêt légitime quand il engendre des moqueries continues"
                },
                {
                  key: "2. Impact social",
                  value: "Les conséquences sur la vie sociale et professionnelle sont déterminantes"
                }
              ],
              type: "numbered"
            }
          ]
        },
        metadata: {
          link: "https://www.conseil-etat.fr/...",
          relatedDocs: [
            {
              id: "rel-1",
              title: "CE, 12 mars 2012, n°347678",
              summary: "Changement de nom accordé pour \"COCHON\" en raison des moqueries subies.",
              date: "12 mars 2012",
              link: "https://www.conseil-etat.fr/decision/347678"
            },
            {
              id: "rel-2",
              title: "CE, 2 février 2015, n°365262",
              summary: "Changement autorisé pour \"MOCHE\" considéré comme préjudiciable.",
              date: "2 février 2015",
              link: "https://www.conseil-etat.fr/decision/365262"
            }
          ]
        },
        actions: {
          tags: []
        }
      }
    }
  ],

  doctrine: [
    {
      id: "doc-1",
      type: "doctrine",
      displayData: {
        title: "Revue du Droit Civil, 2023",
        summary: "L'évolution de la jurisprudence en matière de changement de nom montre une prise en compte accrue du préjudice moral...",
        date: "2023",
        relevanceScore: 88,
        tags: []
      },
      detailContent: {
        type: "doctrine",
        header: {
          title: "L'évolution jurisprudentielle du changement de nom",
          author: "Laurence Gareil-Sutter",
          publication: "Revue du Droit Civil",
          date: "2023",
          relevanceScore: 88
        },
        relevanceNote: {
          score: 88,
          explanation: "Analyse récente de l'évolution jurisprudentielle favorable"
        },
        mainContent: {
          summary: "Étude approfondie de l'évolution jurisprudentielle en matière de changement de nom...",
          sections: [
            {
              title: "Analyse",
              content: "L'évolution récente de la jurisprudence montre une prise en compte croissante du préjudice moral dans l'appréciation des demandes de changement de nom...",
              type: "text"
            }
          ]
        },
        metadata: {
          link: "https://www.dalloz.fr/..."
        },
        actions: {
          tags: []
        }
      }
    }
  ],

  internalSources: [
    {
      id: "src-1",
      type: "source",
      displayData: {
        title: "Dossier #2021-47",
        summary: "Changement de nom - M. PÊTEUR - Accepté pour motif de moqueries récurrentes",
        date: "15/03/2021",
        relevanceScore: 90,
        tags: []
      },
      detailContent: {
        type: "source",
        header: {
          title: "Dossier #2021-47 - Changement de nom PÊTEUR",
          dossierNum: "#2021-47",
          date: "15/03/2021",
          relevanceScore: 90
        },
        relevanceNote: {
          score: 90,
          explanation: "Dossier récent avec motif similaire (caractère ridicule) ayant abouti à une décision favorable"
        },
        mainContent: {
          summary: "Changement de nom accordé pour motif de moqueries récurrentes ayant un impact professionnel démontré",
          sections: [
            {
              title: "Résumé de l'affaire",
              content: "Demande de changement de nom accordée en raison du caractère ridicule du patronyme et des moqueries associées",
              type: "text"
            },
            {
              title: "Points clés",
              content: [
                {
                  key: "Motif",
                  value: "Caractère ridicule du nom engendrant des moqueries systématiques"
                },
                {
                  key: "Issue",
                  value: "Favorable avec changement effectif immédiat"
                }
              ],
              type: "numbered"
            }
          ]
        },
        metadata: {
          link: "lien/vers/dossier/interne"
        },
        actions: {
          tags: []
        }
      }
    }
  ],

  adages: [
    {
      id: "adage-1",
      type: "adage",
      displayData: {
        title: "Procédure simplifiée de changement de nom",
        summary: "Description de la nouvelle procédure simplifiée de changement de nom et de son succès",
        date: "25 avril 2024",
        relevanceScore: 85,
        tags: []
      },
      detailContent: {
        type: "adage",
        header: {
          title: "Succès de la procédure simplifiée de changement de nom",
          category: "Procédure administrative",
          date: "25 avril 2024",
          relevanceScore: 85
        },
        relevanceNote: {
          score: 85,
          explanation: "Information actuelle sur la procédure simplifiée"
        },
        mainContent: {
          summary: "Analyse du succès de la nouvelle procédure simplifiée de changement de nom",
          sections: [
            {
              title: "Points clés",
              content: [
                {
                  key: "Usage",
                  value: "144 100 personnes ont utilisé la procédure"
                },
                {
                  key: "Délai",
                  value: "Environ un mois de traitement"
                }
              ],
              type: "numbered"
            }
          ]
        },
        metadata: {
          link: "https://www.service-public.fr/..."
        },
        actions: {
          tags: []
        }
      }
    }
  ]
};

export default initialState;