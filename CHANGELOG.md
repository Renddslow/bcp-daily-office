# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added a method for fetching all the previous versions and a specific version. `/versions` and `versions/:version`.

### Changed

### Deprecated

- The `meta` field inside of the `data` object in the fetch day method. Expected removal in v2.0.0.

### Removed

### Fixed

### Security

## [1.0.3] - 2019-11-08

### Fixed

- Fixed an issue where days without a festival or Holy Day crashed the API.

## [1.0.2] - 2019-11-08

### Changed

- Made a performance improvement that should decrease load time on each hit.
