import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  compareReleaseVersions,
  getCurrentReleaseData,
  normalizeActiveReleaseType,
  type ReleaseData,
  shouldShowTestRelease,
} from "./downloadRelease.ts";

const createRelease = (version: string): ReleaseData => ({
  publishTime: 1,
  version,
  downloadUrlAlternativesMap: {
    "android-universal": [`https://example.com/${version}.apk`],
  },
});

describe("compareReleaseVersions", () => {
  it("compares numeric versions", () => {
    assert.equal(compareReleaseVersions("5.10.0", "5.9.9") > 0, true);
    assert.equal(compareReleaseVersions("5.0.0", "5.0.1") < 0, true);
  });

  it("treats stable release as newer than prerelease with the same version", () => {
    assert.equal(compareReleaseVersions("5.1.0", "5.1.0-beta01") > 0, true);
    assert.equal(compareReleaseVersions("5.1.0-alpha01", "5.1.0") < 0, true);
  });
});

describe("shouldShowTestRelease", () => {
  it("shows test tab when test version is newer than stable", () => {
    assert.equal(shouldShowTestRelease(createRelease("5.1.0"), createRelease("5.2.0-alpha01")), true);
  });

  it("hides test tab when test version is older than stable", () => {
    assert.equal(shouldShowTestRelease(createRelease("5.2.0"), createRelease("5.1.0-alpha01")), false);
  });

  it("hides test tab when test version matches stable", () => {
    assert.equal(shouldShowTestRelease(createRelease("5.2.0"), createRelease("5.2.0-alpha01")), false);
  });

  it("hides test tab when test data is unavailable", () => {
    assert.equal(shouldShowTestRelease(createRelease("5.2.0"), null), false);
  });

  it("shows test tab when stable data is unavailable", () => {
    assert.equal(shouldShowTestRelease(null, createRelease("5.2.0-alpha01")), true);
  });
});

describe("release view state", () => {
  it("falls back to stable tab when active test tab is hidden", () => {
    const stableData = createRelease("5.2.0");
    const testData = createRelease("5.1.0-alpha01");

    assert.equal(normalizeActiveReleaseType("beta", stableData, testData), "stable");
    assert.equal(getCurrentReleaseData("beta", stableData, testData), stableData);
  });

  it("keeps active test tab when test tab is visible", () => {
    const stableData = createRelease("5.2.0");
    const testData = createRelease("5.3.0-alpha01");

    assert.equal(normalizeActiveReleaseType("beta", stableData, testData), "beta");
    assert.equal(getCurrentReleaseData("beta", stableData, testData), testData);
  });
});
