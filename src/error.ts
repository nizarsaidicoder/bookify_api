export class HttpError extends Error
{
  status?: number; // optionnel, afin de rester compatible avec le type Error standard

  constructor(message: string, status: number)
  {
    super(message);
    this.status = status;
  }
}
export class NotFoundError extends HttpError
{
  constructor(message: string)
  {
    super(message, 404);
  }
}
