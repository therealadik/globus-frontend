/* tslint:disable */
/* eslint-disable */
/**
 * Financial Monitoring and Reporting API
 * API for financial monitoring and reporting
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@our-company.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Category,
  ErrorResponse,
} from '../models/index';
import {
    CategoryFromJSON,
    CategoryToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
} from '../models/index';

/**
 * 
 */
export class CategoryControllerApi extends runtime.BaseAPI {

    /**
     */
    async getAllCategoriesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Category>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/categories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     */
    async getAllCategories(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Category>> {
        const response = await this.getAllCategoriesRaw(initOverrides);
        return await response.value();
    }

}
