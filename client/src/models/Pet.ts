export type PetItemType = {
  id: number
  petUserId: number
  petType: number
  petName: string
  petBreed: string
  petGender: string
  petAge: number
  petIsSprayed: boolean
  petAbout: string
}
export type PetResponseType = PetItemType[]