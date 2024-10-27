/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $condition: ModelProjectConditionInput
    $input: CreateProjectInput!
  ) {
    createProject(condition: $condition, input: $input) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $condition: ModelTaskConditionInput
    $input: CreateTaskInput!
  ) {
    createTask(condition: $condition, input: $input) {
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
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $condition: ModelProjectConditionInput
    $input: DeleteProjectInput!
  ) {
    deleteProject(condition: $condition, input: $input) {
      id
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $condition: ModelTaskConditionInput
    $input: DeleteTaskInput!
  ) {
    deleteTask(condition: $condition, input: $input) {
      id
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $condition: ModelProjectConditionInput
    $input: UpdateProjectInput!
  ) {
    updateProject(condition: $condition, input: $input) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $condition: ModelTaskConditionInput
    $input: UpdateTaskInput!
  ) {
    updateTask(condition: $condition, input: $input) {
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
  }
`;
