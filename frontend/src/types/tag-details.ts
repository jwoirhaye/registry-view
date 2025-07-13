import type { ImageConfig, Manifest } from "./registry";

export interface TagDetailsData {
  manifest: Manifest;
  config: ImageConfig;
}

export interface TagDetailsParams {
  repoName: string;
  tagName: string;
}

export interface PullCommandProps {
  registryUrl: string;
  repo: string;
  tag: string;
}

export interface ImageInfoProps {
  config: ImageConfig;
  totalSize: number;
}

export interface LayersTableProps {
  layers: Manifest["layers"];
}

export interface BuildHistoryProps {
  history: ImageConfig["history"];
}

export interface TagDetailsState {
  manifest: Manifest | null;
  config: ImageConfig | null;
  loading: boolean;
  error: string | null;
}
