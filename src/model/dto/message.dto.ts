import { Status } from "./../util/status";
import { ShippingStatus } from "./../util/shippingStatus";

export class MessageDto {
    
    campaignId: number;
    shippingStatus: ShippingStatus;
    scheduledDatetime: Date;
    message: string;
    status: Status;
    
}