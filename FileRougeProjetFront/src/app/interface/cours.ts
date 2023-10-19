export interface RequestResponse {
    status: boolean
    message: string
    Cours: Cours
}

export interface Cours {
    id: number
    etat: number
    semestre: Semestre
    professeur: Professeur
    module: Module
    HeureGlobal: number
    classe: Classe[]
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

export interface Classe {
    id: number
    classe: Classe2
    annee: Annee
}

export interface Classe2 {
    id: number
    libelle: string
    effectif: number
}

export interface Annee {
    id: number
    libelle: string
}
