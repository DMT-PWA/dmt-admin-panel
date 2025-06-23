export type checkbox = { id: number; value: boolean };

export interface IDescriptionAbout {
  version: string | null;
  description: string;
  release_date: Date | null;
  last_update: Date | null;
  android_version: string | null;
  whats_new: string | null;
}

export interface IDescriptionMain {
  title: string | null;
  developer_name: string;
  checkboxes_state: Array<checkbox>;
  raiting: string | null;
  review_count: string | null;
  number_of_downloads: string | number | null;
  age: number | null;
}
