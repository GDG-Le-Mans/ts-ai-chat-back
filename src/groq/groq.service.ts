import { ChatGroq } from '@langchain/groq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from 'src/dto/message-send.dto';
import { BehaviorSubject } from 'rxjs';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
	AIMessage,
	HumanMessage,
	SystemMessage,
} from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { EmbeddingsService } from 'src/embeddings/embeddings.service';
import { formatDocumentsAsString } from 'langchain/util/document';
import { RunnablePassthrough } from '@langchain/core/runnables';
import { pull } from "langchain/hub";

@Injectable()
export class GroqService {
	private groqToken = this.configService.get<string>('GROQ_API_KEY');
	private groqEvent = new BehaviorSubject<string>(null);
	public groqEvent$ = this.groqEvent.asObservable();

	private readonly groq = new ChatGroq({
		apiKey: this.groqToken,
        model: 'llama3-70b-8192',
	});

	// TODO 0: Implement chat prompt template
	private readonly template;

	constructor(private readonly configService: ConfigService, private readonly embeddingsService: EmbeddingsService) {}

	private async buildRetrievalChain() {
		// TODO 6: Implement retrieval chain
		return Promise.resolve(undefined);
	}

	private async buildChatChain() {
		// TODO 1: Implement chat chain
		return Promise.resolve(undefined)
	}

	public async sendMessage(message: MessageDto, history: MessageDto[]) {
		const chain = await (
			this.embeddingsService.hasPdfs() ?
				this.buildRetrievalChain() :
				this.buildChatChain());

		const response = await chain.stream({
			input: message.content,
			history: history.map((m) =>
				m.role === 'user'
					? new HumanMessage(m.content)
					: new AIMessage(m.content),
			),
		});

		for await (const item of response) {
			for(const char of item){
                this.groqEvent.next(char);
            }
		}
        this.groqEvent.next('<|END|>');
	}
}
