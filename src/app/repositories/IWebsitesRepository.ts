import { Website } from "../../domain/entities/Website";
import { RegisterWebsiteDto } from "../dtos/RegisterWebsiteDto";

export interface IWebsitesRepository {
  create(data: RegisterWebsiteDto): Website;
  findById(id: string): Website | null;
  findByName(name: string): Website | null;
}
