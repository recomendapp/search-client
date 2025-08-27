import axios, { AxiosInstance } from 'axios';
import type {
  BestResultsSearchQuery,
  BestResultsSearchResponse,
  MovieSearchQuery,
  MovieSearchResponse,
  TvSeriesSearchQuery,
  TvSeriesSearchResponse,
  PersonSearchQuery,
  PersonSearchResponse,
  UserSearchQuery,
  UserSearchResponse,
  PlaylistSearchQuery,
  PlaylistSearchResponse,
} from '@recomendapp/types';


export interface SearchClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export interface RequestOptions {
  accessToken?: string;
  locale?: string;
}

export class SearchClient {
  private api: AxiosInstance;
  private apiKey?: string;

  constructor(options: SearchClientOptions) {
	if (!options.baseUrl) {
	  throw new Error('baseUrl is a required option.');
	}
	if (options.apiKey) {
	  this.apiKey = options.apiKey;
	}
	this.api = axios.create({
	  baseURL: options.baseUrl,
	});
  }

  private async request<T>(endpoint: string, params: object, options?: RequestOptions): Promise<T> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (this.apiKey) {
	  headers['x-api-key'] = this.apiKey;
	}

	if (options?.accessToken) {
	  headers['Authorization'] = `Bearer ${options.accessToken}`;
	}
	if (options?.locale) {
	  headers['language'] = options.locale;
	}

	try {
		const response = await this.api.post<T>(endpoint, null, { params, headers });
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(`Search API Error (${error.response.status}): ${error.response.data?.message || 'An unknown error occurred'}`);
		}
		throw error;
	}
  }

  public searchBestResults(params: BestResultsSearchQuery, options?: RequestOptions): Promise<BestResultsSearchResponse> {
	return this.request('/search/best-results', params, options);
  }

  public searchMovies(params: MovieSearchQuery, options?: RequestOptions): Promise<MovieSearchResponse> {
	return this.request('/search/movies', params, options);
  }

  public searchTvSeries(params: TvSeriesSearchQuery, options?: RequestOptions): Promise<TvSeriesSearchResponse> {
	return this.request('/search/tv-series', params, options);
  }

  public searchPersons(params: PersonSearchQuery, options?: RequestOptions): Promise<PersonSearchResponse> {
	return this.request('/search/persons', params, options);
  }

  public searchUsers(params: UserSearchQuery, options?: RequestOptions): Promise<UserSearchResponse> {
	return this.request('/search/users', params, options);
  }
  
  public searchPlaylists(params: PlaylistSearchQuery, options?: RequestOptions): Promise<PlaylistSearchResponse> {
	return this.request('/search/playlists', params, options);
  }
}