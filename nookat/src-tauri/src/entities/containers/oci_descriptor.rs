use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Describes the platform which the image in the manifest runs on, as defined in the
/// [OCI Image Index Specification](https://github.com/opencontainers/image-spec/blob/v1.0.1/image-index.md).
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct OciPlatform {
    /// The CPU architecture, for example `amd64` or `ppc64`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub architecture: Option<String>,

    /// The operating system, for example `linux` or `windows`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub os: Option<String>,

    /// Optional field specifying the operating system version, for example on Windows `10.0.19041.1165`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub os_version: Option<String>,

    /// Optional field specifying an array of strings, each listing a required OS feature (for example on Windows `win32k`).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub os_features: Option<Vec<String>>,

    /// Optional field specifying a variant of the CPU, for example `v7` to specify ARMv7 when architecture is `arm`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub variant: Option<String>,
}

impl From<bollard::models::OciPlatform> for OciPlatform {
    fn from(platform: bollard::models::OciPlatform) -> Self {
        OciPlatform {
            architecture: platform.architecture,
            os: platform.os,
            os_version: platform.os_version,
            os_features: platform.os_features,
            variant: platform.variant,
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct OciDescriptor {
    /// The media type of the object this schema refers to.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media_type: Option<String>,

    /// The digest of the targeted content.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub digest: Option<String>,

    /// The size in bytes of the blob.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub size: Option<i64>,

    /// List of URLs from which this object MAY be downloaded.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub urls: Option<Vec<String>>,

    /// Arbitrary metadata relating to the targeted content.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub annotations: Option<HashMap<String, String>>,

    /// Data is an embedding of the targeted content. This is encoded as a base64 string
    /// when marshalled to JSON (automatically, by encoding/json).
    /// If present, Data can be used directly to avoid fetching the targeted content.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub platform: Option<OciPlatform>,

    /// ArtifactType is the IANA media type of this artifact.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub artifact_type: Option<String>,
}

impl From<bollard::models::OciDescriptor> for OciDescriptor {
    fn from(descriptor: bollard::models::OciDescriptor) -> Self {
        OciDescriptor {
            media_type: descriptor.media_type,
            digest: descriptor.digest,
            size: descriptor.size,
            urls: descriptor.urls,
            annotations: descriptor.annotations,
            data: descriptor.data,
            platform: descriptor.platform.map(|p| p.into()),
            artifact_type: descriptor.artifact_type,
        }
    }
}
