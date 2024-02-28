import connectionOptions from "../../../ormconfig";
import { DataSource } from "typeorm";

export class DatabaseService {
    private static instance: DatabaseService | null = null;
    private dataSource: DataSource | null = null;

    private constructor() {
        this.dataSource = new DataSource(connectionOptions);
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async loadConnection() : Promise<void> {
       try {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }
       } catch(e) {
        console.log("---->DB-ERROR: ", e);
        throw new Error(e);
       }
    }

    public getDataSource(): DataSource | null {
        return this.dataSource;
    }
}