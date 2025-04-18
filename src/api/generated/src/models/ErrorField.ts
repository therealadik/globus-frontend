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
 * @interface ErrorField
 */
export interface ErrorField {
    /**
     * 
     * @type {string}
     * @memberof ErrorField
     */
    field?: string;
    /**
     * 
     * @type {string}
     * @memberof ErrorField
     */
    message?: string;
}

/**
 * Check if a given object implements the ErrorField interface.
 */
export function instanceOfErrorField(value: object): value is ErrorField {
    return true;
}

export function ErrorFieldFromJSON(json: any): ErrorField {
    return ErrorFieldFromJSONTyped(json, false);
}

export function ErrorFieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorField {
    if (json == null) {
        return json;
    }
    return {
        
        'field': json['field'] == null ? undefined : json['field'],
        'message': json['message'] == null ? undefined : json['message'],
    };
}

export function ErrorFieldToJSON(json: any): ErrorField {
    return ErrorFieldToJSONTyped(json, false);
}

export function ErrorFieldToJSONTyped(value?: ErrorField | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'field': value['field'],
        'message': value['message'],
    };
}

