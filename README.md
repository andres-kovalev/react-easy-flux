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

# Installation

As any other npm package `react-easy-flux` can be added to your project by following command:

```bash
npm i -S react-easy-flux
```

It requires any version of [react](https://www.npmjs.com/package/react) with new context API support as peer dependency, so it should be installed as well.

```bash
npm i -S react
```

# API

## createStorage(reducer, middlewares)

`createStorage` function creates new storage attributes such as `Provider`, `useStorage` and `useActionCreators` hooks. You can crete several storages for different kinds of data or use single storage (redux-like-way).

```js
const {
    Provider: ThemeProvider,
    useStorage: useTheme,
    useActionCreators: useThemeActions,
    Consumer: ThemeConsumer,
    connect: withTheme
} = createStorage(themeReducer);

const {
    Provider: GlobalStateProvider,
    useStorage: useGlobalState,
    useActionCreators: useGlobalActions,
    Consumer: GlobalStorageConsumer,
    connect: withGlobalStorage
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

### useStorage(selector, equalityFunction)

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

Usually we can hold different data in separate stores, but for some reason you may want to have single storage for everything (like redux way). For instance, it's much easier to use single `useStorage()` hook for everything than maintain separate `useThemeStorage()`, `useLocaleStorage()` and so on. Here selectors comes to help. We just need to provide selector function to select only needed data.

```js
const MyComponent = () => {
    const [ title, dispatch ] = useStorage(
        ({ data }) => data.title
    );
}
```

To optimize rendering `useStorage()` hook consumes equality function as second optional argument. This function will be called to check whether state changes are significant enough to re-render component.

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

### useActionCreators(actionCreatorsMap)

There might be a situation, when some component does not consumes state, but updates it. To prevent unnecessary updates for this components we can specify empty selector:

```js
const ChatInput = () => {
    const [ , dispatch ] = useStorage(() => 0);

    const sendMessage = message => dispatch(send(message));

    ...
}
```

But it's easier to use another hook called `useActionCreators()`. This hook is used to bind action creators and not consumes state:

```js
import { setTheme } from './themeActions.js';

const ChatInput = ({ ... }) => {
    // const [ , dispatch ] = useStorage(() => 0);

    // const sendMessage = message => dispatch(send(message));
    const { send: sendMessage } = useActionCreators({ send })

    ...
}
```

Such component won't be updated on state change.

`useActionCreators()` hook also supports attribute of array type. In some cases it can make things easier:

```js
const [ onClick ] = useActionCreators([ onClick ]);

// instead of

const { invoke: onClick } = useActionCreators({ invoke });
```

## What about class components?

Class components are not able to use hooks so we have two additional options:
* `connect()` HoC (similar to [react-redux connect() HoC](https://react-redux.js.org/api/connect))
* `Consumer` render prop

### connect()

`connect()` HoC consumes 3 arguments (all optional):
* `selector` - function to select data from current storage state (similar to `useStorage()` hook 1st argument). Selector should return object, each field of this object becomes separate prop passed to wrapped component.
* `actionCreatorsMap` - plain object where each value is an action creator function to bind. Each field of this object becomes separate prop passed to wrapped component. If not provided, `dispatch()` function will be added as `dispatch` prop.
* `equalityFunction` - by default HoC uses `shallowEqual()` function to check selected state. It means component get updated when any field of selected object updated. Use this comparator to adjust update behaviour.

Here is an example:

```js
import { connect } from './themeStorage';
import { change } from './themeActions';

class ThemeSelector extends React.Component {
    render() {
        const { items, current, change } = this.props;

        return (
            <Select
                items={ items }
                selected={ current }
                onChange={ change }
                />
        );
    }
}

export default connect(
    ({ items, current }) => ({ items, current }),
    { change },
    (oldState, newState) => oldState.current === newState.current
);
```

### Consumer

`Consumer` component provides functionality similar to `connect()` HoC but implements different pattern - renderProp. It consumes 3 props:
* `selector` - similar to `useStorage()` 1st argument.
* `actionCreators` - action creators map/array similar to `useActionCreators()` 1st argument.
* `equalityFunction` - similar to `useStorage()` 2nd argument.

As a children renderProp function should be provided. This function will receive 2 arguments:
* `state` - state (or selected part)
* `actions` - map/array of bound action crearors (when `actionCreators` prop provided) or instance of `dispatch()` function (when no `actionCreators` prop propvided).

Here is an example equivalent to example from `connect()` HoC description:

```js
import { Consumer } from './themeStorage';
import { change } from './themeActions';

const selector = ({ items, current }) => ({ items, current });
const actionCreators = { change };
const equalityFunction = (oldState, newState) => oldState.current === newState.current;

class ThemeSelector extends React.Component {
    renderThemeSelector = ({ items, current, change }) => (
        <Select
            items={ items }
            selected={ current }
            onChange={ change }
            />
    );

    render() {
        return (
            <Consumer
                selector={ selector }
                actionCreators={ actionCreators }
                equalityFunction={ equalityFunction }
            >
                { this.renderThemeSelector }
            </Consumer>
        )
    }
}
```

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

## combineReducer(sreducerMap)

Starting from `react-easy-flux@1.5.0` we're able to use `combineReducers()` helper function. It compiles map of reducers into a single reducer function.

```js
const reducer = combineReducers({
    theme: themeReducer,
    locale: localeReducer
});

const newState = reducer(oldState, action);
/*
const newState = {
    theme: themeReducer(oldState.theme, action),
    locale: localeReducer(oldState.locale, action)
}
*/
```

`combineReducers()` have 2 important features:

* it supports reducer maps with any deep
```js
const reducer = combineReducers({
    locale: localeReducer,
    theme: {
        colorSheme: colorShemeReducer,
        contrast: contrastReducer
    }
});
/*
const reducer = combineReducers({
    locale: localeReducer,
    theme: combineReducers({
        colorSheme: colorShemeReducer,
        contrast: contrastReducer
    })
});
*/
```
* it keeps refs when possible
```js
const identity = value => value;
const reducer = combineReducers({
    value1: identity,
    value2: identity
});
const oldState = { value1: 1, value2: 2 };
const newValue = reducer(oldState, {});

oldState === newState; // true
```
