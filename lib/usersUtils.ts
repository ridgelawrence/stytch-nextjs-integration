import { User } from '../pages/api/users/';
import {BASE_URL} from './constants'

export async function getUserById(id: number) {
  const resp = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: 'GET',
  });
  const data = await resp.json();
  return data;
}

export async function deleteUserById(id: number) {
  const resp = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: 'DELETE',
  });
  const data = await resp.json();
  return data;
}

export async function addUser(name: string, email: string, password: string) {
  console.log(name, email, password)
  const resp = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }); 
  const data = await resp.json();
  return data;
}

// export const fetchProjectUsersByProjectId = async (projectId: string): Promise<Array<ProjectUser>> => {
export const getUsers = async (): Promise<Array<User>> => {
  const resp = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
  })
  const data = await resp.json()

  return data
}