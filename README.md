<p align="center"><img src="https://user-images.githubusercontent.com/16968917/211393821-f3846f27-6a92-40df-8d36-06cf952dac8b.png" alt="combined logo" /></p>

## About

Islands is an open social platform built to make the way we communicate more transparent. Users can create an account and create an "Island" and invite others to chat, share media, and do other cool stuff together. Islands are built to be as useable as possible from the most enthusiast community leaders who want to most control and customization over their Island to those who just want an easy and transparent way to chat with friends. The core mission of Islands is to empower users to take control over their Island by giving creators the seamless ability to make awesome stuff on the platform. To this end, Islands hopes to create an easy-to-use API and make the development process as easy as possible, and that starts with making Islands open-source. Developers are free to host their own instances and use the source code here to create tools for the platform.

## Getting Started!

This project uses NodeJS and React to host the app. This section will walk you through the setup and development process of getting your own Islands instance running.

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [NodeJS v18+](https://nodejs.org/download/release/latest-v18.x/)

More requirements will come as the backend is further developed.

This project uses `pnpm` as the package manager for this node project. To get it, run `corepack enable pnpm` once you have the above software installed.

### Setup

First, download the project and install the necessary packages:

```sh
git clone --recursive https://github.com/ben9583/Islands.git islands
cd islands
pnpm install
pnpm run prepare
```

The installation process may take some time! As more software is used for this project, this section will be expanded.

### Develop

With the setup process complete, you can host your own development server running the following command

```sh
pnpm run start
```

After a bit of time, the website will be hosted at http://localhost:3000 where you can view your instance. You can try modifying a file to see the updates change live on the browser.

## Contribute

Thank you for your interest in contributing to Islands! We rely on the work of open-source developers to make our platform great. To get started, create a fork of this project and run the steps outlined above to begin developing.

If you have an issue to submit, navigate to the issues tab above and outline the concern you have in detail. If it's a bug, please provide steps to replicate the issue so our developers have a way of more easily finding a solution. Furthermore, please give your system specifications (Operating System, relevant hardware, software versions, etc.), especially if this is an issue specific to your device.

When you're ready to make a pull request, please submit one above. Outline what changes you've made an link any relevant issues your PR seeks to address. Other developers may leave comments on your changes that require a response, so please be aware and check back for any feedback. If your pull request is approved, your name will be added to our list of contributors!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
