import z from 'zod'

export const workspaceCreateSchema = z.object({
  name: z
    .string({
      required_error: 'Workspace name is required',
      invalid_type_error: 'Please enter a valid string',
    })
    .min(2, { message: 'Workspace name must be at least 2 characters' })
    .max(64, { message: 'Workspace name must be less than 64 characters' })
    .trim(),
  userId: z.number({
    required_error: 'Please input a workspace owner',
  }),
})
