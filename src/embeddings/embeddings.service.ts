import { Document } from '@langchain/core/documents';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { TogetherAIEmbeddings } from '@langchain/community/embeddings/togetherai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { BaseRetriever } from '@langchain/core/dist/retrievers';

@Injectable()
export class EmbeddingsService {
	private vectorStore: MemoryVectorStore;

	constructor(private configService: ConfigService) {
		this.vectorStore = new MemoryVectorStore(
			new TogetherAIEmbeddings({
				apiKey: configService.get<string>('TOGETHERAI_API_KEY'),
				modelName: configService.get<string>('TOGETHERAI_MODEL_NAME'),
			}),
		);
	}

    hasPdfs(): boolean {
        return false; // TODO 2: this.lookForPdfs().length > 0;
    }

	private lookForPdfs(): string[] {
		return fs.readdirSync(path.join('.', 'pdf')).filter((file) => {
			return file.endsWith('.pdf');
		});
	}

	private async loadPdfs(): Promise<Document<Record<string, any>>[]> {
		// TODO 3: Implement pdf loader
		return Promise.resolve([]);
	}

	async embed(): Promise<boolean> {
		// TODO 4: Implement pdf embedding
        return true;
	}

    async retriever(): Promise<BaseRetriever> {
		// TODO 5: Implement retriever
        return undefined;
    }
}
