# test-case-simplepayments24

This template should help get you started developing with Vue 3 in Vite.

## TASK

Postman Collection: https://www.getpostman.com/collections/06b97b9e56afd8840210
The purpose of the task: To create a project on Vue. Show the ability and understanding of working with REST. The design is arbitrary, it can add a couple of points to the piggy bank.

Create a website containing 2 pages:
1. Form for creating a user: full name and email
2. User editing form: Full name, email, phone

Working with the API:
- Create a user (Create new user). To create a user, you must pass the X-Application-Token header in the request: wefiEFv_dwDEvf-12Veda_feadvkJbBgh831. If successful, the created user will be sent in the response body. The user has an auth_key field. All subsequent requests must pass the auth_key in the Authorization header. Example, Authorization: Bearer 3c5419cc-b1d4-49d3-a2ad-28846762311d
- getting a user (Get current user). Returns the current user by the Authorization header
- edit the user (Update current user). Updates the user by the Authorization header. Returns the updated values of the user's fields. The X-Action-Id header comes in the response, you need to display it (in any way)

Important:
- All forms must have validation
- The phone input field must have a mask (any)
- When receiving errors from the server, display them on the form
- After creating a user, the form to create should no longer be displayed. Even after reloading the page

Terms: 2 days

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
