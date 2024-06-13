export const configuration = {
    dev: {
        secret: "ea7dcb19-c142-4ddb-830c-0fab377a4e32",
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-dev"
        },
        port: 3000
    },
    stg: {
        secret: "00085283-d62c-406f-a223-db2878c5502a",
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-stg"
        },
        port: 3000
    },
    prod: {
        secret: "87cc39a8-0a5a-491f-9d28-8bfde8f6f9a6",
        mongo: {
            dbConnect: "development.asuvmwl.mongodb.net",
            databaseName: "easygenerator-prod"
        },
        port: 3000
    }
};
