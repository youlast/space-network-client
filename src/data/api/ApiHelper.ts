import RequestOptions from "./RequestOptions";

export default class ApiHelper {
  public static async fetchPostJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("POST")
      .setCredentials("include")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "GET,POST")
      .addHeader("Accept", "application/json");

    return fetch(url, optionsWrapper.toRequestInit()).then(
      (response: Response): Promise<T> => response.json()
    );
  }

  public static async fetchGetJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    return fetch(url, optionsWrapper.toRequestInit()).then(
      (response: Response): Promise<T> => response.json()
    );
  }
}
