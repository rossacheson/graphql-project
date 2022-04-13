const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const _ = require('lodash');

// Dummy data
var usersData = [
  { id: '1', name: 'Bond', age: 36, profession: 'Programmer' },
  { id: '13', name: 'Anna', age: 26, profession: 'Mechanic' },
  { id: '211', name: 'Bella', age: 16, profession: 'Programmer' },
  { id: '19', name: 'Gina', age: 26, profession: 'Programmer' },
  { id: '150', name: 'Georgina', age: 36, profession: 'Teacher' },
];

var hobbiesData = [
  { id: '1', title: 'Programming', description: '...', userId: '1' },
  { id: '2', title: 'Rowing', description: '...', userId: '1' },
  { id: '3', title: 'Swimming', description: '...', userId: '13' },
  { id: '4', title: 'Fencing', description: '...', userId: '211' },
  { id: '5', title: 'Hiking', description: '...', userId: '1' },
];

var postsData = [
  { id: '1', comment: 'Building a Mind', userId: '1' },
  { id: '2', comment: 'GraphQL is Amazing', userId: '1' },
  { id: '3', comment: 'How to Change the World', userId: '19' },
  { id: '4', comment: 'Fencing', userId: '211' },
  { id: '5', comment: 'Hiking', userId: '1' },
];

// Create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    profession: {
      type: GraphQLString,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    comment: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
