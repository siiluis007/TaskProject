# TaskProject - Microservices

This repository contains a microservice called TaskProject, which can be run using a `docker-compose.yml` file.

## Requirements

Make sure you have the following requirements installed on your system:

- [Docker](https://www.docker.com/get-started) <!-- Tamaño normal -->

## Usage Instructions

1. Clone this repository to your local machine:

```bash
git clone https://github.com/siiluis007/TaskProject.git
```

2. Navigate to the cloned repository directory:

```bash
cd TaskProject
 ```
3. Configure the environment variables by creating a .env file in the root of the repository. You can use the provided .env.example file as a template and replace the values with your own.
4. Run the docker-compose command to build and run the microservice:
```bash
docker-compose up
 ```
This will build and start the necessary containers for the microservice.

5. Once the containers have been successfully started, you can access the microservice at http://localhost:port, where port is the port configured in the docker-compose.yml file.

## Configuration
You can configure the microservice by editing the .env file in the root of the repository. This file contains the necessary environment variables for the microservice. Adjust the values according to your needs.
## Contributing 
If you wish to contribute to this project, you can follow these steps:
1. Create a fork of this repository.
2. Create a new branch in your fork:
```bash
git checkout -b feature/new-feature
 ```
 3. Make your modifications and/or improvements.
 4. Commit your changes:
 ```bash
git commit -m "Add new feature"
 ```
 6. Open a pull request in the original repository.
 ## License
 This project is licensed under the MIT License.
 <!-- <span style="font-size:12px;">Note: This README template was created using Markdown syntax.</span> -->
