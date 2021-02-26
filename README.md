# Data Collection/ Workflow App

An example implementation of a data collection/ workflow type app. The purpose of a data collection application is to get large amounts of data from a user. This is accomplished by guiding the user through a series of screens with forms. The application determines what data it needs to collect from the user based on the data that has been previously provided by the user. The ultimate goal of this type of application is to reach a state where there is no additional information to collect from the user.


Routing: React Router Dom

Testing: Miragejs, Jest, React Testing Library, Cypress

Data Fetching/Caching: React-Query

## Demo Backend
The data model of the mock back end is 1 User object that has many Car objects. This is expressed in the App as a page for creating Car objects that routes to itself, allowing N car objects to be created for a given User object. 

## Router Guards
Example: https://github.com/RobertCorey/data-collection-flow/blob/main/src/Car.tsx#L13

React Components that represent pages can implement router guards by asserting against the application state and returning a React Router `<Redirect>` component when the user is not in the correct state to access a page.

## Data Fetching/Caching
A request to GET a user object returns a User and all the cars associated with that User. This means that any mutation to the User Object or to any of it's child Cars will mutate the GET User response.

By using react-query and custom hooks we can ensure that the application always has the most recent User object. This is done by modeling the mutation dependecy in the custom hooks. For example the [createUser function](https://github.com/RobertCorey/data-collection-flow/blob/64efdc87680464316058b4b27d52b428de0e2b5f/src/Hooks.tsx#L23) will mark the GET User cached data as stale, resulting in the application fetching the most recent changes.

By modeling the dependencies in the hooks, consuming components can use the cached data resources without having to concern themselves with manually updating them.

## Global State
Global State is implemented by [StateContext](https://github.com/RobertCorey/data-collection-flow/blob/main/src/StateContext.tsx) a wrapper around `useState`. It's used to store the id of the current user, which is then used by the data queries and mutatators

## Page Component
[Car](https://github.com/RobertCorey/data-collection-flow/blob/main/src/Car.tsx) is an example page component, corresponding the the Car data resource. In an actual app there would be many of these pages each corresponding to a different data resource.

Car displays loading and error states to the user depending on the state of the data cache. When all data is not stale it shows a form that allows user to add cars or go to the next step.

## Testing



