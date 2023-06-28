export interface Tender {
    id: number;
    title: string;
    contracting_authority: string;
    start_date: Date;
    end_date: Date;
    max_value: number;
    description: string;
    active: boolean;
}