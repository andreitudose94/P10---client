export const ASSIGNED = 'Assigned'
export const ACCEPTED = 'Accepted'
export const IN_PROGRESS = 'In Progress'
export const REJECTED = 'Rejected'
export const INTERRUPTED = 'Interrupted'
export const COMPLETED = 'Completed'

export const STATUSES = {
  IP: [ IN_PROGRESS ],
  ACC: [ ACCEPTED ],
  CL: [ REJECTED, INTERRUPTED, COMPLETED ],
  ARQ: [ ASSIGNED ]
}
