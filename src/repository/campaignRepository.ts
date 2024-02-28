import { DataSource, Repository } from "typeorm";
import { Campaign } from '../model/campaign.entity';
import { DatabaseService } from '../service/db/databaseService';

export class CampaignRepository {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = DatabaseService.getInstance();
  }

  public async getCampaignRepository(): Promise<Repository<Campaign>> {
    const dataSource: DataSource = await this.databaseService.getDataSource();
    await this.databaseService.loadConnection();

    if (!dataSource) {
      throw new Error('Database connection not initialized');
    }
    return dataSource.getRepository(Campaign);
  }
}