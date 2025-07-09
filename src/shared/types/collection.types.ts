export interface ICollection {
  _id: string;
  collectionImage: string | null;
  images: (string | null)[];
  collectionName: string | null;
}
