export interface AppNavParams {
  issue: {
    owner: string
    repo: string
    issueId: string
  }
  issueList: {
    owner: string
    repo: string
  }
  root: never
}
