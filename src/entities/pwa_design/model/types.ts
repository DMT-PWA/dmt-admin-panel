export interface IDesign<T> {
  pwa_title: string | null;
  languages: object[];
  pwa_tags: object[];
  collections: T;
  isChanged: boolean;
  appData: object
}
