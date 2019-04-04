# wp-leadmanagement

_wp-leadmanagement_ is a WordPress plugin that adds a Lead Management page in your WordPress dashboard. It allows you to monitor your contact submissions or leads in a convenient user interface. The plugin allows the user to create, update, and delete leads.

Only submissions that are created from the plugin is editable. Meaning that submissions from the website's contact form cannot be edited to prevent false data.

Currently, leads are read from the **wp-database-emails** table. There are future plans to create a settings page that will allow for multiple tables and also specify the table/columns. For now everything is currently static.

**Did you know?** wp-leadmanagement is built with React! Many thanks to [gopangolin/wp-reactivate](https://github.com/gopangolin/wp-reactivate) for the starter template that I used for this plugin.

## Todos

- [x] Prevent unauthorized access to leads endpoint with WordPress NONCE
- [ ] Create settings page (Add tables and configure columns).

<!-- TOC -->

- [wp-leadmanagement](#wp-leadmanagement)
  - [Todos](#todos)
  - [Setup and installation](#setup-and-installation)
  - [Usage](#usage)
  - [Credits](#credits)

<!-- /TOC -->

## Setup and installation

- **Install [Node 8.12.0 LTS or greater](https://nodejs.org)**
- **Install [Yarn](https://yarnpkg.com/en/docs/install)** (Or use npm if you prefer)

## Usage

- Install required modules: `yarn` (or `npm install`)
- Build development version of app and watch for changes: `yarn build` (or `npm run build`)
- Build production version of app:`yarn prod` (or `npm run prod`)

**To learn about how to use wp-reactivate. Please visit [wpr-reactivate repository](https://github.com/gopangolin/wp-reactivate)**

## Credits

_Made by [James Vibar](www.jamesvibar.com)_
Test GPG key commit
