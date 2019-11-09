const path = require('path');
const parseChangelog = require('changelog-parser');

const VersionNotFound = require('../lib/errors/VersionNotFound');

const getChangelog = async () => {
  const log = await parseChangelog(path.join(__dirname, '../CHANGELOG.md'));
  return log.versions.filter(({ version }) => version);
};

const mapVersion = (logVersion) => {
  const {
    version,
    date,
    parsed,
  } = logVersion;

  const { _, ...features } = parsed;
  const featureList = Object.keys(features)
    .reduce((acc, key) => Object.assign(
      {},
      acc,
      { [key.toLowerCase()]: features[key] }
    ), {});

  return {
    id: version,
    type: 'version',
    attributes: {
      date,
      changes: featureList,
    }
  };
};

module.exports.versions = async () => {
  const log = await getChangelog();
  return log.map(mapVersion);
};

module.exports.get = async (version) => {
  const log = await getChangelog();
  const versionInfo = log.find((v) => v.version === version.replace(/v/g, ''));

  if (!versionInfo) {
    throw new VersionNotFound(version);
  }

  return mapVersion(versionInfo);
};
