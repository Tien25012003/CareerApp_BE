interface IErrorData {
  code: string;
  data?: any;
  message: string;
}
export type TErrorKey =
  | "ERROR_INVALID"
  | "ADD_SUCCESS"
  | "ADD_FAIL"
  | "SERVER_ERROR"
  | "NEW_EMPTY"
  | "DELETE_SUCCESS"
  | "GET_SUCCESS"
  | "UPDATE_SUCCESS";
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
    "ADD_SUCCESS",
    {
      code: "ADD_SUCCESS",
      message: "Thêm mới thành công",
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
    "DELETE_SUCCESS",
    {
      code: "DELETE_SUCCESS",
      message: "Xóa thành công",
      data: {},
    },
  ],
  [
    "GET_SUCCESS",
    {
      code: "GET_SUCCESS",
      message: "Lấy dữ liệu thành công",
      data: {},
    },
  ],
  [
    "UPDATE_SUCCESS",
    {
      code: "UPDATE_SUCCESS",
      message: "Cập nhật thành công",
      data: {},
    },
  ],
]);
export default ErrorUtils;
