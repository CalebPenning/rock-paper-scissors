const wait = (x: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, x * 1000)
  })
}

export { wait }
