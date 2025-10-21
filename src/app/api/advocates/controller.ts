import { advocatesService } from "./service";
import { Advocate } from "@/types/advocate";

interface PaginatedResponse {
  data: Advocate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class AdvocatesController {
  async getAdvocates(page?: number, limit?: number): Promise<PaginatedResponse> {
    // Validate and set defaults
    const validatedPage = Math.max(1, page || 1);
    const validatedLimit = Math.max(1, Math.min(100, limit || 10)); // Max 100 per page

    // Get data from service
    const result = await advocatesService.getAdvocates(validatedPage, validatedLimit);

    // Calculate total pages
    const totalPages = Math.ceil(result.total / validatedLimit);

    // Format response
    return {
      data: result.data,
      total: result.total,
      page: validatedPage,
      limit: validatedLimit,
      totalPages,
    };
  }
}

export const advocatesController = new AdvocatesController();
