export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

// fieldErrors format:
// {
//   email: ["Required"],
//   username: ["Username must be at least 3 characters", "Username cannot contain spaces"]
// }
// message: "Email is required, Username must be at least 3 characters and cannot contain spaces"

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formateFieldErrors(fieldErrors);
    super(400, message, fieldErrors);
    this.name = "ValidationError";
  }

  static formateFieldErrors(fieldErrors: Record<string, string[]>): string {
    const formattedMessage = Object.entries(fieldErrors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
        console.log("Messages:::>", messages);

        if (messages[0] === "Required") {
          return `${fieldName} is required`;
        } else {
          return messages.join(" and ");
        }
      },
    );
    return formattedMessage.join(", ");
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
