import db from "../../../db";
import { advocates } from "../../../db/schema";
import { Advocate } from "@/types/advocate";
import { count, or, ilike, sql } from "drizzle-orm";

interface PaginatedAdvocatesResult {
  data: Advocate[];
  total: number;
}

export class AdvocatesService {
  async getAdvocates(
    page: number,
    limit: number,
    search?: string
  ): Promise<PaginatedAdvocatesResult> {
    const offset = (page - 1) * limit;

    // Build search conditions if search term is provided
    const searchConditions = search
      ? or(
          ilike(advocates.firstName, `%${search}%`),
          ilike(advocates.lastName, `%${search}%`),
          ilike(advocates.city, `%${search}%`),
          ilike(advocates.degree, `%${search}%`),
          sql`${advocates.specialties}::text ILIKE ${'%' + search + '%'}`
        )
      : undefined;

    const [data, totalCount] = await Promise.all([
      db
        .select()
        .from(advocates)
        .where(searchConditions)
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(advocates)
        .where(searchConditions),
    ]);

    // Convert number fields to strings to match Advocate interface
    const formattedData = data.map((advocate) => ({
      ...advocate,
      specialties: advocate.specialties as string[],
      yearsOfExperience: advocate.yearsOfExperience.toString(),
      phoneNumber: advocate.phoneNumber.toString(),
    }));

    return {
      data: formattedData,
      total: totalCount[0].count,
    };
  }
}

export const advocatesService = new AdvocatesService();
