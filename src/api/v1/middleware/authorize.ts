import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

interface AuthorizationOptions {
  hasRole: string[];
}

const isAuthorized = (opts: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = res.locals;

      if (!role) {
        throw new AuthorizationError(
          "Forbidden: No role found",
          "ROLE_NOT_FOUND"
        );
      }

      if (opts.hasRole.includes(role)) {
        return next();
      }

      throw new AuthorizationError(
        "Forbidden: Insufficient role",
        "INSUFFICIENT_ROLE"
      );
    } catch (error) {
      next(error);
    }
  };
};

export default isAuthorized;
