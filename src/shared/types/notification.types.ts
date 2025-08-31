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
  | "appId";

export interface Notification extends Record<NotificationStringFields, string> {
  targetUsers: [];
  createdAt: Date;
  sentAt: Date;
  isRecurring: boolean;
  daysOfWeek: number[];
}

export interface NotificationTime {
  isRecurring: boolean;
  daysOfWeek: number[];
  scheduleTime: string;
}

export type NotificationMessage = Pick<
  Notification,
  "language" | "title" | "body" | "image" | "icon"
>;

type Pwa = { displayName: string; defaultLanguage: string; _id: string };

export type NotificationSettings = {
  pwas: Array<Pwa>;
  pwa: Pwa;
};
