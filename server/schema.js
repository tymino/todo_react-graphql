const path = require('path');
const { readFileSync } = require('fs');
const { buildSchema } = require('graphql');

const pathToGraph = path.resolve(__dirname, 'schema.graphql');
const chemaString = readFileSync(pathToGraph, { encoding: 'utf-8' });
const schema = buildSchema(chemaString);

module.exports = schema;
