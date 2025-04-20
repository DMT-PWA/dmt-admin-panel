export type PwaCreate = {
  appId: string | null;
  descriptionId: string | null;
  commentId: string | null;
  currentStage: string;
  isChanged: boolean;
};

export interface UpdatePwaPayload {
  appId: string;
  adminId: string;
  language: string | undefined | null;
  displayId: string;
  country: string | undefined;
  appTitle: string;
  appSubTitle: string;
  hundredPlus: string | undefined | null;
  about: string | undefined | null;
  collectionId?: string | undefined | null;
  descriptionId?: string | undefined | null;
  commentId?: string | undefined | null;
  isExist: boolean;
}

export interface UpdatePwaResponse {
  _id: string;
  appId: string;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export type CreateInitPayload = {
  appId: string;
  adminId: string;
  language: string;
  country: string;
};
