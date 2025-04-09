export interface UpdatePwaPayload {
  appId: string;
  adminId: string;
  language: string | undefined | null;
  country: string | undefined;
  appTitle: string | undefined | null;
  appSubTitle: string | undefined | null;
  hundredPlus: string | undefined | null;
  about: string | undefined | null;
  collectionId?: string | undefined | null;
  descriptionId?: string | undefined | null;
  commentId?: string | undefined | null;
  isExist: boolean;
}
