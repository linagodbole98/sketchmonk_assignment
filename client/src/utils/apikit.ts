import { baseUrl } from "@/constants/apis";

export type QueryArgs = {
	search?: string;
	page?: number | string;
	take?: number | string | "all";
};


type Args = {
	url?: string;
	api?: string;
	query?: QueryArgs;
	body?: BodyInit | null;
	method?: string;
};

const BODY_METHODS = ["POST", "PUT", "PATCH"];

export default async function apiKit2({
	url,
	api,
	query,
	method = "GET",
	body = null,
}: Args) {
	try {
		const qs = generateQueryString(query);
		const _url = (url ?? baseUrl + api) + qs;

		if (BODY_METHODS.includes(method)) {
			body = JSON.stringify(body);
		}

		const response = await fetch(_url, {
			body,
			method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				// "Access-Control-Allow-Origin": process.env?.NEXT_PUBLIC_ORIGIN || "*",
			},
		});

		if (!response.ok) {
			throw new Error("Request failed");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		handleFetchError(error as Error);
		throw error;
	}
}

export function generateQueryString(query?: QueryArgs) {
	if (!query) return "";

	const qs = new URLSearchParams("");
	if (query?.search) qs.append("search", query.search);
	if (query?.page) qs.append("page", query.page as string);
	if (query?.take) qs.append("take", query.take as string);

	if (qs.size) return `?${qs.toString()}`;
	return "";
}

function handleFetchError(error: any) {
	const errorResponse = error?.cause?.response as Response;
	if (!errorResponse) return;
	const status = errorResponse?.status;
	switch (status) {
		case 400:
			console.log("Bad request");
			break;
		case 401:
			console.log("Unauthorized");
			break;
		case 403:
			console.log("Forbidden");
			break;
		case 404:
			console.log("Not found");
			break;
		case 500:
			console.log("Internal Server Error");
			break;
		default:
			console.log("Unknown error");
			break;
	}
}
