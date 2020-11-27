/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
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
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "POST")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text());
              return response;
            })
            .then((response: Response): Promise<T> => response.json());
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchPostRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "POST")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text());
              return response;
            })
            .then((response: Response): Promise<string> => response.text());
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchGetJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "GET")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(
            async (response: Response): Promise<T> => {
              if (response.status !== 200) {
                throw Error(await response.text());
              }
              return response.json();
            }
          );
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchGetRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("GET")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "GET")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text());
              return response;
            })
            .then((response: Response): Promise<string> => response.text());
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchPutJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("PUT")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "PUT")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(
            async (response: Response): Promise<T> => {
              if (response.status !== 200) throw Error(await response.text());
              return response.json();
            }
          );
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchPutRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("PUT")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "PUT")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(
            async (response: Response): Promise<string> => {
              if (response.status !== 200) throw Error(await response.text());
              return response.json();
            }
          );
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchDeleteJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("DELETE")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "DELETE")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(
            async (response: Response): Promise<T> => {
              if (response.status !== 200) throw Error(await response.text());
              return response.json();
            }
          );
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }

  public static async fetchDeleteRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions;
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions();
    }

    optionsWrapper
      .setMethod("DELETE")
      .addHeader("Content-Type", "application/json")
      .addHeader("Access-Control-Allow-Methods", "DELETE")
      .addHeader("Accept", "application/json");

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error("Options wrapper is undefined");

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text());
              return response;
            })
            .then((response: Response): Promise<string> => response.text());
          resolve(validResponse);
          return;
        } catch (e) {
          if (e.message.includes("Failed to fetch")) {
            console.log("failed to fetch. trying again");
          } else {
            reject(e);
            return;
          }
        }
      }
    });
  }
}
