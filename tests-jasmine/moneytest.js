import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('rounds up cent values', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });


    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
});