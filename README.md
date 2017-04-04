# superstars

This project 11was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.5.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [WindowsUsers]  Install Windows SDK 8(https://developer.microsoft.com/en-us/windows/downloads/windows-8-1-sdk) and Windows SDK 10(https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready..

5. Run `gulp serve:debug` to start the development serverin debug mode. You need to open in browser the address: http://localhost:8080/?port=5858(Usually takes much longer to start the project)

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma..

## Node Security

To install node security npm package audition run:  
`npm install gulp-nsp --save-dev`  
Then update the gulp file according to [nsp](https://nodesecurity.io/opensource)  
Then run `gulp nsp`  


