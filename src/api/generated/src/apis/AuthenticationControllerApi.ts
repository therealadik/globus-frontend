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
  AuthenticationResponseDto,
  ErrorResponse,
  LoginRequestDto,
  RegistrationRequestDto,
} from '../models/index';
import {
    AuthenticationResponseDtoFromJSON,
    AuthenticationResponseDtoToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    LoginRequestDtoFromJSON,
    LoginRequestDtoToJSON,
    RegistrationRequestDtoFromJSON,
    RegistrationRequestDtoToJSON,
} from '../models/index';

export interface LoginRequest {
    loginRequestDto: LoginRequestDto;
}

export interface RegisterRequest {
    registrationRequestDto: RegistrationRequestDto;
}

/**
 * 
 */
export class AuthenticationControllerApi extends runtime.BaseAPI {

    /**
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticationResponseDto>> {
        if (requestParameters['loginRequestDto'] == null) {
            throw new runtime.RequiredError(
                'loginRequestDto',
                'Required parameter "loginRequestDto" was null or undefined when calling login().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestDtoToJSON(requestParameters['loginRequestDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticationResponseDtoFromJSON(jsonValue));
    }

    /**
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticationResponseDto> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerRaw(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticationResponseDto>> {
        if (requestParameters['registrationRequestDto'] == null) {
            throw new runtime.RequiredError(
                'registrationRequestDto',
                'Required parameter "registrationRequestDto" was null or undefined when calling register().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegistrationRequestDtoToJSON(requestParameters['registrationRequestDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticationResponseDtoFromJSON(jsonValue));
    }

    /**
     */
    async register(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticationResponseDto> {
        const response = await this.registerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
