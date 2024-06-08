import { WorkspaceMembers } from '@prisma/client'
import { db } from '../config/db.server'

export type ClientWorkspaceMembers = Omit<
  WorkspaceMembers,
  'id' | 'createdAt' | 'updatedAt'
>

export const getAllWorkspaceMembers = () => db.workspaceMembers.findMany()

export const createWorkspaceMember = (
  workspaceMember: ClientWorkspaceMembers
) => {
  return db.workspaceMembers.create({
    data: {
      userId: workspaceMember.userId,
      workspaceId: workspaceMember.workspaceId,
    },
  })
}

export const findWorkspaceMembersByWorkspaceId = (workspaceId: number) => {
  return db.workspaceMembers.findMany({
    where: {
      workspaceId,
    },
  })
}

export const deleteWorkspaceMembership = (
  workspaceMember: ClientWorkspaceMembers
) => {
  return db.workspaceMembers.deleteMany({
    where: {
      userId: workspaceMember.userId,
      workspaceId: workspaceMember.workspaceId,
    },
  })
}
