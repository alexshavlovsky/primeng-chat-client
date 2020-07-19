export interface VideoSource {
  src: string;
  type: string;
  size: number;
}

export interface CompoundVideoModel {
  title: string;
  poster: string;
  sources: VideoSource[];
  previewThumbnails: string;
}
