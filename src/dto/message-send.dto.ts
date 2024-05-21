export type MessageDto = {
    content: string;
    role: string;
}

export type MessageSendDto = {
    message: MessageDto;
    history: MessageDto[];
}