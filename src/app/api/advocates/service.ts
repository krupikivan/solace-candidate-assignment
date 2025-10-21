import db from "../../../db";
import { advocates } from "../../../db/schema";
import { Advocate } from "@/types/advocate";
import { count } from "drizzle-orm";

interface PaginatedAdvocatesResult {
  data: Advocate[];
  total: number;
}

export class AdvocatesService {
  async getAdvocates(
    page: number,
    limit: number
  ): Promise<PaginatedAdvocatesResult> {
    const offset = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      db.select().from(advocates).limit(limit).offset(offset),
      db.select({ count: count() }).from(advocates),
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
