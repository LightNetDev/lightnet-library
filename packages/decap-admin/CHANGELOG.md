# @lightnet/decap-admin

## 2.2.7

### Patch Changes

- [#158](https://github.com/LightNetDev/lightnet-library/pull/158) [`c7e752d`](https://github.com/LightNetDev/lightnet-library/commit/c7e752d0af37d3b8d70cfc4fba14e767537aec9e) Thanks [@si-fab](https://github.com/si-fab)! - Simplify config format.

  This changes the structure of the language config. `locales`, `defaultLocale`, `translations` have been moved into
  the `languages` array.

  The redirecting `index.astro` on root level can now be removed.

## 2.2.6

### Patch Changes

- [#144](https://github.com/LightNetDev/lightnet-library/pull/144) [`fdb0c3b`](https://github.com/LightNetDev/lightnet-library/commit/fdb0c3be6156177b7c8e892272fd280a377024e6) Thanks [@si-fab](https://github.com/si-fab)! - Fixes build on windows.

## 2.2.5

### Patch Changes

- [#140](https://github.com/LightNetDev/lightnet-library/pull/140) [`079dfdc`](https://github.com/LightNetDev/lightnet-library/commit/079dfdc54c9be4a71f890846ce1e82dd3d98699f) Thanks [@si-fab](https://github.com/si-fab)! - Cleanup details pages export.

## 2.2.4

### Patch Changes

- [#130](https://github.com/LightNetDev/lightnet-library/pull/130) [`43f3aa2`](https://github.com/LightNetDev/lightnet-library/commit/43f3aa283f494daaa90708fac196ceaba5393545) Thanks [@si-fab](https://github.com/si-fab)! - Fixes how slugs are generated for new media collections.

## 2.2.3

### Patch Changes

- [#128](https://github.com/LightNetDev/lightnet-library/pull/128) [`46af0e3`](https://github.com/LightNetDev/lightnet-library/commit/46af0e3ad00b16f60ad541e3c9d0a36647bf6bcd) Thanks [@si-fab](https://github.com/si-fab)! - Renames collection `title` to `name`.

## 2.2.2

### Patch Changes

- [#127](https://github.com/LightNetDev/lightnet-library/pull/127) [`0adf355`](https://github.com/LightNetDev/lightnet-library/commit/0adf3555c21bd19120ef8982ca3f5d7e139f433b) Thanks [@si-fab](https://github.com/si-fab)! - Support rtl text fragments.

## 2.2.1

### Patch Changes

- [#118](https://github.com/LightNetDev/lightnet-library/pull/118) [`7c406a0`](https://github.com/LightNetDev/lightnet-library/commit/7c406a0c4a555804249951a7a91dee3545b308b8) Thanks [@si-fab](https://github.com/si-fab)! - Disables Decap's search, as this was not helpful and only confusing users.

## 2.2.0

### Minor Changes

- [#105](https://github.com/LightNetDev/lightnet-library/pull/105) [`d3079a7`](https://github.com/LightNetDev/lightnet-library/commit/d3079a750a93904132d3da87f2fc86fbc64d27c9) Thanks [@si-fab](https://github.com/si-fab)! - Adds decap cms support for media collections.

## 2.1.0

### Minor Changes

- [#94](https://github.com/LightNetDev/lightnet-library/pull/94) [`4b26988`](https://github.com/LightNetDev/lightnet-library/commit/4b2698865fd70a153dd5f5313f3b4f1c71f34e42) Thanks [@si-fab](https://github.com/si-fab)! - Removes categories from the core and moves them into a content collection.

## 2.0.14

### Patch Changes

- [#70](https://github.com/LightNetDev/lightnet-library/pull/70) [`01ff2fb`](https://github.com/LightNetDev/lightnet-library/commit/01ff2fb5a9b89ff9296cc597eedd59d99de03974) Thanks [@si-fab](https://github.com/si-fab)! - Refactoring & dependency updates

## 2.0.13

### Patch Changes

- [#68](https://github.com/LightNetDev/lightnet-library/pull/68) [`2792858`](https://github.com/LightNetDev/lightnet-library/commit/2792858d4bb3bc6589f563c86ff6d35ce19a48e7) Thanks [@si-fab](https://github.com/si-fab)! - Updates external dependencies.

## 2.0.12

### Patch Changes

- [#50](https://github.com/LightNetDev/lightnet-library/pull/50) [`1c74e36`](https://github.com/LightNetDev/lightnet-library/commit/1c74e36f94e0abeac86ad5078d4c86e13ff76342) Thanks [@si-fab](https://github.com/si-fab)! - Revert back to use decap-cms as dependency.

## 2.0.11

### Patch Changes

- [#49](https://github.com/LightNetDev/lightnet-library/pull/49) [`bbcf432`](https://github.com/LightNetDev/lightnet-library/commit/bbcf4323047bbf5022abbc17bca64f236f9e4b0f) Thanks [@si-fab](https://github.com/si-fab)! - Use decap-cms-app as dependency instead of decap-cms.

## 2.0.10

### Patch Changes

- [#25](https://github.com/LightNetDev/lightnet-library/pull/25) [`0b00c62`](https://github.com/LightNetDev/lightnet-library/commit/0b00c62bf8de20fc600ecff617a74aad6a3dddf1) Thanks [@si-fab](https://github.com/si-fab)! - Fix await resizing of admin images during build.

- Updated dependencies [[`cc2aa25`](https://github.com/LightNetDev/lightnet-library/commit/cc2aa25d83547091072d9d963804b057bef4c488)]:
  - @lightnet/library@2.0.22

## 2.0.9

### Patch Changes

- [#23](https://github.com/LightNetDev/lightnet-library/pull/23) [`44544e1`](https://github.com/LightNetDev/lightnet-library/commit/44544e103855a8fe18e2555f00725d2082ea11a5) Thanks [@si-fab](https://github.com/si-fab)! - Do not hotlink Decap CMS code. But install it as an npm package.
