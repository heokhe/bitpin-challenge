import Decimal from 'decimal.js';
import { useState } from 'react';
import Input from '../../../common/components/Input';
import Label from '../../../common/components/Label';
import { separateThousands, formatPrice } from '../../../common/utils/format';

export default function OrdersView({ orders, market }) {
  const totalValue = orders.reduce(
    (acc, order) => acc.add(Decimal(order.value)),
    Decimal(0),
  );
  const totalRemain = orders.reduce(
    (acc, order) => acc.add(Decimal(order.remain)),
    Decimal(0),
  );
  const totalAmount = orders.reduce(
    (acc, order) => acc.add(Decimal(order.amount)),
    Decimal(0),
  );
  const avgPrice = orders
    .reduce(
      (acc, order) => acc.add(Decimal(order.price).mul(Decimal(order.amount))),
      Decimal(0),
    )
    .div(totalAmount);
  const [percentage, setPercentage] = useState(0);

  return (
    <div className="px-8">
      <div className="mx-auto max-w-5xl grid grid-cols-[3fr_2fr] max-sm:grid-cols-1 gap-6">
        <div className="border border-divider rounded-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="*:py-3 *:first:pl-4 *:last:pr-4 font-medium text-sm text-title">
                <th>Remain</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {orders.slice(0, 10).map((order, index) => (
                <tr
                  key={index}
                  className="border-t border-divider *:py-3 *:first:pl-4 *:last:pr-4"
                >
                  <td>{separateThousands(order.remain)}</td>
                  <td>{separateThousands(order.price)}</td>
                  <td>{separateThousands(order.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-6">
          <div className="border border-divider rounded-2xl p-6 pt-7 space-y-3">
            <div>
              <div className="text-sm tracking-wider">Total Value</div>
              <div className="text-2xl font-medium text-primary leading-relaxed">
                {formatPrice(totalValue, market?.currency2)}
              </div>
            </div>
            <div>
              <div className="text-sm tracking-wider">Total Remain</div>
              <div className="text-2xl font-medium text-primary leading-relaxed">
                {formatPrice(totalRemain, market?.currency1)}
              </div>
            </div>
            <div>
              <div className="text-sm tracking-wider">Average Price</div>
              <div className="text-2xl font-medium text-primary leading-relaxed">
                {formatPrice(avgPrice, market?.currency2)}
              </div>
            </div>
          </div>
          <div className="p-7 border border-divider rounded-2xl">
            <Label>
              Enter a percentage
              <Input
                value={percentage}
                onChange={(e) => setPercentage(e.target.valueAsNumber)}
                type="number"
                max="100"
                min="0"
                placeholder="0-100"
              />
            </Label>
            <div className="mt-4 pt-4 border-t border-dashed border-divider space-y-1.5">
              <div className="flex items-center justify-between gap-x-4">
                <div>Remain</div>
                <div className="text-title font-medium">
                  {formatPrice(
                    totalRemain.mul(Decimal(percentage || 0).div(100)),
                    market?.currency1,
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div>Price</div>
                <div className="text-title font-medium">
                  {formatPrice(avgPrice, market?.currency2)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div>Value</div>
                <div className="text-title font-medium">
                  {formatPrice(
                    totalRemain
                      .mul(Decimal(percentage || 0).div(100))
                      .mul(avgPrice),
                    market?.currency2,
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
