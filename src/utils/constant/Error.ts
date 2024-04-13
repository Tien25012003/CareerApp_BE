export interface IErrorData {
  code: string;
  data?: any;
  message: string;
}
export type TErrorKey =
  | "ERROR_INVALID"
  | "ADD_FAIL"
  | "SERVER_ERROR"
  | "NEW_EMPTY"
  | "EXAM_ID_DELETE_NOT_FOUND";
const ErrorUtils = new Map<TErrorKey, IErrorData>([
  [
    "ERROR_INVALID",
    {
      code: "ERROR_INVALID",
      message: "Dữ liệu không phù hợp",
      data: {},
    },
  ],

  [
    "ADD_FAIL",
    {
      code: "ADD_FAIL",
      message: "Thêm mới thất bại",
      data: {},
    },
  ],
  [
    "SERVER_ERROR",
    {
      code: "SERVER_ERROR",
      message: "Lỗi hệ thống",
      data: {},
    },
  ],
  [
    "NEW_EMPTY",
    {
      code: "NEW_EMPTY",
      message: "Dữ liệu rộng",
      data: {},
    },
  ],
  [
    "EXAM_ID_DELETE_NOT_FOUND",
    {
      code: "EXAM_ID_DELETE_NOT_FOUND",
      message: "Id bài kiểm tra cần xóa không tồn tại",
      data: {},
    },
  ],
]);
export default ErrorUtils;
