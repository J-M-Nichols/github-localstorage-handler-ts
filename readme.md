# GitHub LocalStorage Handler

[![npm version](https://badge.fury.io/js/github-localstorage-handler.svg)](https://badge.fury.io/js/github-localstorage-handler)

GitHub Storage Handler is a utility for managing `localStorage` in React applications hosted on GitHub Pages. It provides a simple interface to handle storage operations with path-based organization, making it ideal for use in Redux slices and React context.

## Features

- Easy management of `localStorage` for GitHub Pages.
- Path-based storage organization.
- Supports storing and retrieving strings, objects, numbers, and booleans.
- Integrates seamlessly with Redux slices (GitHubStorageHandler) and React context (GitHubStorageHandlers).

## Installation

Install the package using npm:

```bash
npm install github-localstorage-handler
```

## Usage
### Importing the Module
```javascript 
import {GitHubStorageHandler} from 'github-localstorage-handler';
import {GitHubStorageHandlers} from 'github-localstorage-handler';
```

### Using with Redux Slices
```GitHubStorageHandler``` can be used within a Redux slice to manage state persistence:

```javascript 
// In your Redux slice
const storageHandler = new GitHubStorageHandler('reduxPath');

// Save state to localStorage
storageHandler.setObject(state);

// Load state from localStorage
const persistedState = storageHandler.getObject({});
```

### Using with React Context
```GitHubStorageHandlers``` is ideal for managing multiple paths in a React context:

```javascript 
// In your React context provider
const handlers = new GitHubStorageHandlers('contextPath1', 'contextPath2');

// Set and get items using specific paths
handlers.setItem('contextPath1', 'value1');
const value1 = handlers.getItem('contextPath1');
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the ISC License.