export default interface GTMState {
  registered: boolean,
  source: string | null,
  last_source: string | null,
  unsubscribers: any[]
}
