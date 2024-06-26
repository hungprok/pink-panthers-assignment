# SMG Real Estate - React Assignment

## Quickstart

```sh
yarn install
yarn start
```

## Instructions

The purpose of this assignment is:

- to serve as an initial indication of the candidate's technical expertise and appoach to software development
- to serve as a playground where the candidate is comfortable to have a discussion on with the interviewers.

To that end, we are providing the basic shell of a simple app and expect the candidate to tackle the following tasks by extending the code in this repository:

1. Utilise the [Listing component](src/components/Listing/index.tsx) and display [all the listings](src/assets/listings.ts) on the Home Page.

2. Allow the user to click on a listing and navigate to the specific listing details page. Consider adding some styling.

3. Currently `any` is being used to define the type of the retrieved listing. Apply the correct type for the listing that has been found on line 12 in the [Details Page](src/containers/DetailsPage/index.tsx).

4. Set up an http server on node.js (e.g. [express](http://expressjs.com/)) to serve the listings and update the existing project to utilise your new API.

5. Create a new component called `Card`, that will be similar to [Bootstrap Card](https://getbootstrap.com/docs/4.0/components/card/#images). It should contain an image, title and an excerpt of the description (20 characters). Consider adding some styling.

In general, we are flexible and don't need all the tasks to be completed to submit the assignment. We leave it at the candidate's discretion to choose what to prioritize.

https://github.com/mjhea0/express-crud-pg-promise/blob/master/src/server/routes/beers.js
https://github.com/gothinkster/vue-realworld-example-app/blob/master/src/views/Article.vue

ID: 1c1993f4dd4e43d48f4f64706bf4106d
Secret: 903334b24bfa3f439c551a281d634945779943d7f88ad404355abdc2601d2698
