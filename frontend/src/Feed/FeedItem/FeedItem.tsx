import React from 'react';
import { RequestItem } from '../Feed';

interface FeedItemProps {
  request: RequestItem;
}

export const FeedItem: React.FC<FeedItemProps> = (feedItem: FeedItemProps) => (
  <div>
    {feedItem.request.author.firstName}: {feedItem.request.receiver.firstName}
  </div>
);
