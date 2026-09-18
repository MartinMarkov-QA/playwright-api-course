import { APIRequestContext } from "@playwright/test";

export class RequestHandler {
	private request: APIRequestContext;
	private defaultBaseUrl: string;
	private baseUrl: string;
	private apiPath: string;
	private queryParams: object= {};
	private apiHeaders: object = {};
	private apiBody: object = {};

	constructor(request: APIRequestContext, defaultBaseUrl: string) {
		this.request = request;
		this.defaultBaseUrl = defaultBaseUrl;
	}

	url(url: string) {
		this.baseUrl = url;
		return this;
	}

	path(path: string) {
		this.apiPath = path;
		return this;
	}

	params(params: object) {
		this.queryParams = params;
		return this;
	}

	headers(headers: object) {
		this.apiHeaders = headers;
		return this;
	}

	body(body: object) {
		this.apiBody = body;
		return this;
	}

	public getUrl() {
		const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
		for (const [key, value] of Object.entries(this.queryParams)) {
			url.searchParams.append(key, value);
		}
		return url.toString();
	}
	
 	public getRequest() {
		return this.request.get(this.getUrl());
	}
}
