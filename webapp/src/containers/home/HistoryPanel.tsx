import React, { useRef } from 'react';
import { Panel } from '../../components/home';
import { History } from '../../components/home';
import { get, getDateDiffIntoText } from '../../lib/utils';
import { SearchHistory } from '../../types/basic';

function HistoryPanel() {
  const histories = useRef<SearchHistory[]>(get('history') ?? []);

  return (
    <Panel title='History'>
      {histories.current.length ? (
        histories.current.map((h) => (
          <History
            key={h.keyword}
            keyword={h.keyword}
            dateForDisplay={getDateDiffIntoText(h.date)}
          />
        ))
      ) : (
        <li className='message'>No recent searches.</li>
      )}
    </Panel>
  );
}

export default HistoryPanel;
