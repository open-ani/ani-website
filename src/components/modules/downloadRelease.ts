export interface ReleaseData {
  publishTime: number;
  version: string;
  downloadUrlAlternativesMap: Record<string, string[]>;
  qrcodeUrls?: string[];
}

export type ReleaseType = "stable" | "beta";

export const TEST_RELEASE_NOTICE = "测试版本仅用于提前体验，可能不稳定，普通用户建议下载稳定版本。";

const parseVersion = (version: string) => {
  const [mainVersion, prerelease = ""] = version.replace(/^v/i, "").split("-", 2);
  const parts = mainVersion.split(".").map((part) => Number.parseInt(part, 10) || 0);

  return {
    parts,
    prerelease,
  };
};

export const compareReleaseVersions = (versionA: string, versionB: string) => {
  const parsedA = parseVersion(versionA);
  const parsedB = parseVersion(versionB);
  const maxLength = Math.max(parsedA.parts.length, parsedB.parts.length);

  for (let index = 0; index < maxLength; index++) {
    const partA = parsedA.parts[index] ?? 0;
    const partB = parsedB.parts[index] ?? 0;

    if (partA !== partB) {
      return partA - partB;
    }
  }

  if (parsedA.prerelease === parsedB.prerelease) {
    return 0;
  }

  if (!parsedA.prerelease) {
    return 1;
  }

  if (!parsedB.prerelease) {
    return -1;
  }

  return parsedA.prerelease.localeCompare(parsedB.prerelease, undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

export const shouldShowTestRelease = (stableData: ReleaseData | null, testData: ReleaseData | null) => {
  if (!testData) {
    return false;
  }

  if (!stableData) {
    return true;
  }

  return compareReleaseVersions(testData.version, stableData.version) > 0;
};

export const normalizeActiveReleaseType = (
  activeType: ReleaseType,
  stableData: ReleaseData | null,
  testData: ReleaseData | null
): ReleaseType => {
  if (activeType === "beta" && !shouldShowTestRelease(stableData, testData)) {
    return "stable";
  }

  return activeType;
};

export const getCurrentReleaseData = (
  activeType: ReleaseType,
  stableData: ReleaseData | null,
  testData: ReleaseData | null
) => {
  return normalizeActiveReleaseType(activeType, stableData, testData) === "stable" ? stableData : testData;
};
