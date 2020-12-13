# Social Network API
![licenseBadge](https://img.shields.io/badge/License-MIT-blue)

## Description
Social Network API is a backend api for a social network type web application where users can add friends, post thoughts, and react to thought. This application is build using Express.js, MongoDB, and Mongoose ODM. The API has the ability to "CRUD" new users, thoughts, as well as add friendships and the feature to post reactions to thoughts.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Test](#test)
* [Questions](#questions)

## Installation
Clone repository from (https://github.com/ginomaglaqueucla/social-network-api-gm20.git) to local directory on computer.
1. Download/Obtain source code locally from GitHub Repository
2. Open terminal or gitbash command line, Change Directory (cd) to location of working directory
3. Enter `npm install`, to download dependicies
4. Enter `npm start`
5. Use REST API client to CRUD database

## Usage
http://localhost:3001/api/user/
- For creating or reading new/current users

http://localhost:3001/api/user/<userId>
- For updating or deleting current users

http://localhost:3001/api/user/<userId1>/friends/<userId2>
- For linking two users as "friends"
- Same can be done for unlinking

http://localhost:3001/api/thoughts/
- For reading current thoughts

http://localhost:3001/api/thoughts/<thoughtId>
- For updating or deleting current users

http://localhost:3001/api/thoughts/<thoughtId>/reactions
- For creating reaction to specified thought

http://localhost:3001/api/thoughts/<thoughtId>/reactions/<reactionId>
- For deleting reaction


## License
![licenseBadge](https://img.shields.io/badge/License-MIT-blue)

MIT License

Copyright (c) [2020] [Gino Maglaque]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

## Contribution
This project uses the following external: 
- npm express
- MongoDB
- Mongoose ODM

To contribute to this project:
1. Clone repository from Installation section
2. Pull latest code locally, Create new working branch
3. Push up newly created branch
4. Create Pull Request and add reviewers when ready to merge with main code

## Test
![Main](./images/main.png)
![employee](./images/view-employee.png)
View tutorial video here: [Employee Tracker Demo](https://drive.google.com/file/d/1rdozH23k3EESVHgkVL-EvtHcpNSrIwTf/view)

## Questions
Any questions? Contact at: ginomaglaque@gmail.com

GitHub: [ginomaglaqueucla](https://github.com/ginomaglaqueucla)