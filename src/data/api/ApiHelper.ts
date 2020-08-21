import RequestOptions from "./RequestOptions";

export default class ApiHelper {
  public static async fetchPostJson(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
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
      (response: Response): Promise<string> => response.text()
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

  public static async fetchPutJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }
    optionsWrapper
      .setMethod("PUT")
      .setCredentials("include")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "GET,PUT")
      .addHeader("Accept", "application/json");

    return fetch(url, optionsWrapper.toRequestInit()).then(
      (response: Response): Promise<string> => response.text()
    );
  }

  public static async fetchDeleteJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }
    optionsWrapper
      .addHeader("Access-Control-Allow-Credentials", "true")
      .setMethod("DELETE")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "DELETE");

    return fetch(url, optionsWrapper.toRequestInit()).then(
      (response: Response): Promise<string> => response.text()
    );
  }
}
