import { Workspace } from '@prisma/client'
import { db } from '../config/db.server'

export type ClientWorkspace = Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>

export const getAllWorkspaces = () => db.workspace.findMany()
export const createWorkspace = (workspace: ClientWorkspace) => {
  return db.workspace.create({
    data: {
      name: workspace.name,
      userId: workspace.userId,
    },
  })
}

export const findWorkspacesByOwner = (userId: number) => {
  return db.workspace.findMany({
    where: {
      userId,
    },
  })
}

export const findWorkspaceById = (workspaceId: number) => {
  return db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  })
}

export const deleteWorkspaceById = (workspaceId: number) => {
  return db.workspace.delete({
    where: {
      id: workspaceId,
    },
  })
}

export const updateWorkspaceById = (workspace: Workspace) => {
  return db.workspace.update({
    data: workspace,
    where: {
      id: workspace.id,
    },
  })
}
