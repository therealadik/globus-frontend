/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthenticationResponseDto
 */
export interface AuthenticationResponseDto {
    /**
     * 
     * @type {string}
     * @memberof AuthenticationResponseDto
     */
    token?: string;
}

/**
 * Check if a given object implements the AuthenticationResponseDto interface.
 */
export function instanceOfAuthenticationResponseDto(value: object): value is AuthenticationResponseDto {
    return true;
}

export function AuthenticationResponseDtoFromJSON(json: any): AuthenticationResponseDto {
    return AuthenticationResponseDtoFromJSONTyped(json, false);
}

export function AuthenticationResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticationResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'] == null ? undefined : json['token'],
    };
}

export function AuthenticationResponseDtoToJSON(json: any): AuthenticationResponseDto {
    return AuthenticationResponseDtoToJSONTyped(json, false);
}

export function AuthenticationResponseDtoToJSONTyped(value?: AuthenticationResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'token': value['token'],
    };
}

