import { getOne, getSFConnection } from '../salesforce';

export interface Account {
  id: string;
  lang: string;
  countryCode: string;
  hasNewsletter: string;
  phoneNumber: string;
  countryIsoCode: string;
}

export const mapAccount = (row: any): Account => {
  return {
    id: row.Id,
    lang: row.Language__c,
    countryCode: row.Country__c,
    hasNewsletter: row.Has_Newsletter__c,
    phoneNumber: row.Phone,
    countryIsoCode: row.ShippingCountry
  };
};

export class AccountService {
  constructor(private connection: typeof getSFConnection) {}

  public async getAccount(accountId: string) {
    const sfConnection = await this.connection();
    const result = await sfConnection.query({
      query: `
      SELECT
        Id,
        Language__c,
        Country__c,
        Has_newsletter__c,
        Phone,
        Shippingcountry
      FROM
        Account
      WHERE
        Id = '${accountId}'
    `,
      raw: true
    });
    return getOne(result, mapAccount);
  }
}
