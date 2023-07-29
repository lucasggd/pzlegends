import { Category } from "./category";
import { User } from "./user";

export class Run {
    id!: number;
    user!: User;
    kills!: number;
    years!: number;
    months!: number;
    days!: number;
    videoUrl!: string;
    category!: Category;
}