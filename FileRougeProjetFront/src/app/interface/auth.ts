export interface Auth {
    notification: any
    info : NewReponse
    token: string
    user : any | null
}
export interface NewReponse {
    status: boolean
    message: string
}
