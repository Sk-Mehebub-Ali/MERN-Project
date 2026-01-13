const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(` - Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  const message =
    err instanceof Error && err.message
      ? err.message
      : "Internal Server Error";

  res.status(statusCode);

   const responseBody = {
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err instanceof Error
        ? err.stack
        : null
  };

  console.error('Error: ', responseBody);
  res.json(responseBody);
};

export { notFound, errorHandler };
