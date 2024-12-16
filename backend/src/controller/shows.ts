import { Request, Response } from "express";
import { Show, ShowSchemaType } from "../database/models/show";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../utils/constants";
import { getTokenInfo } from "../utils/token";
import { TShowType } from "../types";

export const getAllShows = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const page = req.query?.page
      ? Math.max(parseInt(req.query.page as string), 1)
      : DEFAULT_PAGE;
    const per_page = req.query?.per_page
      ? Math.max(parseInt(req.query.per_page as string), 1)
      : DEFAULT_PER_PAGE;
    const showType: Partial<TShowType> = req.query?.type as Partial<TShowType>;
    const searchTerm = req.query?.search as string;

    const startIndex = (page - 1) * per_page;

    const age = getTokenInfo({ req })?.user?.age;

    const query: ShowSchemaType = {};

    if (age && age < 18) {
      query.rating = { $ne: "R" };
    }

    if (showType && (showType === "TV Show" || showType === "Movie")) {
      query.type = showType;
    }

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { cast: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const [total, shows] = await Promise.all([
      Show.countDocuments(query),
      Show.find(query)
        .select("title type rating cast listed_in release_year show_id")
        .skip(startIndex)
        .limit(per_page),
    ]);

    const total_pages = Math.ceil(total / per_page);

    if (page > total_pages) {
      return res.status(400).json({
        error: true,
        message: `Invalid page number. Page ${page} does not exist.`,
        data: [],
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Shows fetched successfully.",
      data: shows,
      meta: {
        per_page,
        current_page: page,
        total_pages,
      },
    });
  } catch (error) {
    console.error("Error fetching shows:", error);

    return res.status(500).json({
      error: true,
      message:
        "An error occurred while fetching shows. Please try again later.",
    });
  }
};

export const getSingleShow = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const age = getTokenInfo({ req })?.user?.age;

    const query: Partial<ShowSchemaType> = { show_id: id };

    if (age && age < 18) {
      query.rating = { $ne: "R" };
    }

    const show = await Show.findOne(query);

    if (!show) {
      return res.status(404).json({
        error: true,
        message: "Show not found or restricted due to age policy.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Show fetched successfully.",
      data: show,
    });
  } catch (error) {
    console.error("Error fetching show:", error);

    return res.status(500).json({
      error: true,
      message:
        "An error occurred while fetching the show. Please try again later.",
    });
  }
};
