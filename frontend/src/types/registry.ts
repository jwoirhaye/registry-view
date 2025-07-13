export interface RepositoryList {
  repositories: string[];
}

export interface TagList {
  name: string;
  tags: string[];
}

export interface ManifestConfig {
  mediaType: string;
  size: number;
  digest: string;
}

export interface ManifestLayer {
  mediaType: string;
  size: number;
  digest: string;
}

export interface Manifest {
  schemaVersion: number;
  mediaType: string;
  config: ManifestConfig;
  layers: ManifestLayer[];
}

export interface ImageConfigDetails {
  Env?: string[];
  Cmd?: string[];
  Entrypoint?: string[];
  ExposedPorts?: Record<string, unknown>;
  User?: string;
  WorkingDir?: string;
  Labels?: Record<string, string>;
}

export interface ImageConfig {
  architecture: string;
  os: string;
  config: ImageConfigDetails;
  created?: string;
  rootfs?: any;
  history?: any[];
}
