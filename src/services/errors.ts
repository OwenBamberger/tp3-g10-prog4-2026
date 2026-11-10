export class ValidacionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidacionError';
  }
}

export class NoEncontradoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoEncontradoError';
  }
}
