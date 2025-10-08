type NotificationStringFields =
  | "language"
  | "title"
  | "body"
  | "icon"
  | "image"
  | "url"
  | "status"
  | "recurrence"
  | "cronExpression"
  | "adminId"
  | "appId"
  | "heading"
  | "message"
  | "defaultLanguage";

export interface Notification extends Record<NotificationStringFields, string> {
  targetUsers: [];
  createdAt: Date;
  sentAt: Date;
  isRecurring: boolean;
  daysOfWeek: number[];
  appIds: Pwa[];
  _id: string;
}

export interface NotificationTime {
  isRecurring: boolean;
  days: string[];
  time: Date;
}

export type NotificationMessage = Pick<
  Notification,
  "language" | "heading" | "message" | "icon"
> & { image: string };

type Pwa = {
  displayName: string;
  defaultLanguage: string;
  _id: string;
  displayId: string;
};

export type NotificationSettings = {
  pwas: Array<Pwa>;
  title: Notification["title"];
  defaultLanguage: { label: string; value: string } | string;
  isActive: boolean;
};
