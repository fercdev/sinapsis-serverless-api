import { DataSource, Repository } from "typeorm";
import { User } from '../model/user.entity';
import { DatabaseService } from '../service/db/databaseService';

export class UserRepository {
  private databaseService: DatabaseService; // Agrega una instancia de DatabaseService

  constructor() {
    this.databaseService = DatabaseService.getInstance(); // Crea una instancia única de DatabaseService
  }

  public async getUserRepository(): Promise<Repository<User>> {
    const dataSource: DataSource = await this.databaseService.getDataSource(); // Obtiene el objeto DataSource
    await this.databaseService.loadConnection();

    if (!dataSource) {
      throw new Error('Database connection not initialized');
    }

    return dataSource.getRepository(User);
  }
}