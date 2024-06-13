export const configuration = {
    dev: {
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-dev"
        },
        port: 3000,
        apiUrl: "http://localhost:3000/"
    },
    stg: {
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-stg"
        },
        port: 3000,
        apiUrl: "http://localhost:3000/"
    },
    prod: {
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-prod"
        },
        port: 3000,
        apiUrl: "http://localhost:3000/"
    }
};
