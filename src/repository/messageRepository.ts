import { DataSource, Repository } from "typeorm";
import { Message } from '../model/message.entity';
import { DatabaseService } from '../service/db/databaseService';

export class MessageRepository {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = DatabaseService.getInstance();
  }

  public async getMessageRepository(): Promise<Repository<Message>> {
    const dataSource: DataSource = await this.databaseService.getDataSource();
    await this.databaseService.loadConnection();

    if (!dataSource) {
      throw new Error('Database connection not initialized');
    }
    return dataSource.getRepository(Message);
  }
}