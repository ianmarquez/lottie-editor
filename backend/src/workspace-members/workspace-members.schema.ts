import z from 'zod'

export const workspaceMembersCreateSchema = z.object({
  userId: z.number({
    required_error: 'Please input a workspace owner',
  }),
  workspaceId: z.number({
    required_error: 'Please input a workspace owner',
  }),
})
