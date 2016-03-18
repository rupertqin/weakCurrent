export const LOADING = 'LOADING'
export const CLOSING= 'CLOSING'

export function loading() {
  return {
    type: LOADING
  }
}

export function closing() {
  return {
    type: CLOSING
  }
}
