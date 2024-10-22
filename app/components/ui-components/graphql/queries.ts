/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      createdAt
      description
      endDate
      id
      owner
      priority
      startDate
      status
      tasks {
        nextToken
        __typename
      }
      teamMembers
      title
      updatedAt
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      createdAt
      description
      dueDate
      id
      owner
      owners
      priority
      project {
        createdAt
        description
        endDate
        id
        owner
        priority
        startDate
        status
        teamMembers
        title
        updatedAt
        __typename
      }
      projectId
      status
      title
      updatedAt
      __typename
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        description
        endDate
        id
        owner
        priority
        startDate
        status
        teamMembers
        title
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        description
        dueDate
        id
        owner
        owners
        priority
        projectId
        status
        title
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
