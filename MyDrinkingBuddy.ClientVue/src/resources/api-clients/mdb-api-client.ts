//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import dayjs from "dayjs";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";
import axios from "axios";
export class ClientBase {
  public getBaseUrl(url: any) {
    return import.meta.env.VITE_API_URL;
  }
}

export class DrinksClient extends ClientBase {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        super();

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : this.getBaseUrl("");

    }

    getAll(  cancelToken?: CancelToken | undefined): Promise<DrinkDto[]> {
        let url_ = this.baseUrl + "/api/Drinks/GetAll";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAll(_response);
        });
    }

    protected processGetAll(response: AxiosResponse): Promise<DrinkDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(DrinkDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<DrinkDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DrinkDto[]>(null as any);
    }
}

export class SessionClient extends ClientBase {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        super();

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : this.getBaseUrl("");

    }

    getAll(  cancelToken?: CancelToken | undefined): Promise<SessionDto[]> {
        let url_ = this.baseUrl + "/api/Session/GetAll";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAll(_response);
        });
    }

    protected processGetAll(response: AxiosResponse): Promise<SessionDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SessionDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<SessionDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SessionDto[]>(null as any);
    }

    get(sessionId: number , cancelToken?: CancelToken | undefined): Promise<SessionDto> {
        let url_ = this.baseUrl + "/api/Session/Get?";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined and cannot be null.");
        else
            url_ += "sessionId=" + encodeURIComponent("" + sessionId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: AxiosResponse): Promise<SessionDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = SessionDto.fromJS(resultData200);
            return Promise.resolve<SessionDto>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SessionDto>(null as any);
    }

    newSession(  cancelToken?: CancelToken | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/Session/NewSession";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processNewSession(_response);
        });
    }

    protected processNewSession(response: AxiosResponse): Promise<number> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return Promise.resolve<number>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<number>(null as any);
    }

    deleteSession(sessionId: number , cancelToken?: CancelToken | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Session/DeleteSession?";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined and cannot be null.");
        else
            url_ += "sessionId=" + encodeURIComponent("" + sessionId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            responseType: "blob",
            method: "DELETE",
            url: url_,
            headers: {
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteSession(_response);
        });
    }

    protected processDeleteSession(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    saveDrink(sessionDrinkDto: SessionDrinkDto , cancelToken?: CancelToken | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Session/SaveDrink";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(sessionDrinkDto);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSaveDrink(_response);
        });
    }

    protected processSaveDrink(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    updateDrink(sessionDrinkDto: SessionDrinkDto , cancelToken?: CancelToken | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Session/UpdateDrink";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(sessionDrinkDto);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateDrink(_response);
        });
    }

    protected processUpdateDrink(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    deleteDrink(sessionDrinkDto: SessionDrinkDto , cancelToken?: CancelToken | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Session/DeleteDrink";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(sessionDrinkDto);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "DELETE",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteDrink(_response);
        });
    }

    protected processDeleteDrink(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export class UserClient extends ClientBase {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        super();

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : this.getBaseUrl("");

    }

    get(  cancelToken?: CancelToken | undefined): Promise<UserDto> {
        let url_ = this.baseUrl + "/api/User/Get";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: AxiosResponse): Promise<UserDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = UserDto.fromJS(resultData200);
            return Promise.resolve<UserDto>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserDto>(null as any);
    }

    update(userDto: UserDto , cancelToken?: CancelToken | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/User/Update";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(userDto);

        let options_: AxiosRequestConfig = {
            data: content_,
            responseType: "blob",
            method: "PUT",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdate(_response);
        });
    }

    protected processUpdate(response: AxiosResponse): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data], { type: response.headers["content-type"] }), headers: _headers });
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export class DrinkDto implements IDrinkDto {
    drinkId?: number;
    userId?: number | undefined;
    drinkCategoryId?: number;
    name?: string;
    alcoholPercentage?: number;
    defaultSize?: number;
    imageUrl?: string;
    createdOn?: dayjs.Dayjs;
    createdBy?: string;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string;

    constructor(data?: IDrinkDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.drinkId = _data["drinkId"];
            this.userId = _data["userId"];
            this.drinkCategoryId = _data["drinkCategoryId"];
            this.name = _data["name"];
            this.alcoholPercentage = _data["alcoholPercentage"];
            this.defaultSize = _data["defaultSize"];
            this.imageUrl = _data["imageUrl"];
            this.createdOn = _data["createdOn"] ? dayjs(_data["createdOn"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.modifiedOn = _data["modifiedOn"] ? dayjs(_data["modifiedOn"].toString()) : <any>undefined;
            this.modifiedBy = _data["modifiedBy"];
        }
    }

    static fromJS(data: any): DrinkDto {
        data = typeof data === 'object' ? data : {};
        let result = new DrinkDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["drinkId"] = this.drinkId;
        data["userId"] = this.userId;
        data["drinkCategoryId"] = this.drinkCategoryId;
        data["name"] = this.name;
        data["alcoholPercentage"] = this.alcoholPercentage;
        data["defaultSize"] = this.defaultSize;
        data["imageUrl"] = this.imageUrl;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["modifiedOn"] = this.modifiedOn ? this.modifiedOn.toISOString() : <any>undefined;
        data["modifiedBy"] = this.modifiedBy;
        return data;
    }
}

export interface IDrinkDto {
    drinkId?: number;
    userId?: number | undefined;
    drinkCategoryId?: number;
    name?: string;
    alcoholPercentage?: number;
    defaultSize?: number;
    imageUrl?: string;
    createdOn?: dayjs.Dayjs;
    createdBy?: string;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string;
}

export class SessionDto implements ISessionDto {
    sessionId?: number;
    userId?: number;
    isDeleted?: boolean;
    promile?: number;
    weight?: number;
    sex?: boolean;
    open?: boolean;
    createdOn?: dayjs.Dayjs;
    createdBy?: string;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string;
    sessionDrinks?: SessionDrinkDto[];

    constructor(data?: ISessionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sessionId = _data["sessionId"];
            this.userId = _data["userId"];
            this.isDeleted = _data["isDeleted"];
            this.promile = _data["promile"];
            this.weight = _data["weight"];
            this.sex = _data["sex"];
            this.open = _data["open"];
            this.createdOn = _data["createdOn"] ? dayjs(_data["createdOn"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.modifiedOn = _data["modifiedOn"] ? dayjs(_data["modifiedOn"].toString()) : <any>undefined;
            this.modifiedBy = _data["modifiedBy"];
            if (Array.isArray(_data["sessionDrinks"])) {
                this.sessionDrinks = [] as any;
                for (let item of _data["sessionDrinks"])
                    this.sessionDrinks!.push(SessionDrinkDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SessionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SessionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sessionId"] = this.sessionId;
        data["userId"] = this.userId;
        data["isDeleted"] = this.isDeleted;
        data["promile"] = this.promile;
        data["weight"] = this.weight;
        data["sex"] = this.sex;
        data["open"] = this.open;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["modifiedOn"] = this.modifiedOn ? this.modifiedOn.toISOString() : <any>undefined;
        data["modifiedBy"] = this.modifiedBy;
        if (Array.isArray(this.sessionDrinks)) {
            data["sessionDrinks"] = [];
            for (let item of this.sessionDrinks)
                data["sessionDrinks"].push(item.toJSON());
        }
        return data;
    }
}

export interface ISessionDto {
    sessionId?: number;
    userId?: number;
    isDeleted?: boolean;
    promile?: number;
    weight?: number;
    sex?: boolean;
    open?: boolean;
    createdOn?: dayjs.Dayjs;
    createdBy?: string;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string;
    sessionDrinks?: SessionDrinkDto[];
}

export class SessionDrinkDto implements ISessionDrinkDto {
    sessionDrinkId?: number;
    sessionId?: number;
    drinkId?: number;
    drinkName?: string;
    comment?: string | undefined;
    alcoholPercentage?: number;
    size?: number;
    gramAlcohol?: number;
    alcholRemaining?: number;
    minutesRemaining?: number;
    timeRemaining?: string | undefined;
    createdOn?: dayjs.Dayjs;
    createdBy?: string | undefined;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string | undefined;

    constructor(data?: ISessionDrinkDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sessionDrinkId = _data["sessionDrinkId"];
            this.sessionId = _data["sessionId"];
            this.drinkId = _data["drinkId"];
            this.drinkName = _data["drinkName"];
            this.comment = _data["comment"];
            this.alcoholPercentage = _data["alcoholPercentage"];
            this.size = _data["size"];
            this.gramAlcohol = _data["gramAlcohol"];
            this.alcholRemaining = _data["alcholRemaining"];
            this.minutesRemaining = _data["minutesRemaining"];
            this.timeRemaining = _data["timeRemaining"];
            this.createdOn = _data["createdOn"] ? dayjs(_data["createdOn"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.modifiedOn = _data["modifiedOn"] ? dayjs(_data["modifiedOn"].toString()) : <any>undefined;
            this.modifiedBy = _data["modifiedBy"];
        }
    }

    static fromJS(data: any): SessionDrinkDto {
        data = typeof data === 'object' ? data : {};
        let result = new SessionDrinkDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sessionDrinkId"] = this.sessionDrinkId;
        data["sessionId"] = this.sessionId;
        data["drinkId"] = this.drinkId;
        data["drinkName"] = this.drinkName;
        data["comment"] = this.comment;
        data["alcoholPercentage"] = this.alcoholPercentage;
        data["size"] = this.size;
        data["gramAlcohol"] = this.gramAlcohol;
        data["alcholRemaining"] = this.alcholRemaining;
        data["minutesRemaining"] = this.minutesRemaining;
        data["timeRemaining"] = this.timeRemaining;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["modifiedOn"] = this.modifiedOn ? this.modifiedOn.toISOString() : <any>undefined;
        data["modifiedBy"] = this.modifiedBy;
        return data;
    }
}

export interface ISessionDrinkDto {
    sessionDrinkId?: number;
    sessionId?: number;
    drinkId?: number;
    drinkName?: string;
    comment?: string | undefined;
    alcoholPercentage?: number;
    size?: number;
    gramAlcohol?: number;
    alcholRemaining?: number;
    minutesRemaining?: number;
    timeRemaining?: string | undefined;
    createdOn?: dayjs.Dayjs;
    createdBy?: string | undefined;
    modifiedOn?: dayjs.Dayjs | undefined;
    modifiedBy?: string | undefined;
}

export class UserDto implements IUserDto {
    firstName?: string;
    lastName?: string;
    cultureCode?: string;
    weight?: number;
    sex?: boolean;
    userId?: number;

    constructor(data?: IUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.cultureCode = _data["cultureCode"];
            this.weight = _data["weight"];
            this.sex = _data["sex"];
            this.userId = _data["userId"];
        }
    }

    static fromJS(data: any): UserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["cultureCode"] = this.cultureCode;
        data["weight"] = this.weight;
        data["sex"] = this.sex;
        data["userId"] = this.userId;
        return data;
    }
}

export interface IUserDto {
    firstName?: string;
    lastName?: string;
    cultureCode?: string;
    weight?: number;
    sex?: boolean;
    userId?: number;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}

// 
// export class ClientBase {
//   public getBaseUrl(url: any, defaultUrl: any) {
//     return import.meta.env.VITE_API_URL;
//   }
// }