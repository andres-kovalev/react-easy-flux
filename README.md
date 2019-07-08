[![ci](https://img.shields.io/circleci/build/github/andres-kovalev/react-easy-flux.svg?style=flat-square&logo=circleci)](https://circleci.com/gh/andres-kovalev/react-easy-flux)
[![codecov](https://img.shields.io/codecov/c/github/andres-kovalev/react-easy-flux.svg?style=flat-square&logo=codecov&token=1280f2cf41a24522add9857967be2a73)](https://codecov.io/gh/andres-kovalev/react-easy-flux)
[![downloads](https://img.shields.io/npm/dm/react-easy-flux.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiCj48ZyBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTM3OSwxODAuNWgtMTAydi0xMDBoLTE1M3YxMDBoLTEwMmwxNzguNSwxNzguNWwxNzguNSwtMTc4LDUiLz48L2c+PC9zdmc+Cg==)](https://www.npmjs.com/package/react-easy-flux)
[![node](https://img.shields.io/node/v/react-easy-flux.svg?style=flat-square&logo=node.js&color=007ec6)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/react-easy-flux.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/react-easy-flux)
[![MIT](https://img.shields.io/npm/l/react-easy-flux.svg?color=007ec6&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA5ElEQVR4AY3SJWyDcRQE8G+MsnIg63XNmMm2ZuB9xjyv5tWYfAZ2TD6tGW9qzHCX3H9bX4rJz7y7K3t8NK20OT7ogHnYl3ndfK5nRwFYgxf4Nl6UBVzfjcoholIiEXbdsBS2TCERdks5HIaPVIfqDnN4HCO8gUm5iZEfc/gYI+gBT3pi5I8M3szxE0LgSYg303ljcGqOtAHFshEjP+VwOkbwCvXyGiOf5rASrkwQhhIJm4zdKg4zYBDe/z8j72Te0bu6GRxSIUzAHXxBF3jSpdudOoX2/5oDQVgEP3ji1y3Ijhv9ABp7euvVsybrAAAAAElFTkSuQmCC&style=flat-square)](https://github.com/andres-kovalev/react-easy-flux/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-easy-flux.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGZpbGw9IndoaXRlIj48cGF0aCBkPSJNNzUsMzBoMTc1bDEwMCwxMDB2MjQwaC0yNzV2LTI0MCIvPjwvZz48ZyBmaWxsPSIjREREIj48cGF0aCBkPSJNMjUwLDMwbDEwMCwxMDBoLTEwMHYtMTAwIi8+PC9nPjwvc3ZnPgo=)](https://www.npmjs.com/package/react-easy-flux)

# react-easy-flux

Easy and fast react binding for flux.

# Description

`react-easy-flux` implements [flux](https://facebook.github.io/flux/) architecture to help managing global application state with unidirectional data flow. It uses well known attributes of flux pattern, such as `reducers` and `actions` (`action creators`).

# API

## createStorage(reducer, middlewares)

`createStorage` function creates new storage attributes such as `Provider`, `useStorage` and `useActionCreators` hooks. You can crete several storages for different kinds of data or use single storage (redux-like-way).

```js
const {
    Provider: ThemeProvider,
    useStorage: useTheme,
    useActionCreators: useThemeActions
} = createStorage(themeReducer);

const {
    Provider: GlobalStateProvider,
    useStorage: useGlobalState,
    useActionCreators: useGlobalActions
} = createStorage(globalStateRedurec);
```

### Provider

All storage data consumers should be wrapped with `Provider` component, created by `createStorage` function. You can pass `state` prop to set initial storage state.

```js
render(
    <ThemeProvider state={ initialTheme }>
        <GlobalStorageProvider state={ initialGlobalState }>
            <App />
        </GlobalStorageProvider>
    </ThemeProvider>,
    document.getElementById('app')
);
```

### useStorage(equalityFunction) / useActionCreators(actionCreatorsMap)

To consume/interact with storage state component should use `useStorage()` hook. It returns array of two elements: current state and `dispatch()` function to dispatch actions.

```js
const Button = ({ ... }) => {
    const [ theme ] = useTheme();

    // use theme to set component style
};
```

```js
import { setTheme } from './themeActions.js';

const ThemeSelector = ({ ... }) => {
    const [ , dipatch ] = useTheme();
    const onSelect = theme => dispatch(
        setTheme(theme)
    );

    ...
}
```

To optimize rendering `useStorage()` hook consumes equality function as an optional argument. This function will be called to check whether state changes are significant enough to re-render component.

```js
...
  if (equalityFunction(oldState, newState)) {
      return;
  }

  // re-render component
```

By default strict equality used as equality function (`strictEqual` function imported by package), but user is always able to pass something custom:

```js
const MyComponent = () => {
    const [ state, dispatch ] = useStorage(
        (oldState, newState) => oldState.title === newState.title
    );

    // such component will be re-rendered only on title change
}
```

In most cases `shallowEqual` function is most convenient and simple way to optimize rendering rendering. It works similar to react `memo`/`PureComponent`.

```js
import { shallowEqual } from 'react-easy-flux';

const MyComponent = () => {
    const [ state, dispatch ] = useStorage(shallowEqual);

    // will be re-rendering only when something actually changed
}
```

To bind action creators `useActionCreators()` hook can be used.

```js
import { setTheme } from './themeActions.js';

const ThemeSelector = ({ ... }) => {
    // const [ , dipatch ] = useTheme();
    // const onSelect = theme => dispatch(
    //    setTheme(theme)
    // );
    const { setTheme: onSelect } = useActionCreators({ setTheme })

    ...
}
```

### useSelector(selector, equalityFunction)

Usually we can hold different data in separate stores, but for some reason you may want to have single storage for everything (like redux way). For instance, it's much easier to use single `useStorage()` hook for everything than maintain separate `useThemeStorage()`, `useLocaleStorage()` and so on. Here `useSelector()` comes to help. User just need to provide selector function to select only needed data. Like `useStorage()` hook it returns selected part of state and dispatch function.
```js
const MyComponent = () => {
    const [ title, dispatch ] = useSelector(
        ({ data }) => data.title
    );
}
```

`useSelector()` optimizes rendering by checking selected value and re-render component only when its value changed. To optimize more complex selectors equality function can be passed as a second optional argument:

```js
import { shallowEqual } from 'react-easy-flux';

const MyComponent = () => {
    const [ { locale, theme } ] = useSelector(
        ({ locale, theme }) => ({ locale, theme }),
        shallowEqual
    );
}
```

Of course the same effect can be acheived with `useStorage()`, but in a bit more tricky way:

```js
const MyComponent = () => {
    const [ { locale, theme } ] = useStorage(
        ({ locale, theme }) => ({ locale, theme }),
        (oldState, newState) => oldState.locale === newState.locale
            && oldState.theme === newState.theme
    );
}
```

I guess first option looks better.

## Middlewares

`react-easy-flux` supports middlewares similar to [redux middlewares](https://redux.js.org/advanced/middleware), so you can use any redux-compatible ones.

```js
import thunkMiddleware from 'redux-thunk';

const logMiddleware = store => next => action => {
    console.log(action);

    next(action);
}

const {
    Provider,
    useStorage
} = createStorage(reducer, [ thunkMiddleware, logMiddleware ])
```
