import { Response } from "express";
import { SchoolDictionaryModel } from "../../models/SchoolDictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import {
  IGetListSchoolDictionaryRequest,
  ISchoolDictionary,
} from "../../utils/interfaces/SchoolDictionary";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

export const getListSchool = async (
  req: TRequest<any, IGetListSchoolDictionaryRequest & TPagingParams>,
  res: Response<TResponseWithPagination<ISchoolDictionary[] | IErrorData>>
) => {
  try {
    const {
      size = 10,
      page = 1,
      category,
      search,
      minScore,
      provinces,
    } = req.query;

    // Build the filter query
    const query: Record<string, any> = {};
    if (category) query.type = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        {
          majors: {
            $elemMatch: { majorName: { $regex: search, $options: "i" } },
          },
        },
      ];
    } // Case-insensitive search
    if (minScore) {
      query["majors.entryScore"] = { $lte: Number(minScore) };
    }
    if (provinces) {
      const provinceArray = provinces.split(",").map((p) => p.trim()); // Split and trim spaces

      query.$or = provinceArray.map((province) => ({
        city: { $regex: province, $options: "i" },
      }));
    }

    // Fetch paginated data
    const schoolDictionaries = await SchoolDictionaryModel.find(query)
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Get the total count
    const totalCounts = await SchoolDictionaryModel.countDocuments(query);

    // Respond with data and pagination
    return res.json({
      code: 200,
      data: schoolDictionaries,
      message: "Success",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ErrorUtils.get("SERVER_ERROR"));
  }
};
