export type Root = Classe[]

export interface Classe {
  id: number
  libelle: string
  effectif: number
  created_at: string
  updated_at: string
  filiere_id: any
  niveau_id: any
  deleted_at: any
}