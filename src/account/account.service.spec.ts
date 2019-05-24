import { mapAccount } from "./account.service";

test('mapper', () => {
    const m = mapAccount({});
    expect(m).toMatchSnapshot('accountMapper');
})