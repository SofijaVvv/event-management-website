export interface IEvents {
    id: number;
    date: string;
    time: string;
    end_time: string;
    client_id: number;
    type_of_event_id: number;
    status_event_id: number;
    location_id: number;
    event_rating: number;
    user_id: number;
    description: string;
    number_of_participants: number;
}

export interface Details {
    id: number;
    name: string;
}

export interface EventDetails {
    id: number;
    client: Details;
    type_of_event: Details;
    status_event: Details;
    location: Details;
    user: Details;
    description: string;
    date: string;
    time: Details;
    end_time: Details;
    event_rating: number;
    number_of_participants: number;
}
