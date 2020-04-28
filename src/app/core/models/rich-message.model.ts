export interface AttachmentModel {
  uid: string;
  name: string;
  size: number;
  lastModified: number;
  type: string;
}

export interface RichMessageModel {
  message: string;
  attachments: AttachmentModel[];
}
