import { IWebsitesRepository } from "../../repositories/IWebsitesRepository";

type RegisterWebsiteRequest = {
  accountId: string;
  name: string;
  description: string;
  url: string;
}

export class RegisterWebsite {
  constructor(
    private websitesRepository: IWebsitesRepository,
  ) { }

  async execute({ accountId, name, description, url }: RegisterWebsiteRequest) {
    const websiteExists = this.websitesRepository.findByName(name);

    if (websiteExists && websiteExists.props.accountId === accountId) {
      throw new Error("Website already exists.");
    }

    const website = this.websitesRepository.create({
      accountId,
      name,
      description,
      url
    });

    return website;
  }
}
