export interface VideoSource {
  src: string;
  type: string;
  size: number;
}

export interface CompoundVideoModel {
  type: string;
  title: string;
  poster: string;
  sources: VideoSource[];
  previewThumbnails: string;
}
