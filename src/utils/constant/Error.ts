export interface IErrorData {
  code: string | number;
  data?: any;
  message: string;
}
export type TErrorKey =
  | "ERROR_INVALID"
  | "ADD_FAIL"
  | "SERVER_ERROR"
  | "NEW_EMPTY"
  | "EXAM_ID_DELETE_NOT_FOUND"
  | "SUBJECT_ID_DELETE_NOT_FOUND"
  | "PROMT_IS_EMPTY"
  | "LOCK_AI"
  | "CONCLUSION_NOT_EXIST";
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
  [
    "SUBJECT_ID_DELETE_NOT_FOUND",
    {
      code: "SUBJECT_ID_DELETE_NOT_FOUND",
      message: "Id môn học cần xóa không tồn tại",
      data: {},
    },
  ],
  [
    "PROMT_IS_EMPTY",
    {
      code: "PROMT_IS_EMPTY",
      message: "Câu hỏi rỗng",
      data: {},
    },
  ],
  [
    "LOCK_AI",
    {
      code: "LOCK_AI",
      message: "Chức năng AI bị khoá",
      data: {},
    },
  ],
  [
    "CONCLUSION_NOT_EXIST",
    {
      code: "CONCLUSION_NOT_EXIST",
      message: "Kết luận không tồn tại",
      data: {},
    },
  ],
]);
export default ErrorUtils;
