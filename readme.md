# GitHub LocalStorage Handler Ts

[![npm version](https://badge.fury.io/js/github-localstorage-hander-ts.svg)](https://badge.fury.io/js/github-localstorage-hander-ts)

GitHub Storage Handler Ts is a utility for managing `localStorage` in React applications using TypeScript hosted on GitHub Pages. It provides a simple interface to handle storage operations with path-based organization, making it ideal for use in Redux slices and React context.

## Features

- Easy management of `localStorage` for GitHub Pages.
- Path-based storage organization.
- Supports storing and retrieving strings, objects, numbers, and booleans.
- Integrates seamlessly with Redux slices (GitHubStorageHandlerTs) and React context (GitHubStorageHandlersTs).

## Installation

Install the package using npm:

```bash
npm install github-localstorage-handler-ts
```

## Usage
### Importing the Module
```typescript 
import {GitHubStorageHandlerTs} from 'github-localstorage-handler-ts';
import {GitHubStorageHandlersTs} from 'github-localstorage-handler-ts';
```

### Using with Redux Slices
```GitHubStorageHandlerTs``` can be used within a Redux slice to manage state persistence:

```typescript 
// In your Redux slice
const storageHandler:GitHubStorageHandlerTs = new GitHubStorageHandlerTs('reduxPath');

// Save state to localStorage
storageHandler.setObject(state);

// Load state from localStorage
const persistedState = storageHandler.getObject({});
```

### Using with React Context
```GitHubStorageHandlersTs``` is ideal for managing multiple paths in a React context:

```typescript 
// In your React context provider
const handlers = new GitHubStorageHandlersTs('contextPath1', 'contextPath2');

// Set and get items using specific paths
handlers.setItem('contextPath1', 'value1');
const value1:string|null = handlers.getItem('contextPath1');
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the ISC License.