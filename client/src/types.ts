export type EXAMPLETYPE = {
  someValue: number;
};

export type RoomImageType = {
  id: number;
  link: string;
  roomId: number;
  createdAt: string;
  updatedAt: string;
};

export type RoomType = {
  id: number;
  roomAbout: string;
  roomPhoto: string;
  roomCapacity: number;
  roomPetType: number;
  roomPrice: number;
  RoomImages: RoomImageType[];
};

export type RoomsType = RoomType[];
