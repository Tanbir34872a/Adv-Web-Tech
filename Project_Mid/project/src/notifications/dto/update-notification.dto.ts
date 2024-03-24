export class UpdateNotificationDto {
    title?: string;
    content?: string;
    towards?: number[] | "All" | "All employees" | "All Patients"; // Array of employee ids
}