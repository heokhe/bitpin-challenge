import Decimal from 'decimal.js';

export function separateThousands(value) {
  value = value.toString();

  const [integerPart, decimalPart] = value.split('.');
  const formattedIntegerPart = integerPart
    .split('')
    .map((char, index, string) => {
      const indexFromLast = string.length - index - 1;
      if (indexFromLast > 0 && indexFromLast % 3 === 0) {
        return `${char},`;
      } else {
        return char;
      }
    })
    .join('');
  return formattedIntegerPart + (decimalPart ? `.${decimalPart}` : '');
}

export function formatPrice(price, currency) {
  price ??= 0;

  if (typeof price === 'string' || typeof price === 'number') {
    price = Decimal(price);
  }

  return (
    separateThousands(price.toDP(currency?.decimal_amount ?? 8)?.toString()) +
    (currency ? ` ${currency.code}` : '')
  );
}
