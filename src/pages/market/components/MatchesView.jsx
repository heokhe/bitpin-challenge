import { separateThousands } from '../../../common/utils/format';

export default function MatchesView({ matches }) {
  return (
    <div className="px-8">
      <div className="max-w-lg mx-auto border border-divider rounded-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="*:py-3 *:first:pl-4 *:last:pr-4 font-medium text-sm text-title">
              <th>Amount</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {matches?.slice(0, 10).map((match) => (
              <tr
                key={match.match_id}
                className="border-t border-divider *:py-3 *:first:pl-4 *:last:pr-4"
              >
                <td className="tabular-nums">
                  {separateThousands(match.match_amount)}
                </td>
                <td className="tabular-nums">
                  {separateThousands(match.price)}
                </td>
                <td>
                  {Intl.DateTimeFormat('en-US', {
                    timeStyle: 'short',
                    hour12: false,
                  }).format(new Date(match.time * 1000))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
