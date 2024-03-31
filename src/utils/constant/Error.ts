interface IErrorData {
  code: string;
  data?: any;
  message: string;
}

const ErrorUtils = new Map<string, IErrorData>([
  [
    "SAd",
    {
      code: "220",
      message: "123213",
    },
  ],
]);
export default ErrorUtils;
