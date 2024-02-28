import { DataSource, Repository } from "typeorm";
import { Client } from '../model/client.entity';
import { DatabaseService } from '../service/db/databaseService';

export class ClientRepository {
  private databaseService: DatabaseService; // Agrega una instancia de DatabaseService

  constructor() {
    this.databaseService = DatabaseService.getInstance(); // Crea una instancia única de DatabaseService
  }

  public async getClientRepository(): Promise<Repository<Client>> {
    const dataSource: DataSource = await this.databaseService.getDataSource(); // Obtiene el objeto DataSource
    await this.databaseService.loadConnection();

    if (!dataSource) {
      throw new Error('Database connection not initialized');
    }
    return dataSource.getRepository(Client);
  }
}