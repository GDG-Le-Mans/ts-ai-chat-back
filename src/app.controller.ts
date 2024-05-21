import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { GroqService } from 'src/groq/groq.service';
import { MessageSendDto } from 'src/dto/message-send.dto';

@Controller()
export class AppController {
	constructor(private readonly groqService: GroqService) {}

	@Post()
	sendMessage(@Body() message: MessageSendDto): Promise<void> {
		return this.groqService.sendMessage(message.message, message.history);
	}

	@Sse('sse')
	sse(): Observable<{data: string}> {
		return this.groqService.groqEvent$.pipe(
			map((item: string) => ({ data: item })),
		);
	}
}
