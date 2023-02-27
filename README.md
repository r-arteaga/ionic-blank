# Ionic Blank 

This is my personal template for scaffolding an Ionic Angular application. 

## Why?

The official blank starter from the Ionic Team uses the traditional Angular modules, the Default change detection strategy and the specific files for templates and styles.

I have modified it in order to use Angular feature that I prefer:

- Standalone Components
- OnPush change detection strategy
- Inline templates and styles

## Guidelines

While this template only provides a very basic application to use a starting point, I like to follow these guidelines:

- Smart/Dumb Components
- Coding reactively
- Nx-ish code structure

I believe that this approach makes the Angular application more scalable, easier to develop and less error prone.

## Installation

```bash
$ npm install
```

## Development

```bash
$ ionic serve
```

## Building the app

```bash
$ ionic build --prod
```

## Test

```bash
# unit tests
$ npm run test
```
