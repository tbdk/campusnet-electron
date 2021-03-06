

# CampusNetSync

This app allows you to sync all your DTU CampusNet files from your menu bar. It is build with [electron](http://electron.atom.io/) so it works on both Mac and Windows! (Linux support would require minimal effort.)

## Download

You can either go the the [website](http://pethick.dk/campusnet-electron) to download it
or browse all version on [github releases](https://github.com/tmpethick/campusnet-electron/releases).

## Development

Check out `package.json` for the possible scripts to run. For a quick overview:

To develop run the following commands in two different sessions:

```
npm run watch
npm start
```

## Dev Tips

* To test the update flow: Run `yarn dist` with version one below the current version. This will trigger the update flow since a release exists with a higher version number.

## Distribution

Requirements for linux and windows distribution:

```
brew install gnu-tar graphicsmagick xz
brew install mono
brew install wine --without-x11
```

## TODO

* [ ] Promote tray icon on Windows.
* [ ] Improve ugly icon on windows.
* [ ] Add update button so it doesn't only check on startup.
* [ ] Add Linux support.
* [ ] Add List recently changed files.
* [ ] Add List courses directly in the app.

## Bugs

* Problem with auto-launch on Mac: https://github.com/Teamwork/node-auto-launch/issues/28

## Tests

Currently only the downloader module itself is tested – and this is not at all properly covered. Run on own responsibility! There is no mocking done so it will actually download the files.

## Learnings

This project was meant as a way to play around with electron development with reactJS. lessons learned:

* Reflux/Flux can quickly get out of hand with its actions and reducers. Typechecking with Flow might help.
* Immutables can seem redudant since you end up unpacking them with `toJS`. But they allow for strong `shouldComponentUpdate` check.
* Electron is big..
