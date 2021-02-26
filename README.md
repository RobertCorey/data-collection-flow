# Data Collection/ Workflow App

An example implementation of a data collection/ workflow type app. The purpose of a data collection application is to get large amounts of data from a user. This is accomplished by guiding the user through a series of screens with forms. The application determines what data it needs to collect from the user based on the data that has been previously provided by the user. The ultimate goal of this type of application is to reach a state where there is no additional information to collect from the user.


Routing: React Router Dom

Testing: Miragejs, Jest, React Testing Library, Cypress

Data Fetching/Caching: React-Query

## Router Guards
Example: https://github.com/RobertCorey/data-collection-flow/blob/main/src/Car.tsx#L13

React Components that represent pages can implement router guards by asserting against the application state and returning a React Router `<Redirect>` component when the user is not in the correct state to access a page.

## Data Fetching/Caching
Example: https://github.com/RobertCorey/data-collection-flow/blob/main/src/Hooks.tsx

Custom Hooks are used on top of react-query to expose objects representing cached data resources
