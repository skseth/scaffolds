export function hello_world(): string {
  return 'hello, world!'
}

export function greet(name: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const now = new Date()
  const formattedDate = now.toLocaleDateString('en-US', options)
  return `Hello, ${name}! Today is ${formattedDate}`
}
