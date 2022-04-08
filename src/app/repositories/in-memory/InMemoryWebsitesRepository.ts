import { Website } from "../../../domain/entities/Website";
import { RegisterWebsiteDto } from "../../dtos/RegisterWebsiteDto";
import { IWebsitesRepository } from "../IWebsitesRepository";

export class InMemoryWebsitesRepository implements IWebsitesRepository {
  constructor(private repository: Website[] = []) { }

  create(data: RegisterWebsiteDto): Website {
    const website = Website.create(data);

    this.repository.push(website);

    return website;
  }

  findById(id: string): Website | null {
    const website = this.repository.find(website => website.id === id);

    if (!website) return null;

    return website;
  }

  findByName(name: string): Website | null {
    const website = this.repository.find(website => website.props.name === name);

    if (!website) return null;

    return website;
  }
}
