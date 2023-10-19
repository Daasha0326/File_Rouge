
export type Session =Data[]


export interface Data {
    id: number
    date: string
    debut: string
    fin: string
    etat: string
    salle: Salle
    annclasse_cour: AnnclasseCour
}

export interface Salle {
    id: number
    libelle: string
    numero: number
    place: number
    annee_id: any
}

export interface AnnclasseCour {
    id: number
    annee_classe_id: AnneeClasseId
    cour: Cour
}

export interface AnneeClasseId {
    id: number
    classe: Classe
    annee: Annee
}

export interface Classe {
    id: number
    libelle: string
    effectif: number
}

export interface Annee {
    id: number
    libelle: string
}

export interface Cour {
    id: number
    etat: string
    semestre: Semestre
    professeur: Professeur
    module: Module
    HeureGlobal: number
    classe: Classe2[]
}

export interface Semestre {
    id: number
    semestre: string
}

export interface Professeur {
    id: number
    nom: string
    prenom: string
    role: string
}

export interface Module {
    id: number
    libelle: string
}

export interface Classe2 {
    id: number
    classe: Classe3
    annee: Annee2
}

export interface Classe3 {
    id: number
    libelle: string
    effectif: number
}

export interface Annee2 {
    id: number
    libelle: string
}

