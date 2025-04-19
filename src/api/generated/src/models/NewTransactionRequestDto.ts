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
 * @interface NewTransactionRequestDto
 */
export interface NewTransactionRequestDto {
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    personType: NewTransactionRequestDtoPersonTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    transactionType: NewTransactionRequestDtoTransactionTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof NewTransactionRequestDto
     */
    amount: number;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    bankSender: string;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    bankReceiver: string;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    innReceiver: string;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    accountReceiver: string;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    category: string;
    /**
     * 
     * @type {string}
     * @memberof NewTransactionRequestDto
     */
    phoneReceiver: string;
}


/**
 * @export
 */
export const NewTransactionRequestDtoPersonTypeEnum = {
    Physical: 'PHYSICAL',
    Legal: 'LEGAL'
} as const;
export type NewTransactionRequestDtoPersonTypeEnum = typeof NewTransactionRequestDtoPersonTypeEnum[keyof typeof NewTransactionRequestDtoPersonTypeEnum];

/**
 * @export
 */
export const NewTransactionRequestDtoTransactionTypeEnum = {
    Income: 'INCOME',
    Expense: 'EXPENSE'
} as const;
export type NewTransactionRequestDtoTransactionTypeEnum = typeof NewTransactionRequestDtoTransactionTypeEnum[keyof typeof NewTransactionRequestDtoTransactionTypeEnum];


/**
 * Check if a given object implements the NewTransactionRequestDto interface.
 */
export function instanceOfNewTransactionRequestDto(value: object): value is NewTransactionRequestDto {
    if (!('personType' in value) || value['personType'] === undefined) return false;
    if (!('transactionType' in value) || value['transactionType'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    if (!('bankSender' in value) || value['bankSender'] === undefined) return false;
    if (!('bankReceiver' in value) || value['bankReceiver'] === undefined) return false;
    if (!('innReceiver' in value) || value['innReceiver'] === undefined) return false;
    if (!('accountReceiver' in value) || value['accountReceiver'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('phoneReceiver' in value) || value['phoneReceiver'] === undefined) return false;
    return true;
}

export function NewTransactionRequestDtoFromJSON(json: any): NewTransactionRequestDto {
    return NewTransactionRequestDtoFromJSONTyped(json, false);
}

export function NewTransactionRequestDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewTransactionRequestDto {
    if (json == null) {
        return json;
    }
    return {
        
        'personType': json['personType'],
        'transactionType': json['transactionType'],
        'amount': json['amount'],
        'bankSender': json['bankSender'],
        'bankReceiver': json['bankReceiver'],
        'innReceiver': json['innReceiver'],
        'accountReceiver': json['accountReceiver'],
        'category': json['category'],
        'phoneReceiver': json['phoneReceiver'],
    };
}

export function NewTransactionRequestDtoToJSON(json: any): NewTransactionRequestDto {
    return NewTransactionRequestDtoToJSONTyped(json, false);
}

export function NewTransactionRequestDtoToJSONTyped(value?: NewTransactionRequestDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'personType': value['personType'],
        'transactionType': value['transactionType'],
        'amount': value['amount'],
        'bankSender': value['bankSender'],
        'bankReceiver': value['bankReceiver'],
        'innReceiver': value['innReceiver'],
        'accountReceiver': value['accountReceiver'],
        'category': value['category'],
        'phoneReceiver': value['phoneReceiver'],
    };
}

