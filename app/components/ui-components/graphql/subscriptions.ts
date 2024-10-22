/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onCreateProject(filter: $filter, owner: $owner) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onCreateTask(filter: $filter, owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onDeleteProject(filter: $filter, owner: $owner) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onDeleteTask(filter: $filter, owner: $owner) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onUpdateProject(filter: $filter, owner: $owner) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onUpdateTask(filter: $filter, owner: $owner) {
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
