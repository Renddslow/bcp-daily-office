class VersionNotFound extends Error {
  constructor(v) {
    super('Version Not Found');
    this.code = 'VersionNotFound';
    this.title = 'Version Not Found';
    this.detail = `The version "${v}" was not found in the Changelog. Maybe we haven't made that yet.`;
    this.source = {
      parameter: 'version',
    };
    this.status = 404;
  }
}

module.exports = VersionNotFound;
